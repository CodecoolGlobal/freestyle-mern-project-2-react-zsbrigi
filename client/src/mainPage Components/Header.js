import { useParams } from "react-router-dom";

function Header() {

	let { dishType } = useParams();
	function isCurrentPage(path) {
		return dishType === path;
	}

	return (
		<div className='header'>
			<p id='logo'>add a logo here</p>
			<ul className='navbar'>
				<li><a href="/" className={isCurrentPage() ? 'active' : ''}>Home</a></li>
				<li><a href="/dishes/chicken" className={isCurrentPage('chicken') ? 'active' : ''}>Chicken</a></li>
				<li><a href="/dishes/beef" className={isCurrentPage('beef') ? 'active' : ''}>Beef</a></li>
				<li><a href="/dishes/pasta" className={isCurrentPage('pasta') ? 'active' : ''}>Pasta</a></li>
				<li><a href="/dishes/vegetarian" className={isCurrentPage('vegetarian') ? 'active' : ''}>Vegetarian</a></li>
				<li><a href="/dishes/dessert" className={isCurrentPage('dessert') ? 'active' : ''}>Dessert</a></li>
				<li><a href="/user/recipes" className={isCurrentPage('user') ? 'active' : ''}>Profile</a></li>
			</ul>
		</div>
	)
}

export default Header;