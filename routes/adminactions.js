var express = require('express');
var router = express.Router();
const allUsersData = require('../controllers/userController');
const LogInCollection = require('../config/userdb');
const { response } = require('../app');

// delete user
router.get('/:id', function(req, res) {
  if (!req.session.authorized) return res.redirect('/admin')
    let userId = req.params.id
    console.log(userId)
    allUsersData.deleteUser(userId).then((response)=>{
      res.redirect('/adminpage')
    })
});


// edit user
router.get('/edit/:id',(req,res)=>{
  if (!req.session.authorized) return res.redirect('/admin')
    let userId = req.params.id
    console.log(userId)
    allUsersData.getUser(userId).then((user)=>{
      res.render('edituser',{user})
    })
    
})


// update user
router.post('/update/:id',(req,res)=>{
  allUsersData.updateUser(req.params.id, req.body).then(()=>{
    res.redirect('/adminpage')
  })
})


module.exports = router;
