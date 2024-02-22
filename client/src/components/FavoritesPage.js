import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import GetSumOfRatings from "./RatingCalculator";
import CommentSection from "./Comments";
import Header from "../mainPage Components/Header";

function FavoritePage() {
	const [user, setUser] = useState([]);
	const id = localStorage.getItem("user");

	useEffect(() => {
		fetch(`/api/loggedInUser/${id}`)
			.then((res) => res.json())
			.then((user) => setUser(user));
	}, [id])

	console.log(user);
	return (
		<>
			<Header />
			<div className="recipeList">
				{user && user.favorites ? (
					user.favorites.map((dish) => (
						<div className="dish" key={dish._id}>
							<h2>{dish.mealName}</h2>
							<img
								src={`/src/Assets/${dish.mealName.replaceAll(" ", "")}.jpg`}
								alt={dish.mealName}
							/>
							<p>
								<b>Description:</b> {dish.description}
							</p>
							<p>
								<b>Time:</b> {dish.time}
							</p>
							<IngredientsTable recipe={dish} />
							{dish.ratings && dish.ratings.length > 0 ? (
								<div className="averageRating">
									<h3>
										The average rating is: <GetSumOfRatings dish={dish} />{" "}
									</h3>
									<h3>{dish.userVotes} Users voted</h3>
								</div>
							) : (
								<div className="averageRating">
									<h3>No one has rated it yet</h3>
								</div>
							)}
							<CommentSection recipeIds={dish._id} />
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
export default FavoritePage;