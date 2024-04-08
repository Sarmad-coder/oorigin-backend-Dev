const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    services: [{ type: Schema.Types.ObjectId, ref: 'ServicesSP' }],
    title: { type: String,required: true},
    tagLine: { type: String,default: null},
    icon: { type: String,default: null},
    coverImg: { type: String,default: null},
    topcategory: { type: Boolean,default: false},
    popular_category: { type: Boolean,default: false},
    description1: { type: String,default: null},
    description2: { type: String,default: null},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Category', schema);


// const categoprywiseservices = async (req, res) => {

//     try {

//         if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\Dashboards") {
//             var ProfilePhotosurl =
//                 process.env.BackendApi + "/api/uploads/providerservices/";
//         } else {

//             var ProfilePhotosurl =
//                 config?.IMAGE_URL + req.get("host") + "/api/uploads/providerservices/";
//         }
//         const limit = 3;
//         if (req.body.page) {
//             var page = req.body.page;
//         } else {
//             var page = 1;
//         }
//         const skipIndex = (page - 1) * limit;
//         let countrychk = req.body.country //names of country
//         let language = req.body.language  // languages names
//         let rating = req.body.rating      // 1 2 3 4 5
//         let budget = req.body.budget     //[1000, 50000]
//         let status = req.body.status       // Active,inactive
//         let sort = req.body.sort
//         let categoriesarr = req.body.categories          // rating,followers,latest 
//         if (countrychk) {
//             // var users = await User.distinct("_id", {
//             //     country: {
//             //         $regex: countrychk,
//             //         $options: 'i'
//             //     }, status: "Active"
//             // })
//             // var servicesdata = await ServicesSP.find({ user_id: { $in: users }, status: "Active" }).populate({
//             //     path: 'category',
//             //     select: 'title _id'
//             // }).populate({
//             //     path: 'user_id',
//             //     select: 'country username avgrating phonenum'
//             // });
//             const query = {
//                 status: "Active"
//             };

//             if (categoriesarr?.length > 0) {
//                 const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
//                 query._id = { $in: categoriesIds };
//             }
//             console.log("Query Object:", query);
//             var servicesdata = await Category.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps",
//                         localField: "services",
//                         foreignField: "_id",
//                         as: "services"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps.users",
//                         localField: "services.user_id",
//                         foreignField: "_id",
//                         as: "user"
//                     }
//                 },
//                 {
//                     $match: {
//                         "user.country": {
//                             $regex: new RegExp(language, "i")
//                         },
//                         //"services.status":"Active",
//                     }
//                 },
//                 //  {
//                 //             $project: {
//                 //                 "$services.image": 1,
//                 //                 "$services._id" : 1,
//                 //                 "$services.title": 1,
//                 //                 "$services.description": 1,
//                 //                 "$services.user_id" : 1,
//                 //                 category: {
//                 //                     _id: 1,
//                 //                     title: 1
//                 //                 },
//                 //                 user_id: {
//                 //                     id: { $arrayElemAt: ["$user._id", 0] },
//                 //                     country: { $arrayElemAt: ["$user.country", 0] },
//                 //                     username: { $arrayElemAt: ["$user.username", 0] },
//                 //                     language: { $arrayElemAt: ["$user.language", 0] },
//                 //                     phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//                 //                     avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//                 //                 }
//                 //             }
//                 //         }  
//             ]);
//             // var servicesdata = await ServicesSP.aggregate([
//             //     {
//             //         $match: query
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "users",
//             //             localField: "user_id",
//             //             foreignField: "_id",
//             //             as: "user"
//             //         }
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "categories",
//             //             localField: "category",
//             //             foreignField: "_id",
//             //             as: "category"
//             //         }
//             //     },
//             //     {
//             //         $match: {
//             //             "category._id": { $exists: true, $ne: [] } // Filter out documents where category is empty
//             //         }
//             //     },
//             //     {
//             //         $unwind: "$category"
//             //     },
//             //     {
//             //         $match: {
//             //             "user.country": {
//             //                 $regex: new RegExp(countrychk, "i")
//             //             }
//             //         }
//             //     },
//             //     {
//             //         $project: {
//             //             image: 1,
//             //             _id: 1,
//             //             title: 1,
//             //             description: 1,
//             //             user_id: 1,
//             //             category: {
//             //                 id: "$category._id",
//             //                 title: "$category.title"
//             //             },
//             //             user_id: {
//             //                 id: { $arrayElemAt: ["$user._id", 0] },
//             //                 country: { $arrayElemAt: ["$user.country", 0] },
//             //                 username: { $arrayElemAt: ["$user.username", 0] },
//             //                 language: { $arrayElemAt: ["$user.language", 0] },
//             //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//             //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//             //             }
//             //         }
//             //     }  
//             // //     , { $skip:skipIndex},
//             // //    // { $sort: { created_at: -1 } },
//             // //     { $limit: limit },
//             // ]);
            
            


