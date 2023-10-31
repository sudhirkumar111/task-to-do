import mongoose from 'mongoose'
const connectDB =async ()=>{
    try{
       await mongoose.connect('mongodb+srv://connectsudhirkumar:aOx5J7EyNcM5LAJ2@cluster0.oirzqnc.mongodb.net/todo');

       console.log("connect to database")

    }
    catch(error){
        console.log("Db connection failed",error)
    }
}
export default connectDB

