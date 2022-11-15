import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

// components
import ContactUs from "./ContactUs";
import UserNavBar from "./UserNavBar";

// stylesheets
import "./css/Homepage.css";

// images
import reviewer1 from "./images/reviewer images/reviewer 2.jpg";
import reviewer2 from "./images/reviewer images/reviewer 8.jpg";
import reviewer3 from "./images/reviewer images/reviewer 10.jpg";

// basic minimal and reusable homepage
/* features an about us section, a reviews section and multiple links and buttons 
to navigate around the website */
export default function Homepage() {
	return (
		<div className="homepage" data-testid="homepageTest">
			<UserNavBar />
			<div className="background1">
				<Row className="row1">
					<Col md={4}>
						<div>
							<div id="fadeInDiv">
								<h2 className="welcomeHeading">
									Hello. I'm <br /> Dr. Smith
								</h2>
							</div>
						</div>
						<h4 className="welcomeSubHeading">Licensed Medical Doctor</h4>

						<Link to={"/appointments"} className="appointmentsLink">
							<Button variant="contained" className="appointmentsButton">
								View Appointments
							</Button>
						</Link>

						<br />

						<Link to={"/admin-login"} className="adminLoginLink">
							<Button variant="contained" className="adminButton">
								I am an administrator
							</Button>
						</Link>
					</Col>
				</Row>

				<div className="aboutUsBox">
					<h3 className="aboutUsHeading">About Us</h3>
					<p className="aboutUsMessage">
						We are a team of medical health professionals with many years of
						work experience. We pride ourselves on providing the best quality
						healthcare service to our patients.
					</p>
				</div>
			</div>
			<div>
				<div className="reviewsBox">
					<h3 className="reviewsHeading">Reviews</h3>

					<Row className="reviewRow">
						<Col md={4} className="reviewerColumn">
							<Card style={{ width: "22rem" }} className="card">
								<Card.Img variant="top" src={reviewer1} />
								<Card.Body>
									<Card.Title className="cardTitle">Emma Harlow</Card.Title>
									<Card.Text className="cardText">
										"Dr. Smith has been my doctor for 11 years now! She is
										always willing to help. I highly recommend her to anyone who
										is looking for a doctor."
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col md={4} className="reviewerColumn">
							<Card style={{ width: "22rem" }} className="card">
								<Card.Img variant="top" src={reviewer2} />
								<Card.Body>
									<Card.Title className="cardTitle">John Doe</Card.Title>
									<Card.Text className="cardText">
										"Dr. Smith is an excellent doctor. She is very passionate as
										well as meticulous when going about doing what she loves!"
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col md={4} className="reviewerColumn">
							<Card style={{ width: "22rem" }} className="card">
								<Card.Img variant="top" src={reviewer3} />
								<Card.Body>
									<Card.Title className="cardTitle">Jane Maritz</Card.Title>
									<Card.Text className="cardText">
										"Dr. Smith is a very patient and caring doctor. She is
										always willing to help and is always available to answer any
										questions you may have."
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
			<ContactUs />
		</div>
	);
}

/* references: 
	my own work from Level 3 task 9
	https://unsplash.com/
	https://mui.com/
	https://react-bootstrap.github.io/

	*/
