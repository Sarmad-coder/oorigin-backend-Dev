const db = require("../../db");
let OTP = db.OTP
const bcrypt = require('bcrypt');

// const sgmail = require('./../../helpers/mail');
const sendEmail = require('./../../helpers/mail');
const { msgsendtousernum, msgsendtouserwhtsapp } = require('./../../helpers/msgsend');
const generateOTP = async () => {

    try {
        let otp;
        return (otp = `${Math.floor(1000 + Math.random() * 9000)}`);


    } catch (error) {
        throw error;

    }
};
const hashData = async (data, saltRounds = 10) => {

    try {
        const hasheddata = await bcrypt.hash(data, saltRounds);
        return hasheddata;
    } catch (error) {
        throw error;

    }
};
const verifyHashedData = async (unhashed, hashed) => {

    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;

    } catch (error) {
        throw error;

    }
};
const sendOTP = async ({ email, duration, type }) => {

    try {

        if (!email) {
            throw Error("Please Provide email address");
        }
        // deleting old record
        await OTP.deleteOne({ email: email });
        //generating otp
        const geneotp = await generateOTP();
        // sgmail.Emailverify(email, geneotp);
        const hashedotp = await hashData(geneotp);
        if (type == "email") {
            await sendEmail(email, "Verify Otp", `
Your Verification code is: ${geneotp}`);
        } else {
           
                await msgsendtousernum(email, "Verify Otp", `
    Your Verification code is: ${geneotp}`);
            

        }

        console.log("geneotp", geneotp)
        
        const OTPData = new OTP({
            email: email,
            otp: hashedotp,
            type: type,
            // user_id: result._id,
            expires_at: `${Date.now() + 3600000 * +duration}`,




        });
        const newotprecrd = await OTPData.save()
        return geneotp;

    } catch (error) {
        throw error;

    }
};
const verifyOTP = async ({ email, typee, otp }) => {

    try {

        if (!(email && otp)) {
            throw Error("Please Provide email address && otp");
        }


        let matchedOtprecord = await OTP.findOne({ email: email, type: typee });
        if (!matchedOtprecord) {
            throw Error("No email address found");

        }
        const { expires_at } = matchedOtprecord;
        console.log(matchedOtprecord)
        console.log(Date.parse(expires_at))
        console.log(Date.now())
        // if expired
        if (Date.parse(expires_at) < Date.now()) {
            await OTP.deleteOne({ email: email });
            throw Error("Code has expired. Request for a new one");
        }
        // not expired
        const hashedotp = matchedOtprecord.otp;
        let validotp = await verifyHashedData(otp, hashedotp);


        return validotp;


    } catch (error) {
        throw error;

    }
};
const sendnumOTP = async ({ phone, type, duration = 1, country_code }) => {

    try {

        if (!phone) {
            throw Error("Please Provide email address");
        }
        // deleting old record

        //   if ( type == "phone") {
        await OTP.deleteOne({ email: phone,type:type });
        //generating otp
        var geneotp = await generateOTP();
        // sgmail.Emailverify(email, geneotp);
        const hashedotp = await hashData(geneotp);
        const OTPData = new OTP({
            email: phone,
            otp: hashedotp,
            type: type,
            // user_id: result._id,
            expires_at: `${Date.now() + 3600000 * +duration}`,

        });
        const newotprecrd = await OTPData.save()

        if (country_code == "91") {
            if (type == "phone") {

            } if (type == "whatsappnum") {

            }
        } else {
            if (type == "phone") {
                await msgsendtousernum(phone, "Verify Otp", `
    Your Verification code is: ${geneotp}`);
            } if (type == "whatsappnum") {
                await msgsendtouserwhtsapp(phone, `
    Your Verification code is: ${geneotp}`)
            }

            ;
        }

        console.log(geneotp)


        return geneotp;

    } catch (error) {
        throw error;

    }
};
module.exports = { verifyOTP, sendOTP, sendnumOTP };