//             console.log(servicesdata);

//         }
//         else if (budget?.length > 0) {


//             const query = {
//                 status: "Active"
               
//             };

//             if (categoriesarr?.length > 0) {
//                 const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
//                 query._id = { $in: categoriesIds };
//             }
//             // var servicesdata = await ServicesSP.find(query).populate({
//             //     path: 'category',
//             //     select: 'title _id'
//             // }).populate({
//             //     path: 'user_id',
//             //     select: 'country username avgrating phonenum'
//             // })
//             // .sort({ createdAt: -1 })
//             // .limit(limit).skip(skipIndex)
//             // .exec();
//             var servicesdata = await Category.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps",
//                         localField: "services",
//                         foreignField: "_id",
//                         as: "services"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps.users",
//                         localField: "services.user_id",
//                         foreignField: "_id",
//                         as: "user"
//                     }
//                 },
//                 {
//                     $match: {
//                         "services.starting_price": { $gte: budget[0], $lte: budget[1] },
//                         "services.status":"Active",
                     
//                     }
//                 }, {
//                             $project: {
//                                 "$services.image": 1,
//                                 "$services._id" : 1,
//                                 "$services.title": 1,
//                                 "$services.description": 1,
//                                 "$services.user_id" : 1,
//                                 category: {
//                                     id: "$category._id",
//                                     title: "$category.title"
//                                 },
//                                 user_id: {
//                                     id: { $arrayElemAt: ["$user._id", 0] },
//                                     country: { $arrayElemAt: ["$user.country", 0] },
//                                     username: { $arrayElemAt: ["$user.username", 0] },
//                                     language: { $arrayElemAt: ["$user.language", 0] },
//                                     phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//                                     avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//                                 }
//                             }
//                         }  
//             ]);

//         }
//         else if (rating) {
//             const query = {
//                 status: "Active"
//             };

//             if (categoriesarr?.length > 0) {
//                 const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
//                 query._id = { $in: categoriesIds };
//             }
//             var servicesdata = await Category.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps",
//                         localField: "services",
//                         foreignField: "_id",
//                         as: "services"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps.users",
//                         localField: "services.user_id",
//                         foreignField: "_id",
//                         as: "user"
//                     }
//                 },
//                 {
//                           $addFields: {
//                                 roundedAvgRating: { $round: [{ $avg: "$user.avgrating" }, 0] } // Calculate and round the average rating of the user
//                             }
//                         },
//                         {
//                             $match: {
//                                 roundedAvgRating: rating,// Match documents with rounded average rating equal to the requested rating
//                                // "services.status":"Active", 
//                             }
//                         },
//                 // {
//                 //             $project: {
//                 //                 "$ervices.image": 1,
//                 //                 "$services._id" : 1,
//                 //                 "$services.title": 1,
//                 //                 "$services.description": 1,
//                 //                 "$services.user_id" : 1,
//                 //                 category: {
//                 //                     id: _id,
//                 //                     title: title
//                 //                 },
//                 //                 user_id: {
//                 //                     id: { $arrayElemAt: ["$user._id", 0] },
//                 //                     country: { $arrayElemAt: ["$user.country", 0] },
//                 //                     username: { $arrayElemAt: ["$user.username", 0] },
//                 //                     language: { $arrayElemAt: ["$user.language", 0] },
//                 //                     phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//                 //                     avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//                 //                 }
//                 //             }
//                 //         }  
//             ]);
//             // var servicesdata = await ServicesSP.aggregate([
//             //     {
//             //         $match: query
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "users",
//             //             localField: "user_id",
//             //             foreignField: "_id",
//             //             as: "user"
//             //         }
//             //     }, {
//             //         $lookup: {
//             //             from: "categories",
//             //             localField: "category",
//             //             foreignField: "_id",
//             //             as: "category"
//             //         }
//             //     },
//             //     {
//             //         $addFields: {
//             //             roundedAvgRating: { $round: [{ $avg: "$user.avgrating" }, 0] } // Calculate and round the average rating of the user
//             //         }
//             //     },
//             //     {
//             //         $match: {
//             //             roundedAvgRating: rating // Match documents with rounded average rating equal to the requested rating
//             //         }
//             //     }, {
//             //         $project: {
//             //             image: 1,
//             //             title: 1,
//             //             description: 1,
//             //             user_id: 1,
//             //             // Add other fields you want to select from the ServicesSP collection
//             //             //  "": 1,
//             //             // "user.username": 1,
//             //             //   "category.title": 1,
//             //             //   "category.id": 1,
//             //             //"user.avgrating": 1, 
//             //             category: {
//             //                 id: { $arrayElemAt: ["$category._id", 0] }, // Include category ID
//             //                 title: { $arrayElemAt: ["$category.title", 0] } // Include category title
//             //             }, user_id: {
//             //                 id: { $arrayElemAt: ["$user._id", 0] }, // Include category ID
//             //                 country: { $arrayElemAt: ["$user.country", 0] }, // Include category ID
//             //                 username: { $arrayElemAt: ["$user.username", 0] }, // Include category ID
//             //                 language: { $arrayElemAt: ["$user.language", 0] }, // Include category ID
//             //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] }, // Include category ID
//             //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } } // Include category title
//             //             },
//             //             // Add other fields you want to select from the User collection
//             //         }
//             //     }
//             //     //   , { $skip:skipIndex},
//             //     // //   { $sort: { created_at: -1 } },
//             //     //   { $limit: limit },
//             // ]);

