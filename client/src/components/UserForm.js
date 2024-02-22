import { useState } from "react";
import { useNavigate } from "react-router-dom";

function postRequest(newUser) {
	fetch("/api/users", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newUser)
	}).then((res) => res.json())
		.catch((error) => console.error(error));
}

function UserForm() {
	const [firstName, setFirstName] = useState("");
	const [secondName, setSecondName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function handleAddNewUser(event) {
		event.preventDefault();
		const name = firstName + " " + secondName;
		const newUser = { name, email, password };
		postRequest(newUser);
		
		navigate("/user/login");
	}

	return (
		<div className="userPage">
			<h1>Create New Profile</h1>
			<form onSubmit={handleAddNewUser} className="signUpForm">
				<div>
					<label htmlFor="firstName">First Name: </label>
					<input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
				</div>
				<div>
					<label htmlFor="secondName">Second Name: </label>
					<input id="secondName" value={secondName} onChange={(e) => setSecondName(e.target.value)} required></input>
				</div>
				<div>
					<label htmlFor="email">Email: </label>
					<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
				</div>
				<button>Sign Up</button>
			</form>
		</div>
	)
}
export default UserForm;