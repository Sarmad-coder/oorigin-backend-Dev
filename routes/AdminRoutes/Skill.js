const db = require("../../db");
let Skills = db.Skills
const addskills = async (req, res) => {

    try {
        let Skillsdata = await Skills.create(req.body)

        if (Skillsdata) {
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
const updateskills = async (req, res) => {

    try {


        const Skills = await Skills.findByIdAndUpdate(req.body.id, req.body)

        if (Skills) {
            res.status(200).json({
                message: "Skills updated Successfully",
                status: "1",
            });
        } else {
            res.status(200).json({
                message: "Skills updated Failed",
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
const skillspopulate = async (req, res) => {
    try {
        const Skills = await Skills.find({status:'Active'})
        return res.status(200).json({
            Skills,
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
const skillsdelete = async (req, res) => {
    try {
        const Skills = await Skills.findByIdAndDelete(req.body.id)

        if (Skills) {
            res.status(200).json({
                message: "Skills deleted Successfully",
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
const adminaddpopularskills= async (req, res) => {

    try {
        var Skillsfind = await db.Skills.find({ status: "Active", popular_skill:true });
        if (Skillsfind.length>=4) {
            return res.status(200).json({ message: "Already 4 categories are in top list", status: "0", });
        }
       let check = req.body.addskills
       let uncheck = req.body.removeskills
    if(uncheck.length>0 ){
        const Skillsdt = await Skills.updateMany({
            _id: uncheck
        }, {
            $set: {
                popular_skill: false
            },

        })
    } if(check.length>0&&check.length<=4 ){
        const Skillsdt = await Skills.updateMany({
            _id: check
        }, {
            $set: {
                popular_skill:true
            },

        })
    }else{
       return res.status(200).json({
            message: "Only 4 skills can be added as popular skills",
            status: "1",
        }); 
    }
      
     
            res.status(200).json({
                message: "Popular skills added Successfully",
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
module.exports = { addskills, updateskills, adminaddpopularskills,skillspopulate,skillsdelete };
