# Blog Format Social Network

This project is a CRUD application designed for a blog-style social network, consisting of easily replicable components for other fullstack apps.

The application is built using TypeScript for the frontend and MySQL as the backend database. It leverages Axios for client-server communication and RESTful APIs implemented with Express.js. Security and user management are managed with Auth0.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/blog-social-network.git
   cd blog-social-network
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database.
   - Enter your database credentials in the `.env` file:
     ```
     DB_HOST=your-database-host
     DB_USER=your-database-username
     DB_PASSWORD=your-database-password
     DB_NAME=your-database-name
     ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Start the development server for the frontend:
   ```bash
   npm run dev
   ```

## Technologies Used
- **Frontend**: TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Client-Server Communication**: Axios
- **Authentication**: Auth0

