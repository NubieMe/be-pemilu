import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import createPartySchema from "../utils/validator/partyValidator"
import { Party } from "../entity/Party"
import cloudinary from "../libs/cloudinary"
import { validate } from "../utils/validator/validation"
import ResponseError from "../error/responseError"

export default new class PartyService {
    private readonly partyRepository: Repository<Party> = AppDataSource.getRepository(Party)

    async find() {
        return this.partyRepository.find()
    }

    async findOne(id) {
        return this.partyRepository.findOneBy(id)
    }
    
    async create(data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")
        const isValid = validate(createPartySchema, data)

        cloudinary.upload()
        const upFile = await cloudinary.destination(isValid.image)
        const valid = {
            name: isValid.name,
            leader: isValid.leader,
            image: upFile.secure_url,
            visimisi: isValid.visimisi,
            address: !isValid.address ? null : isValid.address,
            paslon: isValid.paslon
        }
        
        const response = await this.partyRepository.save(valid)

        return ({
            message: "Party created successfully",
            data: valid
        })
    }
    
    async update(where, data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        let valid
        if(!data.image) {
            valid = {
                name: data.name,
                leader: data.leader,
                visimisi: data.visimisi,
                address: !data.address ? null : data.address,
                paslon: data.paslon
            }
        } else {
            cloudinary.upload()
            const upFile = await cloudinary.destination(data.image)
            valid = {
                name: data.name,
                leader: data.leader,
                image: upFile.secure_url,
                visimisi: data.visimisi,
                address: !data.address ? null : data.address,
                paslon: data.paslon
            }    
        }
        
        const response = await this.partyRepository.update(where, valid)

        return ({
            message: "party updated successfully!",
            data: valid
        })
    }

    async delete(where, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        const find = await this.partyRepository.findOneBy(where)
        if(!find) throw new ResponseError(404, "Not Found")

        const response = await this.partyRepository.delete(where)
        return ({
            message: "party deleted successfully!"
        })
    }
    
}