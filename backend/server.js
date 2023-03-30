require('dotenv').config()

const express = require('express')
const cors = require("cors")
const NGORoutes = require('./routes/NGO')
const StudentRoutes = require('./routes/Student')
const AuthRoutes = require('./routes/Auth')
const mongoose = require('mongoose')
const app = express()
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) =>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/NGO', NGORoutes)
app.use('/api/Student',StudentRoutes)
app.use('/api/Auth', AuthRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => { 
        console.log('connected to db and listening on port ', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})
