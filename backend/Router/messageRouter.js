const express =require('express')
const Router =express.Router()
const MessageModel = require("../Model/messageModel")
const mongoose=require('mongoose')

Router.post("/message",(req,res) => {
    const {conversationId,sender,text} =req.body
       const NewMessage = new MessageModel({
         userId: new mongoose.Types.ObjectId(),
         conversationId:conversationId,
         sender:sender,
         text:text
       })
       NewMessage.save().then((results) => {
          res.status(201).json({ 
              message: "New Message Add", 
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

Router.get("/get-message", (req, res) => {
    const allconversation = MessageModel.find()
    allconversation.then(results => {
       if (results) {
          res.status(200).json({ 
           message: "All the data for message",
           success: true,
           results: results })
       }
    })
 })

 Router.get("/get-message-one/:conversationId", (req, res) => {
    const conversationId = req.params.conversationId
    if(!conversationId){
       res.status(422).json({
          message: "UserID Requried for get data"
       })
    }
    console.log(conversationId)
    const onemesReq = MessageModel.find({ conversationId:conversationId}, )
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
 
 

module.exports = Router