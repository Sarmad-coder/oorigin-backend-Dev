const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    title: { type: String,required: true},
    tagLine: { type: String,required: true},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('SubCategory', schema);

