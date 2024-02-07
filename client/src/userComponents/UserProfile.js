import Popup from "reactjs-popup";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import NewRecipeForm from "./NewRecipeForm";
import DeleteRecipe from "./DeleteRecipe";

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
    console.log(`POST: ${userRecipes}`);
  };

  const handleDeleteRecipe = (removedRecipe) => {
    console.log(`DELETE: ${userRecipes}`);
    console.log(removedRecipe.id);
    setUserRecipes((prev) =>
      prev.filter((recipe) => recipe._id !== removedRecipe.id)
    );
  };
  console.log(`GLOBAL: ${userRecipes}`);
  return (
    <>
      {userRecipes.length > 0 && (
        <div className="userRecipes">
          {userRecipes.map((userRecipe) => {
            return (
              <div className="userRecipe">
                <h3>{userRecipe.mealName}</h3>
                <h3>{userRecipe._id}</h3>
                <button>Edit Recipe</button>
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
