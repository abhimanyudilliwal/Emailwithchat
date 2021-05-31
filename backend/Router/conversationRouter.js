const express =require('express')
const Router =express.Router()
const ConversationModel = require("../Model/conversationModel")
const mongoose=require('mongoose')

Router.post("/conversation",(req,res) => {
       const New = new ConversationModel({
         userId: new mongoose.Types.ObjectId(),
         members:[req.body.senderId,req.body.receiverId]
          
       })
       New.save().then((results) => {
          res.status(201).json({ 
              message: "New conversaton Add", 
               success: true,
               results:results,
               status:201
             })
       }).catch(err => {
          res.status(500).json({ 
              message: " server error",
               success: false, 
               error: err.message })
       })
})

Router.get("/get-conversation", (req, res) => {
    const allconversation = ConversationModel.find()
    allconversation.then(results => {
       if (results) {
          res.status(200).json({ 
           message: "All the data for Conversation",
           success: true,
           results: results })
       }
    })
 })

 

 Router.get("/get-conversation-one/:userId", (req, res) => {
    const userId = req.params.userId
    if(!userId){
       res.status(422).json({
          message: "UserID Requried for get data"
       })
    }
    console.log(userId)
    const oneconReq = ConversationModel.find({ members:{$in:[userId]}, })
    oneconReq.then((results) => {
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
 
 

module.exports = Router