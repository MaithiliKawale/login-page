// const express = require('express');
// // const cookieSession = require('cookie-session');
// const session = require('express-session');
// const passportSetup = require("./passport");
// const passport = require('passport');
// const authRoute = require("./routes/auth");
// const cors = require('cors');
// const app = express();
// app.set('trust proxy', 1);

// // app.use(cookieSession({
// //   name: 'session',
// //   keys: ["maithili"],
// //   maxAge: 24 * 60 * 60 * 100 
// // }))



// app.use(session({ 
//   proxy: true,
//   name: "session",
//   secret: "rhvg657656hbg67687vg341432hj",
//   keys: ["maithili"], 
//   maxAge: 24 * 60 * 60 * 100 
// })
// );
  
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     cors({
//       origin: "https://login-page-frontend-seven.vercel.app/",
//       methods: "GET,POST,PUT,DELETE",
//       credentials: true,
//     })
//   );

// app.use("/auth", authRoute);

// app.listen(5000, () =>{
//     console.log("server is running");
// });


const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');  // Import cookie-parser module
const passportSetup = require('./passport');
const passport = require('passport');
const authRoute = require('./routes/auth');
const cors = require('cors');
const app = express();
app.set('trust proxy', 1);

// Use cookie-parser middleware
// app.use(cookieParser());

// app.use(
//   session({
//     proxy: true,
//     name: 'session',
//     secret: 'rhvg657656hbg67687vg341432hj',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === 'production',
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//       sameSite: 'none',
//     },
//   })
// );

app.use(cookieParser());
app.use(
  session({
    proxy: true,
    name: 'session',
    secret: 'rhvg657656hbg67687vg341432hj',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
  httpOnly: false,
  sameSite: 'Lax',
      // secure: true, // Set to true for production, false for development
      // httpOnly: true, // Ensure that client-side JavaScript cannot access the cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day, adjust based on your requirements
      // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for development
    }
    
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'https://login-page-frontend-kappa.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Example: Log received cookies
app.use((req, res, next) => {
  console.log('Received cookies:', req.cookies);
  next();
});


app.use('/auth', authRoute);

app.listen(5000, () => {
  console.log('server is running');
});
