import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import jwt_decode from "jwt-decode";
import {
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// components
import AdminNavBar from "./AdminNavBar";
import CreateNewAppointment from "./CreateNewAppointment";

// stylesheets
import "../components/css/AdminDashboard.css";

// displays all the appointments to the user and allows the user to edit and delete appointments
// this component can only be accessed if the user is signed in as an admin
export default class AdminDashboard extends Component {
	constructor(props) {
		super(props);

		// initial states
		this.state = {
			adminAppointments: [],
			// edit appointment dialog box state
			open: false,
			// edit appointment states - to be used when editing an appointment
			editAppointmentId: "",
			updatedName: "",
			updatedLastName: "",
			updatedDate: null,
			updatedTime: "",
			updatedPurpose: "",
			updatedPhoneNumber: "",
			updatedMedicalAid: "",
			updatedSmoker: "",
			updatedType: "",
			// delete appointment state - to be used when deleting an appointment
			deletedAppointmentId: "",
		};

		// bind functions
		this.populateAppointments = this.populateAppointments.bind(this);
		// edit appointment functions
		this.openEditDialog = this.openEditDialog.bind(this);
		this.closeEditDialog = this.closeEditDialog.bind(this);
		this.handleUpdatedName = this.handleUpdatedName.bind(this);
		this.handleUpdatedLastName = this.handleUpdatedLastName.bind(this);
		this.handleUpdatedDate = this.handleUpdatedDate.bind(this);
		this.handleUpdatedTime = this.handleUpdatedTime.bind(this);
		this.handleUpdatedPurpose = this.handleUpdatedPurpose.bind(this);
		this.handleUpdatedPhoneNumber = this.handleUpdatedPhoneNumber.bind(this);
		this.handleUpdatedMedicalAid = this.handleUpdatedMedicalAid.bind(this);
		this.handleUpdatedSmoker = this.handleUpdatedSmoker.bind(this);
		this.handleUpdatedType = this.handleUpdatedType.bind(this);
		this.handleEditAppointment = this.handleEditAppointment.bind(this);
		// delete appointment functions
		this.captureDeletedAppointmentId =
			this.captureDeletedAppointmentId.bind(this);
		this.handleDeleteAppointment = this.handleDeleteAppointment.bind(this);
	}

	// sends a fetch request to the backend to get all the admin's appointments
	async populateAppointments() {
		await fetch("/app/admin-appointments")
			.then((res) => res.json())
			.then((appointments) => {
				this.setState({
					adminAppointments: appointments,
				});
			});
	}

	/* protects the "/admin-dashboard" route from being accessed by users that are not signed 
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
				// display all the admin appointments
				this.populateAppointments();
			}
		}
	}

	// opens the edit dialog box and captures the id of the selected appointment to be edited
	openEditDialog(e) {
		const selectedAppointmentId = e.target.value;
		this.setState({
			open: true,
			editAppointmentId: selectedAppointmentId,
		});
	}

	// closes the dialog box
	closeEditDialog() {
		this.setState({ open: false });
	}

	// captures the new patient name input by the admin user
	handleUpdatedName(e) {
		this.setState({ updatedName: e.target.value });
	}

	// captures the new patient last name input by the admin user
	handleUpdatedLastName(e) {
		this.setState({ updatedLastName: e.target.value });
	}

	// captures the new date input by the admin user
	handleUpdatedDate(e) {
		this.setState({ updatedDate: e.target.value });
	}

	// captures the new updated time input by the admin user
	handleUpdatedTime(e) {
		this.setState({ updatedTime: e.target.value });
	}

	// captures the new purpose input by the admin user
	handleUpdatedPurpose(e) {
		this.setState({ updatedPurpose: e.target.value });
	}

	// captures the new phone number input by the admin user
	handleUpdatedPhoneNumber(e) {
		this.setState({ updatedPhoneNumber: e.target.value });
	}

	// captures the new medical aid input by the admin user
	handleUpdatedMedicalAid(e) {
		this.setState({ updatedMedicalAid: e.target.value });
	}

	// captures the new smoker input by the admin user
	handleUpdatedSmoker(e) {
		this.setState({ updatedSmoker: e.target.value });
	}

	// captures the new type input by the admin user
	handleUpdatedType(e) {
		this.setState({ updatedType: e.target.value });
	}

	// sends a put request to the backend with the new appointment details
	handleEditAppointment(e) {
		e.preventDefault();
		// converted date string to be stored in number format in the database
		let convertedDate = this.state.updatedDate.getTime();
		fetch("/app/edit-appointment", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: this.state.editAppointmentId,
				patientName: this.state.updatedName,
				patientLastName: this.state.updatedLastName,
				date: convertedDate,
				time: this.state.updatedTime,
				purpose: this.state.updatedPurpose,
				phoneNumber: this.state.updatedPhoneNumber,
				medicalAid: this.state.updatedMedicalAid,
				smoker: this.state.updatedSmoker,
				type: this.state.updatedType,
			}),
		})
			.then(() => alert("Successfully edited the appointment!"))
			// reload the page
			.then(() => (window.location.href = "/admin-dashboard"));
	}

	// captures the id of appointment that the user wants to delete
	captureDeletedAppointmentId(e) {
		const deletedAppointmentId = e.target.value;
		this.setState({
			deletedAppointmentId: deletedAppointmentId,
		});
	}

	/* sends a delete request to the backend to delete the selected appointment
	captured in handleDeletedAppointment() */
	async handleDeleteAppointment(e) {
		await this.captureDeletedAppointmentId(e);
		fetch("/app/delete-appointment", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: this.state.deletedAppointmentId,
			}),
		}).then(() => (window.location.href = "/admin-dashboard"));
	}

	render() {
		let adminData = this.state.adminAppointments.map((appointment) => {
			/* converts the date stored in number format (in the database) back to normal 
			date string format */
			let time = new Date(appointment.date);
			// used substring() to clean up the date string returned
			let correctDateFormat = new Date(time).toString().substring(0, 15);

			return (
				<tr key={appointment.id}>
					<td>{appointment.patientName}</td>
					<td>{appointment.patientLastName}</td>
					<td>{correctDateFormat}</td>
					<td>{appointment.time}</td>
					<td>{appointment.purpose}</td>
					<td>{appointment.phoneNumber}</td>
					<td>{appointment.medicalAid}</td>
					<td>{appointment.smoker}</td>
					<td>{appointment.type}</td>
					<td>
						<div className="actionButton">
							<Button
								variant="contained"
								className="editButton"
								onClick={this.openEditDialog}
								value={appointment.id}
							>
								Edit
							</Button>
						</div>{" "}
						<div className="actionButton">
							<Button
								variant="contained"
								className="deleteButton"
								onClick={(e) => this.handleDeleteAppointment(e)}
								value={appointment.id}
							>
								Delete
							</Button>
						</div>
					</td>
				</tr>
			);
		});

		return (
			<div className="appointments" data-testid="adminDashboardTest">
				<AdminNavBar />
				<Row className="row">
					<Col md={2} className="createAppointmentSection">
						<CreateNewAppointment />
					</Col>
					<Col md={10} className="appointmentsSection">
						<MDBTable hover className="table">
							<MDBTableHead textWhite>
								<tr>
									<th className="leftTableCorner">Patient First Name</th>
									<th>Patient Last Name</th>
									<th>Date</th>
									<th>Time</th>
									<th>Purpose</th>
									<th>Phone Number</th>
									<th>Medical Aid</th>
									<th>Smoker</th>
									<th>Type</th>
									<th className="rightTableCorner">Action</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								{adminData}

								{/* dialog opens when the edit button is clicked  */}
								<Dialog
									open={this.state.open}
									onClose={this.closeEditDialog}
									className="dialog"
								>
									<DialogTitle className="dialogTitle">
										Edit Appointment
									</DialogTitle>

									<DialogContent>
										<form onSubmit={this.handleEditAppointment}>
											<TextField
												required
												label="Patient First Name"
												fullWidth
												variant="outlined"
												className="editInput"
												onChange={this.handleUpdatedName}
											/>

											<TextField
												required
												label="Patient Last Name"
												fullWidth
												variant="outlined"
												className="editInput"
												onChange={this.handleUpdatedLastName}
											/>

											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													className="editInput"
													label="Date"
													value={this.state.updatedDate}
													onChange={async (selectedDate) => {
														await this.setState({ updatedDate: selectedDate });
													}}
													renderInput={(params) => (
														<TextField {...params} className="editInput" />
													)}
												/>
											</LocalizationProvider>

											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<TimePicker
													label="Time"
													onChange={async (selectedTime) => {
														// converting the date object returned from MaterialUI to a string value
														let stringyfiedTime = await selectedTime.toString();
														// cleaning up the date string value
														let time = stringyfiedTime.substring(16, 21);
														await this.setState({ updatedTime: time });
													}}
													renderInput={(params) => (
														<TextField {...params} className="editInput" />
													)}
												/>
											</LocalizationProvider>

											<TextField
												required
												label="Purpose"
												fullWidth
												variant="outlined"
												className="editInput"
												onChange={this.handleUpdatedPurpose}
											/>

											<TextField
												required
												label="Phone Number"
												fullWidth
												variant="outlined"
												className="editInput"
												onChange={this.handleUpdatedPhoneNumber}
											/>

											<FormControl fullWidth className="formControl" required>
												<InputLabel className="medicalAidEditLabel">
													Medical Aid
												</InputLabel>
												<Select
													label="Medical Aid"
													className="medicalAidEditInput"
													onChange={this.handleUpdatedMedicalAid}
													value={this.state.updatedMedicalAid}
												>
													<MenuItem value={"Yes"}>Yes</MenuItem>
													<MenuItem value={"No"}>No</MenuItem>
												</Select>
											</FormControl>

											<FormControl fullWidth className="formControl" required>
												<InputLabel className="smokerEditLabel">
													Smoker
												</InputLabel>
												<Select
													label="Smoker"
													className="smokerEditInput"
													onChange={this.handleUpdatedSmoker}
													value={this.state.updatedSmoker}
												>
													<MenuItem value={"Yes"}>Yes</MenuItem>
													<MenuItem value={"No"}>No</MenuItem>
												</Select>
											</FormControl>

											<FormControl fullWidth className="formControl" required>
												<InputLabel className="typeEditLabel">Type</InputLabel>
												<Select
													// value={medicalAid}
													label="Type"
													// onChange={handleChange}
													className="typeEditInput"
													onChange={this.handleUpdatedType}
													value={this.state.updatedType}
												>
													<MenuItem value={"Emergency"}>Emergency</MenuItem>
													<MenuItem value={"Urgent"}>Urgent</MenuItem>
													<MenuItem value={"Minor"}>Minor</MenuItem>
													<MenuItem value={"Check-up"}>Check up</MenuItem>
												</Select>
											</FormControl>

											<div className="saveCancelContainer">
												<Button
													onClick={this.closeEditDialog}
													variant="contained"
													className="cancelButton"
												>
													Cancel
												</Button>
												<Button
													type="submit"
													variant="contained"
													className="saveChangesButton"
												>
													save changes
												</Button>
											</div>
										</form>
									</DialogContent>
								</Dialog>
							</MDBTableBody>
						</MDBTable>
					</Col>
				</Row>
			</div>
		);
	}
}

/* references:
	my own work from level 3 task 9
	my own work from level 3 task 7
	https://mui.com/
	https://react-bootstrap.github.io/
	https://mdbootstrap.com/docs/react/data/tables/
	https://stackoverflow.com/questions/53498281/react-read-value-of-button-clicked
	https://stackoverflow.com/questions/46946282/dialog-box-in-material-ui-opens-with-a-weird-gray-background

	*/
