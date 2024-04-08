const db = require("../../db");
let User = db.User   
let OTP = db.OTP     
const { sendOTP, verifyOTP,sendnumOTP}     = require('./otp')      
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
const config = require("./../../config.json");
const loginuser = async (req, res) => {
    try {
        console.log(__dirname);
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\AuthLogin") {
          
            var ProfilePhotosurl =config?.BackendApi + "/api/uploads/profileimages/";
        } else {
            
            var ProfilePhotosurl =
                config?.IMAGE_URL+ req.get("host") + "/api/uploads/profileimages/";
        } 
if(req.body.password){  
    const user = await User.findOne({ email: req.body.email }).populate("role");

        if (!user) {
            return  res.status(401).json({ error: 'User Not exist' });
        }
        if(user?.two_fa== true){
            let email =  req.body.email
    let type =  "email"
  
  
    let country_code = req.body.country_code?req.body.country_code:"00"
    let duration = 10;
    const creatotp = await sendOTP({
        email,
        duration,type, country_code
      });
    return  res.status(200).json({
        message: ` An OTP is send to:  ${email}, please verify your account`,
        duration : 10
    ,two_fa:user?.two_fa,
        status: "1",
      });
        }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
        return  res.status(401).json({ error: ' Incorrect password' });
    }

    // Generate an access token
    const accessToken = jwt.sign({  userId: user.id },config?.SECRET_KEY, {
        expiresIn: '10h',
    });
   
   return res.json({

        message: "Login Successfully",
       Roles:user?.role,
       email:user?.email,two_fa:user?.two_fa,
       user_id:user?.id,   username:user?.username,
       profile_image : ProfilePhotosurl + user?.profile_image,
        status: "1", accessToken: accessToken
    });
}else if(req.body.social_id){
    const user = await User.findOne({ social_id: req.body.social_id });

   
if(!user){
    return  res.status(400).json({
        message: `No User Found`,
       
        status: "0",
      });
}
    // Generate an access token
    const accessToken = jwt.sign({  userId: user.id },config?.SECRET_KEY, {
        expiresIn: '10h',
    });
   
   return res.json({ email:user?.email,
    user_id:user?.id,   username:user?.username,
    profile_image : ProfilePhotosurl + user?.profile_image,
        message: "User Successfully",  Roles:user?.role, two_fa:user?.two_fa,
        status: "1", accessToken: accessToken
    });
} else if (req.body.otp_login == true){
    let email =  req.body.email? req.body.email: req.body.phone
    let type =  req.body.email?"email":"phone"
    let user
    if (type == "email"){
         user = await User.findOne({ email: req.body.email }); 
      }else {
         user = await User.findOne({ phonenum: req.body.phone });   
      }

    if (!user) {
        return  res.status(401).json({ error: 'User Not exist' });
    }
    let country_code = req.body.country_code?req.body.country_code:"00"
    let duration = 10;
    const creatotp = await sendOTP({
        email,
        duration,type, country_code
      });
    return  res.status(200).json({
        message: ` An OTP is send to:  ${email}, please verify your account`,
        duration : 10,
        status: "1",
      });
      
}
        // Compare the hashed password
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });
    }
};                                                                                                                                                     
const verifypin = async (req, res) => {
    try {
        if (__dirname == "C:\Client\OORIGIN\OoriginBackend\routes\AuthLogin") {
          
            var ProfilePhotosurl =config?.BackendApi + "/api/uploads/profileimages/";
        } else {
            
            var ProfilePhotosurl =
                config?.IMAGE_URL+ req.get("host") + "/api/uploads/profileimages/";
        } 
    let otp = req.body.otp;
    let email =  req.body.email? req.body.email: req.body.phone
   // let type =  req.body.email?"email":"phone"
    let typee =  req.body.type
    let user
    if (typee == "email"){
         user = await User.findOne({ email: email }).populate("role");
      }else if (typee == "whatsapp") {
         user = await User.findOne({ whatsappnum: email}).populate("role");
      }else {
        user = await User.findOne({ phonenum: email}).populate("role"); 
     }

    const validotp = await verifyOTP({
      email,typee,
      otp,
    });
    if (validotp === true) {
        
        if (!user) {
            return  res.status(200).json({    message: "OTP Verified",
            
            status: "1",  });
        }
        const accessToken = jwt.sign({  userId: user.id },config?.SECRET_KEY, {
            expiresIn: '10h',
        });
       
       return res.json({
    
            message: "Login Successfully",
            username:user?.username,two_fa:user?.two_fa,
            email:user?.email,
       user_id:user?.id, Roles:user?.role,
       profile_image : ProfilePhotosurl + user?.profile_image,
            status: "1", accessToken: accessToken
        });
       
      }
      if (validotp === false) {
        res.status(200).json({
          message: `Invalid OTP`,
        
          status: "0",
        });
   } } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });
    }
};

