const LogInCollection = require('../config/userdb');
const adminCollection = require('../config/admindb');
const bcrypt = require('bcrypt')

// const getLoginPageController = (req, res) => {
//     console.log(`login page ${req.session?.authorized}`)
  
//     if (req.session?.authorized) return res.redirect('/')
//     res.render('login')
//   }
  
  // * login
  const loginController = async (req, res) => {
    const { name, password } = req.body
    try {
      if ((!name && name==='') || (!password && password==='') ) return res.status(400).json({ "message": "username and password required" })
      const foundUser = await LogInCollection.findOne({name}) 
         console.log(foundUser)
         console.log(name,password)
      if (!foundUser) return res.status(404).json({ message: "invalid username" })
      const isMatch = await bcrypt.compare(password, foundUser.password)
      if (!isMatch) return res.status(401).json({ message: "invalid password" })
      req.session.user = {
        name: foundUser.name,
        email: foundUser.email
      }
      req.session.authorized = true
      console.log(`${req.session.user.name} login success`)
      res.redirect('/')
    } catch (error) {
      res.status(500).json({ message:"login failed"})
    }
  }

//   adminlogin
  const adminLoginController = async (req, res) => {
    const { name, password } = req.body
    try {
      if ((!name && name==='') || (!password && password==='') ) return res.status(400).json({ "message": "username and password required" })
      const foundAdmin = await adminCollection.findOne({name}) 
        
      if (!foundAdmin) return res.status(404).json({ message: "invalid username" })
      const isMatch = await bcrypt.compare(password, foundAdmin.password)
      if (!isMatch) return res.status(401).json({ message: "invalid password" })
      req.session.admin = {
        name: foundAdmin.name,
        email: foundAdmin.email
      }
      req.session.authorized = true
      console.log(`${req.session.admin.name} login success`)
      res.redirect('/adminpage')
    } catch (error) {
      res.status(500).json({ message:"login failed"})
    }
  }

  module.exports = {
    adminLoginController,
    loginController,
    // logoutController,
  }