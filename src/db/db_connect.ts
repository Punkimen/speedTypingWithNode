import mongoose from "mongoose";

const uri = process.env.MONGO_URI || '';
export const connect = () => mongoose.connect(uri);