const express = require('express')
const {
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent,
} = require('../controllers/StudentController')
const router = express.Router()


router.get('/', getStudents)

//single
router.get('/:id', getStudent)

router.post('/', createStudent)
//delete
router.delete('/:id', deleteStudent)
//update workout

router.patch('/:id',updateStudent)
module.exports = router