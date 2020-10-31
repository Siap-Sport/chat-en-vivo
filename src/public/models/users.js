const mongoose = require('mongoose')
const { Schema } = mongoose;


const user = new Schema({
    user : String,
    pass : String
})

module.exports =  mongoose.model('usuarios' , user ); 