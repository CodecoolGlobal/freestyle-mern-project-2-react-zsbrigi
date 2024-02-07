import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import { useParams } from "react-router-dom";
import Header from "../mainPage Components/Header.js";

function Dishes() {
	const [beefDishes, setBeefdishes] = useState([]);
	let { dishType } = useParams();
	console.log(dishType);

	useEffect(() => {
		async function fetchdata(url) {
			try {
				const response = await fetch(url)
				const data = await response.json()
				console.log(data)
				setBeefdishes(data)
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
				{beefDishes.map((dish) => (
					<div className="dish" key={dish._id}>
						<h1>{dish.mealName}</h1>
						<img src={`/src/Assets/${dish.mealName.replaceAll(" ", "")}.jpg`} alt={dish.mealName}></img>
						<p>description: {dish.description}</p>
						<p>time: {dish.time}</p>
						<p>Ingredients:</p>
						<IngredientsTable recipe={dish}></IngredientsTable>
						<button>Save</button>
					</div>
				))}
			</div>
		</>
	)

}

export default Dishes