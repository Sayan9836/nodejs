import passport from "passport";
import { User } from "../model/User.js";

///*************************************authorisation using passport-local****************************//

// import LocalStrategy from "passport-local";

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       console.log(user);

//       if (!user) {
//         return done(null, false, "Invalid username");
//       }
//       if (password !== user.password) {
//         console.log("password");
//         return done(null, false, "Incorrect password");
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }),
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

/// *****************************authorisation using passport-jwt************************************//

// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: "secret",
// };

// passport.use(
//   new JwtStrategy(opts, async (jwtPayload, done) => {
//     console.log(jwtPayload);
//     try {
//       const user = await User.findById(jwtPayload.id);

//       if (!user) {
//         return done(null, false, "user not found");
//       }

//       const isPasswordCorrect = user.password === jwtPayload.password;

//       if (!isPasswordCorrect) {
//         return done(null, false, "Invalid password");
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err, false);
//     }
//   }),
// );

/// *****************************authorisation using passport-google-Oauth20************************************//

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const options = {
  clientID:
    "967589819226 - c23s5rfmqnnna90d2mm8ioti69afb1lk.apps.googleusercontent.com",
  clientSecret: "GOCSPX - dyP0RMTMI9nv4ylQ6Gzn6lQTTk4z",
  callbackURL: "http://localhost:5000/auth/callback",
};

passport.use(
  new GoogleStrategy(
    options,
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, profile);

      try {
        const user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await User.create({
            username: profile.displayName,
            googleId: profile.id,
          });

          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
};
