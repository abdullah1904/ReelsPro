import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env file");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
            dbName: "reelspro"
        }
        cached.promise = mongoose.connect(MONGODB_URI,opts)
        .then(()=>mongoose.connection);
    }
    try{
        cached.conn = await cached.promise;
        return cached
    }
    catch(error){
        cached.promise = null;
        console.log(error);
        throw new Error("Check Database Connection");
    }
    return cached.conn;
}