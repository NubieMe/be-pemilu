import { DataSource, Equal, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { validate } from "../utils/validator/validation"
import { loginUserSchema, registerUserSchema, voteSchema } from "../utils/validator/userValidator"
import ResponseError from "../error/responseError"
import { Paslon } from "../entity/Paslon"

export default new class UserService {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

    async find() {
        return this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.paslon", "paslon")
        .select(["user.id", "user.fullName", "user.address", "user.gender", "user.paslon", "paslon.id", "paslon.name"])
        .getMany()
    }

    async findOne(id) {
        return this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.paslon", "paslon")
        .where("user.id = :id", id )
        .select(["user.id", "user.username", "user.fullName", "user.address", "user.gender", "user.paslon", "user.isAdmin", "paslon.id", "paslon.name"])
        .getOne()
    }

    async login(data) {
        const loginReq = validate(loginUserSchema, data)
        const chkUser = await this.userRepository.findOne({ where: { username: loginReq.username }})

        if(!chkUser) throw new ResponseError(401, "Username or Password is incorrect!")

        const isValid = await bcrypt.compare(loginReq.password, chkUser.password)
        if(!isValid) throw new ResponseError(401, "Username or Password is incorrect!")

        const user = this.userRepository.create({
            id: chkUser.id,
            username: chkUser.username,
            fullName: chkUser.fullName,
            address: chkUser.address,
            gender: chkUser.gender,
            isAdmin: chkUser.isAdmin
        })
        
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "7d" })
        return ({
            message: "Login successfully!",
            token: token
        })
    }

    async logout() {
        const user = { session: "destroy" }
        return jwt.sign({ user }, "destroy", { expiresIn: 0 } )
    }
    
    async register(data) {
        const isValid = validate(registerUserSchema, data)
        
        const chkUser = await this.userRepository.countBy({ username: isValid.username })

        if(chkUser !== 0) throw new ResponseError(400, "Username already exist!")
        
        const hash = await bcrypt.hash(isValid.password, 10)
        const user = await this.userRepository.save({
            username: isValid.username,
            password: hash,
            fullName: isValid.fullName,
            address: isValid.address,
            gender: isValid.gender,
            isAdmin: isValid.isAdmin
        })

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "7d" })
        return ({
            message: "Account created successfully",
            user: isValid.username,
            token: token
        })
    }
    
    async update(where, data, session) {
        let user

        if(!data.password) {
            user = {
                username: !data.username ? session.user.username : data.username,
                fullName: !data.fullName ? session.user.fullName : data.fullName,
                address: !data.address ? session.user.address : data.address,
                gender: !data.gender ? session.user.gender : data.gender,
                isAdmin: !data.isAdmin ? session.user.isAdmin : data.isAdmin
            }
        } else {
            const hash = bcrypt.hash(data.password, 10)
            user = {
                username: !data.username ? session.user.username : data.username,
                password: hash,
                fullName: !data.fullName ? session.user.fullName : data.fullName,
                address: !data.address ? session.user.address : data.address,
                gender: !data.gender ? session.user.gender : data.gender,
                isAdmin: !data.isAdmin ? session.user.isAdmin : data.isAdmin
            }
        }

        const response = await this.userRepository.update(where, user)
        
        return ({
            message: "Account updated successfully",
            user: data.username
        })
    }

    async vote(data, session) {
        const chkPaslon = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.paslon", "paslon")
        .where("user.id = :id", { id: session.user.id } )
        .select(["user.id", "user.paslon", "paslon.id"])
        .getOne()

        if(chkPaslon.paslon !== null) throw new ResponseError(401, "You can only vote once!")

        const isValid = validate(voteSchema, data)
        const inputVote = await this.userRepository.update({ id: session.user.id }, isValid)

        return ({
            message: "Voting Success",
            voted: isValid.paslon
        })
    }

    async result() {
        const paslon = await AppDataSource.getRepository(Paslon).findAndCount()
        let call = []
        const len = paslon[1] + 1
        for(let i = 1; i < len; i++) {
            call.push(await this.userRepository.countBy({ paslon: Equal(i) }))
        }

        await Promise.all(call)
        return ({
            message: "Vote Result",
            data: call
        })
    }

    async delete(where, session) {
        if(where.id !== session.user.id) throw new ResponseError(401, "Unauthorized")

        const find = await this.userRepository.findOneBy(where)
        if(!find) throw new ResponseError(404, "Not Found")
        
        const response = await this.userRepository.delete(where)
        return ({
            message: "Account deleted successfully!"
        })
    }

}