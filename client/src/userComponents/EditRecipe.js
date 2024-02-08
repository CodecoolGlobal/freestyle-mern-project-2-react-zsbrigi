import React, { useState } from "react";

export default function EditRecipe({ id, update, onEditRecipe }) {
  const [isEdited, setIsEdited] = useState(false)
  const [editedRecipe, setEditedRecipe] = useState(null)

  const handleEditClick = () => {
    setIsEdited(true)
    setEditedRecipe(update);
  }

  const handleEditRecipe = async () => {
    const httpResponse = await fetch(`/user/recipes/${id}`, {
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
        <>
          <label for="mealName">Meal Name:</label>
          <input
            value={editedRecipe.mealName}
            id="mealName"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, mealName: e.target.value }))}
          ></input>
          <label for="img">Image:</label>
          <input
            value={editedRecipe.img}
            id="img"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, img: e.target.value }))}
          ></input>
          <label for="ingredientName">Ingredient Name:</label>
          <input
            value={editedRecipe.ingredientName}
            id="ingredientName"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, ingredientName: e.target.value }))}
          ></input>
          <label for="ingredientAmount">Ingredient Amount:</label>
          <input
            value={editedRecipe.ingredientAmount}
            id="ingredientAmount"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, ingredientAmount: e.target.value }))}
          ></input>
          <label for="description">Description:</label>
          <input
            value={editedRecipe.description}
            id="description"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, description: e.target.value }))}
          ></input>
          <label for="time">Time to make:</label>
          <input
            value={editedRecipe.time}
            id="time"
            onChange={(e) => setEditedRecipe(prev => ({ ...prev, time: e.target.value }))}
          ></input>
          <button onClick={handleEditRecipe}>Save</button>
        </>
      }
    </>
  );
}
