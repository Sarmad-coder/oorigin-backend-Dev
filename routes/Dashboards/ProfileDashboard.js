const { default: mongoose } = require("mongoose");
const db = require("../../db");
let User = db.User
let REVIEW = db.REVIEW
const config = require("./../../config.json");
let ServiceProvider = db.ServiceProvider
let TrustPoints = db.TrustPoints
let ServicesSP = db.ServicesSP
let FAQs = db.FAQs
const bcrypt = require('bcrypt');
// to add providers categories 
const userprofileedit = async (req, res) => {

    try {
        if (!req.body.user_id ) {
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

        if (req.body?.phonenum) {

            const phonenum = await User.findOne({
                phonenum: req.body?.phonenum, _id: { $ne: req.body.user_id }
            });
            if (phonenum) {
                return res.status(200).json({
                    message: "User with same number already exist",
                    status: "0",
                });
            }
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
        if (req.body?.whatsappnum) {
            const whtsappnum = await User.findOne({
                whatsappnum: req.body?.whatsappnum,
                _id: { $ne: req.body.user_id }
            });
            if (whtsappnum) {
                return res.status(200).json({
                    message: "User with same Whatsapp Number already exist",
                    status: "0",
                });
            }
        }
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
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

        if (typeof  req.body?.language == "string") {

            var languagesparse = JSON.parse( req.body?.language);
        } else {
           var languagesparse =  req.body?.language;
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
                    country: req.body?.country,
                    city: req.body?.city,
                    username: req.body?.username,
                    language: languagesparse,
                    time_zone: req.body?.time_zone,
                    pcountry_code: req.body?.pcountry_code,
                    wcountry_code: req.body?.wcountry_code,
                    whatsappnum: req.body?.whatsappnum,
                    phonenum: req.body?.phonenum,
                    description: req.body?.description,

                    email: req.body?.email,
                },
            }
        )
            .then(async (result) => {
                console.log(result)
                const serviceproviderdata = await ServiceProvider.findOne({
                    user_id: req.body.user_id
                });
                const updateuser = await ServiceProvider.updateOne(
                    {
                        _id: serviceproviderdata?.id,
                    },
                    {
                        $set: {


                            facebook: req.body?.facebook,
                            linkedin: req.body?.linkedin,
                            fb_verified: req.body?.fb_verified,
                            linkedin_verified: req.body?.linkedin_verified


                        },
                    }
                )
                if (req.body?.fb_verified==true || req.body?.linkedin_verified==true) {

                    const TrustPointsdata = await TrustPoints.findOne({
                        user_id: req.body.user_id
                    });
                    if (TrustPointsdata) {
                        let linkedin_points = req.body?.linkedin_verified == true ? 10 : 0
                        let fb_points = req.body?.fb_verified == true ? 10 : 0
                        let totalpointss = Number(linkedin_points) + Number(fb_points)
                        const TrustPointsdt = await TrustPoints.updateOne({
                            _id: TrustPointsdata?.id
                        }, {
                            $set: {
                                totalpoints: totalpointss + Number(TrustPointsdata?.totalpoints)<=40?totalpointss + Number(TrustPointsdata?.totalpoints):40,
                                linkedin_verified: req.body?.linkedin_verified,
                                fb_verified: req.body?.fb_verified,

                            }
                        }).then(result => {
                            console.log("result", result);
                        })
                            .catch(error => {
                                console.log("error", error);

                            });
                    }

                }

                return res.status(200).json({
                    message: "Updated Successfully",   profile_image_url: ProfilePhotosurl +imagedata,
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
const getsingleuserprofile = async (req, res) => {

    try {
        if (!req.query.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await User.findOne({
            _id: req.query.user_id
        }, { password: 0 });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }
        console.log(__dirname);
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
        }
        const updateuser = {
            profile_image: userdata?.profile_image,
            profile_image_url: ProfilePhotosurl + userdata?.profile_image,
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
//
const generalsetting = async (req, res) => {

    try {

        const userdata = await User.findOne({
            _id: req.body.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }

        // if (req.body?.phonenum) {

        //     const phonenum = await User.findOne({
        //         phonenum: req.body?.phonenum, _id: { $ne: req.body.user_id }
        //     });
        //     if (phonenum) {
        //         return res.status(200).json({
        //             message: "User with same number already exist",
        //             status: "0",
        //         });
        //     }
        // }
        // if (req.body?.email) {
        //     const phonenum = await User.findOne({
        //         email: req.body?.email, _id: { $ne: req.body.user_id }
        //     });
        //     if (phonenum) {
        //         return res.status(200).json({
        //             message: "User with same email already exist",
        //             status: "0",
        //         });
        //     }
        // }


        const updateuser = await User.updateOne(
            {
                _id: req.body.user_id,
            },
            {
                $set: {
                   // password: req.body?.password ? req.body?.password : userdata?.password,
                    two_fa: req.body?.two_fa
                  //  country_code: req.body?.country_code ? req.body?.country_code : userdata?.country_code,
                  //  phonenum: req.body?.phonenum ? req.body?.phonenum : userdata?.phonenum,
                    //email: req.body?.email ? req.body?.email : userdata?.email,
                },
            }
        )
            .then(async (result) => {
                console.log(result)


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
const changepassword = async (req, res) => { 

    try {

        const userdata = await User.findOne({
            _id: req.body.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }
        if (!req.body.oldpassword) {
            return res.status(400).json({
                message: "Please provide Previous password",
                status: "0",
            });
        }
        const passwordMatch = await bcrypt.compare(req.body.oldpassword, userdata.password);

        if (!passwordMatch) {
            
                return res.status(400).json({
                    message: "Previous Password does not match",
                    status: "0",
                });
            
        }
        const newpassword = await bcrypt.hashSync(req.body.newpassword, 10);


        const updateuser = await User.updateOne(
            {
                _id: req.body.user_id,
            },
            {
                $set: {
                    password:newpassword 
                },
            }
        )
            .then(async (result) => {
                console.log(result)


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
const trustpointsaddapi = async (req, res) => {

    try {

        const userdata = await User.findOne({
            _id: req.body.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        } const TrustPointsdata = await TrustPoints.findOne({
            user_id: req.body.user_id
        });


        if (req.body?.fb_verified && req.body?.linkedin_verified) {


            let linkedin_points = TrustPointsdata?.linkedin_verified == true ? 10 : 0
            let fb_points = TrustPointsdata?.fb_verified == true ? 10 : 0
            let totalpointss = Number(linkedin_points) + Number(fb_points)
            const TrustPointsdt = await TrustPoints.updateOne({
                _id: TrustPointsdata?.id
            }, {
                $set: {
                    totalpoints: totalpointss + Number(TrustPointsdata?.totalpoints) <= 50 ? totalpointss + Number(TrustPointsdata?.totalpoints) : TrustPointsdata?.totalpoints,
                    linkedin_verified: true,
                    fb_verified: true,

                }
            }).then(result => {
                return res.status(200).json({
                    message: "Updated Successfully",
                    status: "1",
                });
            })
                .catch(error => {
                    return res.status(400).json({
                        message: "Updating failed",
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
const userreviewsdata = async (req, res) => {

    try {
        if (!req.query.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await User.findOne({
            _id: req.query.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "1",
            });
        }
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
        }
      //  const userReviews = await REVIEW.find({ user_id: req.query.user_id })
      let userId =  new mongoose.Types.ObjectId(req.query.user_id)
        const userReviews = await REVIEW.aggregate([
            { $match: { user_id: { $eq: userId } } },
            {
              $lookup: {
                from: 'reviewFromCollection', // Name of the collection containing review_from data
                localField: 'review_from', // Field in the Review collection representing review_from ID
                foreignField: '_id', // Field in the reviewFromCollection collection
                as: 'reviewFromData' // Populate the 'reviewFromData' field
              }
            },
            {
              $unwind: {
                path: '$reviewFromData',
                preserveNullAndEmptyArrays: true // Preserve documents without a matching review_from data
              }
            },
            {
              $lookup: {
                from: 'users', // Name of the User collection
                localField: 'user_id', // Field in the Review collection representing user ID
                foreignField: '_id', // Field in the User collection
                as: 'user' // Populate the 'user' field
              }
            },
            {
              $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true // Preserve documents without a matching user
              }
            },
            {
              $project: {
                _id: 1,
                rating: 1,
                review_from: '$reviewFromData', // Replace review_from with populated data
                review: 1,
                review_reply: 1,
                status: 1,
                'user._id': 1,
                'user.profile_image': 1,
                'user.title': 1,
                'user.username': 1
              }
            }
          ]);
          let userreview = []
          for (const dataa of userReviews) {
        
            userreview.push({
                id: dataa?._id,
                review: dataa?.review,
                rating: dataa?.rating,
                review_from: dataa?.user?.username,
                review_reply: dataa?.review_reply,
                title: dataa?.user?.title,
                image: ProfilePhotosurl + dataa?.user?.profile_image
            })
        }

        return res.status(200).json({
            data: userreview,
            message: "Reviews Fetch Successfully",
            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fetch error", error,
            status: "0",
        });

    }
};
// crud of services 
const getservicesofsingleprovider = async (req, res) => {

    try {
        if (!req.body.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }
        const limit = 10;
        if (req.body.page) {
            var page = req.body.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        const servicesdata = await ServicesSP.find({ user_id: req.body.user_id }).populate({
            path: 'category',
            select: 'title _id'
        }).populate({
            path: 'subcategory',
            select: 'title _id'
        }).populate({
            path: 'skills',
            select: 'title _id'
        }).sort({ created_at: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
        let servicessdata = []
        for (const dt of servicesdata) {
            servicessdata.push({
                image: dt?.image,
                image_url: ProfilePhotosurl + dt?.image,
                ...dt?._doc

            })
        }
        const countdata = await ServicesSP.countDocuments({ user_id: req.body.user_id });

        return res.status(200).json({
            data: servicessdata,
            limit: limit,
            count: countdata,
            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fetch error", error,
            status: "0",
        });

    }
};
const updateserviceofprovider = async (req, res) => {

    try {
        if (typeof req?.files?.image != "undefined") {
            var coverImg = "";

            for (var j = 0; j < req.files.image.length; j++) {
                var image_name = req.files.image[j].filename;
                coverImg += image_name + ",";
                var imagedata = coverImg.replace(/,\s*$/, "");
            }
        } else {
            var imagedata = req.body.image;
        }
        let servicess = req.body.services
        if (typeof servicess == "string") {


            var servicessparse = JSON.parse(servicess);
        } else {
           var servicessparse = servicess;
        }
        const servicesdata = await ServicesSP.findOne({ _id: req.body.id })
        if (!servicesdata) {
            return res.status(400).json({
                message: "No service found",
                status: "0",
            });
        }
        const servicesupd = await ServicesSP.updateOne({ _id: req.body.id },
            {
                $set: {
                    image: imagedata,
                    title: servicessparse?.title,
                  
                    category: servicessparse.category,
                    duration: servicessparse.duration,
                    starting_price: servicessparse.starting_price,
                    description: servicessparse?.description, 
                     subcategory: servicessparse?.subcategory,
                    skills: servicessparse?.skills,
                }
            }, 
        )

        return res.status(200).json({
            message: "Updated Successfully",

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error", error,
            status: "0",
        });

    }
};
const statuschangeservice = async (req, res) => {

    try {
      
        const servicesdata = await ServicesSP.findOne({ _id: req.body.id })
        if (!servicesdata) {
            return res.status(400).json({
                message: "No service found",
                status: "0",
            });
        }
        const servicesupd = await ServicesSP.updateOne({ _id: req.body.id },
            {
                $set: {
                    
                    status: req.body?.status,
                   
                }
            }, 
        )

        return res.status(200).json({
            message: "Status changed Successfully",

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error", error,
            status: "0",
        });

    }
};
const getsingleservicebyid = async (req, res) => {

    try {
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {
           
            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }

        const servicesdata = await ServicesSP.findOne({ _id: req.body.id }).populate({
            path: 'category',
            select: 'title _id'
        }).populate({
            path: 'subcategory',
            select: 'title _id'
        }).populate({
            path: 'skills',
            select: 'title _id'
        })
        let servicessdata = {
            image: servicesdata?.image,
            image_url: ProfilePhotosurl + servicesdata?.image,
            ...servicesdata?._doc

        }



        return res.status(200).json({
            data: servicessdata,

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fetch error", error,
            status: "0",
        });

    }
};
const deleteservice = async (req, res) => {

    try {
        
       
        const servicesdata = await ServicesSP.findOne({ _id: req.body.id })
        if (!servicesdata) {
            return res.status(400).json({
                message: "No service found",
                status: "0",
            });
        }
        const servicesupd = await ServicesSP.findByIdAndDelete(req.body.id 
          
        )

        return res.status(200).json({
            message: "deleted Successfully",

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error", error,
            status: "0",
        });

    }
};
const getgeneralsetting = async (req, res) => {

    try {
        if (!req.query.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await User.findOne({
            _id: req.query.user_id
        }).select('two_fa')
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }
      return res.status(200).json({
            userdata,
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
const gettrustpoints = async (req, res) => {

    try {
        if (!req.query.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await TrustPoints.findOne({
            user_id: req.query.user_id
        })
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "0",
            });
        }
      return res.status(200).json({
            userdata,
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
//count api of single user
const servicescountbyid = async (req, res) => {

    try {
        

        const servicesdata = await ServicesSP.countDocuments({ user_id: req.query.user_id })
        



        return res.status(200).json({
            count: servicesdata,

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fetch error", error,
            status: "0",
        });

    }
};
const faqscountbyid = async (req, res) => {

    try {
        
        const data = await FAQs.countDocuments({ user_id: req.query.user_id })
        



        return res.status(200).json({
            count: data,

            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fetch error", error,
            status: "0",
        });

    }
};
module.exports = {userreviewsdata,faqscountbyid,statuschangeservice,changepassword,servicescountbyid,getgeneralsetting,gettrustpoints, userprofileedit, getsingleservicebyid,deleteservice, getsingleuserprofile, getservicesofsingleprovider, updateserviceofprovider, generalsetting, trustpointsaddapi };
