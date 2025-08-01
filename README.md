# Project-WanderLust
 
Wanderlust - Travel & Adventure Platform

🚀 Live Website: 😇https://project-wanderlust-0q3w.onrender.com


🌍 About Wanderlust

Wanderlust is a dynamic web application designed for travelers to explore and share their adventures. With a seamless user experience, the platform allows users to post, review, and discover exciting destinations around the world. The project is built with Node.js, Express.js, MongoDB, and Cloudinary for image storage.
<hr>

🛠️ Features

📝 User Authentication: Secure login and registration system.

📍 Listing Management: Users can create, update, and delete travel listings.

⭐ Reviews & Ratings: Share experiences and rate destinations.

📸 Image Uploads: Cloud-based storage with Cloudinary integration.

🔍 Search & Filter: Find locations easily with powerful search options.

🎭 Responsive Design: Mobile-friendly and fully responsive UI.

# Wanderlust Web Project Installation Guide

This guide will walk you through the installation process for the Wanderlust web project. Follow the steps below to set up the project locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (version 18 recommended)
- MongoDB
- Nodemon (installed globally)

## Installation Steps

1. Clone the Wanderlust repository from GitHub:

   ```
   git clone https://github.com/RANATHEMORTIS/Project-WanderLust.git
   ```

2. Set up the database:
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file:

     ```
     ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
     ```

3. Set up Cloudinary:
   - Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account.
   - Once logged in, obtain your Cloudinary `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET`.
   - Add these values to the `.env` file:

     ```
     CLOUD_NAME=your_cloud_name
     CLOUD_API_KEY=your_api_key
     CLOUD_API_SECRET=your_api_secret
     ```

4. Set the secret for your Cloudinary storage:
   - Add a `SECRET` key to your `.env` file and set it to a secure value:

     ```
     SECRET=your_cloudinary_secret
     ```

5. Install project dependencies using npm:

   ```
   npm install
   ```

6. Run the application using Nodemon:

   ```
   nodemon app.js
   ```

7. Access the project:
   - Once the server is running, you can access the project at [http://localhost:8080](http://localhost:8080).

That's it! You have successfully installed and set up the Wanderlust web project on your local machine. If you encounter any issues during the installation process, feel free to reach out for assistance. Happy traveling! 🌍✈️
