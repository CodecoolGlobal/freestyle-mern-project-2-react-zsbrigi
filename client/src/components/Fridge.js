import { useEffect, useState } from "react"

export default function Fridge() {
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")
    const [input5, setInput5] = useState("")
    const [recipes, setRecipes] = useState([])

    // useEffect(() => {
    //     const query = new URLSearchParams({ input1: input1, input2: input2, input3: input3, input4: input4, input5: input5 })
    //     fetch(`/api/recipes/?${query}`)
    //         .then(response => response.json())
    //         .then(recipes => setRecipes(recipes))
    // }, [])


    const handleFridge = (e) => {
        e.preventDefault()
        const query = new URLSearchParams({ input1: input1, input2: input2, input3: input3, input4: input4, input5: input5 })
        fetch(`/api/recipes/?${query}`)
            .then(response => response.json())
            .then(recipes => setRecipes(recipes))
    }

    return (
        <>
            <img
                src={`/src/Assets/pngfridge.png`}
                alt={"Fridge"}
                style={{ width: "49%", height: "49%", background: "none", boxShadow: "none" }}
            ></img>
            <form onSubmit={handleFridge}>
                <input style={{ fontSize: "large", position: "absolute", top: "150px", left: "452px", padding: "20px" }} value={input1} name="" onChange={(e) => setInput1(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "290px", left: "452px", padding: "20px" }} value={input2} name="" onChange={(e) => setInput2(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "430px", left: "452px", padding: "20px" }} value={input3} name="" onChange={(e) => setInput3(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "570px", left: "452px", padding: "20px" }} value={input4} name="" onChange={(e) => setInput4(e.target.value)}></input>
                <input style={{ fontSize: "large", position: "absolute", top: "710px", left: "452px", padding: "20px" }} value={input5} name="" onChange={(e) => setInput5(e.target.value)}></input>
                <button type="submit">Let see</button>
            </form>
        </>
    )
}