import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import dotenv from "dotenv"; // Import dotenv
dotenv.config(); // Load environment variables from .env
 

const app = express();
const PORT = process.env.PORT || 3000

//middleware 
app.use(cors());
app.use(express.json());
app.use(express.json());
// this is the main server route that is handling the details 

app.use('/api/v1/user' , userRouter);
app.use("/api/v1/auth" , authRouter);

app.listen(PORT ,()=>{
    console.log(`Server is running on port : ${PORT}`);
})