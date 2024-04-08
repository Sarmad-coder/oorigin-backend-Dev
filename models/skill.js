const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    // icon: { type: String,default: null},
    title: { type: String,required: true},
    tagLine: { type: String,required: true},  
    popular_skill: { type: Boolean,default: false},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Skill', schema);

