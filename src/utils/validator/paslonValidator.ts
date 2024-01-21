import * as joi from "joi"

const createPaslonSchema = joi.object({
    name: joi.string().max(100).required(),
    image: joi.string().max(255).required(),
    visimisi: joi.array().required()
})


export default createPaslonSchema