const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  profile: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  coords: {
    type: String,
    required: false
  }
});


UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});

UserSchema.plugin(uniqueValidator, { message: "Email already in use." });

const User = mongoose.model("user", UserSchema);
module.exports = User;
