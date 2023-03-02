import express from "express"
import { login } from "../controllers/auth.js"

const router = express.Router()

//execute login when /login is requested
router.post("/login", login)

export default router