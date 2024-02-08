import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import { useParams } from "react-router-dom";
import Header from "../mainPage Components/Header.js";
import HandleSaveButton from "./SaveButton.js";
import HandleRatingStar from "./RatingStar.js";
import GetSumOfRatings from "./RatingCalculator.js";

function Dishes() {
  const [beefDishes, setBeefdishes] = useState([]);
  const [rating, setRating] = useState([]);
  let { dishType } = useParams();
  console.log(dishType);

  useEffect(() => {
    async function fetchdata(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setBeefdishes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchdata(`/api/${dishType}`);
  }, [dishType, rating]);

function handleSetState(responseData) {
setRating((prev) => [...prev, responseData])
}

  return (
    <>
      <Header></Header>
      <div className="recipeList">
        {beefDishes.map((dish) => (
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
            <HandleRatingStar 
            ingredient={dish}
            onSetRatings={handleSetState} />
            {dish.ratings && dish.ratings.length > 0 ? (
              <div className="averageRating">
                <h3>The average rating is: < GetSumOfRatings
                dish={dish}
                /> </h3>
              </div>
            ) : (
              <div className="averageRating">
                <h3>No one has rated it yet</h3>
              </div>
            )}
            <button
              onClick={() => {
                HandleSaveButton(dish, beefDishes);
              }}
            >
              Add to favorites
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dishes;
