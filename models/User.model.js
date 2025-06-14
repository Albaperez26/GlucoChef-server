const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: [true, 'username is required.'],
      unique: true

    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    photoURL: {
      type: String,
      required: false
    },
    typeofdiabetes: {
      type: Number,
      required: false
    },
    insulinaxracion: {
      type: Number,
      required: false
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user" //cualquir usuario x defecto es user normal
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
