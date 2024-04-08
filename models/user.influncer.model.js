
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, default: null },
    profilename: { type: String, default: null },
    country: { type: String, default: null },
    city: { type: String, default: null },
    language: { type: String, default: null },
   // designation: [{ type: Schema.Types.ObjectId, ref: 'Designations' }],
    designation: { type: String, default: null },
    title: { type: String, default: null },
    subtitle: { type: String, default: null },
    description: { type: String, default: null },
  
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
   // faqs: [{ type: Schema.Types.ObjectId, ref: 'FAQs' }],
},{ timestamps: true });


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Influncer', schema);




