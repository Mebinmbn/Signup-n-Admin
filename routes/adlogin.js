var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

//get the login page
router.get('/', function(req, res, next) {
  if (req.session?.authorizedAdmin) return res.redirect('/admin')
    res.render('adminlogin')
});

//login post
router.post('/', authController.adminLoginController);

module.exports = router;