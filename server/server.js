import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ChickenDish from "./model/ChickenDish.js";
import BeefDish from "./model/BeefDishes.js";
import Recipe from './model/Recipe.js';
import DessertDish from "./model/DessertDish.js";
import PastaDish from "./model/PastaDish.js";
import VegetarianDish from "./model/VegetarianDish.js"

dotenv.config();
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = 5000;



async function connectToMongoose() {
    await mongoose.connect(process.env.URL);
    console.log('The server is connected.');
    console.log(__dirname);
}
connectToMongoose();

app.get("/api/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});


app.get("/api/beefDishes", async (req,res) => {   
        const beefDishes = await BeefDish.find()
        res.json(beefDishes)  
})

app.get("/api/chickenDishes", async (req,res) => {   
    const chickenDishes = await ChickenDish.find()
    res.json(chickenDishes)  
})

app.get("/api/pastaDishes", async (req,res) => {   
    const pastaDishes = await PastaDish.find()
    res.json(pastaDishes)  
})

app.get("/api/dessertDishes", async (req,res) => {   
    const dessertDish = await DessertDish.find()
    res.json(dessertDish)  
})

app.get("/api/vegetarianDishes", async (req,res) => {   
    const vegetarianDishes = await VegetarianDish.find()
    res.json(vegetarianDishes)  
})




app.use(express.static(path.join(__dirname, '../client')));


app.listen(PORT, () => {
    console.log(`This server is running on PORT ${PORT}`);
});