import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BeefDish from "./model/BeefDishes.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 5000;



async function connectToMongoose() {
    await mongoose.connect(process.env.URL);
    console.log('The server is connected.');
}
connectToMongoose();

app.get("/", (req, res) => {
    res.send('The server is running.');
});

app.get("/api/beefDishes", async (req,res) => {
    
        const beefDishes = await BeefDish.find()
        res.json(beefDishes)
   
})





app.listen(PORT, () => {
    console.log(`This server is running on PORT ${PORT}`);
});