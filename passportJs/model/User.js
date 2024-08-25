import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  googleId: {
    type: String,
  },
});

export const User = model("User", userSchema);
