const express = require('express');
const router = express.Router();
const dbPool = require("../db");

router.post('/add-category',(req,res) => {
    const {category_name,user_id} = req.body;
    dbPool.getConnection((err,connection)=> {
        if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error in add-category" });
		}
        const query = 'INSERT INTO categories (category_name,user_id) VALUES (?,?)';
        connection.query(query, [category_name, user_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error adding category:", error);
                res.status(500).json({ error: "Error adding category" });
            } else {
                connection.release();
                // console.log("Category added:", category_name);
                res.json({ message: "Category added successfully" });
            }
        });
    })
})

router.post('/get-categories',(req,res) => {
    const {user_id} = req.body;
    dbPool.getConnection((err,connection) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Database error in get-categories" });
        }
        const query = 'SELECT * FROM categories WHERE user_id = ?';
        connection.query(query, [user_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error getting categories", error);
                res.status(500).json({ error: "Error getting categories" });
            } else {
                connection.release();
                // console.log("Category added:", category_name);
                res.json(results);
            }
        });
    })
})

router.post('/delete-category',(req,res) => {
    const {category_id} = req.body;
    dbPool.getConnection((err,connection)=> {
        // console.log("Delete Category request")
        if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error in delete-category" });
		}
        const query = 'DELETE FROM categories WHERE category_id = ?';
        connection.query(query, [category_id], (error, results) => {
            if (error) {
                connection.release();
                console.error("Error deleting category:", error);
                res.status(500).json({ error: "Error deleting category" });
            } else {
                connection.release();
                // console.log("Category Deleted:", category_id);
                res.json({ message: "Category deleted successfully" });
            }
        });
    })
})



module.exports = router;


// const createCategoriesTable = `
//    CREATE TABLE IF NOT EXISTS categories (
// 	category_id INT AUTO_INCREMENT PRIMARY KEY,
//     category_name VARCHAR(255) NOT NULL,
// 	user_id INT NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
//   )
// `;