import { useEffect, useState } from "react"
import IngredientsTable from "./IngredientsTable";

function ChickenDishes() {
	const [chickenDishes, setChickenDishes] = useState([])


	useEffect(() => {
		async function fetchdata(url) {
			try {
				const response = await fetch(url)
				const data = await response.json()
				console.log(data)
				setChickenDishes(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchdata("/api/chickenDishes")
	}, [])

	return (
		<div className="recipeList">
			{chickenDishes.map((dish) => (
				<div className="dish" key={dish._id}>
					<h2>{dish.mealName}</h2>
					<img src={`/src/Assets/${dish.mealName.replaceAll(" ", "")}.jpg`} alt={dish.mealName}></img>
					<p>description: {dish.description}</p>
					<p>time: {dish.time}</p>
					<p>Ingredients:</p>
					<IngredientsTable recipe={dish}></IngredientsTable>
					<button>Save</button>
				</div>
			))}
		</div>
	)

}

export default ChickenDishes