import { useEffect, useState } from "react"

function BeefDishes() {
    const [beefDishes, setBeefdishes] = useState([])
    const [isloggedIn, setIsloggedIn] = useState(false)

    useEffect(() => {
        async function fetchdata (url) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setBeefdishes(data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchdata("/api/beefDishes")
    }, [])

    return (
        <div>
            {beefDishes.map((dish) => (
                <div key={dish._id}>
                <h2>{dish.mealName}</h2>
                <p>description: {dish.description}</p>
                <p>time: {dish.time}</p>
                <p>Ingredients:</p>
                <ul>
                    {dish.ingredients.map((ingredient) => (
                        <li>{ingredient.name} amount: {ingredient.amount}</li>
                       
                    ))}
                </ul>
                {!isloggedIn && <button>Save</button>}
                </div>
            ))}
        </div>
    )
    
}

export default BeefDishes