const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String },
	},
	{ collection: "admin-accounts" }
);

const model = mongoose.model("admin-accounts", Admin);

module.exports = model;
