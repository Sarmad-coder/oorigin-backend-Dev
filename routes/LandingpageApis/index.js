const routers = require("express").Router();

var fs = require("fs");
const multer = require("multer");
const path = require("path");
const { getservicesonloadmore,
    searchservices,
    getallactiveoffers,
    categoprywiseservices,
    servicescategorylandingpg,
    categorylandingpage,
    landingpagecategories,
    landingpageplatforms,
    popularskills, servicesbysubcategory,
    getFaqsbytype,providerreviews,
    allcategorieslandingpg,categoryservicesfilter,
    servicesproviderdetaildata,getsimilarservices,providermoreservices,getservicesfaqs
   , popularcategories,getproviderOffers,
    categoryusers,
    categoryreview
} = require("./mainlangingapage")
const { subcategorypopulate, categorypopulateform, skillspopulateform } = require("./formsApis")
const { addReview, getReviewByUserId, updateReview, deleteReview,replytoReview } = require("./review")

//landingpage
routers.get("/landingpagecategories", landingpagecategories);
routers.get("/allcategorieslandingpg", allcategorieslandingpg);
routers.get("/landingpageplatforms", landingpageplatforms);
routers.get("/categoryusers", categoryusers);
routers.get("/categoryreview", categoryreview);
routers.get("/popularcategories", popularcategories);
routers.get("/popularskills", popularskills);
routers.get("/getFaqsbytype", getFaqsbytype);
routers.get("/getallactiveoffers", getallactiveoffers);
routers.get("/categorylandingpage", categorylandingpage);
routers.get("/servicescategorylandingpg", servicescategorylandingpg);
routers.post("/categoprywiseservices", categoprywiseservices);
routers.post("/categoryservicesfilter", categoryservicesfilter);
routers.get("/getservicesonloadmore", getservicesonloadmore);
routers.post("/searchservices", searchservices);
routers.post("/servicesbysubcategory", servicesbysubcategory);
routers.get("/servicesproviderdetaildata", servicesproviderdetaildata);
routers.get("/getsimilarservices", getsimilarservices);
routers.get("/providermoreservices", providermoreservices);
routers.get("/getservicesfaqs", getservicesfaqs);
routers.get("/getproviderOffers", getproviderOffers);
routers.get("/providerreviews", providerreviews);



//forms
routers.post("/subcategorypopulate", subcategorypopulate);
routers.get("/categorypopulateform", categorypopulateform);
routers.get("/skillspopulateform", skillspopulateform);

// reviews
routers.post("/addReview", addReview);
routers.post("/getReviewByUserId", getReviewByUserId);
routers.post("/replytoReview", replytoReview);
routers.put("/updateReview", updateReview);
routers.delete("/deleteReview", deleteReview);


module.exports = routers;
