import { Request, Response } from "express"
import ArticleService from "../services/articleService"

export default new class ArticleController {
    async find(req:Request, res:Response) {
        try{
            const result = await ArticleService.find()

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async findOne(req:Request, res:Response) {
        try{
            const id = req.params
            const result = await ArticleService.findOne(id)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async create(req:Request, res:Response) {
        try{
            const session = res.locals.session
            let data
            
            if(!req.file) {
                data = {
                    title: req.body.title,
                    description: req.body.description,
                    author: session.user.id
                }
            } else {
                data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: req.file.filename,
                    author: session.user.id
                }
            }

            const result = await ArticleService.create(data, session)

            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }
    
    async update(req:Request, res:Response) {
        try{
            const where = req.params
            const session = res.locals.session
            
            let data
            
            if(!req.file) {
                data = {
                    title: req.body.title,
                    description: req.body.description,
                    author: req.body.author,
                }
            } else { 
                data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: req.file.filename,
                    author: req.body.author,
                }

            }

            const result = await ArticleService.update(where, data, session)
            
            return res.status(200).json(result) 
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }

    async delete(req: Request, res:Response) {
        try{
            const session = res.locals.session
            const where = req.params
            const result = await ArticleService.delete(where, session)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(error.status || 500).json(error.message)
        }
    }
}