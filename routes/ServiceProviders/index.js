const routers = require("express").Router();

var fs = require("fs");
const multer = require("multer");
const path = require("path");
const registerinfluncers = require("./Influncer");
const {registerserviceprovider,serviceproviderforms,addservicesofprovider} = require("./serviceprovider");
const {addfaqs,getFaqByUserId,updateFaq,deleteFaq}=require("./faq")
const {registerinvestor} = require("../Investors/registerinvestor");
const {registerwebsitetools} = require("./websitetool");
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



routers.post("/addservicesofprovider",uploaduserprojects.fields([
    {
      name: "image",
      maxCount: 10,
    },
  ]), addservicesofprovider);
routers.post("/registerinfluncers", registerinfluncers);
routers.post("/registerserviceprovider", registerserviceprovider);
routers.post("/serviceproviderforms", serviceproviderforms);

routers.post("/registerwebsitetools", registerwebsitetools);

//faqs
routers.post("/addproviderfaqs", addfaqs);
routers.post("/getFAQsByUserId", getFaqByUserId);
routers.post("/updateFAQ", updateFaq);
routers.delete("/deleteFAQ/:id", deleteFaq);

//investors api 
routers.post("/registerinvestor", registerinvestor);








module.exports = routers;
