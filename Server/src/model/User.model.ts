import mongoose from "mongoose";

interface Iuser {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export const UserSchema = new mongoose.Schema<Iuser>({
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },

});

// @ts-ignore
export default mongoose.model?.Users || mongoose.model("User", UserSchema);
