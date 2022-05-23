import jwt from 'jsonwebtoken'

export default function authVerify(req,res,next){
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send('Access Denied')
    }

    try{
        const verified = jwt.verify(token,process.env.JWT_KEY)
        req.userjwt = verified
        next()
    }catch(err){
        res.status(400).send('invalid token')
    }
}