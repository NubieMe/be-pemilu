import { Repository } from "typeorm"
import { Article } from "../entity/Article"
import { AppDataSource } from "../data-source"
import createArticleSchema from "../utils/validator/articleValidator"
import cloudinary from "../libs/cloudinary"
import { validate } from "../utils/validator/validation"
import ResponseError from "../error/responseError"

export default new class ArticleService {
    private readonly ArticleRepository: Repository<Article> = AppDataSource.getRepository(Article)

    async find() {
        return this.ArticleRepository
        .createQueryBuilder("article")
        .select(["article.id", "article.title", "article.image", "article.createdAt"])
        .getMany()
    }
    
    async findOne(id) {
        return this.ArticleRepository.findOne({
            where: id,
            relations: {
                author: true
            },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                author: {
                    id: true,
                    fullName: true
                },
                createdAt: true
            }
        })
    }
    
    async create(data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")
        
        const isValid = validate(createArticleSchema, data)
        let valid

        if(data.image) {
            cloudinary.upload()
            const upFile = await cloudinary.destination(isValid.image)

            valid = {
                title: isValid.title,
                description: isValid.description,
                image: upFile.secure_url,
                author: isValid.author
            }
        } else {
            valid = {
                title: isValid.title,
                description: isValid.description,
                author: isValid.author
            }
        }
        
        const response = await this.ArticleRepository.save(valid)
        
        return ({
            message: "Article created successfully",
            data: valid
        })
    }

    async update(where, data, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        const isValid = validate(createArticleSchema, data)
        let valid

        if(data.image) {
            cloudinary.upload()
            const upFile = await cloudinary.destination(isValid.image)

            valid = {
                title: isValid.title,
                description: isValid.description,
                image: upFile.secure_url,
                author: session.user.id
            }
        } else {
            valid = {
                title: isValid.title,
                description: isValid.description,
                author: session.user.id
            }
        }

        const response = await this.ArticleRepository.update(where, valid)
        
        return ({
            message: "article updated successfully!",
            data: valid
        })
    }

    async delete (where, session) {
        if(!session.user.isAdmin) throw new ResponseError(401, "Unauthorized")

        const find = await this.ArticleRepository.findOneBy(where)
        if(!find) throw new ResponseError(404, "Not Found")
        
        const response = await this.ArticleRepository.delete(where)
        return ({
            message: "article deleted successfully"
        })
    }
    
}