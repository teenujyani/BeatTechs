-- Sample Course Content Data
-- Run this in Supabase SQL Editor after creating the tables

-- Data Science Course Content
INSERT INTO course_content (course_id, course_title, section_number, section_title, video_id, video_title, video_url, duration, order_index)
VALUES
  ('data-science', 'Data Science', 1, 'Introduction to Data Science', 'ds_intro_1', 'What is Data Science?', 'https://www.youtube.com/embed/ua-CiDNNj30', 600, 1),
  ('data-science', 'Data Science', 1, 'Introduction to Data Science', 'ds_intro_2', 'Data Science Tools Overview', 'https://www.youtube.com/embed/N6BghzuFLIg', 720, 2),
  ('data-science', 'Data Science', 2, 'Python for Data Science', 'ds_python_1', 'Python Basics', 'https://www.youtube.com/embed/_uQrJ0TkZlc', 900, 3),
  ('data-science', 'Data Science', 2, 'Python for Data Science', 'ds_python_2', 'NumPy Tutorial', 'https://www.youtube.com/embed/QUT1VHiLmmI', 1200, 4),
  ('data-science', 'Data Science', 2, 'Python for Data Science', 'ds_python_3', 'Pandas Tutorial', 'https://www.youtube.com/embed/vmEHCJofslg', 1500, 5),
  ('data-science', 'Data Science', 3, 'Data Visualization', 'ds_viz_1', 'Matplotlib Basics', 'https://www.youtube.com/embed/DAQNHzOcO5A', 800, 6),
  ('data-science', 'Data Science', 3, 'Data Visualization', 'ds_viz_2', 'Seaborn Tutorial', 'https://www.youtube.com/embed/6GUZXDef2U0', 900, 7);

-- Python Programming Course Content  
INSERT INTO course_content (course_id, course_title, section_number, section_title, video_id, video_title, video_url, duration, order_index)
VALUES
  ('python-programming', 'Python Programming', 1, 'Python Basics', 'py_basics_1', 'Variables and Data Types', 'https://www.youtube.com/embed/Z1Yd7upQsXY', 600, 1),
  ('python-programming', 'Python Programming', 1, 'Python Basics', 'py_basics_2', 'Control Flow', 'https://www.youtube.com/embed/PqFKRqpHrjw', 720, 2),
  ('python-programming', 'Python Programming', 2, 'Functions and Modules', 'py_func_1', 'Functions in Python', 'https://www.youtube.com/embed/9Os0o3wzS_I', 900, 3),
  ('python-programming', 'Python Programming', 2, 'Functions and Modules', 'py_func_2', 'Modules and Packages', 'https://www.youtube.com/embed/CqvZ3vGoGs0', 800, 4),
  ('python-programming', 'Python Programming', 3, 'Object-Oriented Programming', 'py_oop_1', 'Classes and Objects', 'https://www.youtube.com/embed/ZDa-Z5JzLYM', 1000, 5),
  ('python-programming', 'Python Programming', 3, 'Object-Oriented Programming', 'py_oop_2', 'Inheritance', 'https://www.youtube.com/embed/RSl87lqOXDE', 900, 6);

-- Machine Learning Course Content
INSERT INTO course_content (course_id, course_title, section_number, section_title, video_id, video_title, video_url, duration, order_index)
VALUES
  ('machine-learning', 'Machine Learning', 1, 'Introduction to ML', 'ml_intro_1', 'What is Machine Learning?', 'https://www.youtube.com/embed/ukzFI9rgwfU', 700, 1),
  ('machine-learning', 'Machine Learning', 1, 'Introduction to ML', 'ml_intro_2', 'Types of Machine Learning', 'https://www.youtube.com/embed/yN7ypxC7838', 800, 2),
  ('machine-learning', 'Machine Learning', 2, 'Supervised Learning', 'ml_super_1', 'Linear Regression', 'https://www.youtube.com/embed/7ArmBVF2dCs', 1200, 3),
  ('machine-learning', 'Machine Learning', 2, 'Supervised Learning', 'ml_super_2', 'Logistic Regression', 'https://www.youtube.com/embed/yIYKR4sgzI8', 1000, 4),
  ('machine-learning', 'Machine Learning', 3, 'Deep Learning Basics', 'ml_deep_1', 'Neural Networks', 'https://www.youtube.com/embed/aircAruvnKk', 1500, 5);

-- C++ Programming Course Content
INSERT INTO course_content (course_id, course_title, section_number, section_title, video_id, video_title, video_url, duration, order_index)
VALUES
  ('cpp-programming', 'C++ Programming', 1, 'C++ Fundamentals', 'cpp_basics_1', 'Introduction to C++', 'https://www.youtube.com/embed/vLnPwxZdW4Y', 900, 1),
  ('cpp-programming', 'C++ Programming', 1, 'C++ Fundamentals', 'cpp_basics_2', 'Variables and Data Types', 'https://www.youtube.com/embed/2BP8NhxjrO0', 800, 2),
  ('cpp-programming', 'C++ Programming', 2, 'OOP in C++', 'cpp_oop_1', 'Classes and Objects', 'https://www.youtube.com/embed/wN0x9eZLix4', 1200, 3),
  ('cpp-programming', 'C++ Programming', 2, 'OOP in C++', 'cpp_oop_2', 'Inheritance and Polymorphism', 'https://www.youtube.com/embed/I-hZkUa9mIs', 1000, 4);

-- Sample Test Modules
INSERT INTO test_modules (course_id, module_id, module_title, module_type, description, price, duration, questions_count)
VALUES
  ('data-science', 'ds_test_1', 'Data Science Fundamentals Test', 'test', 'Test your knowledge of Data Science basics', 299, 60, 30),
  ('data-science', 'ds_module_1', 'Advanced Data Visualization Module', 'module', 'Deep dive into advanced visualization techniques', 999, NULL, NULL),
  ('python-programming', 'py_test_1', 'Python Basics Assessment', 'test', 'Assess your Python programming skills', 199, 45, 25),
  ('machine-learning', 'ml_test_1', 'ML Algorithms Test', 'test', 'Test your understanding of ML algorithms', 399, 90, 40),
  ('machine-learning', 'ml_module_1', 'Deep Learning Specialization', 'module', 'Advanced deep learning concepts and implementations', 1999, NULL, NULL),
  ('cpp-programming', 'cpp_test_1', 'C++ Proficiency Test', 'test', 'Evaluate your C++ programming abilities', 249, 60, 30);
