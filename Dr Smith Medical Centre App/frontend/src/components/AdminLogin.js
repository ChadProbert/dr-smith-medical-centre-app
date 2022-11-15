import React, { Component } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

// components
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

// stylesheets
import "./css/AdminLogin.css";

// images
import Logo from "./images/logo-transparent.png";

export default class AdminLogin extends Component {
	constructor(props) {
		super(props);

		// declaring initial states that will be used to capture the user's input credentials
		this.state = {
			username: "",
			password: "",
		};

		// bind functions
		this.loginAdmin = this.loginAdmin.bind(this);
	}

	async componentDidMount() {
		// checks if the user is logged in as an admin
		if (localStorage.getItem("token")) {
			/* if the user is already logged in as an admin then the user will be redirected 
			to the admin dashboard */
			window.location.href = "/admin-dashboard";
		}

		/* sends a post request to the backend to create a default admin account 
		if a default admin account has not already been created in the database */
		await fetch("/login/create-default-admin-account", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// default admin username and password is stored in a .env file
				username: process.env.REACT_APP_ADMIN_USERNAME,
				password: process.env.REACT_APP_ADMIN_PASSWORD,
			}),
		});
	}

	// logs a user in as an admin user
	async loginAdmin(e) {
		e.preventDefault();
		/* sends a post request to the backend to log the user in using the 
		supplied credentials */
		const response = await fetch("/login/admin-login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		});

		const data = await response.json();
		// if the user supplies correct admin credentials then the backend will return a json response of { admin: token }
		// if the credentials are incorrect then the backend will return a json response of { admin: false }
		if (data.admin) {
			// stores the user's token in local storage
			localStorage.setItem("token", data.admin);
			// tells the user that the login was successful
			alert("Login Successful!");
			// navigates the user to the admin dashboard once logged in
			window.location.href = "/admin-dashboard";
		} else {
			alert("Please check your username and password");
		}
	}

	render() {
		// creating the UI for the user input and adding the relevant event handlers
		return (
			<div data-testid="adminLoginTest">
				<div className="loginBox">
					<img src={Logo} alt="logo" className="logo" />
					<h3 className="loginHeading">Admin Login</h3>
					<form onSubmit={this.loginAdmin}>
						<TextField
							value={this.state.username}
							required
							label="Username"
							variant="outlined"
							className="usernameInput"
							// captures the user's username input
							onChange={(e) => this.setState({ username: e.target.value })}
						/>
						<br />
						<TextField
							value={this.state.password}
							type="password"
							required
							label="Password"
							variant="outlined"
							className="passwordInput"
							// captures the user's password input
							onChange={(e) => this.setState({ password: e.target.value })}
						/>
						<Button
							type="submit"
							variant="contained"
							size="large"
							className="loginButton"
						>
							login
						</Button>
						<GoogleSignIn />
						<br />
						<FacebookSignIn />
						<br />
						<Link to="/appointments">
							<p>Go back to appointments</p>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

/* references:
	my own work from level 3 task 9 
	https://mui.com/
	https://www.wix.com/logo/maker
	https://www.remove.bg/
	https://www.youtube.com/watch?v=TFIt9o6BWqA&ab_channel=Contentful

	*/
