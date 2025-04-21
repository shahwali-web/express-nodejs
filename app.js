import express, { Router } from "express";
import userRoutes from "./users.js";
import productsRoutes from "./products.js";
import path from "path"
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();
const PORT = process.env.PORT || 3000;



app.use(cookieParser())
app.use(express.json());

app.use(session({
  secret: "anson the dev",
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: 60000* 60 * 10
  }
  

}))


// Routers
app.use(productsRoutes)
app.use(userRoutes)


// Serve static files 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.cookie("Hello", "World", { maxAge: 60000 * 60 * 2 });
  
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server Code
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
