const express =require('express')
const Router =express.Router()
const Loginwithgmail =require("../Model/loginwithgmail")
const config = require('./config.json')
const monoose =require('mongoose')
var jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const { response } = require('express')

const Client = new  OAuth2Client("77392047805-dgbmea4mpn9debule7j1al0u2mkq36nu.apps.googleusercontent.com")

Router.post("/loginwithemail",function(req,res) {
    const {tokenId}=req.body
    Client.verifyIdToken({idToken:tokenId,audience:"77392047805-dgbmea4mpn9debule7j1al0u2mkq36nu.apps.googleusercontent.com"}).then((response) =>{
        const {email,email_verified,name,sub} =response.payload
        console.log(response.payload)
      /*   var token = jwt.sign({ email: 'email' }, 'secrate'); */
        const accessToken = jwt.sign({ email: 'email' }, config.secret, { expiresIn: config.tokenLife})
        const refreshToken = jwt.sign({ email: 'email' }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
        if(email_verified){
            Loginwithgmail.findOne({email:email}).exec((error,user) => {
                if(error){
                  return  res.status(422).json({
                        message: "email varified error",
                        errors: error,
                        status: false,
                     })  
                } else{
                    if(user){
                        return  res.status(201).json({
                            message: "user is already login",
                            user:user,
                            accessToken:accessToken,
                            refreshToken:refreshToken,
                            status: true,
                         }) 

                    } else{
                        const newUser = new Loginwithgmail({
                            name:name,
                            email:email,
                            password:sub
                        })
                        newUser.save().then( (results) => {
                            res.status(201).json({ 
                                message: "New User Add", 
                                 success: true,
                                 results:results,
                                 token:token,
                                 refreshToken:refreshToken,
                                 status:201
                               })
                        }).catch( (err) => {
                            res.status(500).json({ 
                                message: " server error",
                                 success: false, 
                                 error: err.message })
                        })
                    }
                }
            })
        }
    })
})



Router.get("/get-Login-one/:userId", (req, res) => {
    const userId = req.params.userId
    if(!userId){
       res.status(422).json({
          message: "UserID Requried for get data"
       })
    }
    console.log(userId)
    const onemesReq = Loginwithgmail.find({ _id:userId})
    onemesReq.then((results) => {
       res.status(200).json({ 
           message: "Requirment Found",
           results: results, 
           success: true,
            })
    }).catch(err => {
       res.status(500).json({ 
           message: "Server Error",
            error: err.message, 
            success: false })
    })
 })


 Router.get("/get-all", (req, res) => {
    const allconversation = Loginwithgmail.find()
    allconversation.then(results => {
       if (results) {
          res.status(200).json({ 
           message: "All the data for message",
           success: true,
           results: results })
       }
    })
 })


module.exports = Router