import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	let { dishType } = useParams();
	function isCurrentPage(path) {
		return dishType === path;
	}
	const navigate = useNavigate()

	function handleLogOut() {
		if (localStorage.getItem("user")) {
			window.confirm("Sure want to log out?")
			localStorage.clear()
			navigate("/")
		} else {
			window.alert('No user is logged in')
		}
	}

	return (
		<nav className='header'>
			<a href="/" id="logo" ><img style={{ width: "74px", height: "74px", borderRadius: "50%", position: "fixed", top: 0 }} src={`/src/Assets/logo.jpg`} alt={'logo'} /></a>
			<span><a href="/">Food Friends Forever</a></span>
			<div className="menu" onClick={() => {
				setOpenMenu(!openMenu)
			}}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<ul className={openMenu ? "open" : ""}>
				<li><Link to="/dishes/chicken" className={isCurrentPage('chicken') ? 'active' : ''}>Chicken</Link></li>
				<li><Link to="/dishes/beef" className={isCurrentPage('beef') ? 'active' : ''}>Beef</Link></li>
				<li><Link to="/dishes/pasta" className={isCurrentPage('pasta') ? 'active' : ''}>Pasta</Link></li>
				<li><Link to="/dishes/vegetarian" className={isCurrentPage('vegetarian') ? 'active' : ''}>Vegetarian</Link></li>
				<li><Link to="/dishes/dessert" className={isCurrentPage('dessert') ? 'active' : ''}>Dessert</Link></li>
				<li><Link to="/dishes/favorites" className={isCurrentPage('favorites') ? 'active' : ''}>Favorites</Link></li>
				<li><Link to="/user/recipes" className={isCurrentPage('user') ? 'active' : ''}>Profile</Link></li>
				<li><Link to="/user/login" >Login</Link></li>
				<li><Link to="/user/registration" >Sign Up</Link></li>
				<li><button onClick={handleLogOut}>log out</button></li>
			</ul>
		</nav>
	)
}

export default Header;