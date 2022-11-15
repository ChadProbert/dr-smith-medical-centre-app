import React, { Component } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

// stylesheets
import "./css/CreateNewAdmin.css";

// images
import Logo from "./images/logo-transparent.png";

/* this component can  */
export default class CreateNewAdmin extends Component {
	constructor(props) {
		super(props);

		// declaring initial states that will be used to capture the user's input credentials
		this.state = {
			username: "",
			password: "",
		};

		// bind functions
		this.createNewAdmin = this.createNewAdmin.bind(this);
	}

	/* protects the "/create-new-admin" route from being accessed by users that are not signed 
	in as an admin */
	componentDidMount() {
		// checks if the user is logged in as an admin
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);
			if (!user) {
				localStorage.removeItem("token");
				// redirects the user to the admin login page if they are not signed in as an admin
				window.location.href = "/admin-login";
			} else {
				// do nothing
			}
		}
	}

	async createNewAdmin(e) {
		e.preventDefault();
		/* sends a post request to the server to create a new admin account using the 
		credentials that were given by the user */
		const response = await fetch("/login/create-new-admin", {
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
		// the backend will return a json response of {status: "ok"} if the request is successful
		if (data.status === "ok") {
			/* tells the user that the request was successful and that they are not yet signed in 
			to the new admin account */
			alert(
				"New admin created! You can sign out and sign in to the new admin account."
			);
			window.location.href = "/admin-dashboard";
		} else {
			alert(
				"Username already exists. Please use a different username and try again."
			);
		}
	}

	render() {
		// creating the UI for the user input and adding the event handlers to capture user's input
		return (
			<div data-testid="createNewAdminTest">
				<div className="createNewAdminBox">
					<img src={Logo} alt="logo" className="logo" />
					<h3 className="createNewAdminHeading">Create New Admin</h3>
					<form onSubmit={this.createNewAdmin}>
						<TextField
							value={this.state.username}
							required
							label="Username or Email"
							variant="outlined"
							className="usernameInput"
							// captures the new admin username input
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
							// captures the new admin password input
							onChange={(e) => this.setState({ password: e.target.value })}
						/>

						<Button
							type="submit"
							variant="contained"
							size="large"
							className="createNewAdminButton"
						>
							Create
						</Button>

						<Link to="/admin-dashboard">
							<p>Go back to admin dashboard</p>
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

	*/
