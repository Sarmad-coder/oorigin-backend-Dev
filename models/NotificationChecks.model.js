const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
   
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    task_invitation: { type: Boolean,default: false},
    bid_status: { type: Boolean,default: false},
    deadline_reminder: { type: Boolean,default: false},
    payment_alerts: { type: Boolean,default: false},
    message_alerts: { type: Boolean,default: false},
   
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('NotificationCheck', schema);

