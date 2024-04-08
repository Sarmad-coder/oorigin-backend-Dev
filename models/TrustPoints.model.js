const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    fb_verified: { type: Boolean, default: false  },
    linkedin_verified: { type: Boolean, default: false  },
   phone_verified: { type: Boolean, default: false  },
    email_verified: { type: Boolean, default: false  },
   // whatsapp_verified: { type: Boolean, default: false  },
    totalpoints:{ type: Number, default: null  }
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('TrustPoints', schema);

