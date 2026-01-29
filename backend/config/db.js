import mongoose from "mongoose";

export  const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dahalsweta5_db_user:invoura29jan@cluster0.wpmanse.mongodb.net/Invoura')
  .then(() => {console.log('DB Connected')});  
}
