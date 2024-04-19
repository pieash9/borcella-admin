import mongoose from "mongoose";

let isConnected: Boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Borcella_Admin",
    });

    isConnected = true;
    console.log("MongoDB Connected.");
  } catch (error) {
    console.log(error);
  }
};
