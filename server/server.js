import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from './model/Recipe.js';
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

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
    console.log(`This server is running on PORT ${PORT}`);
});