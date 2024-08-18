import joi from "joi"

export const registerValidation = joi.object({
   username:joi.string().min(3).max(30).required(),
   password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
})

export const loginValidation = joi.object({
   username:joi.string().min(3).max(30).required(),
   password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
})

export const accountValidation = joi.object({
    accountId:joi.string().required().min(3),
    amount:joi.number().required().positive() })