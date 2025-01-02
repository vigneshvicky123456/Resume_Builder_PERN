const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ClerkExpressWithAuth  } = require('@clerk/clerk-sdk-node'); 
const { connectDB, sequelize  } = require('./database');
const PORT = 5000;
require('dotenv').config();


// import Routes
const accountUserRoutes = require('./routes/accountusers');

// console.log('CLERK_API_KEY:', process.env.CLERK_API_KEY);
// console.log('CLERK_FRONTEND_API:', process.env.CLERK_FRONTEND_API);

const CLERK_API_KEY = "sk_test_McoVYBF74IoWCjLzzJG3r1hjB1qvkMN6vrjvX550xC";
const CLERK_FRONTEND_API = "pk_test_bGliZXJhbC1ob3VuZC00Ny5jbGVyay5hY2NvdW50cy5kZXYk";

console.log('CLERK_API_KEY:', CLERK_API_KEY);
console.log('CLERK_FRONTEND_API:', CLERK_FRONTEND_API);

// Clerk middleware - Ensure Clerk is properly configured with API keys
if (!process.env.CLERK_API_KEY || !process.env.CLERK_FRONTEND_API) {
  console.error("Missing Clerk API keys in .env file");  
  process.exit(1); 
}

//Mildware
const app = express();
app.use(bodyParser.json()); //req.body
app.use(cors());

// Clerk middleware - Ensure Clerk is properly configured with API keys
// Clerk.configure({
//   apiKey: process.env.CLERK_API_KEY,  
//   frontendApi: process.env.CLERK_FRONTEND_API,
// });

// Clerk middleware
app.use(ClerkExpressWithAuth());

// Connect database
connectDB(); 

//Routes
app.use("/accountUser",accountUserRoutes);

sequelize
  .sync({ alter: true }) // Use { force: true } or { alter: true } during development
  .then(() => {
    console.log("Database & tables created/altered!");
  })
  .catch((err) => console.error("Error syncing database:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { clerkMiddleware } = require('@clerk/express');
// const { connectDB, sequelize } = require('./database');
// const PORT = 5000;
// require('dotenv').config();

// // Ensure Clerk is properly configured with API keys
// if (!process.env.CLERK_API_KEY || !process.env.CLERK_FRONTEND_API) {
//   console.error("Missing Clerk API keys in .env file");
//   process.exit(1); // Exit the application if Clerk keys are not found
// }

// // import Routes
// const accountUserRoutes = require('./routes/accountusers');

// // Middleware
// const app = express();
// app.use(bodyParser.json()); // req.body
// app.use(cors());

// // Clerk middleware - Use the clerkMiddleware from @clerk/express
// app.use(clerkMiddleware({
//   apiKey: process.env.CLERK_API_KEY,  // Clerk API key
//   frontendApi: process.env.CLERK_FRONTEND_API,  // Clerk Frontend API key
// }));

// // Connect to the database
// connectDB();

// // Routes
// app.use("/accountUser", accountUserRoutes);

// // Sync the database (for development purposes, set { force: true })
// sequelize
//   .sync({ force: true }) // Use { force: true } or { alter: true } during development
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch((err) => console.error("Error syncing database:", err));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
