const Admin = require("../models/admin-sign-in.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// creates the default admin account if it has not already been created
exports.createDefaultAdminAccount = async (req, res) => {
	// try's to find an admin account document that contains the default admin username
	const adminUser = await Admin.findOne({
		username: process.env.ADMIN_USERNAME,
	});

	/* if it cannot find the default admin account document in the database then it will 
	try create it */
	if (!adminUser) {
		try {
			// req.body.password and req.body.username are stored in the frontend .env file
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			// creates the default admin account document
			const adminUser = await Admin.create({
				username: req.body.username,
				// stored the hashed password in the database
				password: hashedPassword,
			});

			res.json({ status: "ok" });
		} catch (err) {
			console.log(err);
			res.json({
				status: "error",
				error: "Failed to create the default admin account",
			});
		}
	}
};

// logs a user in as an admin with the given credentials from the frontend user
exports.loginAdminAccount = async (req, res) => {
	const admin = await Admin.findOne({
		username: req.body.username,
	});

	if (!admin) {
		return { status: "error", error: "Invalid login credentials" };
	}

	/* compares the password provided by the frontend user with the hashed password 
	stored in the database */
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		admin.password
	);

	// signs the payload if the req.body.password matches admin.password
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				username: admin.username,
			},
			// stored in the .env file since it is sensitive information
			process.env.JWT_SECRET
		);

		return res.json({
			status: "ok",
			admin: token,
		});
	} else {
		return res.json({
			status: "error",
			admin: false,
		});
	}
};

// creates a new admin with the supplied credentials provided by the frontend user
exports.createNewAdmin = async (req, res) => {
	const newAdminUser = await Admin.findOne({
		username: req.body.username,
	});

	if (newAdminUser) {
		res.json({ status: "error", error: "Username already exists..." });
	} else {
		// secures the password by hashing it
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// creates the new admin account
		const adminUser = await Admin.create({
			username: req.body.username,
			// stores the hashed password in the database
			password: hashedPassword,
		});
		res.json({ status: "ok" });
	}
};

// logs a user in using their Google account
exports.googleLogin = async (req, res) => {
	const { username } = req.body;

	// finds an admin account that contains the user's Google account email
	const admin = await Admin.findOne({
		username: username,
	});

	if (!admin) {
		return { status: "error", error: "This google account is not an admin..." };
	}

	/* signs the payload if the user's Google account email matches an admin email */
	if (admin) {
		const token = jwt.sign(
			{
				username: admin.username,
			},
			// stored in the .env file since it is sensitive information
			process.env.JWT_SECRET
		);

		return res.json({
			status: "ok",
			admin: token,
		});
	} else {
		return res.json({
			status: "error",
			admin: false,
		});
	}
};

// logs a user in using their Facebook account
exports.facebookLogin = async (req, res) => {
	const { username } = req.body;
	console.log(username);

	// finds an admin account that contains the user's Facebook email
	const admin = await Admin.findOne({
		username: username,
	});

	if (!admin) {
		return {
			status: "error",
			error: "This Facebook account is not an admin...",
		};
	}

	/* signs the payload if the user's Facebook account email matches an admin email */
	if (admin) {
		const token = jwt.sign(
			{
				username: admin.username,
			},
			// stored in the .env file since it is sensitive information
			process.env.JWT_SECRET
		);

		return res.json({
			status: "ok",
			admin: token,
		});
	} else {
		return res.json({
			status: "error",
			admin: false,
		});
	}
};

/* references:
	my own work from level 3 task 7
	my own work from level 3 task 9
	https://www.youtube.com/watch?v=LA16VCpUido&ab_channel=AwaisMirza
	https://www.youtube.com/watch?v=zQNPDRg_1Po&ab_channel=AwaisMirza
 */
