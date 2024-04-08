const db = require("../../db");
let User = db.User
let Roles = db.Roles
let Investor = db.Investor
const config = require("./../../config.json");
const registerinvestor = async (req, res) => {

    try {
        var InvestorRoleID = await db.Roles.findOne({ role_name: "Investor" });
        let ruleid = InvestorRoleID?.id
        if (!InvestorRoleID) {
            const InfluncerData = new Roles({
                role_name: "Investor"


            });
            await InfluncerData.save().then(async result => {
                console.log("result", result);
                ruleid = result?.id
            })
                .catch(error => {
                    console.log("error", error);

                });
        }

        const userdata = await User.findOne({
            email: req.body.email
        });
        if (userdata) {
            return res.status(200).json({ message: "User already exist", status: "0", });
        }
        if (req.body.login_method == "Google") {
            UserData = new User({
                email: req.body.email,
                login_method: 'Google',
                social_name: req.body.social_name,
                phonenum: req.body.phonenum,
                dob: req.body.dob,
                firstname: req.body.firstname,
                lastname: req.body.lastname,


                fathername: req.body.fathername,
                address: req.body.address,

                country_code: req.body.country_code,
                social_id: req.body.social_id,
                role: ruleid,

            });
        } else {
            UserData = new User({
                email: req.body.email,
                login_method: 'Custom',
                password: req.body.password,
                phonenum: req.body.phonenum,
                dob: req.body.dob,
                firstname: req.body.firstname,
                lastname: req.body.lastname,

                fathername: req.body.fathername,
                address: req.body.address,

                role: ruleid,
                country_code: req.body.country_code,
                username: req.body.name,

            })
        }

        await UserData.save()
            .then(async (result) => {
                console.log("result", result);


                let InvestorData = new Investor({
                    referal_code: req.body.referal_code,
                    payment_mode: req.body.payment_mode,
                    amount: req.body.amount,
                    user_id: result.id,

                })


                await InvestorData.save().then(async (result) => {
                    console.log("result", result);
                })
                .catch(error => {
                    console.log("error", error);
                    return res.status(200).json({
                        message: "Registered failed",
                        status: "0",
                    });
                })
                return res.status(200).json({
                    message: "Registered Successfully",
                    status: "1",
                });
            })
            .catch(error => {
                console.log("error", error);
                return res.status(200).json({
                    message: "Registered failed",
                    status: "0",
                });
            });
    }






    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });

    }
};
const investorprofileupt = async (req, res) => {

    try {
        if (!req.body.user_id) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await User.findOne({
            _id: req.body.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }


        if (req.body?.email) {
            const phonenum = await User.findOne({
                email: req.body?.email, _id: { $ne: req.body.user_id }
            });
            if (phonenum) {
                return res.status(200).json({
                    message: "User with same email already exist",
                    status: "0",
                });
            }
        }


        if (typeof req?.files?.profile_image != "undefined") {
            var images = "";

            for (var j = 0; j < req.files.profile_image.length; j++) {
                var image_name = req.files.profile_image[j].filename;
                images += image_name + ",";
                var imagedata = images.replace(/,\s*$/, "");
            }
        } else {
            var imagedata = req.body.profile_image;
        }
        const updateuser = await User.updateOne(
            {
                _id: req.body.user_id,
            },
            {
                $set: {

                    profile_image: imagedata,
                    lastname: req.body?.lastname,
                    firstname: req.body?.firstname,
                    email: req.body?.email,
                    address: req.body?.address,
                    state: req.body?.state,
                    city: req.body?.city,
                    password: req.body?.password,
                    username: req.body?.username



                },
            }
        )
            .then(async (result) => {


                return res.status(200).json({
                    message: "Updated Successfully",
                    status: "1",
                });
            })
            .catch((error) => {
                console.log("error", error);
                return res.status(400).json({
                    message: "Updating failed",
                    status: "0",
                });
            });








    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });

    }
};
const getsingleinvestorprofile = async (req, res) => {

    try {

        const userdata = await User.findOne({
            _id: req.query.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
         
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
        }
        const updateuser = {

            profile_image: ProfilePhotosurl + userdata?.profile_image,
            ...userdata?._doc

        }


        return res.status(200).json({
            updateuser,
            status: "1",
        });






    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });

    }
};
module.exports = { registerinvestor, investorprofileupt, getsingleinvestorprofile };




