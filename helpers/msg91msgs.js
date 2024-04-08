const axios = require('axios');

const apiKey = 'YOUR_MSG91_API_KEY';
const mobileNumber = 'RECIPIENT_MOBILE_NUMBER';
const otp = '1234'; // Replace with your generated OTP

const url = 'https://api.msg91.com/api/v5/otp';

const data = {
  authkey: apiKey,
  template_id: 'YOUR_TEMPLATE_ID', // Replace with your Msg91 template ID
  mobile: mobileNumber,
  otp,
};

axios.post(url, data)
  .then(response => {
    console.log(response.data);
    // Handle response
  })
  .catch(error => {
    console.error(error);
    // Handle error
  });
