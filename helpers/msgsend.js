
const config = require("./../config.json");

const msgsendtousernum = async (phone_number,body) => {
  
    const accountSid = config.twilioaccountSid;
    const authToken = config.twilioauthToken;
    const client = require('twilio')(accountSid, authToken);
    console.log("twilio order sms send");
   
       
        var Mobile = phone_number;
        try {
            var bodydata=body
            client.messages.create({
               // to: '+' + Country_code + Mobile,
                to: '+' + Mobile,
                
                from: "+15642167779",
                body: bodydata,
            }, function (error, message) {
                if (!error) {
                    console.log('Success! The SID for this SMS message is:');
                    console.log('+' + Country_code + Mobile,);
                    console.log(message.sid);
                    console.log('message sent on:');
                    console.log(message.dateCreated);
                    console.log("link Placed Sms Send done");
                } else {
                    console.log(error);
                    console.log('error msg send');
                
                }
            });
        } catch (err) {
            console.log("err msg here", err);
        }
    
}

const msgsendtouserwhtsapp = async (phone_number,body) => {
 
    const accountSid = config.twilioaccountSid;
    const authToken = config.twilioauthToken;
    const client = require('twilio')(accountSid, authToken);
        var Mobile = `whatsapp:+`+phone_number;
        try {
            var bodydata=body
            client.messages.create({
                from: 'whatsapp:+14155238886',
            to: Mobile,
                body: bodydata,
            }, function (error, message) {
                if (!error) {
                    console.log('Success! The SID for this SMS message is:');
                   // console.log('+' + Country_code + Mobile,);
                    console.log(message.sid);
                    console.log('message sent on:');
                    console.log(message.dateCreated);
                    console.log("link Placed Sms Send done");
                } else {
                    console.log(error);

                    console.log('error msg send');
                
                }
            });
        } catch (err) {
            console.log("err msg here", err);
        }
    
}

module.exports = {msgsendtousernum,msgsendtouserwhtsapp}



