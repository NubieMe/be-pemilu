import * as joi from "joi"

const createPartySchema = joi.object({
    name: joi.string().max(100).required(),
    leader: joi.string().max(100).required(),
    image: joi.string().max(255).required(),
    visimisi: joi.array().required(),
    address: joi.string().max(100).default(null).optional(),
    paslon: joi.number().default(null).optional()
})


export default createPartySchema