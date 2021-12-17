import mongoose from "mongoose";

const wishShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {type: String},
  received: {type: Boolean},
  liked: {type: Boolean},
  img: {type: String},
  date: {type: Date},
  links: {type: Array},
  comments: {type: Array}
});

const Wish = mongoose.model("Wish", wishShema);
export default Wish;
