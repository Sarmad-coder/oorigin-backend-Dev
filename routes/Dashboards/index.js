const routers = require("express").Router();

var fs = require("fs");
const multer = require("multer");
const path = require("path");
const {userprofileedit,
  faqscountbyid,servicescountbyid,
  userreviewsdata,
  gettrustpoints,getgeneralsetting,getsingleservicebyid,
  getsingleuserprofile,generalsetting,changepassword,deleteservice,statuschangeservice,
  trustpointsaddapi,getservicesofsingleprovider,
  updateserviceofprovider,}=require("./ProfileDashboard")
const { addcontactusinfo, getcontactusforms}=require("./contactUs")
const { addNotificationCheck, getuserNotificationCheck}=require("./NotificationCheck")
const { addOffers, updateOffers,getoffersofuser,offerstatuschange,
  Offerspopulate,OffersDelete ,getsingleofferdetail}=require("./Offers")


  //contactus
  routers.post("/addcontactusinfo",  addcontactusinfo);
  routers.post("/getcontactusforms",  getcontactusforms);

  //notificationCheck
  routers.post("/addNotificationCheck",  addNotificationCheck);
  routers.get("/getuserNotificationCheck",  getuserNotificationCheck);

  //Offers
  routers.post("/addOffers",  addOffers);
  routers.post("/updateOffers",  updateOffers);
  routers.get("/getoffersofuser",  getoffersofuser);
  routers.post("/OffersDelete",  OffersDelete);
  routers.post("/offerstatuschange",  offerstatuschange);
  routers.post("/Offerspopulate",  Offerspopulate);
  routers.get("/getsingleofferdetail",  getsingleofferdetail);

//profile edit api
const storageuserprofile = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "profile_image") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/profileimages/"
        );
  
        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath, { recursive: true });
        }
  
        cb(null, destinationPath);
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },
    filename: (req, file, cb) => {
      if (file.fieldname === "profile_image") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },
  });
  var uploaduserprofile = multer({ storage: storageuserprofile });

routers.post("/userprofileedit", uploaduserprofile.fields([
    {
      name: "profile_image",
      maxCount: 1,
    },
  ]), userprofileedit);

  routers.get("/getsingleuserprofile",  getsingleuserprofile);
  routers.post("/generalsetting",  generalsetting);
  routers.post("/changepassword",  changepassword);
  routers.post("/trustpointsaddapi",  trustpointsaddapi);
  routers.get("/userreviewsdata",  userreviewsdata);
  routers.get("/getgeneralsetting",  getgeneralsetting);
  routers.get("/gettrustpoints",  gettrustpoints);
  routers.get("/servicescountbyid",  servicescountbyid);
  routers.get("/faqscountbyid",  faqscountbyid);


  // services crud apis

  const storageuserprojects = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/providerservices/"
        );
  
        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath, { recursive: true });
        }
  
        cb(null, destinationPath);
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },
    filename: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },
  });
  var uploaduserprojects = multer({ storage: storageuserprojects });
  routers.post("/getservicesofsingleprovider", getservicesofsingleprovider);
  routers.post("/getsingleservicebyid", getsingleservicebyid);
  routers.post("/deleteservice", deleteservice);
  routers.post("/statuschangeservice", statuschangeservice);
routers.post("/updateserviceofprovider", uploaduserprojects.fields([
  {
    name: "image",
    maxCount: 1,
  },
]),updateserviceofprovider);
module.exports = routers;
