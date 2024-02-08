
function TableForIngredients({ ingredients }) {
    const ingredientArray = ingredients.join(', ').split(',');
    return (
        <table className='ingredientsUser'>
            <thead>
                <tr>
                    <th>Ingredients:</th>
                </tr>
            </thead>
            <tbody>
                {ingredientArray.map((ingredient) => {
                    return <tr key={ingredient}>
                        <td>{ingredient}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default TableForIngredients;