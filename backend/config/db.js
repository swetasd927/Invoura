import mongoose from "mongoose";

export  const connectDB = async () => {
  await mongoose.connect(MONGO_URI)
  .then(() => {console.log('DB Connected')});  
}
