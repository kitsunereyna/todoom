const alert = require("alert");
const cookieParser = require("cookie-parser");
const express = require("express"); 
const { redirect } = require("express/lib/response");
const router = express.Router();

router
.get('/newtodo', (req, res) =>{

    res.render('newTodo');
})


module.exports = router;