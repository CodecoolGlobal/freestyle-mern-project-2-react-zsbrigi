import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    mealName: String,
    ingredients: Array,
    description: String,
    time: String,
    type: String,
    ratings: [Number],
    userVotes: Number,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

export default model('Recipe', recipeSchema);