const mongoose = require("mongoose");

require("dotenv").config();

module.exports = {
  User: require("./models/User.model"),
  WebsiteTool: require("./models/user.websitetool.model"),
  Influncer: require("./models/user.influncer.model"),
  ServiceProvider: require("./models/user.serviceprovider.model"),
  Roles: require("./models/roles.model"),
  ProfessionalType: require("./models/professional_type.model"),
  Designations: require("./models/designation.model"),
  FAQs: require("./models/FAQs.model"),
  ServicesSP: require("./models/SPservices.model"),
  OTP: require("./models/otp.model"),
  REVIEW:require("./models/reviews.model"),
  Category:require("./models/category"),
  SubCategory:require("./models/subCategory"),
  SocialPlatforms:require("./models/socialplatforms.model"),
  Skills:require("./models/skill"),
  ContactUs:require("./models/contactus.model"),
  NotificationCheck:require("./models/NotificationChecks.model"),
  TrustPoints:require("./models/TrustPoints.model"),
  Offers:require("./models/Offers.model"),
  Investor:require("./models/investor.model"),
};
