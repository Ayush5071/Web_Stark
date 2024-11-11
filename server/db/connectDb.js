import mongoose from "mongoose";
import tunnel from 'tunnel';
 
const proxy = tunnel.httpsOverHttp({
    proxy: {
        host: 'proxy-ip',
        port: 3128,
        proxyAuth: 'edcguest:edcguest', // username and password
    },
});

export const connectDb = async() => {
    try {
        const uri = process.env.MONGO_URI;
        if(!uri){
            throw new Error("mongo uri is not efiend in env variable");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
             agent:proxy,
        });
        console.log("db connected");
    } catch (error) {
        console.log("error connecting to db",error.message);               
    }
}