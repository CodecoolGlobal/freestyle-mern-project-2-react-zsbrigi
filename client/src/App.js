import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import BeefDishes from "./components/BeefDishes.js"

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const httpResponse = await fetch('/api/recipes');
        const allRecipe = await httpResponse.json();
        setRecipes(allRecipe);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipes();
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1400,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="App">


      <Slider {...sliderSettings}>
        {recipes.map(recipe => (
          <div key={recipe._id}>
            <h1>{recipe.mealName}</h1>
            <img src={`/src/Assets/${recipe.mealName.replaceAll(' ', '')}.jpg`} alt={recipe.mealName.replaceAll(' ', '')} />
            <table className='ingredients-table'>
              <thead>
                <tr>
                  <th>Ingredients</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map(ingredient => (
                  <tr key={ingredient.name}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>{recipe.description}</p>
            <p>{recipe.time}</p>
          </div>
        ))
        }
      </Slider >
    </div >

  );
}

export default App;
