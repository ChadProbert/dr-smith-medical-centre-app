import { render, screen } from "@testing-library/react";
import AdminDashboard from "../components/AdminDashboard.js";
import AdminNavBar from "../components/AdminNavBar.js";
import Appointments from "../components/Appointments.js";
import ContactUs from "../components/ContactUs.js";
import CreateNewAdmin from "../components/CreateNewAdmin.js";
import CreateNewAppointment from "../components/CreateNewAppointment.js";
import Homepage from "../components/Homepage.js";
import UserNavBar from "../components/UserNavBar.js";
import { MemoryRouter } from "react-router-dom";

// tests to see if the components render

it("renders the AdminDashboard component", () => {
	render(
		<MemoryRouter>
			<AdminDashboard />
		</MemoryRouter>
	);
	const adminDashboardElement = screen.getByTestId("adminDashboardTest");
	expect(adminDashboardElement).toBeInTheDocument();
});

it("renders the AdminNavBar component", () => {
	render(
		<MemoryRouter>
			<AdminNavBar />
		</MemoryRouter>
	);
	const adminNavBarElement = screen.getByTestId("adminNavBarTest");
	expect(adminNavBarElement).toBeInTheDocument();
});

it("renders the Appointments component", () => {
	render(
		<MemoryRouter>
			<Appointments />
		</MemoryRouter>
	);
	const appointmentsElement = screen.getByTestId("appointmentsTest");
	expect(appointmentsElement).toBeInTheDocument();
});

it("renders the ContactUs component", () => {
	render(
		<MemoryRouter>
			<ContactUs />
		</MemoryRouter>
	);
	const contactUsElement = screen.getByTestId("contactUsTest");
	expect(contactUsElement).toBeInTheDocument();
});

it("renders the CreateNewAdmin component", () => {
	render(
		<MemoryRouter>
			<CreateNewAdmin />
		</MemoryRouter>
	);
	const createNewAdminElement = screen.getByTestId("createNewAdminTest");
	expect(createNewAdminElement).toBeInTheDocument();
});

it("renders the CreateNewAppointment component", () => {
	render(
		<MemoryRouter>
			<CreateNewAppointment />
		</MemoryRouter>
	);
	const createNewAppointmentElement = screen.getByTestId(
		"createNewAppointmentTest"
	);
	expect(createNewAppointmentElement).toBeInTheDocument();
});

it("renders the Homepage component", () => {
	render(
		<MemoryRouter>
			<Homepage />
		</MemoryRouter>
	);
	const homepageElement = screen.getByTestId("homepageTest");
	expect(homepageElement).toBeInTheDocument();
});

it("renders the UserNavBar component", () => {
	render(
		<MemoryRouter>
			<UserNavBar />
		</MemoryRouter>
	);
	const userNavBarElement = screen.getByTestId("userNavBarTest");
	expect(userNavBarElement).toBeInTheDocument();
});

/* references:
my own work from level 2 task 21
  https://stackoverflow.com/questions/73085994/jest-snapshot-test-failing-to-run-for-components-using-react-router-v6-component

*/
