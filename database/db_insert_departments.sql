-- Add users
INSERT INTO Users (user_email, first_name, last_name, user_password) VALUES
('admin@gmail.com', 'Main', 'Admin', 'Admin1234&');

-- Add departments
INSERT INTO departments (department_id, department_name) VALUES
(1, 'Writing Supplies & Tools'),
(2, 'Notebooks & Notepads');

-- Add categories
INSERT INTO categories (category_id, category_name, category_keyword, department_id) VALUES
(1, 'Pencils', 'Pencil', 1),
(2, 'Pens', 'Pen', 1),
(3, 'Highlighters', 'Highlighter', 1),
(4, 'Erasers', 'Eraser', 1),
(5, 'Pencil Sharpeners', 'Sharpener', 1),
(6, 'Notebooks', 'Notebook', 2),
(7, 'Notepads', 'Notepad', 2),
(8, 'Sticky Notes', 'Sticky', 2);
