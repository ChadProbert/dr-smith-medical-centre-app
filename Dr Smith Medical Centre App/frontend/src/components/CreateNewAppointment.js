import React, { Component } from "react";
import {
	Button,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// stylesheets
import "./css/CreateNewAppointment.css";

/* this component can only be accessed by the user if the user is signed in as an 
admin since this component is rendered inside of the AdminDashboard.js component which
is rendered on a protected route ("/admin-dashboard") */
export default class CreateNewAppointment extends Component {
	constructor(props) {
		super(props);

		// initial states
		this.state = {
			patientName: "",
			patientLastName: "",
			date: null,
			time: "",
			purpose: "",
			phoneNumber: "",
			medicalAid: "",
			smoker: "",
			type: "",
		};

		// bind functions
		this.handlePatientName = this.handlePatientName.bind(this);
		this.handlePatientLastName = this.handlePatientLastName.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handlePurpose = this.handlePurpose.bind(this);
		this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
		this.handleMedicalAid = this.handleMedicalAid.bind(this);
		this.handleSmoker = this.handleSmoker.bind(this);
		this.handleType = this.handleType.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handlePatientName(e) {
		this.setState({ patientName: e.target.value });
	}

	handlePatientLastName(e) {
		this.setState({ patientLastName: e.target.value });
	}

	handleDate(e) {
		this.setState({ date: e.target.value });
	}

	handleTime(e) {
		this.setState({ time: e.target.value });
	}

	handlePurpose(e) {
		this.setState({ purpose: e.target.value });
	}

	handlePhoneNumber(e) {
		this.setState({ phoneNumber: e.target.value });
	}

	handleMedicalAid(e) {
		this.setState({ medicalAid: e.target.value });
	}

	handleSmoker(e) {
		this.setState({ smoker: e.target.value });
	}

	handleType(e) {
		this.setState({ type: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		/* sends a post request to the backend with the new appointment details input by user */
		fetch("/app/add-appointment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				patientName: this.state.patientName,
				patientLastName: this.state.patientLastName,
				date: this.state.date,
				time: this.state.time,
				purpose: this.state.purpose,
				phoneNumber: this.state.phoneNumber,
				medicalAid: this.state.medicalAid,
				smoker: this.state.smoker,
				type: this.state.type,
			}),
		}).then(
			// refresh the page to render the appointments with the new appointment included
			() => (window.location.href = "/admin-dashboard")
		);
	}

	/* created the ui for an admin user to create a new appointment and added the relevant 
	event handlers */
	render() {
		return (
			<div className="createAppointmentBox" data-testid="createNewAppointmentTest">
				<h5 className="createAnAppointmentHeading">Create An Appointment</h5>
				<form onSubmit={this.handleSubmit}>
					<TextField
						required
						label="Patient Name"
						variant="outlined"
						className="patientNameInput"
						onChange={this.handlePatientName}
					/>

					<TextField
						required
						label="Patient Last Name"
						variant="outlined"
						className="patientLastNameInput"
						onChange={this.handlePatientLastName}
					/>

					<div className="dateAndTimePicker">
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								required
								label="Date"
								value={this.state.date}
								onChange={async (selectedDate) => {
									let stringyfiedDate = await selectedDate.toString();
									await this.setState({ date: stringyfiedDate });
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>

					<div className="dateAndTimePicker">
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<TimePicker
								required
								label="Time"
								onChange={async (selectedTime) => {
									let stringyfiedTime = await selectedTime.toString();
									// cleaned up the time string returned using substring()
									let time = stringyfiedTime.substring(16, 21);
									await this.setState({ time: time });
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>

					<TextField
						required
						label="Purpose"
						variant="outlined"
						className="purposeInput"
						onChange={this.handlePurpose}
					/>

					<TextField
						required
						label="Phone Number"
						variant="outlined"
						className="phoneNumberInput"
						onChange={this.handlePhoneNumber}
					/>

					<FormControl fullWidth className="formControl" required>
						<InputLabel className="medicalAidLabel">Medical Aid</InputLabel>
						<Select
							label="Medical Aid"
							className="medicalAidInput"
							onChange={this.handleMedicalAid}
							value={this.state.medicalAid}
						>
							<MenuItem value={"Yes"}>Yes</MenuItem>
							<MenuItem value={"No"}>No</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth className="formControl" required>
						<InputLabel className="smokerLabel">Smoker</InputLabel>
						<Select
							label="Smoker"
							className="smokerInput"
							onChange={this.handleSmoker}
							value={this.state.smoker}
						>
							<MenuItem value={"Yes"}>Yes</MenuItem>
							<MenuItem value={"No"}>No</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth className="formControl" required>
						<InputLabel className="typeLabel">Type</InputLabel>
						<Select
							label="Type"
							className="typeInput"
							value={this.state.type}
							onChange={this.handleType}
						>
							<MenuItem value={"Emergency"}>Emergency</MenuItem>
							<MenuItem value={"Urgent"}>Urgent</MenuItem>
							<MenuItem value={"Minor"}>Minor</MenuItem>
							<MenuItem value={"Check up"}>Check up</MenuItem>
						</Select>
					</FormControl>

					<Button
						variant="contained"
						className="createAppointmentButton"
						type="submit"
					>
						create appointment
					</Button>
				</form>
			</div>
		);
	}
}

/* references: 
	https://stackoverflow.com/questions/15918765/get-the-time-from-a-date-string
	https://mui.com/x/react-date-pickers/date-picker/
	https://mui.com/x/react-date-pickers/time-picker/
	https://mui.com/

	*/
