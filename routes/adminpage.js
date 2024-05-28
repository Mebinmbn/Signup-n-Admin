var express = require('express');
var router = express.Router();
const allUsersData = require('../controllers/userController');
const LogInCollection = require('../config/userdb');


router.get('/', function(req, res) {
  if (!req.session.authorized) return res.redirect('/admin')
    allUsersData.getAllUasers().then((users)=>{
      res.render('admin',{users});
    })
});


// router.get('/', async (req, res) => {
//   try {
//     const users = await LogInCollection.find({}).lean().exec();
//     res.render('admin',{users});
//     console.log(users)
//   } catch (error) {
//     res.status(500).send('Error fetching users');
//   }
// });


module.exports = router;
