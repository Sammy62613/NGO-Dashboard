const express = require('express')
const {
    createNGO,
    updateNGOdata,
    getOneNGO
} = require('../controllers/NGOController')
const router = express.Router()
const NGO = require("../models/NGOModel");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../mail");


//validation
router.post('/',createNGO)
router.get('/:id', getOneNGO)
router.patch('/:id',updateNGOdata)
module.exports = router