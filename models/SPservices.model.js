const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String,default:null},
    title: { type: String,default:null},
    description: { type: String,default:null},
    category: { type: Schema.Types.ObjectId, ref: 'Category'  ,default:null},
 subcategory: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    starting_price: { type: Number,default:null}, 
    duration: { type: String, enum: ['Hourly', 'Daily','Monthly','Weekly',""], default: '' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
},{ timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('ServicesSP', schema);