const forgetpassword = async (req, res) => {
    try {
        

    let email =  req.body.email
    let user = await User.findOne({ email: req.body.email }); 
      

    if (!user) {
        return  res.status(401).json({ error: 'User Not exist' });
    }
    let type ="email"
    let duration = 10;
    const creatotp = await sendOTP({
        email,
        duration,type
      });
    return  res.status(200).json({
        message: ` An OTP is send to:  ${req.body.email}, please verify your account`,
        duration:10,
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
const changepassword = async (req, res) => {
    try {
        

  
    let user = await User.findOne({ email: req.body.email }); 
    const newpassword = await bcrypt.hashSync(req.body.password, 10);


    if (!user) {
        return  res.status(401).json({ error: 'User Not exist' });
    }
    const updateuser = await User.updateOne(
        {
            _id: user?._id,
        },
        {
            $set: {
                password: newpassword
                

            },
        }
    )
    return  res.status(200).json({
        message: "Password changed successfully",
       
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
const verifyemail = async (req, res) => {
    try {
        

    let email =  req.body.email
    let type =  "email"
 
  
       let  user = await User.findOne({ email: req.body.email }); 
      

    if (user) {
        return res.status(200).json({ message: "User with same email already exist", status: "0", });
    }
    
    let duration = 10;
    const creatotp = await sendOTP({
        email,
        duration,type
      });
    return  res.status(200).json({
        message: ` An OTP is send to:  ${req.body.email}, please verify your account`,
        duration : 10,
        status: "1",
      });
      

        // Compare the hashed password
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });
    }
};

const verifynumber = async (req, res) => {
    try {
        

        let phone =  req.body.phone? req.body.phone: req.body.whatsappnum
        let type =  req.body.phone?"phone":"whatsapp"
    // let whatsappnum =  req.body.whatsappnum
    // let phone =  req.body.phone
    // let type =  "phone"
 
  if(type== "phone"){
 var user = await User.findOne(
       
          { phonenum: req.body.phone }
        
      );
  }else if(type== "whatsapp")   {
    var user = await User.findOne(
          
             { whatsappnum: req.body.whatsappnum },
           
         );
     }
   

    if (user) {
        return res.status(200).json({ message: "User with same Numbers already exist", status: "0", });
    }
    
    let duration = 10;
    
      let country_code = req.body.country_code?req.body.country_code:"00"
      
      const creatotp = await sendnumOTP({
        phone,type,
          duration, country_code
        });
    return  res.status(200).json({
        message: ` An OTP is send to your numbers, please verify.`,
        duration : 10,
        status: "1",
      });
      

        // Compare the hashed password
      
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error :/", error,
            status: "0",
        });
    }
}
//on registering service providers
// const numbersotpverification = async (req, res) => {
//     try {
        
//     let otpnum = req.body.otpnum;
//     let otpwhtsapp = req.body.otpwhtsapp;
//     let num =  req.body.phone
//     let whatsappnum =  req.body.whatsappnum
    
   

//     const validotp = await verifyOTP({
//         num,
//         otpnum,
//     });
//     const validwhtsappotp = await verifyOTP({
//         whatsappnum,
//       ootpwhtsappp,
//     });
//     let response =[]
//     if (validotp === true) {
//         response.push({verfied:"Phone Number verified"})
       
//       }
//     else  if (validotp === false) {
//         response.push({verfied:"Phone Number not verified"})
//    }
//     if (validwhtsappotp === true) {  response.push({verfied:"Whatsapp verified"})
// }
//      else if (validwhtsappotp === false) {
//         response.push({verfied:"Whatsapp not verified"})
//    } 

//    res.status(200).json({
//     message: response,
  
//     status: "1",
//   });} catch (error) {
//         console.log(error);
//         return res.status(200).json({
//             message: "Error :/", error,
//             status: "0",
//         });
//     }
// };
module.exports = {loginuser,verifypin,forgetpassword,changepassword,verifyemail,verifynumber};
