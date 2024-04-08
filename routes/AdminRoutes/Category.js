const db = require("../../db");
let Category = db.Category
const addCategory = async (req, res) => {

    try {
        var categoryfind = await db.Category.findOne({ title: req.body.title, });
        if (categoryfind) {
            return res.status(200).json({ message: "Category with same title already exist", status: "0", });
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
        const categoryData = new Category({
            title: req.body.title,
            tagLine: req.body.tagLine,
            icon: icondata  ,
            coverImg:  imagedata,
            description1: req.body.description1,
            description2: req.body.description2,
        });

      let category =  await categoryData.save()
           
    
        if (category) {
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
const updateCategory = async (req, res) => {

    try {
        var categoryfind = await db.Category.findOne({ title: req.body.title, });
        if (categoryfind) {
            return res.status(200).json({ message: "Category with same title already exist", status: "0", });
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
     //   const category = await Category.findByIdAndUpdate(req.body.id, req.body)
        const category = await Category.updateOne({
            _id: req.body.id
        }, {
            $set: {
                title: req.body.title,
            tagLine: req.body.tagLine,  status: req.body.status,
            icon: icondata ? icondata :'',
            coverImg:  imagedata ? imagedata :'',
            description1: req.body.description1,
            description2: req.body.description2,
            },

        })
            
        if (category) {
            res.status(200).json({
                message: "Category updated Successfully",
                status: "1",
            });
        } else {
            res.status(200).json({
                message: "Category updated Failed",
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
const categorypopulate = async (req, res) => {
    try {
        const category = await Category.find({status:'Active'}).select('title _id')
        return res.status(200).json({
            category,
            message: "Category fetched Successfully",
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
const categoryDelete = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.body.id)

        if (category) {
            res.status(200).json({
                message: "Category deleted Successfully",
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

const adminaddTopCategory = async (req, res) => {

    try {
        var categoryfind = await db.Category.find({ status: "Active", topcategory:true });
        if (categoryfind.length>=8) {
            return res.status(200).json({ message: "Already 8 categories are in top list", status: "0", });
        }
       let check = req.body.addcategories
       let uncheck = req.body.removecategories
    if(uncheck.length>0){
        const category = await Category.updateMany({
            _id: uncheck
        }, {
            $set: {
                topcategory: false
            },

        })
    } if(check.length>0){
        const category = await Category.updateMany({
            _id: check
        }, {
            $set: {
                topcategory:true
            },

        })
    }
      
     
            res.status(200).json({
                message: "Category updated Successfully",
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

const adminaddpopularCategory = async (req, res) => {

    try {
        var categoryfind = await db.Category.find({ status: "Active", popular_category:true });
        if (categoryfind.length>=4) {
            return res.status(200).json({ message: "Already 4 categories are in top list", status: "0", });
        }
       let check = req.body.addcategories
       let uncheck = req.body.removecategories
    if(uncheck.length>0){
        const category = await Category.updateMany({
            _id: uncheck
        }, {
            $set: {
                popular_category: false
            },

        })
    } if(check.length>0&&check.length<=4){
        const category = await Category.updateMany({
            _id: check
        }, {
            $set: {
                popular_category:true
            },

        })
    }else{
        return res.status(200).json({
             message: "Only 4 Categories can be added as popular Categories",
             status: "1",
         }); 
     }
      
     
            res.status(200).json({
                message: "Popular Categories added Successfully",
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
module.exports = { addCategory, updateCategory,
     adminaddTopCategory, categorypopulate,categoryDelete ,adminaddpopularCategory,adminaddTopCategory};
