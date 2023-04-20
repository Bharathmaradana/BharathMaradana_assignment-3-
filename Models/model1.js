// const mongoose = require('mongoose');

// const placeschema = new mongoose.Schema({
//   subject: { type: String, required: true },

//   Topic: { type: String, required: true },

//   startingDate: { type: String, required: true },

//   EndingDate: { type: String, required: true },

//   Hours: { type: Number, required: true },

//   Done: {type: Boolean},

//   Notyet: {type: Boolean},

//   creator: { type: mongoose.Types.ObjectId, required: true, ref: "userschema" },
// });

// module.exports = mongoose.model('placeschema',placeschema)

const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  phoneNumber: { type: Number, required: true },
  website: { type: String, required: true },
  likes: { type: Number },
});

module.exports = mongoose.model("userschema", userschema);
