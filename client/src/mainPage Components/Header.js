import { useParams } from "react-router-dom";

function Header() {

	let { dishType } = useParams();
	function isCurrentPage(path) {
		return dishType === path;
	}

	return (
		<div className='header'>
			<a href="/" id="logo" ><img style={{ width: "74px", height: "74px", borderRadius: "50%" }} src={`/src/Assets/logo.jpg`} alt={'logo'} /></a>
			<span><a href="/">Food Friends Forever</a></span>
			<ul className='navbar'>
				<li><a href="/dishes/chicken" className={isCurrentPage('chicken') ? 'active' : ''}>Chicken</a></li>
				<li><a href="/dishes/beef" className={isCurrentPage('beef') ? 'active' : ''}>Beef</a></li>
				<li><a href="/dishes/pasta" className={isCurrentPage('pasta') ? 'active' : ''}>Pasta</a></li>
				<li><a href="/dishes/vegetarian" className={isCurrentPage('vegetarian') ? 'active' : ''}>Vegetarian</a></li>
				<li><a href="/dishes/dessert" className={isCurrentPage('dessert') ? 'active' : ''}>Dessert</a></li>
				<li><a href="/dishes/favorites" className={isCurrentPage('favorites') ? 'active' : ''}>Favorites</a></li>
				<li><a href="/user/recipes" className={isCurrentPage('user') ? 'active' : ''}>Profile</a></li>
			</ul>
		</div>
	)
}

export default Header;