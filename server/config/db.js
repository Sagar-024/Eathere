import mongoose from "mongoose"

const connect = async(url)=> {
   
   try{
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB successfully');
   }catch( e){
    console.error('❌ MongoDB connection error:', e.message);
    // Don't throw error, let the app continue without DB if needed
   }
}
export default connect ;