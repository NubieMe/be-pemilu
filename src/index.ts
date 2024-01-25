import { AppDataSource } from "./data-source"
import * as express from "express"
import routes from "./route"
import "dotenv/config"
import * as cors from "cors"

AppDataSource.initialize().then(async () => {
    const app = express()

    app.use(cors({ credentials: true, origin: "http://localhost:5173", methods: "GET, POST, PATCH, DELETE" }))
    app.use(express.json())
    app.use("/api/v1", routes)

    app.listen(process.env.PORT, () => console.log(`Server is running!`))

}).catch(error => console.log(error))
