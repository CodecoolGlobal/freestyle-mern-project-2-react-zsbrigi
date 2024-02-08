import React, { useState } from "react";

export default function EditRecipe({ id, update, onEditRecipe }) {
  const [isEdited, setIsEdited] = useState(false)
  const [editedRecipe, setEditedRecipe] = useState(null)

  const handleEditClick = () => {
    setIsEdited(true)
    setEditedRecipe(update);
  }

  const handleEditRecipe = async (event) => {
    event.preventDefault();
    const httpResponse = await fetch(`/api/user/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedRecipe)
    })
    const updatedRecipe = await httpResponse.json();
    console.log(updatedRecipe);
    setIsEdited(false);
    onEditRecipe(updatedRecipe)
  };

  return (
    <>
      <button onClick={handleEditClick}>Edit recipe</button>
      {isEdited &&
        <form onSubmit={handleEditRecipe}>
          <label htmlFor="mealName">Meal Name:</label>
          <input
            value={editedRecipe.mealName}
            id="mealName"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, mealName: e.target.value }))}
          ></input>
          <label htmlFor="img">Image:</label>
          <input
            value={editedRecipe.img}
            id="img"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, img: e.target.value }))}
          ></input>
          <label htmlFor="ingredientName">Ingredient Name:</label>
          <input
            value={editedRecipe.ingredientName}
            id="ingredientName"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, ingredientName: e.target.value }))}
          ></input>
          <label htmlFor="ingredientAmount">Ingredient Amount:</label>
          <input
            value={editedRecipe.ingredientAmount}
            id="ingredientAmount"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, ingredientAmount: e.target.value }))}
          ></input>
          <label htmlFor="description">Description:</label>
          <input
            value={editedRecipe.description}
            id="description"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, description: e.target.value }))}
          ></input>
          <label htmlFor="time">Time to make:</label>
          <input
            value={editedRecipe.time}
            id="time"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, time: e.target.value }))}
          ></input>
          <button type="submit">Save</button>
        </form>
      }
    </>
  );
}
