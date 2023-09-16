# Revision-System-FB
Web based revision System for anyone who is wanting to learn a subject
# SQL Table Structure and Key Relationships

This repository provides an overview of the SQL table structure and the use of primary and foreign keys in a relational database. Understanding these concepts is essential for designing and managing databases effectively.

## Table Structure

### `users` Table
- `user_id`: Primary key, auto-incrementing integer.
- `username`: VARCHAR(255), NOT NULL.
- `password`: VARCHAR(255), NOT NULL.

### `categories` Table
- `category_id`: Primary key, auto-incrementing integer.
- `category_name`: VARCHAR(255), NOT NULL.
- `user_id`: INT, NOT NULL, foreign key referencing `user_id` in the `users` table with CASCADE deletion.

### `tasks` Table
- `task_id`: Primary key, auto-incrementing integer.
- `task_name`: VARCHAR(255), NOT NULL.
- `description`: TEXT.
- `is_completed`: BOOLEAN, NOT NULL, default 0.
- `category_id`: INT, foreign key referencing `category_id` in the `categories` table with CASCADE deletion.

## How It Works

### Primary Keys
- Primary keys uniquely identify rows within a table.
- They enforce data integrity and provide a fast way to retrieve specific rows based on their unique identifiers.

### Foreign Keys
- Foreign keys establish relationships between tables by linking columns in one table to the primary key columns in another table.
- They enforce referential integrity, ensuring data consistency between linked tables.
- In this example:
  - `user_id` in the `categories` table links to `user_id` in the `users` table, associating each category with a specific user.
  - `category_id` in the `tasks` table links to `category_id` in the `categories` table, associating each task with a specific category.
- The `ON DELETE CASCADE` option means that if a referenced row is deleted (e.g., a user or a category), all related rows in the dependent table (e.g., categories or tasks) are automatically deleted, maintaining data consistency.


