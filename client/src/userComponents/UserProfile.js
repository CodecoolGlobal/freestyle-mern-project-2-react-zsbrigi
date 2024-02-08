import Popup from "reactjs-popup";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import NewRecipeForm from "./NewRecipeForm";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";

function UserProfile() {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/user/recipes");
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
      {userRecipes.length > 0 && (
        <div className="userRecipes">
          {userRecipes.map((userRecipe) => {
            return (
              <div className="userRecipe">
                <h3>{userRecipe.mealName}</h3>
                <h3>{userRecipe._id}</h3>
                <EditRecipe update={userRecipe} id={userRecipe._id} onEditRecipe={handleEditRecipe} />
                <DeleteRecipe
                  onDeleteRecipe={handleDeleteRecipe}
                  id={userRecipe._id}
                />
              </div>
            );
          })}
        </div>
      )}
      <Popup
        trigger={<button> Add new Recipe!</button>}
        position="right center"
      >
        <NewRecipeForm onAddNewRecipe={handleNewRecipe} />
      </Popup>
    </>
  );
}

export default UserProfile;
