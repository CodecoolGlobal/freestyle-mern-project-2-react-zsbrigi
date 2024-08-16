# MERN stack Recipe project

The Recipe Storage Application is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to register, upload recipes, search for recipes, save their favorite recipes, add comments to others' recipes, and use a feature called "What is in my fridge" to find recipes based on available ingredients. The application also includes pagination and a rating system for recipes.

## Features
- **User Registration:** Register new users.
- **Recipe Management:** Upload and manage recipes.
- **Search Recipes:** Search for recipes based on keywords.
- **Favorite Recipes:** Save recipes as favorites.
- **Comments:** Add and view comments on recipes.
- **"What is in my fridge":** Find recipes based on ingredients entered.
- **Pagination:** Navigate through pages of search results and recipe lists.
- **Recipe Rating:** Rate recipes.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** MongoDB
- **Libraries:** Mongoose (for MongoDB), React Router (for routing).

## Architecture
The application is structured into three main components:

- ### Frontend:
Built with React, this part handles the user interface and interactions.

- ### Backend:
Built with Node.js and Express.js, this part manages the API and handles data processing.
- ### Database:
MongoDB is used to store user and recipe data.

## Setup and Installation
- **Clone the repository:** `git clone https://github.com/CodecoolGlobal/freestyle-mern-project-2-react-zsbrigi`
- **Navigate to the project directory:** `cd recipe-storage-app`
### Backend Setup:
- **Navigate to the backend directory:** `cd backend`
- **Install dependencies using npm:** `npm install`
- Create a .env file with your database configuration and other environment variables.
**Start the backend server:** `npm run dev`
### Frontend Setup:
- **Navigate to the frontend directory:** `cd ../frontend`
- **Install dependencies using npm:** `npm install`
- **Start the React development server:** `npm start`
### Environment Variables
- **Create .env files for the database in backend with the following variables:** `MONGO_URI=your_mongodb_connection_string`

### Development Team
This project was developed by a team of five. Each team member contributed to all aspects of the project, from backend development, database management to frontend design