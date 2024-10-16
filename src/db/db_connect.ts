import mongoose from "mongoose";

const uri = process.env.MONGO_URI || 'mongodb+srv://punkimen666:123qweasdzxc@cluster0.pvkpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0\n' +
  '.net/?retryWrites=true&w=majority&appName=Cluster0';
export const connect = async () => await mongoose.connect(uri);