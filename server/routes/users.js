import express from "express"
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
// /:id means if the frontend is sending a particular id we 
// can grab it using this syntax aka query string
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router;