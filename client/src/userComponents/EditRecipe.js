import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
export default function EditRecipe({ id, update, onEditRecipe }) {
  const [editedRecipe, setEditedRecipe] = useState(null)

  useEffect(() => {
    setEditedRecipe(update);
  }, [update])

  const handleEditRecipe = async (event) => {
    event.preventDefault();
    const httpResponse = await fetch(`/api/user/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedRecipe)
    })
    const updatedRecipe = await httpResponse.json();
    console.log(updatedRecipe);
    onEditRecipe(updatedRecipe)
  };

  return (
    <>
      {editedRecipe &&
        <Popup trigger={<button>Edit recipe</button>}
          position="right bottom">
          <form onSubmit={handleEditRecipe}>
            <label htmlFor="mealName">Meal Name:</label>
            <input
              value={editedRecipe.mealName}
              id="mealName"
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, mealName: e.target.value }))}
            ></input> <br />
            <label htmlFor="img">Image:</label>
            <input
              value={editedRecipe.img}
              id="img"
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, img: e.target.value }))}
            ></input> <br />
            <label htmlFor="ingredients">Ingredients:</label>
            <input
              value={editedRecipe.ingredients}
              id="ingredients"
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, ingredients: e.target.value }))}
            ></input> <br />
            <label htmlFor="description">Description:</label>
            <input
              value={editedRecipe.description}
              id="description"
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, description: e.target.value }))}
            ></input> <br />
            <label htmlFor="time">Time to make:</label>
            <input
              value={editedRecipe.time}
              id="time"
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, time: e.target.value }))}
            ></input> <br />
            <button type="submit">Save</button>
          </form>
        </Popup>
      }
    </>
  );
}
