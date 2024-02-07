function Header() {
	return (
		<div className='header'>
			<p id='logo'>add a logo here</p>
			<ul className='navbar'>
				<li><a href="/">Home</a></li>
				<li><a href="/chicken">Chicken</a></li>
				<li><a href="/beef">Beef</a></li>
				<li><a href="/pasta">Pasta</a></li>
				<li><a href="/vegetarian">Vegetarian</a></li>
				<li><a href="/dessert">Dessert</a></li>
			</ul>
		</div>
	)
}

export default Header;