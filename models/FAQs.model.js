const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    question: { type: String,required: false},
    type: { type: String, enum: ["Influncer","WebsiteTool","ServiceProvider","Investor",'Admin',''], default: '' },
    answer: { type: String,required: false},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('FAQs', schema);

