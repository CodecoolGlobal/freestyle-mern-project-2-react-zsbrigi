import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import { useParams } from "react-router-dom";
import Header from "../mainPage Components/Header.js";
import CommentSection from "./Comments.js";
import AddToFavoriteButton from "./AddToFavoriteButton.js";

function Dishes() {
	const [recipes, setRecipes] = useState([]);
	const [favorites, setFavorites] = useState([]);
	let { dishType } = useParams();

	async function fetchFavorites() {
		const httpResponse = await fetch("/api/favorites");
		const favoriteRecipes = await httpResponse.json();
		setFavorites(favoriteRecipes);
	}

	useEffect(() => {
		async function fetchdata(url) {
			try {
				const response = await fetch(url)
				const data = await response.json()
				setRecipes(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchdata(`/api/${dishType}`);
		fetchFavorites();
	}, [dishType])

	function handleAddState(newRecipe) {
		setFavorites((prevRecipes) => [...prevRecipes, newRecipe]);
		fetchFavorites();
	}

	function deleteState(name) {
		setFavorites((prevRecipes) => prevRecipes.filter(favRecipe => favRecipe._id !== name));
		fetchFavorites();
	}

	return (
		<>
			<Header></Header>
			<div className="recipeList">
				{recipes.map((dish) => (
					<div className="dish" key={dish._id}>
						<h2>{dish.mealName}</h2>
						<img
							src={`/src/Assets/${dish.mealName.replaceAll(" ", "")}.jpg`}
							alt={dish.mealName}
						></img>
						<p><b>Description:</b> {dish.description}</p>
						<p><b>Time:</b> {dish.time}</p>
						<IngredientsTable recipe={dish}></IngredientsTable>
						<AddToFavoriteButton recipe={dish} favorites={favorites} onDeleteState={deleteState} onAddState={handleAddState}></AddToFavoriteButton>
						<CommentSection recipeIds={dish._id}></CommentSection>
					</div>
				))}
			</div >
		</>
	);
}

export default Dishes;
