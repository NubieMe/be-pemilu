import { Request, Response } from "express"
import PaslonService from "../services/paslonService"

export default new class PaslonController {
    async find(req:Request, res:Response) {
        try{
            const result = await PaslonService.find()

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

    async findOne(req:Request, res:Response) {
        try{
            const id = req.params
            const result = await PaslonService.findOne(id)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

    async create(req:Request, res:Response) {
        try{
            const session = res.locals.session
            let data
            
            if(!req.file) {
                data = {
                    name: req.body.name,
                    visimisi: req.body.visimisi
                }
            } else {
                data = {
                    name: req.body.name,
                    image: req.file.filename,
                    visimisi: req.body.visimisi
                }
            }
            
            const result = await PaslonService.create(data,session)

            return res.status(201).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async update(req:Request, res:Response) {
        try{
            const session = res.locals.session
            const where = req.params
            let data

            if(!req.file) {
                data = {
                    name: req.body.name,
                    visimisi: req.body.visimisi
                }
            } else {
                data = {
                    name: req.body.name,
                    image: req.file.filename,
                    visimisi: req.body.visimisi
                }
            }

            const result = await PaslonService.update(where, data, session)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async delete(req:Request, res:Response) {
        try {
            const session = res.locals.session
            const where = req.params
            const result = await PaslonService.delete(where, session)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }
}