const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 8000;
const dbPool = require("./db");

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//importing routers
const categoriesRouter = require("./router/categoriesRouter");
const userRouter = require("./router/userRouter");
const tasksRouter = require("./router/tasksRouter");

//mounting routers
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log("Listening on port: ", port);
});

module.exports = app

//creating tables

// const createusersTable = `
//   CREATE TABLE IF NOT EXISTS users (
//     user_id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//   )
// `;

// const createCategoriesTable = `
//    CREATE TABLE IF NOT EXISTS categories (
// 	category_id INT AUTO_INCREMENT PRIMARY KEY,
//     category_name VARCHAR(255) NOT NULL,
// 	user_id INT NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
//   )
// `;

// const createTaksTable = `
// 	CREATE TABLE IF NOT EXISTS tasks (
// 		task_id INT PRIMARY KEY AUTO_INCREMENT,
// 		task_name VARCHAR(255) NOT NULL,
// 		description TEXT,
// 		is_completed BOOLEAN NOT NULL DEFAULT 0,
// 		category_id INT,
// 		FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
// 	);
// `;

// connection.connect();

// List all table names
// connection.query('SHOW TABLES', (error, results, fields) => {
//   if (error) throw error;

//   // Drop each table
//   results.forEach(result => {
//     const tableName = result[`Tables_in_${connection.config.database}`];
//     connection.query(`DROP TABLE IF EXISTS ${tableName}`, (error) => {
//       if (error) console.error(`Error dropping table ${tableName}: ${error.message}`);
//       else console.log(`Table ${tableName} dropped`);
//     });
//   });

//   connection.end();
// });

// connection.query(createusersTable, (error, results) => {
// 	if (error) {
// 		console.error("Error creating users table:", error);
// 	} else {
// 		console.log("Users table created:", results);
// 	}
// });
// connection.query(createCategoriesTable, (error, results) => {
// 	if (error) {
// 		console.error("Error creating Categories table:", error);
// 	} else {
// 		console.log("Categories table created:", results);
// 	}
// });
// connection.query(createTaksTable, (error, results) => {
// 	if (error) {
// 		console.error("Error creating tasks table:", error);
// 	} else {
// 		console.log("Tasks table created:", results);
// 	}
// });
