import { AppDataSource } from "./data-source"
import * as express from "express"
import routes from "./route"
import "dotenv/config"
import * as cors from "cors"
import cookieParser = require("cookie-parser")
import session = require("express-session")

// type User = {
//     id: number
//     username: string
//     isAdmin: boolean
// }

// declare module "express-session" {
//     interface SessionData {
//         user: User
//     }
// }

AppDataSource.initialize().then(async () => {
    const app = express()

    // app.use(session({
    //     secret: process.env.SECRET_KEY,
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: {
    //         secure: "auto"
    //     }
    // }))
    app.use(cors({
        credentials: true,
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Origin", "Content-Type", "Authorization", "Accept"],
        preflightContinue: true
    }))
    app.use(cookieParser())
    app.use(express.json())
    app.use("/api/v1", routes)

    app.listen(process.env.PORT, () => console.log(`Server is running!`))

}).catch(error => console.log(error))
