var express = require('express');
var router = express.Router();
const LogInCollection = require('../config/userdb');
const bcrypt = require('bcrypt')


router.get('/', function(req, res, next) {
    res.render('createuser')
});


router.post('/',async(req,res)=>{
  const { email, password, name } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      name,
      email,
      password: hashedPassword
    }
    const duplicates = await LogInCollection.findOne({ email: email })
    if (duplicates) return res.render('signup',{class:"alert alert-danger alert-dismissible",message:"User already exists. Click here to ",login:"login"})
    const result = await LogInCollection.insertMany([user])
    console.log(`${result.email} created success`)
    res.render('createuser',{class:"alert alert-success alert-dismissible",message:"User created succesfully."})

  } catch (error) {
    console.log(error)
    res.render('signup',{class:"alert alert-danger alert-dismissible",role:"alert",message:"Account creation failed, try gain"})
  }



  
});



module.exports = router;
