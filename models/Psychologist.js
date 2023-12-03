import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateID } from "../helpers/generateID.js";

// psychologist model

const psychologistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generateID(),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

// hassing ans salting password

psychologistSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

psychologistSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

export const Psychologist = mongoose.model("Psychologist", psychologistSchema);
