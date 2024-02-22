function AddToFavoriteButton({ recipe, onDeleteState, onAddState, favorites }) {
	const userId = localStorage.getItem('user');
	async function postRequest(recipe) {
		const httpResponse = await fetch(`/api/favorites?userId=${userId}`, {
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipe)
		})
		if (!httpResponse.ok) {
			throw new Error("Error during add to Favorites.");
		}
		const newRecipe = await httpResponse.json();
		onAddState(newRecipe);
		return newRecipe;
	}

	async function userUpdate(newRecipeId) {
		const httpResponse = await fetch(`/api/users/${userId}`, {
			method: 'PATCH',
			headers:
			{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ favorites: newRecipeId })
		})
		if (!httpResponse.ok) {
			throw new Error("Error during add to Favorites.");
		}
		const recipeId = await httpResponse.json();
		return recipeId;
	}

	async function deleteRequest(name) {
		const httpResponse = await fetch(`/api/favorites/${name}`, {
			method: "DELETE"
		})
		if (!httpResponse.ok) {
			throw new Error("Error during add to Favorites.");
		}
		onDeleteState(name);
		return httpResponse;
	}

	function isAddedToFavorite(mealName) {
		return favorites.some(favRecipe => favRecipe.mealName === mealName);
	}

	async function handleUpdateButton(recipe) {
		const isAddedOrNot = isAddedToFavorite(recipe.mealName);
		if (isAddedOrNot) {
			await deleteRequest(recipe.mealName);
			console.log('deleted');
		}
		else {
			await postRequest(recipe);
			await userUpdate(recipe._id);
			console.log('posted');
		}
	}

	return (
		<>
			<button className="addToFavorites" onClick={() => handleUpdateButton(recipe)}>{!isAddedToFavorite(recipe.mealName) ? "Add To Favorites" : "Remove From Favorites"}</button>
		</>
	)
}

export default AddToFavoriteButton;