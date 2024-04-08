const routers = require("express").Router();

var fs = require("fs");
const multer = require("multer");
const path = require("path");

const {registerinvestor,investorprofileupt,getsingleinvestorprofile} = require("../Investors/registerinvestor");

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



routers.post("/investorprofileupt",uploaduserprofile.fields([
  {
    name: "profile_image",
    maxCount: 1,
  },
]), investorprofileupt);



//investors api 
routers.post("/registerinvestor", registerinvestor);
routers.get("/getsingleinvestorprofile", getsingleinvestorprofile);








module.exports = routers;
