const express = require("express");
const passport = require("passport");

const router = express.Router();

const CLIENT_URL = "https://login-page-frontend-kappa.vercel.app/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
        cookies: req.cookies
    });
    console.log(req.user)
  }
});

router.get("/login/failed", (req, res) => {
  try{
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
  catch(err){
    console.log(err)
  }
});

router.get("/logout", (req, res, next) => {
  // req.logout();
  // res.redirect("/");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
});

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }))
router.get("/google", passport.authenticate("google",  { scope: ["profile"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get('/github',
//   passport.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


router.get("/github", passport.authenticate("github", { scope: ["profile", "email"], prompt: 'consent' }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router;












