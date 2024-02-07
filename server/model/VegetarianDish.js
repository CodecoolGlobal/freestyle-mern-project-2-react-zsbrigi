import { Schema, model } from "mongoose"

const ingredientSchema = new Schema({
    name: String,
    amount: String
});

const vegetarianDishSchema = new Schema({
    mealName: String,
    ingredients: [ingredientSchema],
    description: String,
    time: String
})

export default model('VegetarianDish', vegetarianDishSchema)