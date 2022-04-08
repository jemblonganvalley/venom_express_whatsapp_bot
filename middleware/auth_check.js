
const { request, response } = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config

const { API_SECRET } = process.env

const auth_check = async(req = request, res = response , next)=>{
    try {
        
        //check beare token 
        let token = await req.headers.authorization
        if(!token){
            res.status(401).json({
                success  :false,
                msg : "unauthorized user"
            })
            return
        }

        // split bearer Authorization : Bearer alskdjf;laksdjflaskdjf
        let bearer = await token.split(" ")[1] 

        // jwt verify
        const verify = await jwt.verify(bearer, API_SECRET)

        if(!verify){
            res.status(401).json({
                success  :false,
                msg : "unauthorized user"
            })
            return
        }

        next()

    } catch (error) {
        res.status(401).json({
            success  :false,
            msg : "unauthorized user"
        })
    }
}

module.exports = auth_check
