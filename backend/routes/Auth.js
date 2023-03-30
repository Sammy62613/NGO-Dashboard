const router = require("express").Router();
const NGO = require("../models/NGOModel");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../mail");

//validation
const registerSchema = joi.object({
    NGOName: joi.string().required(),
    description: joi.string().min(10).required(),
    Phno: joi.string().required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    availability: joi.boolean()
});

const loginSchema = joi.object({
    email: joi.string().min(10).required(),
    password: joi.string().min(6).required(),
});
router.post("/register", async (req, res) => { //THIS WORKS
    //validate data before creating a user
    const validation = registerSchema.validate(req.body);
    if (validation.error)
        res.status(400).send(validation.error.details[0].message);
    else {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        try {
            const ngo = new NGO({
                NGOName: req.body.NGOName,
                description: req.body.description,
                email: req.body.email,
                Phno: req.body.Phno,
                password: hashPassword,
                availability: true
            });
        
            const savedNgo = await ngo.save();
            res.send({ ngo: savedNgo._id });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
});
router.post('/login', async (req, res) => { 
    const validation = loginSchema.validate(req.body);
    if (validation.error)
        res.status(400).send(validation.error.details[0].message);

    //check if email exists
    const ngo = await NGO.findOne({ email: req.body.email });
    console.log(ngo);
    if (!ngo) res.status(400).send("Email or password is wrong");

    //check if password is correct
   //check if password is correct
try {
    bcrypt.compare(req.body.password, ngo.password, (err, result) => {
        console.log(ngo.password)
        console.log(result)
        if (result) {
            //create and assign a token
            const accessToken = jwt.sign(
                { _id: ngo._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            //send the response with token
            res.json({
                _id: ngo._id,
                NGOName: ngo.NGOName,
                description: ngo.description,
                Phno: ngo.Phno,
                email: ngo.email,
                availability: ngo.availability,
                accessToken: accessToken,
            });
        } else {
            res.status(400).send("Email or password is wrong");
        }
    });
} catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
}

});
router.post("/validate", async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
        return res.status(200).send();
    } else {
        return res.status(400).send();
    }
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    //check if email exists
    const ngo = await NGO.findOne({ email: email });
    if (!ngo) res.status(400).send("Email or password is wrong");

    //if ngo exists
    const secret = process.env.RESET_PASSWORD_SECRET + ngo.password;
    const payload = {
        email: ngo.email,
        id: ngo._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3000/reset-password/${ngo._id}/${token}`;
    sendEmail(email, link);
    res.status(200).send("Password reset link has been sent to your email");
});

router.post("/reset-password", async (req, res) => {
    const { id, token } = req.body;
    const ngo = await NGO.findOne({ _id: id });
    if (!ngo) res.status(401).send("Invalid ngo id");
    const secret = process.env.RESET_PASSWORD_SECRET + ngo.password;
    try {
        const payload = jwt.verify(token, secret);
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        ngo.password = hashPassword;
        await ngo.save();
        res.status(200).send("Password Reset Done");
    } catch (err) {
        res.status(401).send("Invalid token");
    }
});

module.exports = router;