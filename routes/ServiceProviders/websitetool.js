const db = require("../../db");
let User = db.User
let Roles = db.Roles
let WebsiteTool = db.WebsiteTool
const registerwebsitetools = async (req, res) => {

    try {

        var WebsiteToolRoleID = await db.Roles.findOne({ role_name: "WebsiteTool" });
        let ruleid=WebsiteToolRoleID?.id
        if(!WebsiteToolRoleID){
            const InfluncerData = new Roles({
                role_name: "WebsiteTool"
                
               
            });
            await InfluncerData.save().then(async result => {
                console.log("result", result);
              ruleid= result?.id
            })
            .catch(error => {
                console.log("error", error);
              
            });
        }
        const userdata = await User.findOne({
            email: req.body.email
        });

        if (userdata) {
            return res.status(200).json({ message: "User with same email already exist", status: "0", });
        } else {
            let UserData
            if (req.body.login_method == "Google") {
                 UserData = new User({
                    email: req.body.email,
                    login_method: 'Google',
                    social_name: req.body.social_name,
                    phonenum: req.body.phonenum,
                    whatsappnum: req.body.whatsappnum,
                    social_id: req.body.social_id,
                    role: ruleid,country_code: req.body.country_code,

                });}else{
                    UserData = new User({
                        email: req.body.email,
                        login_method: 'Custom',
                        password: req.body.password,
                        phonenum: req.body.phonenum,
                        whatsappnum: req.body.whatsappnum,
                        role: ruleid,country_code: req.body.country_code,

                     })
                }
                await UserData.save()
                    .then(async result => {
                        console.log("result", result);
                        let user_id =result._id 
                        const WebsiteToolData = new WebsiteTool({
                            country: req.body.country,
                            name: req.body.name,
                            user_id: result._id,
                            city: req.body.city,
                            language: req.body.language,
                            designation: req.body.designation,
                           
                            website_name: req.body.website_name,
                            website_url: req.body.website_url,
                            website_pricing: req.body.website_pricing,
                            website_categories: req.body.website_categories,
                            website_age: req.body.website_age,
                            website_description: req.body.website_description,
                            website_title: req.body.website_title,
                            website_logo: req.body.website_logo,
                           
                        });
                        await WebsiteToolData.save().then(async result => {
                            console.log("result", result);
                            return res.status(200).json({
                                message: "Registered Successfully",
                                status: "1",user_id:user_id,
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
            } 





        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });

    }
};

module.exports = {registerwebsitetools};
