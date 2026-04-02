
-- MySQL Workbench Forward Engineering
-- Schema foodapp

-- Create the database
CREATE DATABASE IF NOT EXISTS foodapp;
USE foodapp;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  fname VARCHAR(45) NOT NULL,
  lname VARCHAR(45) NOT NULL,
  address VARCHAR(255),
  user_type TINYINT DEFAULT 0
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  address VARCHAR(255) NOT NULL,
  image MEDIUMTEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
  menu_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  restaurant_id INT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'successful',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- Order-Menus (Many-to-Many relation)
CREATE TABLE IF NOT EXISTS order_menus (
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menus(menu_id) ON DELETE CASCADE
);



-- Insert sample users
INSERT INTO users (fname, lname, email, password, address)
VALUES
  ('Pranjali', 'Nandkar', 'pranjali1@gmail.com', 'hashedpassword1', 'Nagpur'),
  ('rajesh', 'Nandkar', 'moon@gmail.com', 'hashedpassword2', 'Pune'),
  ('Ravi', 'Kumar', 'ravi@gmail.com', 'hashedpassword3', 'Delhi');

-- Insert restaurants
INSERT INTO restaurants (name, description, address, user_id)
VALUES
  ('Pizza Hut', 'Delicious pizzas, cheesy crusts, and iconic flavor', '123 Main Street', 1),
  ('Ming Yang', 'Authentic Chinese cuisine with a modern twist', '456 Elm Avenue', 2),
  ('Sai Sagar', 'Pure veg, spicy North & South Indian thalis', '789 Market Road', 3);

-- Insert menus for each restaurant
INSERT INTO menus (restaurant_id, name, price) VALUES
  (1, 'Margherita Pizza', 250),
  (1, 'Veggie Supreme Pizza', 320),
  (2, 'Hakka Noodles', 150),
  (2, 'Manchurian Gravy', 170),
  (3, 'Paneer Butter Masala', 200),
  (3, 'Veg Biryani', 180);


-- ✅ 1. Check All Registered Users
SELECT user_id, fname, lname, email, address FROM users;

-- ✅ 2. Check All Restaurants
SELECT restaurant_id, name, description, address, user_id FROM restaurants;

-- ✅ 3. Check All Menus
SELECT menu_id, name, price, restaurant_id FROM menus;

-- ✅ 4. Check All Orders
SELECT order_id, user_id, restaurant_id, price, status, date FROM orders;

-- ✅ 5. Check All Order Menu Items (what was ordered in each order)
SELECT * FROM order_menus;

-- ✅ 6. Full Order Details: Orders + Users + Restaurants + Menu Items
SELECT 
  o.order_id,
  o.date,
  o.price,
  o.status,
  r.name AS restaurant_name,
  u.fname AS customer_fname,
  u.lname AS customer_lname,
  u.address AS customer_address,
  m.name AS item_name,
  m.price AS item_price
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
JOIN order_menus om ON o.order_id = om.order_id
JOIN menus m ON om.menu_id = m.menu_id
ORDER BY o.order_id;
