import mongoose from "mongoose";


let isConnected = false;

// const URI = process.env.MONGODB_URI!;
const URI = "mongodb+srv://tejas:tejas@cluster0.o2ucgqs.mongodb.net/?retryWrites=true&w=majority"

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(URI, {
      dbName: "HighwayDelite",
    });
    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;