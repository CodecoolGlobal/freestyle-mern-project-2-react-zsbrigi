import { useEffect, useState } from "react";
import IngredientsTable from "./IngredientsTable";
import { useParams } from "react-router-dom";
import Header from "../mainPage Components/Header.js";
import CommentSection from "./Comments.js";
import AddToFavoriteButton from "./AddToFavoriteButton.js";
import HandleRatingStar from "./RatingStar.js";
import GetSumOfRatings from "./RatingCalculator.js";

function Dishes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  let { dishType } = useParams();

  async function fetchFavorites() {
    const httpResponse = await fetch("/api/favorites");
    const favoriteRecipes = await httpResponse.json();
    setFavorites(favoriteRecipes);
    console.log(favoriteRecipes);
  }

  useEffect(() => {
    async function fetchdata(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.dishes);
        setPageCount(data.pagination.pageCount);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(page);
    fetchdata(`/api/dishes/${dishType}?page=${page}`);
    fetchFavorites();
  }, [dishType, rating, page]);

  function handleAddState(newRecipe) {
    setFavorites((prevRecipes) => [...prevRecipes, newRecipe]);
    fetchFavorites();
  }

  function deleteState(name) {
    setFavorites((prevRecipes) =>
      prevRecipes.filter((favRecipe) => favRecipe._id !== name)
    );
    fetchFavorites();
  }

  function handleSetState(responseData) {
    setRating((prev) => [...prev, responseData]);
  }

  const handlerPreviousButon = () => {
    setPage((prev) => {
      if (page === 1) return 1;
      return prev - 1;
    });
  };
  console.log(typeof page);
  const handlerNextButton = () => {
    setPage((prev) => {
      if (page === pageCount) return prev;
      return prev + 1;
    });
  };

  return (
    <>
      <Header></Header>
      <header className="Pagination">
        <button className="Previous" onClick={() => handlerPreviousButon()}> Previous</button>
        {[...Array(pageCount)]
          .fill(null)
          .map((_, index) => {
            return (
              <span className="paginationSpan" key={index} onClick={() => setPage(index + 1)}>
                {index + 1}
              </span>
            );
          })}
        <button className="Next" onClick={handlerNextButton}>Next</button>
      </header>
      <div className="recipeList">
        {recipes.map((dish) => (
          <div className="dish" key={dish._id}>
            <h2>{dish.mealName}</h2>
            <img
              src={`/src/Assets/${dish.mealName.replaceAll(" ", "")}.jpg`}
              alt={dish.mealName}
            ></img>
            <p>
              <b>Description:</b> {dish.description}
            </p>
            <p>
              <b>Time:</b> {dish.time}
            </p>
            <IngredientsTable recipe={dish}></IngredientsTable>
            <AddToFavoriteButton
              recipe={dish}
              favorites={favorites}
              onDeleteState={deleteState}
              onAddState={handleAddState}
            ></AddToFavoriteButton>
            <HandleRatingStar ingredient={dish} onSetRatings={handleSetState} />
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
            <CommentSection recipeIds={dish._id}></CommentSection>
          </div>
        ))}
      </div>
      <header className="Pagination">
        <button className="Previous" onClick={() => handlerPreviousButon()}> Previous</button>
        {[...Array(pageCount)]
          .fill(null)
          .map((_, index) => {
            return (
              <span className="paginationSpan" key={index} onClick={() => setPage(index + 1)}>
                {index + 1}
              </span>
            );
          })}
        <button className="Next" onClick={handlerNextButton}>Next</button>
      </header>
    </>
  );
}

export default Dishes;
