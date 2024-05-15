const mongoose = require('mongoose');
const { ParseStatus } = require('zod');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("connected to mongodb.."))
.catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength : 30,
        //trim in Mongoose removes the space if it is at the beginning or end of the string 
        trim: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        minLength:6
    },
    firstName : {
        type: String,
        required : true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId, //reference to user model
        ref : 'User',
        required : true
    },
    balance : {
        type: Number,
        required : true
    }

})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);
module.exports = {
    User,
    Account
}