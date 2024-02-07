import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favoriteRecipeSchema = new Schema({
    mealName: String,
    ingredients: Array,
    description: String,
    time: String,
    type: String
})

export default model('Favorite', favoriteRecipeSchema);