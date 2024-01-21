import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import createPaslonSchema from "../utils/validator/paslonValidator"
import { Paslon } from "../entity/Paslon"
import cloudinary from "../libs/cloudinary"
import { validate } from "../utils/validator/validation"
import ResponseError from "../error/responseError"

export default new class PaslonService {
    private readonly paslonRepository: Repository<Paslon> = AppDataSource.getRepository(Paslon)

    async find() {
        return this.paslonRepository
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.coalition", "party")
        .select(["paslon.id","paslon.name","paslon.image","paslon.visimisi", "party.id", "party.name"])
        .getMany()
    }

    async findOne(id) {
        return this.paslonRepository
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.coalition", "party")
        .where("paslon.id = :id", id )
        .select(["paslon.id","paslon.name","paslon.image","paslon.visimisi", "party.id", "party.name"])
        .getOne()
    }
    
    async create(data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")
        const isValid = validate(createPaslonSchema, data)

        let valid
        if(!data.image) {
            valid = {
                name: data.name,
                visimisi: data.visimisi
            }
        } else {
            cloudinary.upload()
            const upFile = await cloudinary.destination(data.image)
    
            valid = {
                name: data.name,
                visimisi: data.visimisi,
                image: upFile.secure_url
            }
        }

        const response = await this.paslonRepository.save(valid)

        return ({
            message: "Paslon created successfully",
            data: valid 
        })
    }

    async update(where, data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        let valid
        if(!data.image) {
            valid = {
                name: data.name,
                visimisi: data.visimisi
            }
        } else {
            cloudinary.upload()
            const upFile = await cloudinary.destination(data.image)

            valid = {
                name: data.name,
                visimisi: data.visimisi,
                image: upFile.secure_url
            }
        }

        const response = await this.paslonRepository.update(where, valid)

        return ({
            message: "paslon updated successfully!",
            data: valid
        })
    }

    async delete(where, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        const find = await this.paslonRepository.findOneBy(where)
        if(!find) throw new ResponseError(404, "Not found")

        const response = await this.paslonRepository.delete(where)
        return ({
            message: "paslon deleted successfully"
        })
    }
    
}