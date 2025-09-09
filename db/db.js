// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()

// const connectDb=async ()=>{
    
//     try {
//       await mongoose.connect(process.env.MONGODB_URL)  
//       console.log('db connected')
//     } catch (error) {
//         console.log(error)
//     }   
// }
// export default connectDb



import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDb = async () => {
  if (isConnected) {
    return; // Skip if already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDb;
