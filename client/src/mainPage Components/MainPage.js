import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header.js';
import IngredientsTable from '../components/IngredientsTable.js';

function MaingPage() {
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
		autoplay: true,
		autoplaySpeed: 5000,
		//pauseOnHover: false
	};

	return (
		<div className="main">
			<Header></Header>
			<Slider {...sliderSettings}>
				{recipes.map(recipe => (
					<div key={recipe._id}>
						<h1>{recipe.mealName}</h1>
						<div className='flexBox'>
							<img className="mainImg" src={`/src/Assets/${recipe.mealName.replaceAll(' ', '')}.jpg`} alt={recipe.mealName.replaceAll(' ', '')} />
							<IngredientsTable recipe={recipe}></IngredientsTable>
						</div>
						<p>{recipe.description}</p>
						<p>{recipe.time}</p>
					</div>
				))
				}
			</Slider >
		</div>
	);
}

export default MaingPage;