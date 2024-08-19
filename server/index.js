
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');  // Import cookie-parser module
const passportSetup = require('./passport');
const passport = require('passport');
const authRoute = require('./routes/auth');
const cors = require('cors');
const app = express();
app.set('trust proxy', 1);


app.use(cookieParser());
// app.use(
//   session({
//     proxy: true,
//     name: 'session',
//     secret: 'rhvg657656hbg67687vg341432hj',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//   httpOnly: false,
//   sameSite: 'Lax',
//       // secure: true, // Set to true for production, false for development
//       // httpOnly: true, // Ensure that client-side JavaScript cannot access the cookie
//       maxAge: 24 * 60 * 60 * 1000, // 1 day, adjust based on your requirements
//       // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for development
//     }
    
//   })
// );



app.use(session({
  secret: 'rhvg657656hbg67687vg341432hj',
  resave: false, //we dont want to save a session if nothing is modified
  saveUninitialized: false, //dont create a session until something is stored
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: true, //Enable when deployment OR when not using localhost, this wont work without https
    sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend
  }
})
);
  

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'https://login-page-iugn.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example: Log received cookies
app.use((req, res, next) => {
  console.log('Received cookies:', req.cookies);
  next();
});


app.use('/auth', authRoute);

app.listen(5000, () => {
  console.log('server is running');
});
