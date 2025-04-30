import express, { Router } from "express";
import userRoutes from "./users.js";
import productsRoutes from "./products.js";
import path, { format } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./content.js";
import mongoose, { Mongoose } from "mongoose";
import "./strategies/discord-strategy.js"; 
import passport from "passport";
import MongoStore from "connect-mongo";
import { DiscordUser } from "./mangoose/schemas/discord-user.js";



const app = express();

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// database mangoDB
mongoose
  .connect("mongodb://localhost/express_tutorials")
  .then(() => console.log("MangoDb is Connected Successfully! "))
  .catch((err) => console.log(`Error: ${err}`));

// Session
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 * 10, },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Discord Auth
app.get("/api/auth/discord", passport.authenticate("discord"));
app.get("/api/auth/discord/redirect",passport.authenticate("discord"),
(req, res)=>{
  res.sendStatus(200);
}

)



// Checking login user
// app.get("/api/auth/status", (req, res) => {
//   console.log(req.session);
//   return req.user ? res.send(req.user) : res.sendStatus(401);
// });


// LogOut User
app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

// Routers
app.use(productsRoutes);
app.use(userRoutes);


// Now I user Discord Auth
// app.post("/api/auth", passport.authenticate("local"), (req, res) => {
//   res.status(200).send(req.user);
// });

// Serve static files
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));





// Root route
app.get("/", (req, res) => {
  res.cookie("Hello", "World", { maxAge: 60000 * 60 * 2 });

  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUser.find((user) => user.username == username);
  if (!findUser || password != findUser.password)
    return res.status(401).send({ Message: "Bad Credentials" });

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ MSG: " Not Authenticated" });
});


// Server Code
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
