import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from './model/Recipe.js';
import Comment from "./model/Comment.js";


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

app.get("/api/comments", async (req, res) => {
    const comments = await Comment.find();
    res.json(comments)
})

app.post("/api/comments", async (req, res) => {
    try {
        const comment = req.body.newComment;
        const recipeId = req.body.recipeIds
        console.log(recipeId.recipeIds)
        const createdAt = Date.now();
        const newComment = new Comment({
            comment,
            createdAt,
            recipe: recipeId.recipeIds

        })
        const savedComment = await newComment.save()
        res.json(savedComment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false })
    }
})

app.delete("/api/comments/:id", async (req, res) => {
    const commentId = req.params.id
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        res.json({status: "deleted"})
    } catch (error) {
        console.error(error)
    }
})


app.get("/api/beef", async (req, res) => {
    const beefDishes = await Recipe.find({ type: "beef" })
    res.json(beefDishes)
})

app.get("/api/chicken", async (req, res) => {
    const chickenDishes = await Recipe.find({ type: "chicken" })
    res.json(chickenDishes)
})

app.get("/api/pasta", async (req, res) => {
    const pastaDishes = await Recipe.find({ type: "pasta" })
    res.json(pastaDishes)
})

app.get("/api/dessert", async (req, res) => {
    const dessertDishes = await Recipe.find({ type: "dessert" })
    res.json(dessertDishes)
})

app.get("/api/vegetarian", async (req, res) => {
    const vegetarianDishes = await Recipe.find({ type: "vegetarian" })
    res.json(vegetarianDishes)
})

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
    console.log(`This server is running on PORT ${PORT}`);
});