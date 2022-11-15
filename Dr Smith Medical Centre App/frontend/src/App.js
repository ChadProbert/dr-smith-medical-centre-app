import React from "react";
import { Route, Routes } from "react-router-dom";

// components
import Homepage from "./components/Homepage";
import Appointments from "./components/Appointments";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import CreateNewAdmin from "./components/CreateNewAdmin";

// specified routes to the different components
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/appointments" element={<Appointments />} />
				<Route path="/admin-login" element={<AdminLogin />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route path="/create-new-admin" element={<CreateNewAdmin />} />
			</Routes>
		</div>
	);
}

export default App;

/* references: 
	My own work from level 3 task 9

	*/
