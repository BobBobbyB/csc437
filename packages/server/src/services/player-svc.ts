import mongoose, { Schema, Document, Model } from "mongoose";
import { Player } from "../models/player";

// Extend Player with Mongo document fields
interface PlayerDoc extends Player, Document {}

// --- Schema definition (no generics or inferred unions) ---
const PlayerSchema = new mongoose.Schema({
    userid: { type: String, required: true, trim: true },
    name: { type: String },
    team: { type: String },
    ppg: { type: Number },
  });
  
  // --- Safe model creation (no union overloads) ---
const PlayerModel: any =
    (mongoose.models as any).Player || mongoose.model("Player", PlayerSchema);
  
// ---------- CRUD operations ----------
function index(): Promise<PlayerDoc[]> {
  return PlayerModel.find().exec();
}

function get(userid: string): Promise<PlayerDoc | null> {
  return PlayerModel.findOne({ userid }).exec();
}

function create(json: Player): Promise<PlayerDoc> {
  const doc = new PlayerModel(json);
  return doc.save();
}

function update(userid: string, json: Player): Promise<PlayerDoc | null> {
  return PlayerModel.findOneAndUpdate({ userid }, json, { new: true }).exec();
}

function remove(userid: string): Promise<void> {
  return PlayerModel.findOneAndDelete({ userid }).exec().then(() => {});
}

export default { index, get, create, update, remove };
