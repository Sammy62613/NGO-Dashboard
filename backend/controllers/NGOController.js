
const NGO = require('../models/NGOModel')
const mongoose = require('mongoose')


//THIS IS ALL THE POST/GET FUNCTIONS
//functions for NGO changes
const getOneNGO = async (req, res) => {
    NGO.findOne({ _id: req.params.id })
    .then((NGO) =>
        res.send(NGO)
    )
    .catch((err) => res.status(400).send(err));
    }

const updateNGOdata = async (req,res) => {
    NGO.findOneAndUpdate({ _id: req.params.id },{...req.body})
    .catch((err) => res.status(400).send(err));
}


const createNGO = async (req, res) => {
    const {NGOName,description,Phno,email,password,availability} = req.body

    //add doc to db
    try{
        const NGOone = await NGO.create({NGOName,description,Phno,email,password,availability})
        res.status(200).json(NGOone)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createNGO,
    updateNGOdata,
    getOneNGO
}