var _a;
import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
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
export default ((_a = mongoose.model) === null || _a === void 0 ? void 0 : _a.Users) || mongoose.model("User", UserSchema);
