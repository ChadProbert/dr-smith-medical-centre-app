import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";

// icons
import LockIcon from "@mui/icons-material/Lock";

// components
import ContactUs from "./ContactUs";
import UserNavBar from "./UserNavBar";

// stylesheets
import "../components/css/Appointments.css";

/* this component will be displayed to a normal end user trying to find out what
 Dr Smith's appointment schedule looks like */
export default class Appointments extends Component {
	constructor(props) {
		super(props);

		// initial states
		this.state = {
			// will be used to map out the appointments data into the appointments table
			userAppointments: [],
		};
	}

	async componentDidMount() {
		// sends a request to the backend to get Dr Smith's appointments for the next 2 weeks
		await fetch("/app/user-appointments")
			.then((res) => res.json())
			.then((appointments) => {
				this.setState({
					userAppointments: appointments,
				});
			});
	}

	render() {
		let normalEndUserData = this.state.userAppointments.map((appointment) => {
			// converted the date in number format (stored in the database) to a normal date object
			let dateFormat = new Date(appointment.date);
			// converted the date object returned to a string
			// used substring() to clean up the date string returned
			let cleanDateFormat = new Date(dateFormat).toString().substring(0, 15);

			return (
				<tr key={appointment.id}>
					<td>{appointment.patientName}</td>
					<td>{appointment.patientLastName}</td>
					<td>{cleanDateFormat}</td>
					<td>{appointment.time}</td>
					<td>{appointment.type}</td>
				</tr>
			);
		});

		return (
			<div className="appointments" data-testid="appointmentsTest">
				<UserNavBar />
				<Row className="row">
					<Col md={2} className="createAppointmentSection">
						<Link to={"/admin-login"} className="adminLoginLink">
							<Button variant="contained" className="loginAsAdminButton">
								Login as admin
								<LockIcon className="lockIcon" />
							</Button>
						</Link>
					</Col>
					<Col md={10} className="appointmentsSection">
						<MDBTable hover className="table">
							<MDBTableHead textWhite>
								<tr>
									<th className="leftTableCorner">Patient First Name</th>
									<th>Patient Last Name</th>
									<th>Date</th>
									<th>Time</th>
									<th className="rightTableCorner">Type</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody>{normalEndUserData}</MDBTableBody>
						</MDBTable>
					</Col>
				</Row>

				<ContactUs />
			</div>
		);
	}
}

/* references:
	my own work from level 3 task 9
	https://mui.com/
	https://react-bootstrap.github.io/
	https://mdbootstrap.com/docs/react/data/tables/

	*/
