
// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');  // Import cookie-parser module
// const passportSetup = require('./passport');
// const passport = require('passport');
// const authRoute = require('./routes/auth');
// const cors = require('cors');
// const app = express();
// app.set('trust proxy', 1);


// app.use(cookieParser());
// // app.use(
// //   session({
// //     proxy: true,
// //     name: 'session',
// //     secret: 'rhvg657656hbg67687vg341432hj',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //       secure: false,
// //   httpOnly: false,
// //   sameSite: 'Lax',
// //       // secure: true, // Set to true for production, false for development
// //       // httpOnly: true, // Ensure that client-side JavaScript cannot access the cookie
// //       maxAge: 24 * 60 * 60 * 1000, // 1 day, adjust based on your requirements
// //       // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for development
// //     }
    
// //   })
// // );



// app.use(session({
//   secret: 'rhvg657656hbg67687vg341432hj',
//   resave: false, //we dont want to save a session if nothing is modified
//   saveUninitialized: false, //dont create a session until something is stored
//   cookie: {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     secure: true, //Enable when deployment OR when not using localhost, this wont work without https
//     sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend
//   }
// })
// );
  

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//   cors({
//     origin: 'https://login-page-iugn.onrender.com',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
//   })
// );

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Example: Log received cookies
// app.use((req, res, next) => {
//   console.log('Received cookies:', req.cookies);
//   next();
// });


// app.use('/auth', authRoute);

// app.listen(5000, () => {
//   console.log('server is running');
// });























const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');  // Import cookie-parser module
const passportSetup = require('./passport');
const passport = require('passport');
const authRoute = require('./routes/auth');
const cors = require('cors');
const app = express();

// Trust the first proxy, necessary when running behind a proxy like in Heroku or Render
app.set('trust proxy', 1);

// Use cookie-parser to parse cookies
app.use(cookieParser());

// Session configuration
app.use(session({
  name: 'session', // Custom name for the session ID cookie
  secret: 'rhvg657656hbg67687vg341432hj', // Secret for signing cookies
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something is stored
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === 'production', // Enable for production (requires HTTPS)
    httpOnly: true, // Client-side JavaScript can't access the cookie
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site cookies in production, 'lax' for development
  }
}));

// Initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS to allow requests from your frontend
app.use(
  cors({
    origin: 'https://login-page-iugn.onrender.com', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow cookies to be sent
  })
);

// Example route to check the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware to log received cookies (for debugging purposes)
app.use((req, res, next) => {
  console.log('Received cookies:', req.cookies);
  next();
});

// Authentication routes
app.use('/auth', authRoute);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});