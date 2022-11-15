import React from "react";

// icons
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// stylesheet
import "../components/css/ContactUs.css";

export default function ContactUs() {
	return (
		<div className="contactUsBox" data-testid="contactUsTest">
			<h3 className="contactUsHeading">Contact Us To Book An Appointment!</h3>
			<p className="contactUsText">
				<CallIcon /> 012 345 6789
				<br />
				<br />
				<EmailIcon /> drsmithmedcentre@gmail.com
				<br />
				<br />
				<LocationOnIcon /> 123 Sampson Drive, Farrarmere, Benoni, South Africa
			</p>
		</div>
	);
}

/* references: 
	https://material-ui.com/components/icons/

	*/
