import * as express from "express"
import * as multer from "multer"
import ArticleController from "../controllers/articleController"
import PartyController from "../controllers/partyController"
import PaslonController from "../controllers/paslonController"
import UserController from "../controllers/userController"
import UploadImage from "../middleware/uploadFile"
import AuthMiddleware from "../middleware/auth"

const routes = express.Router()
const upload = multer()

//Article API
routes.get("/article", ArticleController.find)
routes.get("/article/:id", ArticleController.findOne)
routes.post("/article", AuthMiddleware.auth, UploadImage.upload("image"), ArticleController.create)
routes.patch("/article/:id", AuthMiddleware.auth, UploadImage.upload("image"), ArticleController.update)
routes.delete("/article/:id", AuthMiddleware.auth, ArticleController.delete)

//Party API
routes.get("/party", PartyController.find)
routes.get("/party/:id", PartyController.findOne)
routes.post("/party", AuthMiddleware.auth, UploadImage.upload("image"), PartyController.create)
routes.patch("/party/:id", AuthMiddleware.auth, UploadImage.upload("image"), PartyController.update)
routes.delete("/party/:id", AuthMiddleware.auth, PartyController.delete)

//Paslon API
routes.get("/paslon", PaslonController.find)
routes.get("/paslon/:id", PaslonController.findOne)
routes.post("/paslon", AuthMiddleware.auth, UploadImage.upload("image"), PaslonController.create)
routes.patch("/paslon/:id", AuthMiddleware.auth, UploadImage.upload("image"), PaslonController.update)
routes.delete("/paslon/:id", AuthMiddleware.auth, PaslonController.delete)

//User API
routes.get("/user", UserController.find)
routes.get("/user/:id", UserController.findOne)
routes.patch("/user/:id", upload.none(), UserController.update)
routes.delete("/user/:id", AuthMiddleware.auth, UserController.delete)

routes.get("/logout", UserController.logout)
routes.get("/login", upload.none(),UserController.login)
routes.post("/register", upload.none(), UserController.register)

routes.patch("/vote", upload.none(), AuthMiddleware.auth, UserController.vote)
routes.get("/vote/result", UserController.result)


export default routes