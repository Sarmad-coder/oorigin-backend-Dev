const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number,default: null},
    referal_code: { type: String,default: null},
    payment_mode: { type: String, enum: ["UPI","Cash","Credit","Crypto",''], default: '' },
  
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Investor', schema);

