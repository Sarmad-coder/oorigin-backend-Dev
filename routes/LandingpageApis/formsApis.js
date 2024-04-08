const db = require("../../db");
let Skills = db.Skills
let Category = db.Category
let SubCategory = db.SubCategory

const categorypopulateform = async (req, res) => {
    try {
     
        const Categories = await Category.find({status:"Active"}).select('title _id')
       
        return res.status(200).json({
            Categories,
        
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
const subcategorypopulate = async (req, res) => {
    try {
        let categories = req.body.categories
        const Subcategorydata = await SubCategory.find({ category_id: { $in: categories } })
        .populate({
            path: 'category_id',
            select: 'title _id'
        })
        .select('_id title category_id');
        const subcategory = Subcategorydata.map(item => ({
            ...item.toObject(), 
            categorytype: item.category_id.title, 
            categoryid: item.category_id.id, 
            category_id: undefined 
        }));
        return res.status(200).json({
            subcategory,
            
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
const skillspopulateform = async (req, res) => {
    try {
        const Skillsdata = await Skills.find({status:'Active'}).select('_id title')
        return res.status(200).json({
            Skillsdata,
            message: "Skills fetched Successfully",
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
module.exports = { subcategorypopulate,categorypopulateform,skillspopulateform };
