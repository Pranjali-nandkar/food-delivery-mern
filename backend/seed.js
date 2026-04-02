const mongoose = require('mongoose');
require('dotenv').config();
const { Restaurant, Menu } = require('./models/restaurantModel');
const User = require('./models/userModel');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Create a dummy admin user to own the restaurants
    let admin = await User.findOne({ email: 'admin@foodapp.com' });
    if (!admin) {
      admin = new User({
        fname: 'Admin',
        lname: 'User',
        email: 'admin@foodapp.com',
        password: 'password123', // Will be hashed by pre-save middleware
        address: '123 Main St',
        user_type: 1 // Restaurant Owner
      });
      await admin.save();
      console.log('Admin user created');
    }

    // 2. Clear existing data
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});
    console.log('Old restaurants and menus cleared');

    // 3. Add Sample Restaurants
    const restaurants = [
      {
        name: 'Pizza Hut',
        description: 'Best Italian Pizzas',
        address: 'MG Road, Bangalore',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        user_id: admin._id
      },
      {
        name: 'Ming Yang',
        description: 'Authentic Chinese Cuisine',
        address: 'Brigade Road, Bangalore',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
        user_id: admin._id
      },
      {
        name: 'Sai Sagar',
        description: 'Delicious South Indian Meals',
        address: 'Indiranagar, Bangalore',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
        user_id: admin._id
      }
    ];

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`${createdRestaurants.length} restaurants added`);

    // 4. Add Sample Menu Items
    const menuItems = [
      // Pizza Hut
      { name: 'Margherita Pizza', price: 299, restaurant_id: createdRestaurants[0]._id },
      { name: 'Veggie Supreme Pizza', price: 399, restaurant_id: createdRestaurants[0]._id },
      { name: 'Cheese Burst Pizza', price: 449, restaurant_id: createdRestaurants[0]._id },
      { name: 'Cheese Bread', price: 149, restaurant_id: createdRestaurants[0]._id },
      // Ming Yang
      { name: 'Manchurian Rice', price: 249, restaurant_id: createdRestaurants[1]._id },
      { name: 'Hakka Noodles', price: 219, restaurant_id: createdRestaurants[1]._id },
      { name: 'Manchurian Gravy', price: 199, restaurant_id: createdRestaurants[1]._id },
      { name: 'Veg Manchow Soup', price: 129, restaurant_id: createdRestaurants[1]._id },
      // Sai Sagar
      { name: 'Mysore Masala Dosa', price: 110, restaurant_id: createdRestaurants[2]._id },
      { name: 'Paneer Butter Masala', price: 280, restaurant_id: createdRestaurants[2]._id },
      { name: 'Veg Biryani', price: 260, restaurant_id: createdRestaurants[2]._id },
      { name: 'Masala Lemonade', price: 80, restaurant_id: createdRestaurants[2]._id }
    ];

    await Menu.insertMany(menuItems);
    console.log('Menu items added successfully');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
