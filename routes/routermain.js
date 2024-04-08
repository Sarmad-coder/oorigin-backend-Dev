const routes = require("express").Router();


const auth = require("./AuthLogin");
const landingpage = require("./LandingpageApis");
const dashboard = require("./Dashboards");
const investor = require("./Investors");
const admindata = require("./AdminRoutes/index.js");
const userdata = require("./ServiceProviders/index.js");

const { authMiddleWare} = require("../middleware/mainAuth");


routes.use("/landingpage", landingpage);
routes.use("/auth", auth);
routes.use("/dashboard", dashboard);
routes.use("/admindata", admindata);
routes.use("/investor", investor);
routes.use("/userdata", userdata);
// routes.use("/", (req,res)=>{
//     res.json("Origin Api Running")
// });





module.exports = routes;
