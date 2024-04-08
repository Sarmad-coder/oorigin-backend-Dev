const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
   
    title: { type: String,required: true},
    url: { type: String,required: true},
    tagLine: { type: String,default: null},
    icon: { type: String,default: null},
    coverImg: { type: String,default: null},
    topplatform: { type: Boolean,default: false},
    description1: { type: String,default: null},
    description2: { type: String,default: null},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('SocialPlatforms', schema);

