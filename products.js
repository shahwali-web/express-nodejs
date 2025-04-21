import express from "express"
import cookieParser from "cookie-parser";

import { product_list } from "./content.js";

const router = express.Router();


// router.get("/api/products", (req, res) => {
//   console.log(req.headers.cookie)
//   console.log(req.cookies)
 
//   if (req.cookies.Hello && req.cookies.Hello == 'World')
//     return res.send(product_list);

//   return res.send({ message: "You need Correct co" });
//   });

router.get("/api/products", (req, res) => {
  console.log(req.sessionID)
  console.log(req.session)
  req.session.visited = true;


  if (req.cookies.Hello && req.cookies.Hello == 'World')
    return res.send(product_list);

  return res.send({ message: "You need Correct co" });
});

router.post("/api/products", (req, res) => {

  console.log(req.headers.cookie)
 
    let { body } = req;
  
    let newProduct = {
      id: product_list[product_list.length - 1].id + 1,
      ...body,
    };
    product_list.push(newProduct);
    return res.status(201).send(newProduct);
  });



export default router;