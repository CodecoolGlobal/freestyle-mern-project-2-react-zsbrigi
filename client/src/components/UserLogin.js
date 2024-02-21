import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function fetchUser(email) {
	const httpResponse = await fetch(`/api/users?email=${email}`);
	const user = await httpResponse.json();
	return user;
}

function UserLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	console.log(user)



	function handleSignIn(event) {
		event.preventDefault();
		async function setFetchedData() {
			const user = await fetchUser(email);
			if (user?.password === password) {
				localStorage.clear()
				localStorage.setItem("user", user._id)
				setUser(user);
				navigate("/user/recipes");
			} else {
				window.alert('Wrong Email or Password.')
			}
		}
		setFetchedData();
	}

	return (
		<div className="userPage">
			<h1>Log In To Your Profile</h1>
			<form onSubmit={handleSignIn} className="signUpForm">
				<div>
					<label htmlFor="email">Email: </label>
					<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
				</div>
				<button>Log in</button>
			</form>
		</div>
	)
}
export default UserLogin;