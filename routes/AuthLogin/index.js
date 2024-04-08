const routers = require("express").Router();
const {loginuser,verifypin,forgetpassword,changepassword,verifyemail,verifynumber} = require("./loginuser");




routers.post("/changepassword", changepassword);
routers.post("/forgetpassword", forgetpassword);
routers.post("/loginuser", loginuser);
routers.post("/verifynumber", verifynumber);
routers.post("/verifypin", verifypin);
routers.post("/verifyemail", verifyemail);
module.exports = routers;
