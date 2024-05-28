const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    // createdAt: { type: Date, default: new Date() }
  })


  const LogInCollection = new mongoose.model("users",userSchema)

  module.exports =   LogInCollection;
  