import React from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// stylesheet
import "./css/GoogleSignIn.css";

// signs a user in as an admin using Google
export default function GoogleSignIn() {
	const handleCallbackResponse = (response) => {
		let userCredentials = jwt_decode(response.credential);
		let userEmail = userCredentials.email;

		axios({
			method: "POST",
			url: "/login/google-login",
			/* once the user's google email is captured, the email can be sent to the backend 
			to verify that the email exists as an admin account in the database */
			data: { username: userEmail },
		}).then((response) => {
			/* if the response from the backend is successful then response.data.admin should 
			hold the user's jwt token */
			if (response.data.admin) {
				// stores the user's token in local storage
				localStorage.setItem("token", response.data.admin);
				// tell the user that the sign in request was successful
				alert("Google Login Successful!");
				// navigate the user to the admin dashboard
				window.location.href = "/admin-dashboard";
			} else {
				// tell the user that the google sign in request was unsuccessful
				alert("This google account is not registered as an admin...");
			}
		});
	};

	useEffect(() => {
		/* the following comment allows me to access the script that was placed inside of 
		the index.html file (at line 28) */
		/* global google */
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(
			document.getElementById("googleSignInDiv"),
			{
				theme: "outline",
				size: "large",
			}
		);
	}, []);

	return (
		<div className="googleSignIn" data-testid="googleSignInTest">
			<div id="googleSignInDiv"></div>
		</div>
	);
}

/* references:
	https://www.youtube.com/watch?v=roxC8SMs7HU&ab_channel=CooperCodes
	https://www.youtube.com/watch?v=LA16VCpUido&ab_channel=AwaisMirza
	https://console.cloud.google.com/

	*/
