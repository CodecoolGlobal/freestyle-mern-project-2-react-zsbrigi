function DeleteRecipe({ onDeleteRecipe, id }) {
  async function handleClick() {
    try {
      const httpResponse = await fetch(`/api/user/recipes/${id}`, {
        method: "DELETE",
      });
      const removedRecipe = await httpResponse.json();
      onDeleteRecipe(removedRecipe);
    } catch (error) {
      console.error(error);
    }
  }
  return <button onClick={handleClick}>Delete recipe</button>;
}

export default DeleteRecipe;
