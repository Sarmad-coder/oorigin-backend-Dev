const db = require("../../db");
let SocialPlatforms = db.SocialPlatforms
const addsocialplatforms = async (req, res) => {

    try {
        var socialPlatformsfind = await SocialPlatforms.findOne({ title: req.body.title, });
        if (socialPlatformsfind) {
            return res.status(200).json({ message: "Social Platforms with same title already exist", status: "0", });
        }
        if (typeof req?.files?.coverImg != "undefined") {
            var images = "";
      
            for (var j = 0; j < req.files.coverImg.length; j++) {
              var image_name = req.files.coverImg[j].filename;
              images += image_name + ",";
              var imagedata = images.replace(/,\s*$/, "");
            }
          } else {
            var imagedata = req.body.coverImg;
          }
          if (typeof req?.files?.icon != "undefined") {
            var icons = "";
      
            for (var j = 0; j < req.files.icon.length; j++) {
              var image_name = req.files.icon[j].filename;
              icons += image_name + ",";
              var icondata = icons.replace(/,\s*$/, "");
            }
          } else {
            var icondata = req.body.image;
          }
        const SocialPlatformsData = new SocialPlatforms({
            title: req.body.title,
            url: req.body.url,
            tagLine: req.body.tagLine,
            icon: icondata  ,
            coverImg:  imagedata,
            description1: req.body.description1,
            description2: req.body.description2,
        });

      let SocialPlatformsss =  await SocialPlatformsData.save()
           
    
        if (SocialPlatformsss) {
            res.status(200).json({
                message: "Add Successfully ",
                status: "1",
            })
        } else {
            res.status(200).json({
                message: "Something went wrong",
                status: "0",
            });
        }




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: " error", error,
            status: "0",
        });

    }
};
const updateSocialPlatforms = async (req, res) => {

    try {
        var SocialPlatformsfind = await db.SocialPlatforms.findOne({ title: req.body.title, });
        if (SocialPlatformsfind) {
            return res.status(200).json({ message: "SocialPlatforms with same title already exist", status: "0", });
        }
        if (typeof req?.files?.coverImg != "undefined") {
            var coverImg = "";
      
            for (var j = 0; j < req.files.coverImg.length; j++) {
              var image_name = req.files.coverImg[j].filename;
              coverImg += image_name + ",";
              var imagedata = coverImg.replace(/,\s*$/, "");
            }
          } else {
            var imagedata = req.body.image;
          }
          if (typeof req?.files?.icon != "undefined") {
            var icons = "";
      
            for (var j = 0; j < req.files.icon.length; j++) {
              var image_name = req.files.icon[j].filename;
              icons += image_name + ",";
              var icondata = icons.replace(/,\s*$/, "");
            }
          } else {
            var icondata = req.body.image;
          }
     //   const SocialPlatforms = await SocialPlatforms.findByIdAndUpdate(req.body.id, req.body)
        const SocialPlatforms = await SocialPlatforms.updateOne({
            _id: req.body.id
        }, {
            $set: {
                title: req.body.title,
                url: req.body.url,
                status: req.body.status,
            tagLine: req.body.tagLine,
            icon: icondata ? icondata :'',
            coverImg:  imagedata ? imagedata :'',
            description1: req.body.description1,
            description2: req.body.description2,
            },

        })
            
        if (SocialPlatforms) {
            res.status(200).json({
                message: "SocialPlatforms updated Successfully",
                status: "1",
            });
        } else {
            res.status(200).json({
                message: "SocialPlatforms updated Failed",
                status: "0",
            });
        }




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "updating error", error,
            status: "0",
        });

    }
};
const SocialPlatformspopulate = async (req, res) => {
    try {
        const SocialPlatforms = await SocialPlatforms.find({status:'Active'}).select('title _id')
        return res.status(200).json({
            SocialPlatforms,
            message: "SocialPlatforms fetched Successfully",
            status: "1",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
            status: "0",
        });
    }
};
const SocialPlatformsDelete = async (req, res) => {
    try {
        const SocialPlatforms = await SocialPlatforms.findByIdAndDelete(req.body.id)

        if (SocialPlatforms) {
            res.status(200).json({
                message: "SocialPlatforms deleted Successfully",
                status: "1",
            });
        } else {
            res.status(200).json({
                message: "something went wrong",
                status: "0",
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
            status: "0",
        });
    }
};

const adminaddTopSocialPlatforms = async (req, res) => {

    try {
        var SocialPlatformsfind = await db.SocialPlatforms.find({ status: "Active", topSocialPlatforms:true });
        if (SocialPlatformsfind.length>=8) {
            return res.status(200).json({ message: "Already 8 platforms are in top list", status: "0", });
        }
       let check = req.body.addplatform
       let uncheck = req.body.removeplatform
    if(uncheck.length>0){
        const SocialPlatformsss = await SocialPlatforms.updateMany({
            _id: uncheck
        }, {
            $set: {
                topplatform: false
            },

        })
    } if(check.length>0){
        const SocialPlatformssss = await SocialPlatforms.updateMany({
            _id: check
        }, {
            $set: {
                topplatform:true
            },

        })
    }
      
     
            res.status(200).json({
                message: "Top platforms added  Successfully",
                status: "1",
            });
       




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "updating error", error,
            status: "0",
        });

    }
};


module.exports = { addsocialplatforms, updateSocialPlatforms,
     adminaddTopSocialPlatforms, SocialPlatformspopulate,SocialPlatformsDelete ,adminaddTopSocialPlatforms};
