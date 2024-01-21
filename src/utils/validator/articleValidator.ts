import * as joi from "joi"

const createArticleSchema = joi.object({
    title: joi.string().max(100).required(),
    description: joi.string().required(),
    image: joi.string().max(255).default(null).optional(),
    author: joi.number().required()
})


export default createArticleSchema