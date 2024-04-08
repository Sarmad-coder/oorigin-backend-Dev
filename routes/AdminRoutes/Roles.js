const db = require("../../db");
let Roles = db.Roles
const addRoles = async (req, res) => {

    try {
       
            const RolesData = new Roles({
                role_name: req.body.role_name,
            });

            await db.Roles.create(RolesData)
                .then(result => {
                    console.log("result", result);
                })
                .catch(error => {
                    console.log("error", error);

                });


         return res.status(200).json({
            message: "Roles Added Successfully",
            status: "1",
        });
   



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: " error", error,
            status: "0",
        });

    }
};
const updateRoles = async (req, res) => {

    try {


        const userdata = await Roles.updateOne({
            _id: req.body.id
        }, {
            $set: {
                role_name: req.body.role_name,
            }
        })
            .then(result => {
                console.log("result", result);
            })
            .catch(error => {
                console.log("error", error);
                return res.status(200).json({
                    message: "Updating failed",
                    status: "0",
                });
            });

        return res.status(200).json({
            message: "Roles updated Successfully",
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
const Rolespopulate = async (req, res) => {
    try {
        const roles = await Roles.find({ })
        return res.status(200).json({
            roles,
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
module.exports = { addRoles, updateRoles, Rolespopulate };
