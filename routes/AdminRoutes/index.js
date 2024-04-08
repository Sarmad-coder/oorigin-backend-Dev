const routers = require("express").Router();

var fs = require("fs");
const multer = require("multer");
const path = require("path");
const {addfaqs,getFaqByUserId,updateFaq,deleteFaq}=require("../ServiceProviders/faq")
const { addCategory, updateCategory, adminaddpopularCategory,categorypopulate,adminaddTopCategory,categoryDelete }=require("./Category")
const { addskills,adminaddpopularskills, updateskills, skillspopulate,skillsdelete } = require('./Skill')
const { addsubcategory, updatesubcategory, subcategoryDelete,getcategorywisedata } = require('./SubCategory')
const { addsocialplatforms, updateSocialPlatforms,
     SocialPlatformspopulate,SocialPlatformsDelete ,adminaddTopSocialPlatforms} = require('./socialplatforms')


//subcategory
routers.post("/addsubcategory", addsubcategory);
routers.post("/updatesubcategory", updatesubcategory);
routers.post("/getcategorywisedata", getcategorywisedata);
routers.delete("/subcategoryDelete", subcategoryDelete);
//categories
const storagecategories = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "coverImg") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/categoriesimg/"
        );
  
        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath, { recursive: true });
        }
  
        cb(null, destinationPath);
      }else if (file.fieldname === "icon") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/categoryicons/"
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
      if (file.fieldname === "coverImg") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      }else if (file.fieldname === "icon") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      }else {
        cb(new Error("Invalid fieldname"));
      }
    },
  });
  var uploadcategories = multer({ storage: storagecategories });
routers.post("/addCategory",uploadcategories.fields([
    {
      name: "coverImg",
      maxCount: 1,
    }, {
        name: "icon",
        maxCount: 1,
      },
  ]), addCategory);
routers.get("/categorypopulate", categorypopulate);
routers.post("/adminaddTopCategory", adminaddTopCategory);
routers.post("/adminaddpopularCategory", adminaddpopularCategory);
routers.post("/updateCategory",uploadcategories.fields([
    {
      name: "coverImg",
      maxCount: 1,
    }, {
        name: "icon",
        maxCount: 1,
      },
  ]),  updateCategory);
routers.delete("/categoryDelete", categoryDelete);
//social platforms
const storagesocialplatform = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "coverImg") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/socialimg/"
        );
  
        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath, { recursive: true });
        }
  
        cb(null, destinationPath);
      }else if (file.fieldname === "icon") {
        const destinationPath = path.join(
          process.cwd(),
          "/uploads/socialicons/"
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
      if (file.fieldname === "coverImg") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      }else if (file.fieldname === "icon") {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      }else {
        cb(new Error("Invalid fieldname"));
      }
    },
  });
  var uploadsocialplatforms = multer({ storage: storagesocialplatform });
routers.post("/addsocialplatforms",uploadsocialplatforms.fields([
    {
      name: "coverImg",
      maxCount: 1,
    }, {
        name: "icon",
        maxCount: 1,
      },
  ]), addsocialplatforms);
routers.get("/SocialPlatformspopulate", SocialPlatformspopulate);
routers.post("/adminaddTopSocialPlatforms", adminaddTopSocialPlatforms);
routers.post("/updateSocialPlatforms",uploadcategories.fields([
    {
      name: "coverImg",
      maxCount: 1,
    }, {
        name: "icon",
        maxCount: 1,
      },
  ]),  updateSocialPlatforms);
routers.delete("/SocialPlatformsDelete", SocialPlatformsDelete);
//add skills
routers.post("/addskills", addskills);
routers.get("/skillspopulate", skillspopulate);
routers.post("/updateskills", updateskills);
routers.post("/skillsdelete", skillsdelete);
routers.post("/adminaddpopularskills", adminaddpopularskills);
module.exports = routers;
