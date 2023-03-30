const Student = require('../models/StudentModel')
const mongoose = require('mongoose')

//
//THIS IS ALL THE POST/GET FUNCTIONS

//functions for student changes


//get all students
const getStudents = async (req, res) => {
    const NGOAll = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(NGOAll)
}

//get single student
const getStudent = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid student'})
    }
    const NGOoneStudent = await Student.findById(id)

    if(!NGOoneStudent){
        return res.status(404).json({error: 'Student not found'})
    }

    res.status(200).json(NGOoneStudent)
}

//create a new student
const createStudent = async (req, res) => {
    const {Name,USN,Phno,Email,Password,NGOList} = req.body

    //add doc to db
    try{
        const NGOoneStudent = await Student.create({Name,USN,Phno,Email,Password})
        res.status(200).json(NGOoneStudent)
    }catch(e){
        res.status(400).json({error: error.message})
    }
}

//delete a single student
const deleteStudent = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid student'})
    }

    const NGOoneStudent = await Student.findOneAndDelete({_id: id})

    if(!NGOoneStudent){
        return res.status(404).json({error: 'Student not found'})
    }

    res.status(200).json({NGOoneStudent})
}

//update a single student
const updateStudent = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid student'})
    }

    const NGOoneStudent = await Student.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!NGOoneStudent){
        return res.status(404).json({error: 'Student not found'})
    }

    res.status(200).json(NGOoneStudent)
}


module.exports = {
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent
}