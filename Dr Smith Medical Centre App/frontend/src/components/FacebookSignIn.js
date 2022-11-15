import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

// stylesheet
import "./css/FacebookSignIn.css";

// signs a user in as an admin using Facebook
export default function FacebookSignIn() {
	const responseFacebook = (response) => {
		axios({
			method: "POST",
			url: "/login/facebook-login",
			/* once the user's facebook email is captured, the email can be sent to the backend 
			to verify that the email exists as an admin account in the database */
			data: { username: response.email },
		}).then((response) => {
			/* if the response from the backend is successful then response.data.admin should 
			hold the user's jwt token */
			if (response.data.admin) {
				// stores the user's token in local storage
				localStorage.setItem("token", response.data.admin);
				// tell the user that the sign in request was successful
				alert("Facebook Login Successful!");
				// navigates the user to the admin dashboard
				window.location.href = "/admin-dashboard";
			} else {
				// tell the user that the sign in request was unsuccessful
				alert("This Facebook account is not registered as an admin...");
			}
		});
	};

	const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;

	return (
		<div data-testid="facebookSignInTest">
			<div className="facebookSignInDiv">
				<FacebookLogin
					appId={facebookAppID}
					autoLoad={false}
					fields="name, email"
					callback={responseFacebook}
					size="medium"
					icon="fa-facebook"
					cssClass="my-facebook-button-class"
					textButton=" Login with Facebook"
				/>
			</div>
		</div>
	);
}

/* references:
	https://www.npmjs.com/package/react-facebook-login
	https://www.youtube.com/watch?v=zQNPDRg_1Po&ab_channel=AwaisMirza
	https://developers.facebook.com/?no_redirect=1

	*/
