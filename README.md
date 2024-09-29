# Tasks Flow Server

## Description
Tasks Flow Server is the backend for task management, built with Express and TypeScript. This project provides an API for creating, reading, updating, and deleting tasks.

## Installation

### Clone the repository:
git clone https://github.com/YuliaSilk/tasks-flow-server.git

### Navigate to the project directory:
cd tasks-flow-server

### Install dependencies:
npm install

### Configuration
Create a .env file in the root directory of the project and add the necessary environment variables:
PORT=3001
DB_HOST=your_mongodb_uri=your_database_url

### Running the Server
Start the server:
npm run start

The server will be running on the port specified in the .env file.


## Usage

### Routes

#### Boards
•	GET /api/boards: Get all boards
•	POST /api/boards: Create a new board
•	GET /api/boards/:boardId: Get a board by ID

#### Columns
•	GET /api/boards/:boardId/columns: Get all columns for a board
•	POST /api/boards/:boardId/columns: Create a new column for a board
•	GET /api/boards/:boardId/columns/:columnId: Get a column by ID

#### Cards
•	GET /api/boards/:boardId/columns/:columnId/cards: Get all cards in a column
•	POST /api/boards/:boardId/columns/:columnId/cards: Create a new card
•	GET /api/boards/:boardId/columns/:columnId/cards/:id: Get a card by ID
•	PUT /api/boards/:boardId/columns/:columnId/cards/:id: Update a card by ID
•	DELETE /api/boards/:boardId/columns/:columnId/cards/:id: Delete a card by ID

### Example Request
curl -X GET http://localhost:3000/api/data

### Project Structure
/src
  /controllers
    userController.ts
    taskController.ts
  /routes
    userRoutes.ts
    taskRoutes.ts
  /services
    userService.ts
    taskService.ts
  /models
    userModel.ts
    taskModel.ts
  /middlewares
    authMiddleware.ts
  app.ts

## Technologies Used
•	Node.js: Server-side platform
•	Express: Web framework for creating APIs
•	TypeScript: A typed superset of JavaScript
•	MongoDB: NoSQL database for data storage
•	Mongoose: ODM for interacting with MongoDB

## Contribution
If you wish to contribute, clone the repository, create a branch for your changes, and submit a pull request. Any suggestions and contributions are welcome.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.