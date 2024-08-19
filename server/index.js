
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























// const http = require('http');
// const url = require('url');
// const querystring = require('querystring');
// const { parse } = require('cookie');
// const crypto = require('crypto');

// const PORT = 5000;

// const sessions = {}; // In-memory session store

// function generateSessionId() {
//   return crypto.randomBytes(16).toString('hex');
// }

// function setCookie(res, name, value, options = {}) {
//   const cookieParts = [`${name}=${value}`];
//   if (options.maxAge) cookieParts.push(`Max-Age=${options.maxAge}`);
//   if (options.httpOnly) cookieParts.push(`HttpOnly`);
//   if (options.secure) cookieParts.push(`Secure`);
//   if (options.sameSite) cookieParts.push(`SameSite=${options.sameSite}`);
//   res.setHeader('Set-Cookie', cookieParts.join('; '));
// }

// function handleRequest(req, res) {
//   const parsedUrl = url.parse(req.url);
//   const parsedCookies = parse(req.headers.cookie || '');

//   if (parsedUrl.pathname === '/') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello World!');
//   } else if (parsedUrl.pathname === '/auth') {
//     // Basic auth simulation
//     const sessionId = parsedCookies['session'] || generateSessionId();
//     sessions[sessionId] = { user: 'authenticatedUser' };
//     setCookie(res, 'session', sessionId, { maxAge: 7 * 24 * 60 * 60, httpOnly: true, secure: true, sameSite: 'None' });
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('User authenticated!');
//   } else if (parsedUrl.pathname === '/logout') {
//     const sessionId = parsedCookies['session'];
//     if (sessionId && sessions[sessionId]) {
//       delete sessions[sessionId];
//       setCookie(res, 'session', '', { maxAge: -1 }); // Expire the cookie
//     }
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('User logged out!');
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//   }
// }

// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, {
//       'Access-Control-Allow-Origin': 'https://login-page-iugn.onrender.com',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//       'Access-Control-Allow-Credentials': 'true',
//       'Access-Control-Allow-Headers': 'Content-Type'
//     });
//     res.end();
//   } else {
//     res.setHeader('Access-Control-Allow-Origin', 'https://login-page-iugn.onrender.com');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     handleRequest(req, res);
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });