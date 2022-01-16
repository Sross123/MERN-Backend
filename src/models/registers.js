const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    confirmpassword: {
        type: String,
        required:true,
    },
})

// Now i have to create a models/collections
const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;