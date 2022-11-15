const Appointment = require("../models/appointments.model");

// generates a random number
const generateID = () => {
	return Math.floor(Math.random() * Date.now());
};

// create a new appointment document in the database
exports.createNewAppointment = (req, res) => {
	const id = generateID();
	/* stored the date in time format inside of the database so that it would be easier 
	to find all the appointments for the normal end-user (only for the next 2 weeks) */
	const dateInNumberFormat = new Date(req.body.date).getTime();
	let appointmentModel = new Appointment({
		// assigned each appointment with a random id number
		id: id,
		patientName: req.body.patientName,
		patientLastName: req.body.patientLastName,
		date: dateInNumberFormat,
		time: req.body.time,
		purpose: req.body.purpose,
		phoneNumber: req.body.phoneNumber,
		medicalAid: req.body.medicalAid,
		smoker: req.body.smoker,
		type: req.body.type,
	});

	appointmentModel.save((err, data) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				message: "An error occurred while creating a new appointment document.",
			});
		} else {
			res.send("Successfully created a new appointment document!");
		}
	});
};

// gets all appointment documents in the database
exports.findAllAppointments = (req, res) => {
	Appointment.find((err, appointments) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				message: "An error occurred while getting the appointment documents.",
			});
		} else {
			res.send(appointments);
		}
	});
};

/* finds the appointment document that contains the specified appointment id and updates 
	the document with the new information captured by the admin user in the frontend */
exports.updateById = (req, res) => {
	Appointment.findOneAndUpdate(
		{ id: req.body.id },
		{
			id: req.body.id,
			patientName: req.body.patientName,
			patientLastName: req.body.patientLastName,
			date: req.body.date,
			time: req.body.time,
			purpose: req.body.purpose,
			phoneNumber: req.body.phoneNumber,
			medicalAid: req.body.medicalAid,
			smoker: req.body.smoker,
			type: req.body.type,
		},
		// returns the document after the update is applied
		{ new: true },
		(err) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				res.send("Successfully edited the appointment's documents!");
			}
		}
	);
};

// deletes the appointment with the specific id number captured in the frontend
// used id numbers because they are unique.
exports.deleteById = (req, res) => {
	Appointment.findOneAndRemove({ id: req.body.id }, (err) => {
		if (err) {
			console.log(
				"An error occurred while deleting the appointment's documents."
			);
			res.send(err);
		} else {
			res.send("Successfully deleted the appointment's documents!");
		}
	});
};

// gets all the appointments between now and 2 weeks from now
exports.findUserAppointments = (req, res) => {
	/* used getTime() so that I could compare the dates greater than and less than 
	values in number format */
	const dateToday = new Date().getTime();
	// 1209600000 is the amount of milliseconds in 2 weeks
	const twoWeeks = new Date(dateToday + 1209600000).getTime();
	Appointment.find(
		{ date: { $gt: dateToday, $lt: twoWeeks } },
		(err, appointments) => {
			if (err) {
				console.log(err);
				res.status(500).send({
					message:
						"An error occurred while finding appointments for the next 2 weeks.",
				});
			} else {
				res.send(appointments);
			}
		}
	);
};

/* references:
	my own work from level 3 task 7
	my own work from level 3 task 9
	https://stackoverflow.com/questions/5627995/mongoose-node-js-query-with-lt-and-gt-not-working
	https://www.advancedconverter.com/unit-conversions/time-conversion/weeks-to-milliseconds
	*/
