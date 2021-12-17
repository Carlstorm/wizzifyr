import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  chosenone: {type: Boolean},
  hash: ""
});

const User = mongoose.model("User", userSchema);
export default User;
