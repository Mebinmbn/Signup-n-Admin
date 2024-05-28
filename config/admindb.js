const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed admin');
})


const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    // createdAt: { type: Date, default: new Date() }
  })


  const adminCollection = new mongoose.model("newAdmins",adminSchema)

  module.exports =   adminCollection;
  