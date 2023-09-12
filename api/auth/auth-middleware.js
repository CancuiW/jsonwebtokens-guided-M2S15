const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('./../../config/index')
// AUTHENTICATION
const restricted = (req, res, next) => {
  const token=req.headers.authorization
  if(token){
    jwt.verify(token, JWT_SECRET,(err,decoded)=>{
      if(err){
        next({status:401,message:`token bad:${err.message}`})
      }else{
        req.decodedJwt=decoded
        //{ subject: 2, username: 'can', iat: 1694497858, exp: 1694584258 }
        console.log(req.decodedJwt)
        next()
      }
    })
  }else{
    next({status:401, message:"no tokens"})
  }
}

// AUTHORIZATION
const checkRole = role=>(req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.username===role){
    next()
  }else{
    next({status:403,message:'you have no power here!'})
  }
    
}

module.exports = {
  restricted,
  checkRole,
}
