const express = require('express');
const router = express.Router();
const dbPool = require("../db");

router.get('/get-tasks/:categoryId',(req,res) => {
    // const {category_id} = req.body;
    const category_id = req.params.categoryId;
    dbPool.getConnection((err,connection) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Database error in get-tasks" });
        }
        const query = 'SELECT * FROM tasks WHERE category_id = ?';
        connection.query(query, [category_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error getting tasks", error);
                res.status(500).json({ error: "Error getting tasks" });
            } else {
                connection.release();
                res.json(results);
            }
        });
    })
})

router.get('/get-task/:taskId',(req,res) => {
    // const {task_id} = req.body;
    const task_id = req.params.taskId;
    dbPool.getConnection((err,connection) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Database error in get-task" });
        }
        const query = 'SELECT * FROM tasks WHERE task_id = ?';
        connection.query(query, [task_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error getting task", error);
                res.status(500).json({ error: "Error getting task" });
            } else {
                connection.release();
                res.json(results);
            }
        });
    })
})

router.post('/create-task',(req,res) => {
    const {task_name,description,is_completed,category_id} = req.body;
    dbPool.getConnection((err,connection) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Database error in create-task" });
        }
        const query = 'INSERT INTO tasks (task_name,description,is_completed,category_id) VALUES (?,?,?,?)';
        connection.query(query, [task_name,description,is_completed,category_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error adding task", error);
                res.status(500).json({ error: "Error adding task" });
            } else {
                connection.release();
                res.json({message:"Task added successfully"});
            }
        });
    })
})

router.put('/modify-task/:taskId',(req,res) => {
    const task_id = req.params.taskId;
    const {task_name,description,is_completed,category_id} = req.body;
    dbPool.getConnection((err,connection) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Database error in modify-task" });
        }
        let updateQuery = 'UPDATE tasks SET ';
        const updateValues = [];
        if (task_name) {
            updateQuery += 'task_name = ?, ';
            updateValues.push(task_name);
        }
        if (description) {
            updateQuery += 'description = ?, ';
            updateValues.push(description);
        }
        if (typeof is_completed !== 'undefined') {
            updateQuery += 'is_completed = ?, ';
            updateValues.push(is_completed);
        }
        if( category_id ) {
            updateQuery += 'category_id = ?, ';
            updateValues.push(category_id);
        }
        // Remove the trailing comma and space
        updateQuery = updateQuery.slice(0, -2);

        updateQuery += ' WHERE task_id = ?';
        updateValues.push(task_id);

        connection.query(updateQuery, updateValues, (error, results) => {
            if (error) {
                connection.release();
                console.error('Error updating Task:', error);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                connection.release();
                // console.log("Updated task id",task_id);
                res.status(200).json({ message: 'Task updated successfully' });
            }
        });
    })
})


router.post('/delete-task',(req,res) => {
    const {task_id} = req.body;
    dbPool.getConnection((err,connection)=> {
        if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error in delete-category" });
		}
        const query = 'DELETE FROM tasks WHERE task_id = ?';
        connection.query(query, [task_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error deleting category:", error);
                res.status(500).json({ error: "Error deleting category" });
            } else {
                connection.release();
                // console.log("Task Deleted:", task_id);
                res.json({ message: "Task deleted successfully" });
            }
        });
    })
})

module.exports = router;


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