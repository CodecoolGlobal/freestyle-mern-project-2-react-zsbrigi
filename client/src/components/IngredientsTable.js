function IngredientsTable({ recipe }) {
	return (
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
	)
}

export default IngredientsTable;