import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// stylesheets
import "../components/css/AdminNavBar.css";

// images
import logo from "../components/images/logo.png";

// signs the admin user out by removing the jwt token stored in local storage
const signOut = () => {
	localStorage.removeItem("token");
	// redirects the user out the admin dashboard page
	window.location.href = "/appointments";
};

// this component is only displayed when the user is logged in as an admin
const AdminNavBar = () => (
	<AppBar position="static" className="appBar" data-testid="adminNavBarTest">
		<Toolbar className="toolBar">
			<Link to={"/"}>
				<img src={logo} alt="logo" className="appLogo" />
			</Link>

			<Typography variant="h6">
				<Link to={"/"} className="navBarLink">
					Home
				</Link>
			</Typography>

			<Typography variant="h6">
				<Link to={"/appointments"} className="navBarLink">
					Appointments
				</Link>
			</Typography>

			<Typography variant="h6" sx={{ flexGrow: 1 }}>
				<Link to={"/admin-dashboard"} className="navBarLink">
					Admin Dashboard
				</Link>
			</Typography>

			<Link to={"/create-new-admin"} className="navBarLink">
				<Button className="createAdminButton">Create New Admin</Button>
			</Link>
			<Button className="signOutButton" onClick={signOut}>
				Sign out
			</Button>
		</Toolbar>
	</AppBar>
);

export default AdminNavBar;

/* references:
	my own work from level 2 task 21
	my own work from level 3 task 9
	https://mui.com/components/app-bar/
	https://www.wix.com
	https://stackoverflow.com/questions/66527526/trying-to-remove-token-from-local-storage-on-logout-button

	*/
