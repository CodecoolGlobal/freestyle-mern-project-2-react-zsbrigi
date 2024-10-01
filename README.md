# MERN stack Recipe project

The Recipe Storage Application is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to register, upload recipes, search for recipes, save their favorite recipes, add comments to others' recipes, and use a feature called "What is in my fridge" to find recipes based on available ingredients. The application also includes pagination and a rating system for recipes.

This project was developed by a team of five. Each team member contributed to all aspects of the project, from backend development, database management to frontend design.
*This project was developed after 6 months of studying coding.*

Developed by:

- [Eszter Fodor](https://github.com/eszti9902)
- [Brigitta Zsugonics](https://github.com/zsbrigi)
- [Roland Keszeg](https://github.com/keszegroland)
- [Andor Margitics](https://github.com/mrgitics)
- [Vazul Magyar](https://github.com/Vazul15)

## Features
- **User Registration**
- **Recipe Management**
- **Favorite Recipes**
- **Moving pagination:**
    - Detail: Displaying recipes with moving pagination on the main page.
    ![MainPage](./readme_images/fff_main_page.png)
- **Profile page:**
    - Detail: Displaying own recipes and uploading form for it.
    ![ProfilePage](./readme_images/fff_userprofile_addnew_recipe.png)
- **Comments and rating:**
    - Detail: Add and view comments on recipes, and ratings.
    ![CommentImage](./readme_images/fff_comment_and_star.png)
- **"What is in my fridge":**
    - Detail: Find recipes based on ingredients entered.
    ![Fridge](./readme_images/fff_whats_in_my_fridge.png)

## Technologies Used
### Backend:
- [![nodejs][node.js]][node-url]
- [![expressjs][express.js]][express-url]
### Frontend:
- [![React][React.js]][React-url]
- [![Css][Css3]][Css-url]
### Database:
- [![MongoDB][MongoDB]][mongo-url]
### Libraries:
- [![mongoose][Mongoose]][mongoose-url]
- [![react-router][react-router]][reactrouter-url]

## Architecture
The application is structured into three main components:

- ### Frontend:
Built with React, this part handles the user interface and interactions.

- ### Backend:
Built with Node.js and Express.js, this part manages the API and handles data processing.

- ### Database:
MongoDB is used to store user and recipe data.

## Setup and Installation
- **Clone the repository to a desired directory:**
    ```bash
    git clone git@github.com:CodecoolGlobal/freestyle-mern-project-2-react-zsbrigi.git
    ```
- **Navigate to the project directory:**
    ```bash
    cd <directory>
    ```
### Backend Setup:
- **Navigate to the backend directory:**
    ```bash
    cd server
    ```
- **Install dependencies using npm:**
    ```bash
    npm install
    ```
- Enter your configuration values in the provided **.env.sample** file:
    - - Replace `<USERNAME>`, `<PASSWORD>`, and `<CLUSTER_URL>` with your MongoDB credentials
    
- After entering your details, rename the file from `.env.sample` to `.env`.

- **Start the backend server:**
    ```bash
    npm run dev
    ```
### Frontend Setup:
- **Navigate to the frontend directory:**
    ```bash
    cd ../client
    ```
- **Install dependencies using npm:**
    ```bash
    npm install
    ```
- **Start the React development server:**
    ```bash
    npm start
    ```



[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en

[express.js]: https://img.shields.io/badge/Express.js-ffea00?style=for-the-badge&logo=nodedotjs&logoColor=black
[express-url]: https://expressjs.com/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Css3]: https://img.shields.io/badge/Css-4361ee?style=for-the-badge&logo=css&logoColor=61DAFB
[Css-url]: https://en.wikipedia.org/wiki/CSS

[MongoDB]: https://img.shields.io/badge/MongoDB-001d3d?style=for-the-badge&logo=mongodb&logoColor=00E36A
[mongo-url]: https://www.mongodb.com/

[Mongoose]: https://img.shields.io/badge/Mongoose-a4161a?style=for-the-badge&logo=mongoose&logoColor=white
[mongoose-url]: https://mongoosejs.com/

[react-router]: https://img.shields.io/badge/React%20Router-e5383b?style=for-the-badge&logo=reactrouter&logoColor=white
[reactrouter-url]: https://reactrouter.com/en/main