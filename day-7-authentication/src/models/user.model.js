import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Usernmae Reuired"],
    unique: [true, " unique Username"],
  },
  email: {
    type: String,
    required: [true, "email Reuired"],
    unique: [true, " unique email"],
  },
  password: {
    type: String,
    required: [true, "password Reuired"],
    unique: [true, " unique password"],
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const userModel = mongoose.model('users', userSchema)

export default userModel