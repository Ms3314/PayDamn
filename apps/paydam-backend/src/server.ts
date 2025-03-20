import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000

//middleware 
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message : "testing the server"
    })
})

app.listen(PORT ,()=>{
    console.log(`Server is running on port : ${PORT}`);
})