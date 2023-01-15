const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    role : {type : String , required : true},
    status : {type : String , required : true},
    avatar : {type : String , required : true},
    lastLogin : {type : String , required : true}
});
 const User = mongoose.model('user',UserSchema );
 module.exports = User;
