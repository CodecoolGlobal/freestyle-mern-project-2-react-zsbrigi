import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import { useParams } from "react-router-dom";
import Header from "../mainPage Components/Header.js";
import CommentSection from "./Comments.js";
import HandleSaveButton from "./SaveButton.js";

function Dishes() {
	const [recipes, setRecipes] = useState([]);
	let { dishType } = useParams();
	console.log(dishType);

	useEffect(() => {
		async function fetchdata(url) {
			try {
				const response = await fetch(url)
				const data = await response.json()
				console.log(data)
				setRecipes(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchdata(`/api/${dishType}`)
	}, [dishType])

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
						<p>description: {dish.description}</p>
						<p>time: {dish.time}</p>
						<p>Ingredients:</p>
						<IngredientsTable recipe={dish}></IngredientsTable>
						<button
							onClick={() => {
								HandleSaveButton(dish, recipes)
							}
							}
						>
							Save
						</button>
						<CommentSection recipeIds={dish._id}></CommentSection>
					</div>
				))}
			</div>
		</>
	);
}

export default Dishes;
