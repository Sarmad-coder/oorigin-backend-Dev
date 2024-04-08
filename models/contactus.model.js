
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    firstname: { type: String,required: false},
    lastname: { type: String,required: false},
    email: { type: String,required: false},
    usertype: { type: String, enum: ["Influncer","WebsiteTool","ServiceProvider","Investor",''], default: '' },
    message: { type: String,required: false},
    status: { type: String, enum: ['Pending', 'Seen'], default: 'Pending' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('ContactUs', schema);

