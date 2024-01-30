import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validate } from "../utils/validator/validation";
import { loginUserSchema, registerUserSchema } from "../utils/validator/userValidator";
import ResponseError from "../error/responseError";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export default new (class AuthController {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User);

    async login(data) {
        const loginReq = validate(loginUserSchema, data);
        const chkUser = await this.AuthRepository.findOne({ where: { username: loginReq.username } });

        if (!chkUser) throw new ResponseError(401, "Username not registered yet");

        const isValid = await bcrypt.compare(loginReq.password, chkUser.password);
        if (!isValid) throw new ResponseError(401, "Username or Password is incorrect!");

        const token = jwt.sign({ username: chkUser.username, isAdmin: chkUser.isAdmin }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        return {
            message: "Login successfully!",
            user: {
                id: chkUser.id,
                username: chkUser.username,
                isAdmin: chkUser.isAdmin,
            },
            token: token,
        };
    }

    async register(data) {
        const isValid = validate(registerUserSchema, data);

        const chkUser = await this.AuthRepository.countBy({ username: isValid.username });

        if (chkUser !== 0) throw new ResponseError(400, "Username already exist!");

        const hash = await bcrypt.hash(isValid.password, 10);
        const user = await this.AuthRepository.save({
            username: isValid.username,
            password: hash,
            fullName: isValid.fullName,
            address: isValid.address,
            gender: isValid.gender,
            isAdmin: isValid.isAdmin,
        });

        const get = await this.AuthRepository.findOne({ where: { username: isValid.username } });

        const token = jwt.sign({ id: get.id, username: get.username, isAdmin: get.isAdmin }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        return {
            message: "Account created successfully",
            user: {
                id: get.id,
                username: get.username,
                isAdmin: get.isAdmin,
            },
            token: token,
        };
    }
})();
