const db = require("../../db");
let Category = db.Category
let SubCategory = db.SubCategory
const addsubcategory = async (req, res) => {

    try {
        var categoryfind = await db.Category.findOne({ _id: req.body.category_id });
        if (!categoryfind) {
            return res.status(200).json({ message: "No Category found", status: "0", });
        }
        let subcat= req.body.subcategory
        for(const data of subcat){
              const categoryData = new SubCategory({
            title: data.title,
            tagLine: data.tagLine,
             category_id:  req.body.category_id 
           
        }); 
         await categoryData.save()
        }
     

           
    
    
            res.status(200).json({
                message: "Added Successfully ",
                status: "1",
            })
       


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: " error", error,
            status: "0",
        });

    }
};
const updatesubcategory = async (req, res) => {

    try {
        var categoryfind = await db.Roles.findOne({ title: req.body.title, });
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
     //   const category = await Category.findByIdAndUpdate(req.body.id, req.body)
        const category = await Category.updateOne({
            _id: req.body.id
        }, {
            $set: {
                title: req.body.title,
            tagLine: req.body.tagLine,
            icon: req.body.icon,
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
const getcategorywisedata = async (req, res) => {
    try {
        let categories = req.body.categories
        const subcategory = await SubCategory.find({category_id:categories})
        return res.status(200).json({
            subcategory,
            message: "SubCategory fetched Successfully",
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
const subcategoryDelete = async (req, res) => {
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
module.exports = { addsubcategory, updatesubcategory, getcategorywisedata,subcategoryDelete };