//         }
//         else if (language) {
         
//             const query = {
//                 status: "Active"
//             };

//             if (categoriesarr?.length > 0) {
//                 const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
//                 query._id = { $in: categoriesIds };
//             } 
//             // var servicesdata = await Category.aggregate([
//             //     {
//             //         $match: query
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "servicessps",
//             //             localField: "services",
//             //             foreignField: "_id",
//             //             as: "services"
//             //         }
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "servicessps.users",
//             //             localField: "services.user_id",
//             //             foreignField: "_id",
//             //             as: "users"
//             //         }
//             //     },
//             //     {
//             //         $match: {
//             //             "users.language": {
//             //                 $regex: new RegExp(language, "i")
//             //             }
//             //         }
//             //     },
//             //     // {
//             //     //             $project: {
//             //     //                 "$services.image": 1,
//             //     //                 "$services._id" : 1,
//             //     //                 "$services.title": 1,
//             //     //                 "$services.description": 1,
//             //     //                 "$services.user_id" : 1,
//             //     //                 category: {
//             //     //                     _id: 1,
//             //     //                     title:1
//             //     //                 },
//             //     //                 user_id: {
//             //     //                     id: { $arrayElemAt: ["$user._id", 0] },
//             //     //                     country: { $arrayElemAt: ["$user.country", 0] },
//             //     //                     username: { $arrayElemAt: ["$user.username", 0] },
//             //     //                     language: { $arrayElemAt: ["$user.language", 0] },
//             //     //                     phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//             //     //                     avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//             //     //                 }
//             //     //             }
//             //     //         }  
//             // ])
//             var servicesdata = await Category.aggregate([
//                 {
//                   $match: query // Your match query object here
//                 },
//                 {
//                   $lookup: {
//                     from: "servicessps",
//                     localField: "services",
//                     foreignField: "_id",
//                     as: "services"
//                   }
//                 },
//                 {
//                   $lookup: {
//                     from: "servicessps.users",
//                     localField: "services.user_id",
//                     foreignField: "_id",
//                     as: "users"
//                   }
//                 },
//                 {
//                   $match: {
//                     "users.language": {
//                       $regex: new RegExp(language, "i")
//                     }
//                   }
//                 },
//                 // {
//                 //   $project: {
//                 //     "services.image": 1,
//                 //     "services._id": 1,
//                 //     "services.title": 1,
//                 //     "services.description": 1,
//                 //     "services.user_id": 1,
//                 //     category: {
//                 //       _id: 1,
//                 //       title: 1
//                 //     },
//                 //     "users._id": 1,
//                 //     "users.country": 1,
//                 //     "users.username": 1,
//                 //     "users.language": 1,
//                 //     "users.phonenum": 1,
//                 //     "users.avgrating": { $toDouble: { $arrayElemAt: ["$users.avgrating", 0] } }
//                 //   }
//                 // }
//               ]);
              
//             // var servicesdata = await ServicesSP.aggregate([
//             //     {
//             //         $match: query
//             //     },
//             //     {
//             //         $lookup: {
//             //             from: "users",
//             //             localField: "user_id",
//             //             foreignField: "_id",
//             //             as: "user"
//             //         }
//             //     }, {
//             //         $lookup: {
//             //             from: "categories",
//             //             localField: "category",
//             //             foreignField: "_id",
//             //             as: "category"
//             //         }
//             //     },
//             //     {
//             //         $match: {
//             //             "user.language": {
//             //                 $regex: new RegExp(language, "i")
//             //             }
//             //         }
//             //     },

