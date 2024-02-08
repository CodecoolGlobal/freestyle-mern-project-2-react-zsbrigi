import { useState } from "react";

export default function NewRecipeForm({ onAddNewRecipe }) {
  const [mealName, setMealName] = useState("");
  const [img, setImg] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleAddNewRecipe = (event) => {
    event.preventDefault();
    const newRecipeDetails = {
      mealName,
      img,
      ingredients,
      description,
      time,
    };
    fetch("/api/user/recipes", {
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
      <label htmlFor="mealName">Meal Name:</label>
      <input
        value={mealName}
        id="mealName"
        onChange={(e) => setMealName(e.target.value)}
      ></input> <br />
      <label htmlFor="img">Image:</label>
      <input
        value={img}
        id="img"
        onChange={(e) => setImg(e.target.value)}
      ></input> <br />
      <label htmlFor="ingredients">Ingredients:</label>
      <input
        value={ingredients}
        id="ingredients"
        onChange={(e) => setIngredients(e.target.value)}
      ></input> <br />
      <label htmlFor="description">Description:</label>
      <input
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input> <br />
      <label htmlFor="time">Time to make:</label>
      <input
        value={time}
        id="time"
        onChange={(e) => setTime(e.target.value)}
      ></input> <br />
      <button type="submit">Add New Recipe</button>
    </form>
  );
}
