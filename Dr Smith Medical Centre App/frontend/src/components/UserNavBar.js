import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// stylesheets
import "../components/css/UserNavBar.css";

// images
import logo from "../components/images/logo.png";

/* basic reusable navigation component that will be displayed on the unprotected routes  */
const UserNavBar = () => (
	<AppBar position="static" className="appBar" data-testid="userNavBarTest">
		<Toolbar className="toolBar">
			<Link to="/">
				<img src={logo} alt="logo" className="appLogo" />
			</Link>

			<Typography variant="h6" color="inherit">
				<Link to="/" className="navBarLink">
					Home
				</Link>
			</Typography>

			<Typography variant="h6" color="inherit">
				<Link to="/appointments" className="navBarLink">
					Appointments
				</Link>
			</Typography>

			<Typography variant="h6" color="inherit">
				<Link to="/admin-login" className="navBarLink">
					Admin Dashboard
				</Link>
			</Typography>
		</Toolbar>
	</AppBar>
);

export default UserNavBar;

/* references:
	my own work from level 2 task 21
	my own work from level 3 task 9
	https://mui.com/components/app-bar/
	https://www.wix.com

	*/
