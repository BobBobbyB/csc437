import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.models.User as mongoose.Model<any> 
  || mongoose.model<any>("User", UserSchema);
export default UserModel;
