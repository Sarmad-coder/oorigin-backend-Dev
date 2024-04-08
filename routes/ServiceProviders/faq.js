const db = require("../../db");
let User = db.User
let FAQs = db.FAQs
const addfaqs = async (req, res) => {

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
        let faqsdata = req.body.faqs

        if(faqsdata?.length>0){
            if (typeof faqsdata == "string") {
    
                var faqsparse = JSON.parse(faqsdata);
            } else {
    
                if (
                    typeof faqsdata[0] == "string" &&
                    faqsdata[0][0] == "["
                ) {
                    var faqsparse = JSON.parse(
                        faqsdata[0]
                    );
                } else {
    
                    var faqsparse = faqsdata;
                }
            }}
        for (const data of faqsparse) {
            const FAQsData = new FAQs({
                question: data.question,
                answer: data.answer,
                user_id: req.body.user_id,
                type: req.body.type,


            });
            await FAQsData.save().then(async result => {
                console.log("result", result);
                servicesid.push(result?._id)
            })
                .catch(error => {
                    console.log("error", error);

                });
        }






        return res.status(200).json({
            message: "FAQs added Successfully",
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

const  getFaqByUserId = async (req, res) => {

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

        const userFaqs = await FAQs.find({ user_id: req.body.user_id })



        return res.status(200).json({
            data: userFaqs,
            message: "FAQs Fetch Successfully",
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

const updateFaq = async (req, res) => {

    try {

        const userFaqs = await FAQs.findByIdAndUpdate(req.body.id, req.body)



        return res.status(200).json({
            message: "FAQs updated Successfully",
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
const deleteFaq = async (req, res) => {

    try {

        const faq = await FAQs.findByIdAndDelete(req.params.id)
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

module.exports = { addfaqs, getFaqByUserId, updateFaq, deleteFaq };