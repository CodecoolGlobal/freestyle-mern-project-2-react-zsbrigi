import Popup from "reactjs-popup";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import NewRecipeForm from "./NewRecipeForm";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";
import TableForIngredients from "./TableForIngredients";
import Header from "../mainPage Components/Header";

function UserProfile() {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/user/recipes");
      const userRecipes = await response.json();
      setUserRecipes(userRecipes);
    }
    fetchData();
  }, []);

  const handleNewRecipe = (newRecipe) => {
    setUserRecipes([...userRecipes, newRecipe]);
  };

  const handleDeleteRecipe = (removedRecipe) => {
    setUserRecipes((prev) =>
      prev.filter((recipe) => recipe._id !== removedRecipe.id)
    );
  };

  const handleEditRecipe = (updatedRecipe) => {
    setUserRecipes(recipes => recipes.map(recipe => recipe._id === updatedRecipe._id ? { ...recipe, ...updatedRecipe } : recipe))
  }

  return (
    <>
      <Header />
      <div className="userProfile">
        {userRecipes.length > 0 && (
          <div className="userRecipes">
            {userRecipes.map((userRecipe) => {
              return (
                <div className="userRecipe" key={userRecipe._id}>
                  <h1>{userRecipe.mealName}</h1>
                  <img src={userRecipe.img} alt="UserImage" />
                  <TableForIngredients ingredients={userRecipe.ingredients}></TableForIngredients>
                  <p>{userRecipe.description}</p>
                  <p>{userRecipe.time}</p>
                  <DeleteRecipe
                    onDeleteRecipe={handleDeleteRecipe}
                    id={userRecipe._id}
                  />
                  <EditRecipe update={userRecipe} id={userRecipe._id} onEditRecipe={handleEditRecipe} />
                </div>
              );
            })}
          </div>
        )}
        <Popup
          trigger={<button className="popupButton"> Add new Recipe!</button>}
          position="bottom center"
        >
          <NewRecipeForm onAddNewRecipe={handleNewRecipe} />
        </Popup>
      </div>
    </>
  );
}

export default UserProfile;