//             //     {
//             //         $project: {
//             //             image: 1,
//             //             title: 1,
//             //             description: 1,
//             //             user_id: 1,
//             //             category: {
//             //                 id: { $arrayElemAt: ["$category._id", 0] },
//             //                 title: { $arrayElemAt: ["$category.title", 0] }
//             //             },
//             //             user_id: {
//             //                 id: { $arrayElemAt: ["$user._id", 0] },
//             //                 country: { $arrayElemAt: ["$user.country", 0] },
//             //                 username: { $arrayElemAt: ["$user.username", 0] },
//             //                 language: { $arrayElemAt: ["$user.language", 0] },
//             //                 phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//             //                 avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//             //             }
//             //         }
//             //     }
//             //     //     

//             // ]);
//            ;


//             console.log(servicesdata);

//         } else {
//             const query = {
//                 status: "Active"
//             };

//             if (categoriesarr?.length > 0) {
//                 const categoriesIds = categoriesarr.map(id => new mongoose.Types.ObjectId(id));
//                 query.category = { $in: categoriesIds };
//             }
//             var servicesdata = await Category.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps",
//                         localField: "services",
//                         foreignField: "_id",
//                         as: "services"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: "servicessps.users",
//                         localField: "services.user_id",
//                         foreignField: "_id",
//                         as: "user"
//                     }
//                 },
//                  {
//                             $project: {
//                                 "$services.image": 1,
//                                 "$services._id" : 1,
//                                 "$services.title": 1,
//                                 "$services.description": 1,
//                                 "$services.user_id" : 1,
//                                 category: {
//                                     id: "$category._id",
//                                     title: "$category.title"
//                                 },
//                                 user_id: {
//                                     id: { $arrayElemAt: ["$user._id", 0] },
//                                     country: { $arrayElemAt: ["$user.country", 0] },
//                                     username: { $arrayElemAt: ["$user.username", 0] },
//                                     language: { $arrayElemAt: ["$user.language", 0] },
//                                     phonenum: { $arrayElemAt: ["$user.phonenum", 0] },
//                                     avgrating: { $toDouble: { $arrayElemAt: ["$user.avgrating", 0] } }
//                                 }
//                             }
//                         }  
//             ]);
//             // var servicesdata = await ServicesSP.find(query).populate({
//             //     path: 'category',
//             //     select: 'title _id'
//             // }).populate({
//             //     path: 'user_id',
//             //     select: 'country username avgrating phonenum'
//             // })
//             // .limit(limit).skip(skipIndex)
//             // .exec();

//         }


//         const categorizedData = {};

//         // Iterate over servicesdata and organize data by category
//         servicesdata.forEach(dt => {
//             if (!dt?.category) {
//                 // Skip if category is null
//                 return;
//             }

//             const categoryId = dt?.category?._id?.toString();

//             if (!categorizedData[categoryId]) {
//                 // If the category is not already in the categorizedData, initialize it
//                 categorizedData[categoryId] = {
//                     category: dt.category,
//                     services: []
//                 };
//             }

//             // Push service data into the corresponding category
//             categorizedData[categoryId].services.push({
//                 image: dt.image,
//                 title: dt.title,
//                 description: dt.description,
//                 service_id: dt._id,
//                 starting_price: dt.starting_price,
//                 duration: dt.duration,
//                 country: dt?.user_id?.country,
//                 avgrating: dt?.user_id?.avgrating,
//                 username: dt?.user_id?.username,
//                 phonenum: dt?.user_id?.phonenum,
//                 language: dt?.user_id?.language,
//                 user_id: dt?.user_id?.id,
//                 createdAt: dt?.createdAt,
//                 image_url: ProfilePhotosurl + dt.image,
//                 // ...dt._doc
//             });
//         });
//         //Rating,Followers,Latest
//         if (sort == "Latest") {
//             // sort in descending order
//             for (const categoryId in categorizedData) {
//                 categorizedData[categoryId].services.sort((a, b) => b.createdAt - a.createdAt);
//                 categorizedData[categoryId].services = categorizedData[categoryId].services.slice(0, 3);
//             }
//         } else {
//             // Sort services within each category by user's average rating in descending order
//             for (const categoryId in categorizedData) {
//                 categorizedData[categoryId].services.sort((a, b) => b.user_id?.avgrating - a.user_id?.avgrating);

//                 // Select the top three services with the highest average ratings
//                 categorizedData[categoryId].services = categorizedData[categoryId].services.slice(0, 3);
//             }
//         }


//         console.log(categorizedData);


//         // Convert categorizedData into an array
//         const servicesByCategory = Object.values(categorizedData);
//         //  const countdata = await ServicesSP.countDocuments({ user_id: req.body.user_id });

//         return res.status(200).json({
//             // servicesdata,
//             data: servicesByCategory,
//             // limit: limit,
//             // count: countdata,
//             status: "1",
//         });



//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             message: "Fetch error", error,
//             status: "0",
//         });

//     }
// };