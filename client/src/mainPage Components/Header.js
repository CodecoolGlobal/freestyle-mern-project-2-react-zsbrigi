function Header() {
	return (
		<div className='header'>
			<p id='logo'>add a logo here</p>
			<ul className='navbar'>
				<li><a href="/mainpage">Home</a></li>
				<li><a href="/dishes/chicken">Chicken</a></li>
				<li><a href="/dishes/beef">Beef</a></li>
				<li><a href="/dishes/pasta">Pasta</a></li>
				<li><a href="/dishes/vegetarian">Vegetarian</a></li>
				<li><a href="/dishes/dessert">Dessert</a></li>
			</ul>
		</div>
	)
}

export default Header;