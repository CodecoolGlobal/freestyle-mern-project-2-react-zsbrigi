import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./model/Recipe.js";

dotenv.config();
import path from "path";
import url from "url";
import UserRecipe from "./model/UserRecipe.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = 5000;

async function connectToMongoose() {
  await mongoose.connect(process.env.URL);
  console.log("The server is connected.");
  // console.log(__dirname);
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

app.get("/user/recipes", async (req, res) => {
  const userRecipes = await UserRecipe.find({});
  res.send(userRecipes);
});

app.get("/user/recipes/:id", async (req, res) => {
  const recipeID = req.params.id;
  if (recipeID !== -1) {
    const recipe = await UserRecipe.findOne({ _id: recipeID });
    res.send(recipe);
  }
});

// app.patch('/user/recipes/:id', async (req, res) => {
//     const recipeId = req.params.id;
//     const editedRecipe = await UserRecipe.findById(recipeId)
//     editedRecipe.mealName = req.body.mealName || editedRecipe.mealName;
//     editedRecipe.img = req.body.img || editedRecipe.img;
//     editedRecipe.ingredients = req.body.ingredients || editedRecipe.ingredients;
//     editedRecipe.description = req.body.description || editedRecipe.description;
//     editedRecipe.time = req.body.time || editedRecipe.time;
//     await editedRecipe.save();
//     res.send(editedRecipe);
// })

app.patch("/user/recipes/:id", async (req, res) => {
  const recipe = req.body;
  const recipeId = req.params.id;
  if (recipeId !== -1) {
    const updatedRecipe = {
      mealName: recipe.mealName,
      img: recipe.img,
      ingredients: recipe.ingredients,
      description: recipe.description,
      time: recipe.time,
    };
    const newUpdatedRecipe = await UserRecipe.updateOne(
      { _id: recipeId },
      { $set: updatedRecipe }
    );
    res.send(newUpdatedRecipe);
  }
});

app.post("/user/recipes", async (req, res) => {
  const mealName = req.body.mealName;
  const img = req.body.img;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const time = req.body.time;
  const userRecipe = new UserRecipe({
    mealName,
    img,
    ingredients,
    description,
    time,
  });
  const newRecipe = await userRecipe.save();
  res.json(newRecipe);
});

app.delete("/user/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  if (recipeId !== -1) {
    await UserRecipe.deleteOne({ _id: recipeId });
    console.log(recipeId);
    return res.json({ id: recipeId });
  }
});

app.use(express.static(path.join(__dirname, "../client")));

app.listen(PORT, () => {
  console.log(`This server is running on PORT ${PORT}`);
});
