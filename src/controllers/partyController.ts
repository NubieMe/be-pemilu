import { NextFunction, Request, Response } from "express"
import PartyService from "../services/partyService"

export default new class PartyController {
    async find(req:Request, res:Response) {
        try{
            const result = await PartyService.find()

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async findOne(req:Request, res:Response) {
        try{
            const id = req.params
            const result = await PartyService.findOne(id)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async create(req:Request, res:Response) {
        try{
            const session = res.locals.session
            let data

            if(!req.file) {
                data = {
                    name: req.body.name,
                    leader: req.body.leader,
                    visimisi: req.body.visimisi,
                    address: req.body.address,
                    paslon: req.body.paslon
                }
            } else {
                data = {
                    name: req.body.name,
                    leader: req.body.leader,
                    image: req.file.filename,
                    visimisi: req.body.visimisi,
                    address: req.body.address,
                    paslon: req.body.paslon
                }
            }
            
            const result = await PartyService.create(data, session)

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
                    leader: req.body.leader,
                    visimisi: req.body.visimisi,
                    address: req.body.address,
                    paslon: req.body.paslon
                }
            } else {
                data = {
                    name: req.body.name,
                    leader: req.body.leader,
                    image: req.file.filename,
                    visimisi: req.body.visimisi,
                    address: req.body.address,
                    paslon: req.body.paslon
                }
            }
            
            const result = await PartyService.update(where, data, session)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async delete(req: Request, res:Response) {
        try {
            const session = res.locals.session
            const where = req.params
            const result = await PartyService.delete(where, session)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

}