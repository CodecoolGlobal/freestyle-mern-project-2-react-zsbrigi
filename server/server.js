import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./model/Recipe.js";
import Favorite from "./model/Favorite.js";

dotenv.config();
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
const PORT = 5000;

app.use(express.static(path.join(__dirname, "../client")));

async function connectToMongoose() {
  await mongoose.connect(process.env.URL);
  console.log("The server is connected.");
  console.log(__dirname);
}
connectToMongoose();

app.get("/api/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.get("/api/beef", async (req, res) => {
  const beefDishes = await Recipe.find({ type: "beef" });
  res.json(beefDishes);
});

app.get("/api/chicken", async (req, res) => {
  const chickenDishes = await Recipe.find({ type: "chicken" });
  res.json(chickenDishes);
});

app.get("/api/pasta", async (req, res) => {
  const pastaDishes = await Recipe.find({ type: "pasta" });
  res.json(pastaDishes);
});

app.get("/api/dessert", async (req, res) => {
  const dessertDish = await Recipe.find({ type: "dessert" });
  res.json(dessertDish);
});

app.get("/api/vegetarian", async (req, res) => {
  const vegetarianDishes = await Recipe.find({ type: "vegetarian" });
  res.json(vegetarianDishes);
});

app.post("/api/favorites", (req, res) => {
  console.log("request: ", req.body);

  const mealName = req.body.mealName;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const time = req.body.time;
  const type = req.body.type;

  const favorite = new Favorite({
    mealName,
    ingredients,
    description,
    time,
    type,
  });

  favorite
    .save()
    .then((favorite) => res.json(favorite))
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.delete('/api/favorites', (req, res) => {
    const favoriteDishId = req.params._id;
    
})

app.listen(PORT, () => {
  console.log(`This server is running on PORT ${PORT}`);
});
