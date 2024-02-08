function DeleteRecipe({ onDeleteRecipe, id }) {
  async function handleClick() {
    try {
      console.log(id);
      const httpResponse = await fetch(`/user/recipes/${id}`, {
        method: "DELETE",
      });
      const removedRecipe = await httpResponse.json();
      onDeleteRecipe(removedRecipe);
      console.log(removedRecipe);
    } catch (error) {
      console.error(error);
    }
  }
  return <button onClick={handleClick}>Delete recipe</button>;
}

export default DeleteRecipe;
