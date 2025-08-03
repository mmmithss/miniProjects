import mongoose from "mongoose";

// @ts-check
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  email: {
    type: String
  },
  notes: {
    type: String
  }
}, {timestamps: true});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
