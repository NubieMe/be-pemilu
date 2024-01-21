import Joi = require("joi")

export const registerUserSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    fullName: Joi.string().max(100).required(),
    address: Joi.string().max(100).default(null).optional(),
    gender: Joi.string().max(10).default(null).optional(),
    isAdmin: Joi.boolean().default(false)
})

export const loginUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const voteSchema = Joi.object({
    paslon: Joi.number().required()
})