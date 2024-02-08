import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    mealName: String,
    ingredients: Array,
    description: String,
    time: String,
    type: String,
    ratings: [Number],
    userVotes: Number
})

export default model('Recipe', recipeSchema);