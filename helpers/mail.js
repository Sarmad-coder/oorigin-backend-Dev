


const config = require("./../config.json");
const sendGridMail = require("@sendgrid/mail");



sendGridMail.setApiKey(config.SENDGRID_API_KEY);

 const sendEmail = async (email,subject,body) => {
  
  sendGridMail
    .send({
      to: email,
      from: "admin@aiksol.com",
      subject: subject,
      text: body,
    //  html: `<strong>Login Successfully</strong>`,
    })
    .then(
      (res) => {
        console.log("res");
      },
      (error) => {
        console.error("Error sending test email");
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
};

module.exports = sendEmail