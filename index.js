import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import fileUpload from "express-fileupload";
import cors from "cors"

const PORT = process.env.PORT ||  3000
const DB_URL = 'mongodb+srv://user:user@db.xqquqlj.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({})) 
app.use(cors())
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()

