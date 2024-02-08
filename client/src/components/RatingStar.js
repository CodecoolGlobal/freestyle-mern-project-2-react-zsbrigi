import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function HandleRatingStar({ ingredient, onSetRatings }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  async function handleNewRating() {
    const selectedDish = [rating, ingredient._id, 1];
    console.log("The rating: ", rating);
    console.log("The id: ", ingredient._id);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDish),
      };

      const response = await fetch("/api/recipes", options);
      const responseData = await response.json();
      console.log(responseData);
      onSetRatings(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateRating() {
    try {
      const selectedDish = {
        rating: rating,
      };
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDish),
      };
      const response = await fetch(`/api/recipes/${ingredient._id}`, options);
      const responseData = await response.json();
      console.log("Server response:", responseData);
      onSetRatings(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRating() {
    if (!ingredient.ratings || ingredient.ratings.length === 0) {
      await handleNewRating();
    } else {
      await updateRating();
    }
  }

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRate = index + 1;
        return (
          <>
            <label>
              <input
                type="radio"
                name="rating"
                value={currentRate}
                onClick={() => setRating(currentRate)}
              />
              <FaStar
                className="star"
                size={35}
                color={currentRate <= (hover || rating) ? "yellow" : "grey"}
                onMouseEnter={() => setHover(currentRate)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          </>
        );
      })}
      <button className="saveRatingButton" onClick={() => handleRating()}>Save Rating</button>
    </>
  );
}
