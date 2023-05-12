const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())

// routes 

// app.get('/', (req,res)=>{
//     res.send("Hello")
// })

app.use('/api/transaction', require('./routes/transaction'))
app.use('/api/auth', require('./routes/auth'))

const server = ()=>{
    db()
    app.listen(PORT, ()=>{
        console.log("Listening to port:",PORT);
    })
}

server()