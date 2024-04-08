
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, default: null },
    company_name: { type: String, default: null },
    professional_type: { type: String, default: null },
    experience: { type: String, default: null },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    website_url: { type: String, default: null },
    services: [{ type: Schema.Types.ObjectId, ref: 'ServicesSP' }],
   facebook: { type: String, default: null },
    fb_verified: { type: Boolean, default: false },
    linkedin: { type: String, default: null },
    linkedin_verified: { type: Boolean, default: false },
    categories: [{
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        subcategory: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
    }],

    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    worldwide: { type: Boolean, default: false },
    region: { type: Boolean, default: false },

    country: { type: String, default: null },
    starting_price: { type: Number, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
}, { timestamps: true });


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('ServiceProvider', schema);




