const db = require("../../db");
let Offers = db.Offers
let ServicesSP = db.ServicesSP
const config = require("./../../config.json");
const addOffers = async (req, res) => {

    try {
        if (!req.body.user_id) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        let type = req.body.type
        let OffersData
        if (type == "ServiceProvider") {
            OffersData = new Offers({
                title: req.body.title,
                services_id: req.body.services_id,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                discount_percentage: +req.body.discount_percentage,
                type: req.body.type,
                user_id: req.body.user_id,
            });
        } else if (type == "WebsiteTool") {
            OffersData = new Offers({
                title: req.body.title,
                websitetool_product: req.body.websitetool_product,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                discount_percentage: +req.body.discount_percentage,
                type: req.body.type,
                user_id: req.body.user_id,
            });
        } else if (type == "Influncer") {
            OffersData = new Offers({
                title: req.body.title,
                infuncer_product: req.body.infuncer_product,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                discount_percentage: +req.body.discount_percentage,
                type: req.body.type,
                user_id: req.body.user_id,
            });
        }



        await OffersData.save().then(async result => {
            console.log("result", result);
            res.status(200).json({
                message: "Offer Added Successfully ",
                status: "1",
            })
        })
            .catch(error => {
                console.log("error", error);
                res.status(200).json({
                    message: "Something went wrong", error,
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
const updateOffers = async (req, res) => {

    try {
        var Offersfind = await db.Offers.findOne({ _id: req.body.id, });
        if (!Offersfind) {
            return res.status(200).json({ message: "No Offers found", status: "0", });
        }


        const Offersupdt = await Offers.updateOne({
            _id: req.body.id
        }, {
            $set: {
                title: req.body?.title,
                services_id: req.body?.services_id,
                start_date: req.body?.start_date,
                end_date: req.body?.end_date,
                description: req.body?.description,
                discount_percentage: req.body?.discount_percentage,
                type: req.body?.type,
                user_id: req.body?.user_id, status: req.body?.status,

                infuncer_product: req.body?.infuncer_product,
                websitetool_product: req.body?.websitetool_product,
            },

        },
            //  {
            //     $push: {
            //          services_id: req.body.services_id,
            //         infuncer_product: req.body.infuncer_product,
            //         websitetool_product: req.body.websitetool_product,
            //     },

            // }
        ).then(async result => {
            console.log("result", result);
            res.status(200).json({
                message: "Offers updated Successfully ",
                status: "1",
            })
        })
            .catch(error => {
                console.log("error", error);
                res.status(200).json({
                    message: "Something went wrong", error,
                    status: "0",
                });
            });






    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "updating error", error,
            status: "0",
        });

    }
};
const offerstatuschange = async (req, res) => {

    try {
        var Offersfind = await db.Offers.findOne({ _id: req.body.id, });
        if (!Offersfind) {
            return res.status(200).json({ message: "No Offers found", status: "0", });
        }


        const Offersdt = await Offers.updateOne({
            _id: req.body.id
        }, {
            $set: {
                status: req.body.status,

            },

        },

        ).then(async result => {
            console.log("result", result);
            res.status(200).json({
                message: "Offers updated Successfully ",
                status: "1",
            })
        })
            .catch(error => {
                console.log("error", error);
                res.status(200).json({
                    message: "Something went wrong", error,
                    status: "0",
                });
            });




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "updating error", error,
            status: "0",
        });

    }
};
// user self offers that he added
const getoffersofuser = async (req, res) => {
    try {
        const limit = 10;
        if (req.query.page) {
            var page = req.query.page;
        } else {
            var page = 1;
        }
        const skipIndex = (page - 1) * limit;
        const Offersdt = await Offers.find({ user_id: req.query.user_id }).populate({
            path: 'services_id',
            select: 'title _id'
        }).populate({
            path: 'websitetool_product',
            select: 'title _id'
        }).populate({
            path: 'infuncer_product',
            select: 'title _id'
        }).sort({ created_at: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();

        const countdata = await Offers.countDocuments({ user_id: req.query.user_id })

        return res.status(200).json({
            count: countdata,
            limit: limit,
            Offersdt,
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
const OffersDelete = async (req, res) => {
    try {
        const Offersdt = await Offers.findByIdAndDelete(req.body.id)

        if (Offersdt) {
            res.status(200).json({
                message: "Offers deleted Successfully",
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
const Offerspopulate = async (req, res) => {
    try {
        let type = req.body.type
        let data = []
        if (type == "ServiceProvider") {

            data = await ServicesSP.find({ user_id: req.body.user_id, }).select('_id title')

        } else if (type == "WebsiteTool") {

        } else if (type == "Influncer") {

        }
        return res.status(200).json({
            data,

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
const getsingleofferdetail = async (req, res) => {
    try {

        if (!req.query.id) {
            return res.status(400).json({
                message: "id is required ",
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
        const Offersdt = await Offers.findOne({ _id: req.query.id })
            .populate({
                path: 'services_id',
                //select: 'title _id'
            }).populate({
                path: 'websitetool_product',
                // select: 'title _id'
            }).populate({
                path: 'infuncer_product',
                //select: 'title _id'
            })
            let Offersdata 
        if (Offersdt?.services_id.length > 0) {
            let servicesdata=[]
            for (const dt of Offersdt?.services_id) {
                console.log(ProfilePhotosurl + dt?.image);
                 servicesdata.push({
                    image: dt?.image,
                    image_url: ProfilePhotosurl + dt?.image,     ...dt?._doc
                })
            }
            console.log(servicesdata)
             Offersdata = {
                ...Offersdt?._doc,
                services_id: servicesdata,   
            }
            console.log(Offersdata)

        } else {
             Offersdata = { ...Offersdt?._doc }
        }
        return res.status(200).json({

            Offersdata,
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
module.exports = {
    addOffers, updateOffers, getoffersofuser, offerstatuschange, getsingleofferdetail,
    Offerspopulate, OffersDelete
};
