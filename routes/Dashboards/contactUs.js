const db = require("../../db");
let User = db.User
let ContactUs = db.ContactUs
const addcontactusinfo = async (req, res) => {

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
        let servicesid = []
      
            const ContactUsData = new ContactUs({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                user_id: req.body.user_id,
                email: req.body.email,
                message: req.body.message,
                usertype: req.body.usertype,


            });
            await ContactUsData.save().then(async result => {
                console.log("result", result);
                servicesid.push(result?._id)
            })
                .catch(error => {
                    console.log("error", error);

                });
        






        return res.status(200).json({
            message: "Submitted Successfully",
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

const getcontactusforms = async (req, res) => {

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
if(req.body.status){
    var userContactUs = await ContactUs.find({ status: req.body.status})
}else{
    var userContactUs = await ContactUs.find()
}
       



        return res.status(200).json({
            data: userContactUs,
            message: "ContactUs Fetch Successfully",
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


const deleteFaq = async (req, res) => {

    try {

        const faq = await ContactUs.findByIdAndDelete(req.body.id)
        console.log(faq);

    if (faq) {
        return res.status(200).json({
            message: "FAQ deleted Successfully",
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

module.exports = { addcontactusinfo, getcontactusforms,  };