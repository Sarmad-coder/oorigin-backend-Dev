const jwt = require("jsonwebtoken");
// require('dotenv').config();
const db = require("../db");
const errorHandler = require("../helpers/error-handler");
const config = require("./../config.json");
const unProtectedRoutes = [

    
];
const authMiddleWare = async (req, res, next) => {
    try {
        let matched = unProtectedRoutes.includes(req.path);

        if (matched) {
            next();
        } else {
            let token = req.headers.authorization;
            //let token = req.cookies.token;

            if (!token)
                return res
                    .status(401)
                    .send({ auth: false, message: "Unauthorized", IsSuccess: false });

            if (token) {
                jwt.verify(token, config?.SECRET_KEY,
                    async function (err, decoded) {
                        //console.log("error", err);
                        //console.log("errordsdsd", decoded);
                        if (err) {
                            errorHandler(err, req, res, next);
                        } else {
                            //console.log(decoded);
                            const User = db.User;

                            let user_otp_data = await User.findOne({
                                _id: decoded?.userId,
                            });



                            if (user_otp_data) {
                                req.userId = user_otp_data.id;
                                next();
                            } else {
                                errorHandler("User Not Found", req, res, next);
                            }
                        }
                    }
                );
            }
        }


    } catch (error) {
        return res.status(400).json({
            message: "Error", error,
            status: "0",
        });
    }
};

module.exports = {authMiddleWare};
