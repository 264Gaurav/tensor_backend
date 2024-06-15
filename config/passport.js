const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../model/userModel");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    // function (accessToken, refreshToken, profile, callback) {
    //   callback(null, profile);
    // }
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken, "profile ", profile);

      User.findOne({ googleId: profile.id }).then((user, err) => {
        if (err) return done(err, null);

        if (!user) {
          const newUser = new User({
            googleId: profile._json.sub,
            user: profile._json,
            displayName: profile.displayName,
          });
          newUser.save();

          return done(null, profile);
        } else {
          return done(null, profile);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
