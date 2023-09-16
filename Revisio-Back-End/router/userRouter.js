const express = require("express");
const router = express.Router();
const dbPool = require("../db");
const jwt = require('jsonwebtoken');

// router.get("/", (req, res) => {
// 	res.send("get request to Users");
// });

//login an existing user
router.post("/login", (req, res) => {
    const { username, password } = req.body; // Assuming you're using body-parser or equivalent middleware
	dbPool.getConnection((err, connection) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Database error in login" });
		}
		//check is username exists
		const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
		connection.query(checkUsernameQuery, [username], (err, results) => {
			if (err) {
				connection.release();
				console.error(err);
				return res.status(500).json({ message: "Query error in sign up" });
			}

			if (results.length <= 0) {
				connection.release();
				return res.status(400).json({ message: "User not found" });
			}
            const user = results[0];
			if( user.password == password ) {
                connection.release();
                const token = jwt.sign({ userId: user.user_id }, 'sparsh_secret_key', { expiresIn: '1h' });
                return res.json({ message: 'Logged In Successfully', token, user : user });
                // return res.json({ message: 'Logged In Successfully', user : user });
            } else {
                connection.release();
                return res.status(400).json({message:"Incorrect Password"})
            }
		});
	});
});

//get a list of users
router.get("/list-users", (req, res) => {
	dbPool.getConnection((err, connection) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error in list-users" });
		}
		const query = "SELECT * FROM users";
		connection.query(query, (err, results) => {
			connection.release();
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Query error in list users" });
			}

			res.json(results);
		});
	});
});

//sign up a new user
router.post("/signup", (req, res) => {
	const { username, password } = req.body; // Assuming you're using body-parser or equivalent middleware
	dbPool.getConnection((err, connection) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error in signup" });
		}

		//check is username already exists
		const checkUsernameQuery =
			"SELECT COUNT(*) AS count FROM users WHERE username = ?";
		connection.query(checkUsernameQuery, [username], (err, results) => {
			if (err) {
				connection.release();
				console.error(err);
				return res.status(500).json({ message: "Query error in sign up" });
			}

			if (results[0].count > 0) {
				connection.release();
				return res.status(400).json({ message: "Username already exists" });
			}

			const query = "INSERT INTO users (username, password) VALUES (?, ?)";
			connection.query(query, [username, password], (error, results) => {
				if (error) {
					connection.release();
					console.error("Error adding user:", error);
					res.status(500).json({ error: "Error adding user" });
				} else {
					connection.release();
					// console.log("User added:", results);
					res.json({ message: "User added successfully" });
				}
			});
		});
	});
});

module.exports = router;

// const createusersTable = `
//   CREATE TABLE IF NOT EXISTS users (
//     user_id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//   )
// `;