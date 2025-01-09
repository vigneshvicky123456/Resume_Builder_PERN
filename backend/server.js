const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  
const { connectDB, sequelize  } = require('./database');
const PORT = 5000;
require('dotenv').config();


// import Routes
const accountUserRoutes = require('./routes/accountusers');
const resumesRoutes = require('./routes/resumesRoute');
const contactRoutes = require('./routes/contactRoute');
const experienceRoutes = require('./routes/experienceRoute');
const educationRoutes = require('./routes/educationRoute');
const certificateRoutes = require('./routes/certificateRoute');
const skillRoutes = require('./routes/skillRoute');
const summaryRoutes = require('./routes/summaryRoute');
const referenceRoutes = require('./routes/referenceRoute');


const { accountUserModel, resumesModel, contactModel, experienceModel, educationModel, certificateModal, skillModel, summaryModel, referenceModel } = require("./models/association");

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};

//Mildware
const app = express();
app.use(bodyParser.json()); //req.body
app.use(cors(corsOptions));

// Connect database
connectDB(); 

//Routes
app.use("/accountUser",accountUserRoutes);
app.use("/resume",resumesRoutes);
app.use("/contact",contactRoutes);
app.use("/experience",experienceRoutes); 
app.use("/education",educationRoutes);
app.use("/certificate",certificateRoutes);
app.use("/skill",skillRoutes);
app.use("/summary",summaryRoutes);
app.use("/reference",referenceRoutes);

sequelize
  .sync({ alter: true }) // Use { force: true } or { alter: true } during development
  .then(() => {
    console.log("Database & tables created/altered!");
  })
  .catch((err) => console.error("Error syncing database:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/////////////1st

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// // const { ClerkExpressWithAuth  } = require('@clerk/clerk-sdk-node');
// //const { clerkMiddleware   } = require('@clerk/express');  
// const { connectDB, sequelize  } = require('./database');
// const PORT = 5000;
// require('dotenv').config();


// // import Routes
// const accountUserRoutes = require('./routes/accountusers');

// //console.log('CLERK_API_KEY:', process.env.CLERK_API_KEY);
// //console.log('CLERK_FRONTEND_API:', process.env.CLERK_FRONTEND_API);

// // const CLERK_API_KEY = "sk_test_McoVYBF74IoWCjLzzJG3r1hjB1qvkMN6vrjvX550xC";
// // const CLERK_FRONTEND_API = "pk_test_bGliZXJhbC1ob3VuZC00Ny5jbGVyay5hY2NvdW50cy5kZXYk";

// // console.log('CLERK_API_KEY:', CLERK_API_KEY);
// // console.log('CLERK_FRONTEND_API:', CLERK_FRONTEND_API);

// // Clerk middleware - Ensure Clerk is properly configured with API keys
// // if (!process.env.CLERK_API_KEY || !process.env.CLERK_FRONTEND_API) {
// //   console.error("Missing Clerk API keys in .env file");  
// //   process.exit(1); 
// // }

// // Configure CORS options
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, 
// };

// //Mildware
// const app = express();
// app.use(bodyParser.json()); //req.body
// app.use(cors(corsOptions));

// // Clerk middleware - Ensure Clerk is properly configured with API keys
// // Clerk.configure({
// //   apiKey: process.env.CLERK_API_KEY,  
// //   frontendApi: process.env.CLERK_FRONTEND_API,
// // });

// // Clerk middleware
// // app.use(ClerkExpressWithAuth());
// //app.use(clerkMiddleware())

// // Connect database
// connectDB(); 

// //Routes
// app.use("/accountUser",accountUserRoutes);

// sequelize
//   .sync({ alter: true }) // Use { force: true } or { alter: true } during development
//   .then(() => {
//     console.log("Database & tables created/altered!");
//   })
//   .catch((err) => console.error("Error syncing database:", err));

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

////////////// 2nd
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
