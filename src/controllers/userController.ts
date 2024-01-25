import { Request, Response } from "express"
import UserService from "../services/userService"

export default new class UserController {
    async find(req:Request, res:Response) {
        try{
            const result = await UserService.find()

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

    async findOne(req:Request, res:Response) {
        try{
            const where = req.params
            const result = await UserService.findOne(where)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

    async login(req:Request, res:Response) {
        try{
            const data = {
                username: req.query.username,
                password: req.query.password
            }
            const result = await UserService.login(data)

            return res.status(200).cookie("authToken", result.token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json(result.message) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async logout(req:Request, res:Response) {
        try{
            return res.status(200).clearCookie("authToken").json({ message: "Logout successfully" })
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async register(req:Request, res:Response) {
        try{
            const result = await UserService.register(req.body)

            return res.status(201).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async update(req:Request, res:Response) {
        try{
            const session = res.locals.session
            const where = req.params
            const result = await UserService.update(where, req.body, session)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async vote(req:Request, res:Response) {
        try{
            const session = res.locals.session
            const result = await UserService.vote(req.body, session)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async result(req:Request, res:Response) {
        try{
            const result = await UserService.result()
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async delete(req:Request, res:Response) {
        try {
            const session = res.locals.session
            const where = req.params
            const result = await UserService.delete(where, session)
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }
}