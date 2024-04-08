const db = require("../../db");
let ServiceProvider = db.ServiceProvider
let REVIEW = db.REVIEW
let User = db.User
const addReview = async (req, res) => {

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
                status: "1",
            });
        }

       


  const reviewData = new REVIEW({
                        user_id: req.body.user_id,
                        rating: req.body.rating,
                 
                        review_from: req.body.review_from,
                        review: req.body.review,
                     

                    });
                    await reviewData.save().then(async result => {
                        console.log("result", result);
                        const userreviews =  await User.distinct( 'avgrating', {
                            _id: req.body.user_id,
                        })
                        let rate= userreviews?Number(userreviews)+Number(req.body.rating):req.body.rating
                        let numrate = userreviews?2:1
                        let total = Number(rate)/numrate
                        const userData =  await User.updateOne(  {
                            _id: req.body.user_id,
                        },
                        {$set:{
                            avgrating:total
                        },
                           $push: {
                            reviews: result._id,
                              
                            },
                        }
                    )
                        // return res.status(200).json({
                        //     message: "Review added Successfully", user_id:user_id,
                        //     status: "1",
                        // });
                    })
                        .catch(error => {
                            console.log("error", error);
                            return res.status(200).json({
                                message: "Error",
                                status: "0",
                            });
                        });



        return res.status(200).json({
            message: "Review added Successfully",
            status: "1",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Adding error", error,
            status: "0",
        });

    }
};

const getReviewByUserId = async (req, res) => {

    try {
        if (!req.body.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const userdata = await ServiceProvider.findOne({
            user_id: req.body.user_id
        });
        if (!userdata) {
            return res.status(400).json({
                message: "No user found",
                status: "1",
            });
        }

        const userReviews = await REVIEW.find({ user_id: req.body.user_id })



        return res.status(200).json({
            data: userReviews,
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

const updateReview = async (req, res) => {

    try {

        const userReviews = await REVIEW.findByIdAndUpdate(req.body.id, req.body)

        console.log(userReviews);


        if (userReviews) {
            return res.status(200).json({
                message: "Reviews updated Successfully",
                status: "1",
            });
        }

        return res.status(200).json({
            message: "Reviews updated failed",
            status: "0",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "updating error", error,
            status: "0",
        });

    }
};
const deleteReview = async (req, res) => {

    try {

        const faq = await REVIEW.findByIdAndDelete(req.body.id)
        console.log(faq);

        if (faq) {
            return res.status(200).json({
                message: "Review deleted Successfully",
                status: "1",
            });
        }
        return res.status(200).json({
            message: "deleting error",
            status: "0",
        });



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "deleting error", error,
            status: "0",
        });

    }
};
const replytoReview = async (req, res) => {

    try {

     
        const userReviews = await REVIEW.updateOne(
            {
                _id: req.body.id,
            },
            {
                $set: {
                    review_reply: req.body.review_reply,

                },
            }
        )

        console.log(userReviews);


    
            return res.status(200).json({
                message: "Reply send Successfully",
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
module.exports = { addReview,replytoReview, getReviewByUserId, updateReview, deleteReview };