const express = require('express')
const app = express()
const cors = require('cors')
const Db= require("./Db/Db")

var bodyParser = require('body-parser')
const LoginRouter = require("./Router/LoginWthemail")
const ConversationRouter = require("./Router/conversationRouter")
const MessageRouter = require("./Router/messageRouter")
var Port = process.env.PORT || 3002;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',LoginRouter)
app.use('/api',ConversationRouter)
app.use('/api',MessageRouter)

app.listen(Port, () => {
    Db
  console.log(`Example app listening at http://localhost:${Port}`)
})