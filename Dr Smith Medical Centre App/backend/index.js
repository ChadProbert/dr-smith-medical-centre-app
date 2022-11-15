if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;

// importing controller files
const login = require("./controllers/login.controller");
const appointment = require("./controllers/appointments.controller");

// connecting to the database:

// uri is stored in the .env file since it is sensitive information
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});

mongoose.connection.once("open", function () {
	console.log("Successfully connected to the database!");
});

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));


app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*")
  next();
});

app.use(express.static(path.join(__dirname, "/../frontend/build")));

// login routes
app.post("/login/create-default-admin-account", login.createDefaultAdminAccount);
app.post("/login/admin-login", login.loginAdminAccount);
app.post("/login/create-new-admin", login.createNewAdmin);
app.post("/login/google-login", login.googleLogin);
app.post("/login/facebook-login", login.facebookLogin);

// appointment routes
app.post("/app/add-appointment", appointment.createNewAppointment);
app.get("/app/admin-appointments", appointment.findAllAppointments);
app.put("/app/edit-appointment", appointment.updateById);
app.delete("/app/delete-appointment", appointment.deleteById);
app.get("/app/user-appointments", appointment.findUserAppointments);

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to Dr Smith Medical Centre");
  }
});

app.use(cors());

// helmet security added
/* disabled the CSP so that it would allow for inline scripts 
and inline styling */
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

// starting the sever
app.listen(PORT, () => {
	console.log(`Running on PORT ${PORT}`);
});

/* references:
	my own work from level 3 task 9
	my own work from level 3 task 7
  my own work from level 2 task 21
  https://www.youtube.com/watch?v=pfSxssgPofo&ab_channel=CodeWithAkky

	*/
