const mongoose = require("mongoose");

// Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
});

// Model
const ContactModel = mongoose.model("contact", contactSchema);

module.exports = { ContactModel };