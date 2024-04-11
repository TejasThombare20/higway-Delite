var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
let isConnected = false;
// const URI = process.env.MONGODB_URI!;
const URI = "mongodb+srv://tejas:tejas@cluster0.o2ucgqs.mongodb.net/?retryWrites=true&w=majority";
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        yield mongoose.connect(URI, {
            dbName: "HighwayDelite",
        });
        console.log("MongoDB connected");
        isConnected = true;
    }
    catch (error) {
        console.log(error);
    }
});
export default connectToDB;
