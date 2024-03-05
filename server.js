const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const socketIo = require("socket.io")

const http = require('http')
const path = require('path')
const { error } = require("console")

dotenv.config()

//routes
const authRouter = require('./src/router/authRouter')

const app = express()
const PORT = process.env.PORT || 4001 

const server = http.createServer(app)

const io = socketIo(server, {
cors: {
    origin: '*',
}
})

//to save files for publik
app.use(express.static(path.join(__dirname,'src','public')))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(cors())

//routes usage
app.use('/api/auth',authRouter)

//websocket function

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL,{}).then(() => {
    server.listen(PORT, ()=> console.log(`Server running on port:${PORT}`))
}).catch(error => {
    console.log(error);
})





