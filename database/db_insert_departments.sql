-- Add users
INSERT INTO Users (user_email, first_name, last_name, user_password) VALUES
('admin@gmail.com', 'Main', 'Admin', 'Admin1234&');

-- Add departments
INSERT INTO departments (department_id, department_name) VALUES
(1, 'Writing Supplies & Tools'),
(2, 'Notebooks & Notepads');

-- Add categories
INSERT INTO categories (category_id, category_name, department_id) VALUES
(1, 'Pencils', 1),
(2, 'Pens', 1),
(3, 'Highlighters', 1),
(4, 'Erasers', 1),
(5, 'Pencil Sharpeners', 1),
(6, 'Notebooks', 2),
(7, 'Notepads', 2),
(8, 'Sticky Notes', 2);
