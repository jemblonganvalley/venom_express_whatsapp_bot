const express = require("express")
const jwt = require("jsonwebtoken")
const moment = require("moment")
require("dotenv").config()

const auth_route = express.Router()
const { API_USERNAME, API_PASSWORD, API_SECRET } = process.env

auth_route.post("/request_token", async(req,res)=>{
    try {
        const { username , password } = await req.body
        // check user login
        if(username !== API_USERNAME){
            return res.status(401).json({
                success : false,
                msg : "username tidak ditemukan"
            })
        }

        if(password !== API_PASSWORD){
            return res.status(401).json({
                success : false,
                msg : "password salah"
            })
        }

        //generated token
        const createToken = await jwt.sign({
            app_name : "Bot Whatsapp",
            app_version : "1.0.0",
            request_date : moment().format("DD/MM/YYYY hh:mm:ss")
        } , API_SECRET , {
            expiresIn : "1d"
        })

        res.status(200).json({
            success : true,
            token : createToken
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

module.exports = auth_route