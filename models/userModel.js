import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, " Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    phone: {
      type: String,
      required: [true, "phone number is require"],
    },
    address: {
      type: String,
      required: [true, "address is require"]
    },
    answer: {
      type: String,
      required: [true, "address is require"]
    },
    photo:{
      type: String,
      
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// middelwares
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.pre("findOneAndUpdate", async function (next) {
  // Get the update object
  const update = this.getUpdate();

  // Check if the password is being updated
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};


export default mongoose.model("User", userSchema);
