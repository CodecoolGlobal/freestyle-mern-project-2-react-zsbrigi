import { useState } from "react"
import Header from "../mainPage Components/Header"
import IngredientsTable from "./IngredientsTable"


export default function Fridge() {
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")
    const [input5, setInput5] = useState("")
    const [recipes, setRecipes] = useState([])


    const handleFridge = (e) => {
        e.preventDefault()
        const query = new URLSearchParams({ input1: input1, input2: input2, input3: input3, input4: input4, input5: input5 })
        fetch(`/api/recipes/?${query}`)
            .then(response => response.json())
            .then(recipes => setRecipes(recipes))
    }

    return (
        <>
            <Header />
            <img
                src={`/src/Assets/pngfridge.png`}
                alt={"Fridge"}
                style={{ width: "45%", background: "none", boxShadow: "none", position: "absolute", top: "80px" }}
            ></img>
            <form onSubmit={handleFridge}>
                <input style={{ fontSize: "large", position: "absolute", top: "215px", left: "405px", padding: "20px" }} value={input1} name="" onChange={(e) => setInput1(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "345px", left: "405px", padding: "20px" }} value={input2} name="" onChange={(e) => setInput2(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "470px", left: "405px", padding: "20px" }} value={input3} name="" onChange={(e) => setInput3(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "600px", left: "405px", padding: "20px" }} value={input4} name="" onChange={(e) => setInput4(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "730px", left: "405px", padding: "20px" }} value={input5} name="" onChange={(e) => setInput5(e.target.value)}></input>
                <button style={{ position: "absolute", top: "723px", left: "748px" }} type="submit">Let see</button>
            </form>
            <div className="fridgeRecipe">
                {recipes.map(recipe => {
                    return <div className="dish" key={recipe._id}>
                        <h2>{recipe.mealName}</h2>
                        <img
                            src={`/src/Assets/${recipe.mealName.replaceAll(" ", "")}.jpg`}
                            alt={recipe.mealName}></img>
                        <p>
                            <b>Description: </b> {recipe.description}
                        </p>
                        <p>
                            <b>Time:</b> {recipe.time}
                        </p>
                        <IngredientsTable recipe={recipe} />
                    </div>
                })}
            </div >
        </>
    )
}