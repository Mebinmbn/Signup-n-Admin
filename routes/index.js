var express = require('express');
var router = express.Router();



let  card_items= [
  {
  image: './images/lp1.jpeg' ,
  name : "HP 15-bs500na Full-HD Laptop ",
  details : "The HP Victus Laptop is made for peak PC gaming. This sleek machine touts a 13th Gen Intel® Core™ processor[1] and a modern graphics card. This laptop’s design ..."
},
  {
  image: './images/lp2.jpg' ,
  name : "HP Pavilion 15-eg3020na",
  details : "Stream & entertain. Enjoy audio and video features that take streaming to a higher level wrapped in a stylish design,with an enhanced responsive touchscreen, amazing audio, and advanced co..."
},
  {
  image: './images/lp3.jpg' ,
  name : "HP Envy x360 2-in-1 Laptop 15-fe0019na",
  details : "The HP Envy x360 2-in-1 Laptop PC levels up your work or downtime in every possible way, with an enhanced responsive touchscreen, amazing audio, and advanced co..."
},
  {
  image: './images/lp4.jpg' ,
  name : "HP Stream Laptop 11-ak0025na",
  details :"Between home, school, and work—your mobile life demands a PC that just doesn’t quit. With up to 13 hours and 15 minutes of battery life[1], the HP Stream does e..."
},
];

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.authorized) return res.redirect('/login')
  res.render('index',{card_items,});
});

module.exports = router;
