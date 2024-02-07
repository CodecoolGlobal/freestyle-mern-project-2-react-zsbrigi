
export default function HandleSaveButton(dish, ingredients) {

console.log( 'The dish:', dish);
console.log('The ingredients:', ingredients);
    const selectedDish = ingredients.find((ingredient) => ingredient._id === dish._id )
    console.log(selectedDish);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDish),
    };

    fetch("/api/favorites", options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.error(error));

}