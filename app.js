import express, { Router } from "express";
import userRoutes from "./users.js";
import productsRoutes from "./products.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./content.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost/express_tutorials")
.then(()=>console.log("MangoDb is Connected Successfully! "))
.catch((err)=> console.log(`Error: ${err}`))

app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 10,
    },
  })
);

// Routers
app.use(productsRoutes);
app.use(userRoutes);

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

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



app.get("/api/auth/status",(req, res)=>{
  req.sessionStore.get(req.sessionID, (err, session)=>{
    console.log(session)
  })
  return req.session.user ? res.status(200).send(req.session.user):
  res.status(401).send({"MSG":" Not Authenticated"})

})

app.post("/api/cart", (req, res) =>{
  if(!req.session.user) return res.sendStatus(401);
  const item = req.body;
  
  const {cart} = req.session
  if(cart){
    cart.push(item)
  }else{
    req.session.cart = [item]
  }
  return res.status(201).send(item);
})


app.get("/api/cart",(req, res)=>{
  if(!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? [])
})








// Server Code
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
