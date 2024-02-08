import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserRecipeSchema = new Schema ({
    mealName: String,
    img: String,
    ingredients: Array,
    description: String,
    time: String
});

export default model('UserRecipe', UserRecipeSchema);