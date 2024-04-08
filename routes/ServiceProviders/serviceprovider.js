const { default: mongoose } = require("mongoose");
const db = require("../../db");
let User = db.User
let Roles = db.Roles
let TrustPoints = db.TrustPoints
let Category = db.Category
let ServiceProvider = db.ServiceProvider
let ServicesSP = db.ServicesSP
const registerserviceprovider = async (req, res) => {

    try {

        var ServiceProviderRoleID = await db.Roles.findOne({ role_name: "ServiceProvider" });
        let ruleid = ServiceProviderRoleID?.id
        if (!ServiceProviderRoleID) {
            const InfluncerData = new Roles({
                role_name: "ServiceProvider"


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
        if ( !req.body.starting_price) {
            return res.status(200).json({ message: "starting_price is required", status: "0", });
        } 
        if (userdata) {
            return res.status(200).json({ message: "User with same email already exist", status: "0", });
        }
            let UserData
            if (req.body.login_method == "Google") {
                UserData = new User({
                    email: req.body.email,
                    login_method: 'Google',
                    social_name: req.body.social_name,
                    phonenum: req.body.phonenum,
                    whatsappnum: req.body.whatsappnum,
                    pcountry_code: req.body.pcountry_code,
                    wcountry_code: req.body.wcountry_code,
                    social_id: req.body.social_id,
                    role: ruleid,

                });
            } else {
                UserData = new User({
                    email: req.body.email,
                    login_method: 'Custom',
                    password: req.body.password,
                    phonenum: req.body.phonenum,
                    whatsappnum: req.body.whatsappnum,
                    role: ruleid,
                    country_code: req.body.country_code,
                    username: req.body.name,

                })
            }
            await UserData.save()
                .then(async result => {
                    console.log("result", result);
                    let userid = result._id
                    const ServiceProviderData = new ServiceProvider({
                        company_name: req.body.company_name,
                        name: req.body.name,
                        user_id: userid,
                        professional_type: req.body.professional_type,
                        starting_price: req.body.starting_price,
                        experience: req.body.experience,
                        country: req.body.country,
                        state: req.body.state,
                        city: req.body.city,
                        worldwide: req.body.worldwide ? req.body.worldwide : false,
                        region: req.body.region ? req.body.region : false,

                        website_url: req.body.website_url,

                    });
                    await ServiceProviderData.save().then(async result => {
                        console.log("result", result);



                        const TrustPointsData = new TrustPoints({
                            email_verified: true,
                            phone_verified: true,
                            //    whatsapp_verified: true,
                            user_id: userid,
                            totalpoints: 20,

                        });

                        await db.TrustPoints.create(TrustPointsData)
                            .then(result => {
                                console.log("result", result);
                            })
                            .catch(error => {
                                console.log("error", error);

                            });


                        return res.status(200).json({
                            message: "Registered Successfully", user_id: userid,
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

                })
                .catch(error => {
                    console.log("error", error);
                    return res.status(200).json({
                        message: "Registered failed",
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

// to add providers categories 
const serviceproviderforms = async (req, res) => {

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
        if (typeof req.body?.language == "string") {

            var languagesparse = JSON.parse(req.body?.language);
        } else {
            var languagesparse = req.body?.language;
        }
        const updateuserprofile = await User.updateOne(
            {
                _id: req.body.user_id
            },
            {
                $set: {
                    language: languagesparse,
                    title: req.body?.title,

                    description: req.body?.description
                }
            }
        )
        const updateuser = await ServiceProvider.updateOne(
            {
                user_id: req.body.user_id,
            },
            {
                $push: {
                    categories: req.body.categories,
                    skills: req.body.skills,
                },
            }
        )
            .then((result) => {


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


const addservicesofprovider = async (req, res) => {

    try {
        if (!req.body?.user_id && req.body?.user_id == null && req.body?.user_id == undefined && req.body?.user_id == "null" && req.body?.user_id == "undefined") {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const getuserdata = await User.findOne({
            _id: req.body.user_id
        });
        if (!getuserdata) {
            return res.status(400).json({
                message: "No user found",
                status: "1",
            });
        }
        let servicesid = []

        let userdata =
            typeof req.body.services == "string"
                ? JSON.parse(req.body.services)
                : req.body.services;
        for (const [index, data] of userdata.entries()) {
            let image_name = "";
            //console.log("iles.requisition_image[index].filename",files.requisition_image[index])
            if (typeof req.files?.image != "undefined") {
                image_name = req.files?.image[index]?.filename;
            }
            console.log("dasdasdasdasd", image_name);



            const ServiceProviderData = new ServicesSP({
                image: image_name,
                title: data?.title,
                user_id: req.body.user_id,
                duration: data.duration,
                starting_price: data.starting_price,
                description: data?.description,
                subcategory: data?.subcategory,
                category: data?.category,
                skills: data?.skills,
            });
            await ServiceProviderData.save().then(async result => {
                console.log("result", result);
                servicesid.push(result?._id)

                const updateCategory = await Category.updateOne(
                    {
                        _id: data?.category,
                    },
                    {
                        $push: {
                            services: result?._id,

                        },
                    }
                )
            })
                .catch(error => {
                    console.log("error", error);

                });
        }


        const updateuser = await ServiceProvider.updateOne(
            {
                user_id: req.body.user_id,
            },
            {
                $push: {
                    services: { $each: servicesid },

                },
            }
        )



        return res.status(200).json({
            message: "Services add Successfully",
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

module.exports = { registerserviceprovider, serviceproviderforms, addservicesofprovider };
