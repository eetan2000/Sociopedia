import jwt from "jsonwebtoken"

//json web token is a compact, URL safe means of representing claims to be transferred between two
//parties

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if(!token) {
            return res.status(403).send("Accessed Denied")
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}