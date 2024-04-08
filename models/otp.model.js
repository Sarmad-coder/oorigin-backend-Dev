const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    email: { type: String,default: null},
    type:{ type: String, enum: ['phone', 'email','whatsapp',''], default: '' },
    otp: { type: String,default: null},
    expires_at: { type: Date,default: null},
    created_at: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('OTP', schema);

