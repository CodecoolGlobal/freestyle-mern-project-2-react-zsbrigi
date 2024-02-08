import { useState } from "react";

export default function NewRecipeForm({ onAddNewRecipe }) {
  const [mealName, setMealName] = useState("");
  const [img, setImg] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleAddNewRecipe = (event) => {
    event.preventDefault();
    const newRecipeDetails = {
      mealName,
      img,
      ingredientName,
      ingredientAmount,
      description,
      time,
    };
    fetch("/user/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipeDetails),
    })
      .then((response) => response.json())
      .then((newRecipe) => onAddNewRecipe(newRecipe))
      .catch((err) => console.error(err));
  };
  return (
    <form onSubmit={handleAddNewRecipe}>
      <label for="mealName">Meal Name:</label>
      <input
        value={mealName}
        id="mealName"
        onChange={(e) => setMealName(e.target.value)}
      ></input>
      <label for="img">Image:</label>
      <input
        value={img}
        id="img"
        onChange={(e) => setImg(e.target.value)}
      ></input>
      <label for="ingredientName">Ingredient Name:</label>
      <input
        value={ingredientName}
        id="ingredientName"
        onChange={(e) => setIngredientName(e.target.value)}
      ></input>
      <label for="ingredientAmount">Ingredient Amount:</label>
      <input
        value={ingredientAmount}
        id="ingredientAmount"
        onChange={(e) => setIngredientAmount(e.target.value)}
      ></input>
      <label for="description">Description:</label>
      <input
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label for="time">Time to make:</label>
      <input
        value={time}
        id="time"
        onChange={(e) => setTime(e.target.value)}
      ></input>
      <button type="submit">Add New Recipe</button>
    </form>
  );
}
