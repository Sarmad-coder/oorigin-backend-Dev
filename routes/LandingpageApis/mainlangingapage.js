const moment = require("moment");
const db = require("../../db");
let Category = db.Category
let User = db.User
let REVIEW = db.REVIEW
let Offers = db.Offers
let Skills = db.Skills
let ServicesSP = db.ServicesSP
let SubCategory = db.SubCategory
let TrustPoints = db.TrustPoints
let SocialPlatforms = db.SocialPlatforms
let ServiceProvider = db.ServiceProvider
let FAQs = db.FAQs
const config = require("./../../config.json");
const { default: mongoose } = require("mongoose");
const landingpagecategories = async (req, res) => {
    try {
        console.log(__dirname)
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/categoryicons/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/categoryicons/";
        }
        const category = await Category.find({ status: 'Active', topcategory: true })
        let categories = []
        for (const data of category) {
            if (categories.length <= 8) {
                categories.push({
                    title: data?.title,
                    id: data?._id,
                    tagLine: data?.tagLine,
                    icon: ProfilePhotosurl + data?.icon,

                })
            }

        }
        return res.status(200).json({
            categories,
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

const allcategorieslandingpg = async (req, res) => {
    try {

        const limit = 36;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/categoryicons/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/categoryicons/";
        }
        const categoriesdata = await Category.find({ status: 'Active' }).sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();
        let categories = []
        for (const data of categoriesdata) {

            categories.push({
                title: data?.title,
                id: data?._id,
                tagLine: data?.tagLine,
                icon: ProfilePhotosurl + data?.icon,

            })


        }
        // Get the total count of active categories
        const totalCount = await Category.countDocuments({ status: 'Active' });
        return res.status(200).json({
            totalCount: totalCount, limit: 36, categories,
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
}
const landingpageplatforms = async (req, res) => {
    try {
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/socialicons/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/socialicons/";
        }
        const category = await SocialPlatforms.find({ status: 'Active', topplatform: true })
        let socialplatforms = []
        for (const data of category) {
            if (socialplatforms.length <= 8) {
                socialplatforms.push({
                    title: data?.title,
                    tagLine: data?.tagLine,
                    icon: ProfilePhotosurl + data?.icon,

                })
            }

        }
        return res.status(200).json({
            socialplatforms,
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

///////////////Dynamic Landing page for each sub-category of Service providers/////////////////////////////////
const categorylandingpage = async (req, res) => {
    try {
        console.log(__dirname)
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/categoryicons/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/categoryicons/";
        }
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var categorycoverimg =
                process.env.BackendApi + "/api/uploads/categoriesimg/";
        } else {

            var categorycoverimg =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/categoriesimg/";
        }
        const data = await Category.findOne({ _id: req.query.id })
        let categorydata = {
            description1: data?.description1,
            description2: data?.description2,
            title: data?.title,
            tagLine: data?.tagLine,
            icon: ProfilePhotosurl + data?.icon,
            coverImg: categorycoverimg + data?.coverImg,

        }



        return res.status(200).json({
            categorydata,

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
// category users
const categoryusers = async (req, res) => {
    try {
        console.log(__dirname)
        const limit = 8;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
        }
        ;
        const providerdata = await ServiceProvider.find({
            categories: { $elemMatch: { category: req.query.id } }
        }).select('user_id').sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();
        console.log(providerdata);

        let allusers = []
        for (const data of providerdata) {
            const userdata = await User.findOne({
                _id: data?.user_id
            }).select('username avgrating title profile_image')
            let avgrate = 0
            let totalrate = 0
            // if (userdata?.reviews.length > 0) {
            //     for (const review of userdata?.reviews) {
            //         console.log(review)
            //         totalrate += +review.rating
            //     }


            // }
            // let totalreviews = userdata?.reviews?.length
            // avgrate = Number(totalrate / totalreviews)
            // console.log(avgrate)

            allusers.push({
                name: userdata?.username,
                average_rating: userdata?.avgrating ? userdata?.avgrating.toFixed(1) : 0,
                title: userdata?.title,
                profile_image: ProfilePhotosurl + userdata?.profile_image
            })
        }


        const countdata = await ServiceProvider.countDocuments({ categories: { $elemMatch: { category: req.query.id } } })
        let count = Number(countdata / limit) > 0 ? Math.round(countdata / limit) : 0
        return res.status(200).json({
            allusers, count: countdata,
            totalpages: count,
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
// reviews of users
const categoryreview = async (req, res) => {
    try {

        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/profileimages/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/profileimages/";
        }
        const providerdata = await ServiceProvider.find({
            categories: { $elemMatch: { category: req.query.id } }
        }).distinct('user_id')
        console.log(providerdata);


        const userdata = await REVIEW.aggregate([
            { $match: { user_id: { $in: providerdata } } }, // Filter reviews based on user IDs from providerdata
            { $sample: { size: 6 } }, // Randomly sample 6 documents from the Review collection
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
                    status: 1,
                    'user._id': 1,
                    'user.profile_image': 1,
                    'user.username': 1
                }
            }
        ]);

        let userreview = []
        for (const dataa of userdata) {
            console.log(dataa)
            userreview.push({
                id: dataa?.id,
                review: dataa?.review,
                rating: dataa?.rating,
                review_from: dataa?.user?.username,
                image: ProfilePhotosurl + dataa?.user?.profile_image
            })
        }

        return res.status(200).json({
            userreview,

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
const getallactiveoffers = async (req, res) => {
    try {
        const Offersdata = await Offers.find({ status: "Active" }).populate({
            path: 'services_id',
            select: 'title _id'
        }).populate({
            path: 'websitetool_product',
            select: 'title _id'
        }).populate({
            path: 'infuncer_product',
            select: 'title _id'
        })
        return res.status(200).json({
            Offersdata,
            message: "Offers fetched Successfully",
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


////////////Main Landing Page/////////
//popular categories
const popularcategories = async (req, res) => {
    try {
        console.log(__dirname)
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\LandingpageApis") {
            console.log("");
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/categoryicons/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/categoryicons/";
        }
        const category = await Category.find({ status: 'Active', popular_category: true })
        let categories = []
        for (const data of category) {
            if (categories.length < 4) {
                categories.push({
                    title: data?.title,
                    id: data?._id,
                    tagLine: data?.tagLine,
                    popular_category: data?.popular_category,
                    icon: ProfilePhotosurl + data?.icon,

                })
            }

        }
        return res.status(200).json({
            categories,
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
};//popular skills
const popularskills = async (req, res) => {
    try {
        console.log(__dirname)

        const category = await Skills.find({ status: 'Active', popular_skill: true })
        let Skillsdata = []
        for (const data of category) {
            if (Skillsdata.length < 4) {
                Skillsdata.push({
                    title: data?.title,
                    id: data?._id,
                    tagLine: data?.tagLine,
                    popular_skill: data?.popular_skill,


                })
            }

        }
        return res.status(200).json({
            Skillsdata,
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
//get faqs by type 
const getFaqsbytype = async (req, res) => {

    try {

        if (!req.query.type) {
            var userFaqs = await FAQs.find({ status: 'Active' }).sort({ createdAt: -1 }).limit(10)

        } else {

            var userFaqs = await FAQs.find({ type: req.query.type, status: 'Active' }).sort({ createdAt: -1 }).limit(10)


        }



        return res.status(200).json({
            data: userFaqs,

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
const categoprywiseservices = async (req, res) => {

    try {

        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }
        const limit = 6;
        if (req.body.page) {
            var page = req.body.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        let countrychk = req.body.country //names of country
        let language = req.body.language  // languages names
        let rating = req.body.rating      // 1 2 3 4 5
        let budget = req.body.budget     //[1000, 50000]
        let status = req.body.status       // Active,inactive
        let sort = req.body.sort
      ///   let categoriesarr = req.body.categories          // rating,followers,latest 

        
        let categoriesarr =
            typeof req.body.categories == "string"
                ? JSON.parse(req.body.categories)
                : req.body.categories;
        if (countrychk) {
            // var users = await User.distinct("_id", {
            //     country: {
            //         $regex: countrychk,
            //         $options: 'i'
            //     }, status: "Active"
            // })
            // var servicesdata = await ServicesSP.find({ user_id: { $in: users }, status: "Active" }).populate({
            //     path: 'category',
            //     select: 'title _id'
            // }).populate({
            //     path: 'user_id',
            //     select: 'country username avgrating phonenum'
            // });
            const query = {
                status: "Active"
            };

            if (categoriesarr?.length > 0) {
                const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
                query._id = { $in: categoriesIds };
            }
            console.log("Query Object:", query);
            
            // var servicesdata = await ServicesSP.aggregate([
            //     {
            //         $match: query
            //     },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "user_id",
            //             foreignField: "_id",
            //             as: "user"
            //         }
            //     },
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "category",
            //             foreignField: "_id",
            //             as: "category"
            //         }
            //     },
            //     {
            //         $match: {
            //             "category._id": { $exists: true, $ne: [] } // Filter out documents where category is empty
            //         }
            //     },
            //     {
            //         $unwind: "$category"
            //     },
            //     {
            //         $match: {
            //             "user.country": {
            //                 $regex: new RegExp(countrychk, "i")
            //             }
            //         }
            //     },
            //     {
            //         $project: {
            //             image: 1,
            //             _id: 1,
            //             title: 1,
            //             description: 1,
            //             user_id: 1,
            //             category: {
            //                 id: "$category._id",
            //                 title: "$category.title"
            //             },
            //             user_id: {
            //                 id: { $arrayElemAt: ["$user._id", 0] },
            //                 country: { $arrayElemAt: ["$user.country", 0] },
            //                 username: { $arrayElemAt: ["$user.username", 0] },
            //                 language: { $arrayElemAt: ["$user.language", 0] },
            //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
            //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
            //             }
            //         }
            //     }  
            // //     , { $skip:skipIndex},
            // //    // { $sort: { created_at: -1 } },
            // //     { $limit: limit },
            // ]);
            
            
           // const [result] = await Category.aggregate(aggregationPipeline);
var servicesDataResult = await Category.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "servicessps",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },{
                    $unwind: "$services"

                },
                {
                    $lookup: {
                        from: "users",
                        localField: "services.user_id",
                        foreignField: "_id",
                        as: "services.users"
                    }
                },
                // {
                //     $unwind: "$services.users"

                // },
                {
                    $match: {
                        "services.users.country": {
                            $regex: new RegExp(countrychk, "i")
                        },
                        "services.status":"Active",
                    }
                }, 
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" }, // Keep the title of the category
                        services: { $push: "$services" } // Collect all services for each category
                    }
                },
                {
                    $match: {
                        services: { $ne: [] } // Filter out categories with no services
                    }
                },
                {
                    $sort: { title: 1 } // Sort categories alphabetically by title
                },
                //{
                //     $skip: skipIndex // Skip the first 6 categories
                // },
                // {
                //     $limit: 6 // Get the first 6 categories
                // },
               
                {
                    $project: {
                        "services.image": 1,
                        "services._id": 1, "services.starting_price": 1,
                        "services.title": 1,
                        "services.description": 1,
                        "services.user_id": 1,
                        category: { _id: "$_id", title: "$title" },
                        "services.user_id": {
                            $let: {
                                vars: {
                                    firstUser: { $arrayElemAt: ["$services.users", 0] }
                                },
                                in: {
                                    id: { $arrayElemAt: ["$$firstUser._id", 0] },
                                    country: { $arrayElemAt: ["$$firstUser.country", 0] },
                                    username: { $arrayElemAt: ["$$firstUser.username", 0] },
                                    language: { $arrayElemAt: ["$$firstUser.language", 0] },
                                    phonenum: { $arrayElemAt: ["$$firstUser.phonenum", 0] },
                                    avgrating: {
                                        $toDouble: {
                                            $arrayElemAt: ["$$firstUser.avgrating", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, {
                    $addFields: {
                        services: { $slice: ["$services", 3] } // Limit to 3 services per category
                    }
                },
                {
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 6 }], // Limit and skip applied earlier for pagination
                        totalCount: [{ $count: "total" }] // Count the total number of documents
                    }
                }
                 
            ]);
            var totalCount = servicesDataResult[0].totalCount.length > 0 ? servicesDataResult[0].totalCount[0].total : 0;
var servicesdata = servicesDataResult[0].data;

            console.log(servicesdata);

        }
        else if (budget?.length > 0) {


            const query = {
                status: "Active"
               
            };

            if (categoriesarr?.length > 0) {
                const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
                query._id = { $in: categoriesIds };
            }
            // var servicesdata = await ServicesSP.find(query).populate({
            //     path: 'category',
            //     select: 'title _id'
            // }).populate({
            //     path: 'user_id',
            //     select: 'country username avgrating phonenum'
            // })
            // .sort({ createdAt: -1 })
            // .limit(limit).skip(skipIndex)
            // .exec();
         
            var servicesDataResult = await Category.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "servicessps",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },{
                    $unwind: "$services"

                },
                {
                    $lookup: {
                        from: "users",
                        localField: "services.user_id",
                        foreignField: "_id",
                        as: "services.users"
                    }
                },
                // {
                //     $unwind: "$services.users"

                // },
                {      $match: {
                    "services.starting_price": { $gte: budget[0], $lte: budget[1] },
                    "services.status":"Active",
                 
                }
            },
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" }, // Keep the title of the category
                        services: { $push: "$services" } // Collect all services for each category
                    }
                },
                {
                    $match: {
                        services: { $ne: [] } // Filter out categories with no services
                    }
                },
                {
                    $sort: { title: 1 } // Sort categories alphabetically by title
                },
                // {
                //     $skip: skipIndex // Skip the first 6 categories
                // },
                // {
                //     $limit: 6 // Get the first 6 categories
                // },
               
                {
                    $project: {
                        "services.image": 1,
                        "services._id": 1,
                        "services.title": 1,
                        "services.description": 1,
                        "services.starting_price": 1,
                        "services.user_id": 1,
                        category: { _id: "$_id", title: "$title" },
                        "services.user_id": {
                            $let: {
                                vars: {
                                    firstUser: { $arrayElemAt: ["$services.users", 0] }
                                },
                                in: {
                                    id: { $arrayElemAt: ["$$firstUser._id", 0] },
                                    country: { $arrayElemAt: ["$$firstUser.country", 0] },
                                    username: { $arrayElemAt: ["$$firstUser.username", 0] },
                                    language: { $arrayElemAt: ["$$firstUser.language", 0] },
                                    phonenum: { $arrayElemAt: ["$$firstUser.phonenum", 0] },
                                    avgrating: {
                                        $toDouble: {
                                            $arrayElemAt: ["$$firstUser.avgrating", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                    $addFields: {
                        services: { $slice: ["$services", 3] } // Limit to 3 services per category
                    }
                },{
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 6 }], // Limit and skip applied earlier for pagination
                        totalCount: [{ $count: "total" }] // Count the total number of documents
                    }
                }
                 
            ]);
            var totalCount = servicesDataResult[0].totalCount.length > 0 ? servicesDataResult[0].totalCount[0].total : 0;
            var servicesdata = servicesDataResult[0].data;
        }
        else if (rating) {
            const query = {
                status: "Active"
            };

            if (categoriesarr?.length > 0) {
                const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
                query._id = { $in: categoriesIds };
            }
           
            var servicesDataResult = await Category.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "servicessps",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },
                {
                    $unwind: "$services"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "services.user_id",
                        foreignField: "_id",
                        as: "services.users"
                    }
                },
                {       
                    $addFields: {
                        roundedAvgRating: { $round: [{ $avg: "$services.users.avgrating" }, 0] } // Calculate and round the average rating of the user
                    }
                },
                {
                    $match: {
                        roundedAvgRating: rating // Match documents with rounded average rating equal to the requested rating
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" }, // Keep the title of the category
                        services: { $push: "$services" } // Collect all services for each category
                    }
                },
                {
                    $match: {
                        services: { $ne: [] } // Filter out categories with no services
                    }
                },
                {
                    $sort: { title: 1 } // Sort categories alphabetically by title
                },
                // {
                //     $skip: skipIndex // Skip the first 6 categories
                // },
                // {
                //     $limit: 6 // Get the first 6 categories
                // },
                {
                    $project: {
                        "services.image": 1,
                        "services._id": 1,
                        "services.title": 1,
                        "services.description": 1,
                        "services.user_id": 1,
                        category: { _id: "$_id", title: "$title" },
                        "services.user_id": {
                            $let: {
                                vars: {
                                    firstUser: { $arrayElemAt: ["$services.users", 0] }
                                },
                                in: {
                                    id: { $arrayElemAt: ["$$firstUser._id", 0] },
                                    country: { $arrayElemAt: ["$$firstUser.country", 0] },
                                    username: { $arrayElemAt: ["$$firstUser.username", 0] },
                                    language: { $arrayElemAt: ["$$firstUser.language", 0] },
                                    phonenum: { $arrayElemAt: ["$$firstUser.phonenum", 0] },
                                    avgrating: {
                                        $toDouble: {
                                            $arrayElemAt: ["$$firstUser.avgrating", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                    $addFields: {
                        services: { $slice: ["$services", 3] } // Limit to 3 services per category
                    }
                },{
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 6 }], // Limit and skip applied earlier for pagination
                        totalCount: [{ $count: "total" }] // Count the total number of documents
                    }
                }
            ]);
            var totalCount = servicesDataResult[0].totalCount.length > 0 ? servicesDataResult[0].totalCount[0].total : 0;
            var servicesdata = servicesDataResult[0].data;
            // var servicesdata = await ServicesSP.aggregate([
            //     {
            //         $match: query
            //     },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "user_id",
            //             foreignField: "_id",
            //             as: "user"
            //         }
            //     }, {
            //         $lookup: {
            //             from: "categories",
            //             localField: "category",
            //             foreignField: "_id",
            //             as: "category"
            //         }
            //     },
            //     {
            //         $addFields: {
            //             roundedAvgRating: { $round: [{ $avg: "$user.avgrating" }, 0] } // Calculate and round the average rating of the user
            //         }
            //     },
            //     {
            //         $match: {
            //             roundedAvgRating: rating // Match documents with rounded average rating equal to the requested rating
            //         }
            //     }, {
            //         $project: {
            //             image: 1,
            //             title: 1,
            //             description: 1,
            //             user_id: 1,
            //             // Add other fields you want to select from the ServicesSP collection
            //             //  "": 1,
            //             // "user.username": 1,
            //             //   "category.title": 1,
            //             //   "category.id": 1,
            //             //"user.avgrating": 1, 
            //             category: {
            //                 id: { $arrayElemAt: ["$category._id", 0] }, // Include category ID
            //                 title: { $arrayElemAt: ["$category.title", 0] } // Include category title
            //             }, user_id: {
            //                 id: { $arrayElemAt: ["$user._id", 0] }, // Include category ID
            //                 country: { $arrayElemAt: ["$user.country", 0] }, // Include category ID
            //                 username: { $arrayElemAt: ["$user.username", 0] }, // Include category ID
            //                 language: { $arrayElemAt: ["$user.language", 0] }, // Include category ID
            //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] }, // Include category ID
            //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } } // Include category title
            //             },
            //             // Add other fields you want to select from the User collection
            //         }
            //     }
            //     //   , { $skip:skipIndex},
            //     // //   { $sort: { created_at: -1 } },
            //     //   { $limit: limit },
            // ]);

        }
        else if (language) {
         
            const query = {
                status: "Active"
            };

            if (categoriesarr?.length > 0) {
                const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
                query._id = { $in: categoriesIds };
            } 
            var servicesDataResult = await Category.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "servicessps",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },{
                    $unwind: "$services"

                },
                {
                    $lookup: {
                        from: "users",
                        localField: "services.user_id",
                        foreignField: "_id",
                        as: "services.users"
                    }
                },
                // {
                //     $unwind: "$services.users"

                // },
                {
                    $match: {
                        "services.users.language": {
                            $regex: new RegExp(language, "i")
                        },
                        "services.status":"Active",
                    }
                }, 
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" }, // Keep the title of the category
                        services: { $push: "$services" } // Collect all services for each category
                    }
                },
                {
                    $match: {
                        services: { $ne: [] } // Filter out categories with no services
                    }
                },
                {
                    $sort: { title: 1 } // Sort categories alphabetically by title
                },
                // {
                //     $skip: skipIndex // Skip the first 6 categories
                // },
                // {
                //     $limit: 6 // Get the first 6 categories
                // },
               
                {
                    $project: {
                        "services.image": 1,
                        "services._id": 1,
                        "services.title": 1,
                        "services.description": 1,
                        "services.user_id": 1, "services.starting_price": 1,
                        category: { _id: "$_id", title: "$title" },
                        "services.user_id": {
                            $let: {
                                vars: {
                                    firstUser: { $arrayElemAt: ["$services.users", 0] }
                                },
                                in: {
                                    id: { $arrayElemAt: ["$$firstUser._id", 0] },
                                    country: { $arrayElemAt: ["$$firstUser.country", 0] },
                                    username: { $arrayElemAt: ["$$firstUser.username", 0] },
                                    language: { $arrayElemAt: ["$$firstUser.language", 0] },
                                    phonenum: { $arrayElemAt: ["$$firstUser.phonenum", 0] },
                                    avgrating: {
                                        $toDouble: {
                                            $arrayElemAt: ["$$firstUser.avgrating", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                    $addFields: {
                        services: { $slice: ["$services", 3] } // Limit to 3 services per category
                    }
                },{
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 6 }], // Limit and skip applied earlier for pagination
                        totalCount: [{ $count: "total" }] // Count the total number of documents
                    }
                }
                 
            ]);
            var totalCount = servicesDataResult[0].totalCount.length > 0 ? servicesDataResult[0].totalCount[0].total : 0;
            var servicesdata = servicesDataResult[0].data;
            // var servicesdata = await ServicesSP.aggregate([
            //     {
            //         $match: query
            //     },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "user_id",
            //             foreignField: "_id",
            //             as: "user"
            //         }
            //     }, {
            //         $lookup: {
            //             from: "categories",
            //             localField: "category",
            //             foreignField: "_id",
            //             as: "category"
            //         }
            //     },
            //     {
            //         $match: {
            //             "user.language": {
            //                 $regex: new RegExp(language, "i")
            //             }
            //         }
            //     },

            //     {
            //         $project: {
            //             image: 1,
            //             title: 1,
            //             description: 1,
            //             user_id: 1,
            //             category: {
            //                 id: { $arrayElemAt: ["$category._id", 0] },
            //                 title: { $arrayElemAt: ["$category.title", 0] }
            //             },
            //             user_id: {
            //                 id: { $arrayElemAt: ["$user._id", 0] },
            //                 country: { $arrayElemAt: ["$user.country", 0] },
            //                 username: { $arrayElemAt: ["$user.username", 0] },
            //                 language: { $arrayElemAt: ["$user.language", 0] },
            //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
            //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
            //             }
            //         }
            //     }
            //     //     

            // ]);
           


            console.log(servicesdata);

        } else {
            const query = {
                status: "Active"
            };

            if (categoriesarr?.length > 0) {
                const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
                query._id = { $in: categoriesIds };
            }
            var servicesDataResult = await Category.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "servicessps",
                        localField: "services",
                        foreignField: "_id",
                        as: "services"
                    }
                },{
                    $unwind: "$services"

                },
                {
                    $lookup: {
                        from: "users",
                        localField: "services.user_id",
                        foreignField: "_id",
                        as: "services.users"
                    }
                },
                // {
                //     $unwind: "$services.users"

                // },
                
                {
                    $group: {
                        _id: "$_id",
                        title: { $first: "$title" }, // Keep the title of the category
                        services: { $push: "$services" } // Collect all services for each category
                    }
                },
                {
                    $match: {
                        services: { $ne: [] } // Filter out categories with no services
                    }
                },
                {
                    $sort: { title: 1 } // Sort categories alphabetically by title
                },
                // {
                //     $skip: skipIndex // Skip the first 6 categories
                // },
                // {
                //     $limit: 6 // Get the first 6 categories
                // },
               
                {
                    $project: {
                        "services.image": 1,
                        "services._id": 1, "services.starting_price": 1,
                        "services.title": 1,
                        "services.description": 1,
                        "services.user_id": 1,
                        category: { _id: "$_id", title: "$title" },
                        "services.user_id": {
                            $let: {
                                vars: {
                                    firstUser: { $arrayElemAt: ["$services.users", 0] }
                                },
                                in: {
                                    id: { $arrayElemAt: ["$$firstUser._id", 0] },
                                    country: { $arrayElemAt: ["$$firstUser.country", 0] },
                                    username: { $arrayElemAt: ["$$firstUser.username", 0] },
                                    language: { $arrayElemAt: ["$$firstUser.language", 0] },
                                    phonenum: { $arrayElemAt: ["$$firstUser.phonenum", 0] },
                                    avgrating: {
                                        $toDouble: {
                                            $arrayElemAt: ["$$firstUser.avgrating", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                    $addFields: {
                        services: { $slice: ["$services", 3] } // Limit to 3 services per category
                    }
                },{
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 6 }], // Limit and skip applied earlier for pagination
                        totalCount: [{ $count: "total" }] // Count the total number of documents
                    }
                }
                 
            ]);
            var totalCount = servicesDataResult[0].totalCount.length > 0 ? servicesDataResult[0].totalCount[0].total : 0;
            var servicesdata = servicesDataResult[0].data;
        }


        const categorizedData = {};

        // Iterate over servicesdata and organize data by category
        servicesdata.forEach(category => {
            // Skip if category or its services are null or empty
            if (!category || !category.services || category.services.length === 0) {
                return;
            }
        
            const categoryId = category.category._id?.toString();
        
            // Initialize the category in categorizedData if not already present
            if (!categorizedData[categoryId]) {
                categorizedData[categoryId] = {
                    category: { _id: categoryId, title: category.category.title }, // Include the category title
                    services: []
                };
            }
        
            // Sort services by rating in descending order
            if(sort == "Latest"){
                category.services.sort((a, b) => b.createdAt - a.createdAt);

            }else{

                category.services.sort((a, b) => b.user_id.avgrating - a.user_id.avgrating);
            }
        
            // Push up to three services (or all if less than three) into categorizedData
            for (let i = 0; i < 3; i++) {
                if (category.services[i]) {
                    const service = category.services[i];
                    categorizedData[categoryId].services.push({
                        image: service.image,
                        title: service.title,
                        description: service.description,
                        service_id: service._id,
                        starting_price: service.starting_price,
                        duration: service.duration,
                        country: service?.user_id?.country,
                        avgrating: service?.user_id?.avgrating,
                        username: service?.user_id?.username,
                        phonenum: service?.user_id?.phonenum,
                        language: service?.user_id?.language,
                        user_id: service?.user_id?.id,
                        createdAt: service?.createdAt,
                        image_url: ProfilePhotosurl + service.image,
                        // ...service._doc
                    });
                } else {
                    break; // If there are no more services available, exit the loop
                }
            }
        });
        
        // Sorting based on 'sort' criteria
        if (sort === "Latest") {
            // Sort services within each category by creation date in descending order
            for (const categoryId in categorizedData) {
                categorizedData[categoryId].services.sort((a, b) => b.createdAt - a.createdAt);
            }
        } else {
            // Sort services within each category by user's average rating in descending order
            for (const categoryId in categorizedData) {
                categorizedData[categoryId].services.sort((a, b) => b.avgrating - a.avgrating);
            }
        }
        
        console.log(categorizedData);
        
        // Convert categorizedData into an array
        const servicesByCategory = Object.values(categorizedData);
        
       
        
      
       
        return res.status(200).json({
            
            data: servicesByCategory,
            limit: limit,
            count: totalCount,
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
////////////service provider services listing landing page/////////
const servicescategorylandingpg = async (req, res) => {
    try {

        const limit = 36;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        
        const skipIndex = (page - 1) * limit;
        const allcategories = await Category.find({ status: 'Active' })
            .select('title _id')
            .sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();

        // Get the total count of active subcategories
        const totalCount = await Category.countDocuments({ status: 'Active' });
        return res.status(200).json({
            totalCount: totalCount, limit: 36, allcategories,

            status: "1",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
            status: "0",
        });
    }
}
const categoryservicesfilter = async (req, res) => {

    try {

        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }
        let categoriesarr = req.body.categories
        const servicesdata = await ServicesSP.find({ category: { $in: categoriesarr }, status: "Active" }).populate({
            path: 'category',
            select: 'title _id'
        }).populate({
            path: 'user_id',
            select: 'country username avgrating phonenum'
        });

        const categorizedData = {};

        // Iterate over servicesdata and organize data by category
        servicesdata.forEach(dt => {
            if (!dt?.category) {
                // Skip if category is null
                return;
            }

            const categoryId = dt?.category?._id.toString();

            if (!categorizedData[categoryId]) {
                // If the category is not already in the categorizedData, initialize it
                categorizedData[categoryId] = {
                    category: dt.category,
                    services: []
                };
            }

            // Push service data into the corresponding category
            categorizedData[categoryId].services.push({
                image: dt.image,
                title: dt.title,
                description: dt.description,
                starting_price: dt.starting_price,
                duration: dt.duration,
                country: dt?.user_id?.country,
                avgrating: dt?.user_id?.avgrating,
                username: dt?.user_id?.username,
                phonenum: dt?.user_id?.phonenum,
                image_url: ProfilePhotosurl + dt.image,
                // ...dt._doc
            });
        });

        // Sort services within each category by user's average rating in descending order
        for (const categoryId in categorizedData) {
            categorizedData[categoryId].services.sort((a, b) => b.user_id?.avgrating - a.user_id?.avgrating);

            // Select the top three services with the highest average ratings
            categorizedData[categoryId].services = categorizedData[categoryId].services.slice(0, 3);
        }

        console.log(categorizedData);


        // Convert categorizedData into an array
        const servicesByCategory = Object.values(categorizedData);

        return res.status(200).json({
            data: servicesByCategory,
            // limit: limit,
            // count: countdata,
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
const getservicesonloadmore = async (req, res) => {

    try {
        if (!req.query.category_id) {
            return res.status(400).json({
                message: "category_id required ",
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
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        const servicesdata = await ServicesSP.find({ category: req.query.category_id, status: 'Active' }).populate({
            path: 'category',
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
        const countdata = await ServicesSP.countDocuments({ category: req.query.category_id, status: 'Active' });

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
const searchservices = async (req, res) => {

    try {

        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }
        const limit = 10;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        var Searchkey = req.body.search;
        let rgx = new RegExp(Searchkey, 'i');

        console.log('Search Regex:', rgx);
        const servicesdata = await ServicesSP.find({ title: rgx }).populate({
            path: 'category',
            select: 'title _id'
        }).sort({ created_at: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
        let servicessdata = []
        for (const dt of servicesdata) {
            servicessdata.push({
                starting_price: dt?.starting_price,
                title: dt?.title,
                duration: dt?.duration,
                description: dt?.description,
                image: dt?.image,
                id: dt?.id,
                image_url: ProfilePhotosurl + dt?.image,


            })
        }
        const countdata = await ServicesSP.countDocuments({ title: rgx });

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
}
const servicesbysubcategory = async (req, res) => {

    try {

        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }
        const limit = 10;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        var subcategories = req.body.subcategories;

        const servicesdata = await ServicesSP.find({ subcategory: { $in: subcategories } }).populate({
            path: 'category',
            select: 'title _id'
        }).sort({ created_at: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
        let servicessdata = []
        for (const dt of servicesdata) {
            servicessdata.push({
                starting_price: dt?.starting_price,
                title: dt?.title,
                duration: dt?.duration,
                description: dt?.description,
                image: dt?.image,
                id: dt?.id,
                image_url: ProfilePhotosurl + dt?.image,


            })
        }
        const countdata = await ServicesSP.countDocuments({ subcategory: { $in: subcategories } });

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

////////////service provider single services detail landing page/////////
const servicesproviderdetaildata = async (req, res) => {

    try {
        if (!req.query.user_id) {
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


        // const servicesdata = await ServicesSP.findOne({ _id: req.query.service_id }).populate({
        //     path: 'category',
        //     select: 'title _id'
        // }).populate({
        //     path: 'user_id',
        //     //select: 'title _id'
        // }).populate({
        //     path: 'skills',
        //     select: 'title _id'
        // })
        const providerdata = await ServiceProvider.findOne({ user_id: req.query?.user_id }).populate({
            path: 'categories',
            populate: {
                path: 'category subcategory',
                select: 'title _id'
            }
        })
            .populate({
                path: 'skills',
                select: 'title _id'
            }).populate({
                path: 'user_id',
                select: 'title _id description username phonenum whatsappnum language time_zone country avgrating reviews'
            })
            const usertrustdata = await TrustPoints.findOne({
                user_id: req.query.user_id
            })
        // // Calculate the total  years of service
        // Given date
        const givenDate = moment(providerdata?.createdAt);
        // Today's date
        const today = moment();
        // Calculate the difference in years
        let yearsDiff = today.diff(givenDate, 'years');
        // if (yearsDiff <= 0) {
        //     yearsDiff = 1;
        // }
        console.log(yearsDiff)
        let servicessdata = {
            title: providerdata?.user_id?.title,
            username: providerdata?.user_id?.username,
            avgrating: providerdata?.user_id?.avgrating,
            reviews: providerdata?.user_id?.reviews?.length,
            description: providerdata?.user_id?.description,
            professional_type: providerdata?.professional_type,
            starting_price: providerdata?.starting_price,
            in_expereince: yearsDiff,
            language: providerdata?.user_id?.language,

            categories: providerdata?.categories,
            duration: providerdata?.duration,
            phonenum: providerdata?.user_id?.phonenum,
            whatsappnum: providerdata?.user_id?.whatsappnum,
            time_zone: providerdata?.user_id?.time_zone,
            country: providerdata?.user_id?.country,
            skills: providerdata?.skills,
            image: providerdata?.image,
            image_url: ProfilePhotosurl + providerdata?.image,
            website_url: providerdata?.website_url,
           
           
            company_name: providerdata?.company_name,
            fb_verified: usertrustdata?.fb_verified,
            linkedin_verified: usertrustdata?.linkedin_verified,
            phone_verified: usertrustdata?.phone_verified,
            email_verfied: usertrustdata?.email_verfied,
           
            

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
const getsimilarservices = async (req, res) => {

    try {
        const limit = 3;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (!req.query.user_id) {
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


       
        const servicess = await ServicesSP.distinct('category', { user_id: req.query.user_id })
        const similarservicess = await ServicesSP.find({ category: servicess }).select('image title user_id description category starting_price duration').sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();
        let similarservices = []
        for (const dt of similarservicess) {
            similarservices.push({
                image: dt?.image,
                image_url: ProfilePhotosurl + dt?.image,
                ...dt?._doc

            })
        }



        const countdata = await ServicesSP.countDocuments({ category: servicess });

        return res.status(200).json({
            similar_services: similarservices,
            totalCount: countdata, limit: limit,
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
const getservicesfaqs = async (req, res) => {

    try {
        const limit = 5;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (!req.query.user_id) {
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

        const countdata = await FAQs.countDocuments({ user_id: req.query?.user_id , type: 'ServiceProvider', status: 'Active' });

        const FAQsdata = await FAQs.find({ user_id: req.query?.user_id , type: 'ServiceProvider', status: 'Active' }).sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();



        return res.status(200).json({

            FAQsdata: FAQsdata,
            totalCount: countdata, limit: limit,
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
const getproviderOffers = async (req, res) => {

    try {
        const limit = 5;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (!req.query.user_id) {
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

        const countdata = await Offers.countDocuments({ user_id: req.query?.user_id , type: 'ServiceProvider', status: 'Active' });

        const Offersdata = await Offers.find({ user_id: req.query?.user_id , type: 'ServiceProvider', status: 'Active' }).sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();



        return res.status(200).json({

            FAQsdata: Offersdata,
            totalCount: countdata, limit: limit,
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
const providermoreservices = async (req, res) => {

    try {
        if (!req.query.user_id) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        } const limit = 3;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }

        const providerservices = await ServicesSP.find({ user_id: req.query?.user_id , status: 'Active' }).sort({ createdAt: -1 })
            .limit(limit).skip(skipIndex)
            .exec();
        let servicesdata = []
        for (const dt of providerservices) {
            servicesdata.push({
                image: dt?.image,
                image_url: ProfilePhotosurl + dt?.image,
                ...dt?._doc

            })
        }

        const countdata = await ServicesSP.countDocuments({ user_id: req.query?.user_id , status: 'Active' });


        return res.status(200).json({
            totalCount: countdata, limit: limit,
            provider_services: servicesdata,
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

const providerreviews = async (req, res) => {

    try {
        if (!req.query.user_id) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        } const limit = 3;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
            var ProfilePhotosurl =
                process.env.BackendApi + "/api/uploads/providerservices/";
        } else {

            var ProfilePhotosurl =
                config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
        }


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
            //totalCount: countdata, limit: limit,
            provider_services: userreview,
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
module.exports = { servicesbysubcategory, getproviderOffers,categoryservicesfilter,providerreviews, getservicesfaqs, providermoreservices, getsimilarservices, servicesproviderdetaildata, searchservices, getservicesonloadmore, getallactiveoffers, categoprywiseservices, landingpagecategories, servicescategorylandingpg, popularskills, getFaqsbytype, popularcategories, landingpageplatforms, categoryreview, categoryusers, allcategorieslandingpg, categorylandingpage };
