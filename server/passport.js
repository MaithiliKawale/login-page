const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GithubStrategy = require("passport-github2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;


const GOOGLE_CLIENT_ID = "1080589034504-i642v78sndouko6r2i3q4s8ht348nqo1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "Ov23liQwppIuNz8Gj6Ev";
const GITHUB_CLIENT_SECRET = "213594944f4d8686d93182499d7c87343bac0f8b";

const FACEBOOK_CLIENT_ID = "Ov23liQwppIuNz8Gj6Ev";
const FACEBOOK_CLIENT_SECRET = "213594944f4d8686d93182499d7c87343bac0f8b";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);

    // If using mongo

    // const user = {
    //     username: profile.displayName,
    //     avatar: profile.photos[0],
    // }

    //user.save
  }
));

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});













