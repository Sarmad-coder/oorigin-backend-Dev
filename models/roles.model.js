const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({

    role_name: { type: String,required: true},
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
},{ timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Roles', schema);

