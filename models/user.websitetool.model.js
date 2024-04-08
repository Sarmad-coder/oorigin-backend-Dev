
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, default: null },
    country: { type: String, default: null },
    
    city: { type: String, default: null },
    language: { type: String, default: null },
    //designation: { type: Schema.Types.ObjectId, ref: 'Designations' },
    designation: { type: String, default: null },
    
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    website_url: { type: String, default: null },
    website_name: { type: String, default: null },
    website_logo: { type: String, default: null },
    website_title: { type: String, default: null },
    website_description: { type: String, default: null },
    website_age: { type: String, default: null },
    website_categories: { type: Array },
    website_pricing: { type: String, default: null },
},{ timestamps: true });


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('WebsiteTool', schema);




