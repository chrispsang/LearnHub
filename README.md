<h1 align="center">LearnHub</h1>


LearnHub is a comprehensive online learning platform designed to enhance user engagement and motivation. Users have acccess to courses, take quizzes, track their progress, participate in discussion forums, and leave reviews and ratings. The platform is built using TypeScript, Node.js, Express, React, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)


## Features

- **User Authentication:** Secure authentication system for user registration, login, and logout to protect user data and ensure privacy.
- **Courses and Quizzes:** Users have access to a variety of courses, each with interactive quizzes that can be attempted multiple times to improve learning outcomes.
- **Progress Tracking:** Display quiz progress, including scores and completion status, to help users monitor their learning journey.
- **Leaderboards:** Boost motivation with leaderboards that display top performers, encouraging a competitive yet fun learning environment.
- **Discussion Forums:** Engage with other learners through topic-based discussion forums to ask questions, share knowledge, and collaborate.
- **Reviews and Ratings:** Provide valuable feedback by leaving reviews and ratings for courses, helping other users make informed decisions.

## Tech Stack

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/) 

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) 

[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) 

[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/chrispsang/LearnHub.git
    cd learnhub
    ```

2. **Install backend dependencies:**

    ```bash
    npm install
    ```

3. **Install frontend dependencies:**

    ```bash
    cd online-learning-platform-frontend
    npm install
    cd ..
    ```

### Database Setup

1. **Create a superuser in PostgreSQL:**

    ```sql
    CREATE USER myuser WITH SUPERUSER PASSWORD 'mypassword';
    ```

2. **Create the database:**

    ```bash
    psql -U myuser -d postgres -c "CREATE DATABASE online_learning_platform OWNER myuser;"
    ```

3. **Grant all privileges to the user:**

    ```bash
    psql -U myuser -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE online_learning_platform TO myuser;"
    ```

4. **Verify the creation:**

    ```bash
    psql -U myuser -l
    ```


### Running Migrations and Seeders

1. **Run the Sequelize migrations to set up the database schema:**

    ```bash
    npx sequelize-cli db:migrate
    ```

2. **Seed the database with initial data:**

    ```bash
    npx sequelize-cli db:seed:all
    ```

### Starting the Development Servers

1. **Start the backend server (runs on http://localhost:5001):**

    ```bash
    npm run dev
    ```

2. **Start the frontend development server (runs on http://localhost:3000):**

    ```bash
    cd online-learning-platform-frontend
    npm start
    ```
