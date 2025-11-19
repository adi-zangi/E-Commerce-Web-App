-- Add departments
INSERT INTO Departments (department_id, department_name) VALUES
(1, 'Writing Supplies & Tools'),
(2, 'Notebooks & Notepads');

-- Add categories
INSERT INTO Categories (category_id, category_name, category_keyword, department_id) VALUES
(1, 'Pencils', 'Pencil', 1),
(2, 'Pens', 'Pen', 1),
(3, 'Highlighters', 'Highlighter', 1),
(4, 'Erasers', 'Eraser', 1),
(5, 'Pencil Sharpeners', 'Pencil Sharpener', 1),
(6, 'Notebooks', 'Notebook', 2),
(7, 'Notepads', 'Notepad', 2),
(8, 'Sticky Notes', 'Sticky', 2);

-- Add values to the search history table
-- This is the initial list of autocomplete search suggestions
INSERT INTO SearchHistory (query)
SELECT LOWER(category_name)
FROM Categories;