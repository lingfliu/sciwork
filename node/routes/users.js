var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list_user', function(req, res){

});

router.post('/signin', function(req, res) {

});

router.post('/signup', function(req, res){

});

module.exports = router;
