
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    services_id:[ { type: Schema.Types.ObjectId, ref: 'ServicesSP' }],
    infuncer_product: { type: Array,default: null},
    websitetool_product: { type: Array,default: null},
    start_date: { type: String,default: null},
    end_date: { type: String,default: null},
    discount_percentage: { type: Number,default: null},
    type: { type: String, enum: ["Influncer","WebsiteTool","ServiceProvider","Investor",''], default: '' },
    description: { type: String,default: null},
    title: { type: String,default: null},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Offers', schema);

