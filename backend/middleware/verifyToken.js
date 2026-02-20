import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=> {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message: "Not Authorized!"})

        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, user)=>{
            if(err) return res.status(403).json({message: "Not valid token!"})
                req.user = user.id
            next()
        })
}