
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const schema = new Schema({
  role: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
  password: { type: String, default: null },
  profile_image: { type: String, default: null },
  email: { type: String,  required: true }, 
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
  pcountry_code: { type: String,  default: null }, 
  wcountry_code: { type: String,  default: null }, 
   phonenum: { type: String,  default: null ,unique: false },
   whatsappnum: { type: String,  default: null ,unique: false },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  login_method: { type: String, enum: ['Google', 'Custom'], default: 'Active' }, 
  social_name: { type: String, default: null ,unique: false  },
  social_id: { type: String, default: null ,unique: true  },
lastname: { type: String,  default: null  },
  firstname: { type: String,  default: null  },
  country: { type: String,  default: null  },
  city: { type: String,  default: null  },
  state: { type: String,  default: null  },
  username: { type: String, default: null  },
  language: { type: Array, default: null  },
  time_zone: { type: String, default: null  },
  two_fa: { type: Boolean,default: false},///// 2FA
  description: { type: String, default: null  },
  title: { type: String, default: null },
  address: { type: String,  default: null  },
  avgrating: { type: Number,  default: null  },
  // amount: { type: String,  default: null ,unique: false },
  // payment_method: { type: String, enum: ['Cash', 'Crypto','UPI','Credit/debit',''], default: '' },
  dob: { type: String,  default: null  },

 fathername: { type: String,  default: null ,unique: false },

},{ timestamps: true });

// Hash the password before saving to the database
schema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('User', schema);




