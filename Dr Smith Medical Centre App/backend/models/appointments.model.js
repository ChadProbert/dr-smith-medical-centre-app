const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
	{
		id: { type: Number, required: true },
		patientName: { type: String, required: true },
		patientLastName: { type: String, required: true },
		date: { type: Number, required: true },
		time: { type: String, required: true },
		purpose: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		medicalAid: { type: String, required: true },
		smoker: { type: String, required: true },
		type: { type: String, required: true },
	},
	{ collection: "appointments-data" }
);

const model = mongoose.model("appointments-data", appointmentSchema);

module.exports = model;
