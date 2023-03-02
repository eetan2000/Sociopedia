import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url" 
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"

/* Middleware Configurations */
const __filename = fileURLToPath(import.meta.url) //this is so we can grab fileurl specifically for using modules
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
//middleware function that parses incoming requests with JSON 
app.use(express.json())
//helmet helps secure express apps by setting various HTTP headers
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
//morgan is a request logger middleware
app.use(morgan("common"))
//Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
//provides CORS options
app.use(cors())
//to serve static files like images, CSS, html, use express.static
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


/* File Storage Configurations */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


/* Routes with files */
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)

/* Routes */
app.use("/auth", authRoutes) //execute authRoutes when /auth is requested
app.use("/users", userRoutes)
app.use("/posts", postRoutes)


/* Mongoose Setup*/
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER Port: ${PORT}`))
    
    //manually inject sample data
    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch( (err) => console.log(`${err} did not connect`) )