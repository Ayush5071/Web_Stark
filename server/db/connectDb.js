import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        const uri = process.env.MONGO_URI;
        if(!uri){
            throw new Error("mongo uri is not efiend in env variable");
        }

        await mongoose.connect(uri);
        console.log("db connected");
    } catch (error) {
        console.log("error connecting to db",error.message);               
    }
}