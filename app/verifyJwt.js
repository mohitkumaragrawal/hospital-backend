const jwt=require('jsonwebtoken')

const verifyJwt=(req,res)=>{
    const token=req.body.token
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    res.send(decoded)
}
module.exports=verifyJwt