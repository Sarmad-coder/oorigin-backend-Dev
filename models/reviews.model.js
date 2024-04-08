const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number,required: true},
    review_from: { type: String,required: true},
    review_reply: { type: String,defaut :null},
    review: { type: String,required: true},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Reviews', schema);

