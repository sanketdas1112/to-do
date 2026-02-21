//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
});

connectDB()








/*
import express from express
const app = express();

(
    async() => {
        try{
            mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
            app.on("Error", (error)=>{
                console.log("Error: ", error);
            })

            app.listen(process.env.PORT, ()=>{
                console.log(`App is listening to port ${process.env.PORT}`);
            })
        }catch(error){
            console.log("Error: ", error);
        }
    }
)()

*/