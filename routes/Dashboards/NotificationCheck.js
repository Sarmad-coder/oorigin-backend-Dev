const db = require("../../db");
let NotificationCheck = db.NotificationCheck
let User = db.User
const addNotificationCheck = async (req, res) => {

    try {  if (!req.body.user_id ) {
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
        const NotificationCheckdata = await NotificationCheck.findOne({
            user_id: req.body.user_id
        });
        if(NotificationCheckdata){
            const userdata = await NotificationCheck.updateOne({
                _id:NotificationCheckdata?.id
            }, {
                $set: {
                    bid_status: req.body.bid_status,
                    task_invitation: req.body.task_invitation,
                    deadline_reminder: req.body.deadline_reminder,
                    payment_alerts: req.body.payment_alerts,
                    message_alerts: req.body.message_alerts,
                    user_id: req.body.user_id,
                }
            }) .then(result => {
                console.log("result", result);
            })
            .catch(error => {
                console.log("error", error);

            });
        }else{
             const NotificationCheckData = new NotificationCheck({
                bid_status: req.body.bid_status,
                task_invitation: req.body.task_invitation,
                deadline_reminder: req.body.deadline_reminder,
                payment_alerts: req.body.payment_alerts,
                message_alerts: req.body.message_alerts,
                user_id: req.body.user_id,
            });

            await db.NotificationCheck.create(NotificationCheckData)
                .then(result => {
                    console.log("result", result);
                })
                .catch(error => {
                    console.log("error", error);

                });
        }
           


         return res.status(200).json({
            message: "Notifications updated Successfully",
            status: "1",
        });
   



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: " error", error,
            status: "0",
        });

    }
};

const getuserNotificationCheck = async (req, res) => {
    try {
        if (!req.query.user_id ) {
            return res.status(400).json({
                message: "user_id required ",
                status: "0",
            });
        }
        const NotificationCheckdata = await NotificationCheck.findOne({user_id:req.query.user_id })
        return res.status(200).json({
            NotificationCheckdata,
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
module.exports = { addNotificationCheck, getuserNotificationCheck };
