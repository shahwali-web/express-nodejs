import express from "express";
// import mockUser from "./content.js";
// import resolveIndexByUserId from "./middleware.js"
import { resolveIndexByUserId } from "./middleware.js";
import { mockUser } from "./content.js";
import { User } from "./mangoose/schemas/user.js";


const router = express.Router();

  
router.get("/api/users", (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  req.sessionStore.get(req.session.id, (err, sessionData)=>{

    if(err){
      console.log(err)
      throw err;
    }
     console.log(sessionData)

  })
    res.send(mockUser);
  });




// Getting user by id

router.get("/api/users/:id",resolveIndexByUserId, (req, res) => {
    // const parsedId = parseInt(req.params.id);
    // if (isNaN(parsedId)) return res.status(400).send("Invalid ID provided.");
    // const findUser = mockUser.find(function (user) {
    //   return user.id === parsedId;
    // });
    // if (!findUser)
    //   return res
    //     .status(404)
    //     .send(`Sorry User With this ${parsedId} Doesn't Exist! `);
  
    const { findUserByIndex } = req;
    const findUser = mockUser[findUserByIndex];
    if(!findUser)return res.sendStatus(404)
    return res.send(findUser);
  });

  



  router.post("/api/users",async (req, res) => {
    const {body} = req;
    const newUser = new User(body)
    try{
      const savedUser = await newUser.save();
      return res.status(201).send(newUser)

    }catch(err){
      console.log(err)
      return res.sendStatus(400)

    }





    // const { body } = req;
    // let newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
    // mockUser.push(newUser);
  
    // return res.status(201).send(newUser);
});



// Delete Request

router.delete("/api/users/:id", (request, response) => {
    const id = request.params.id;
    const body = request.body;
    const parsedId = parseInt(id);
  
    if (isNaN(parsedId))
      return response
        .status(400)
        .send(`bad Request That is not valid ID ${parsedId}`);
  
    const findUserIndexToDelete = mockUser.findIndex((user) => user.id === parsedId);
    if(findUserIndexToDelete === -1)return response.status(404).send(`User with this ${parsedId} ID dose not exist! Thanks `)
      
    mockUser.splice(findUserIndexToDelete, 1);
    return response.sendStatus(200);
  });





// Update

router.put("/api/users/:id",resolveIndexByUserId, (req, res) => {
    const {body, findUserByIndex}= req;
    // const body = req.body;
    // const id = req.params.id;
  
    // const parsedId = parseInt(id);
  
    // if (isNaN(parsedId)) return res.sendStatus(400);
  
    // const findUserByIndex = mockUser.findIndex((user) => user.id === parsedId);
  
    // if (findUserByIndex === -1) return res.sendStatus(404);
  
    mockUser[findUserByIndex] = { id: mockUser[findUserByIndex].id, ...body };
  
    return res.sendStatus(200);
  });
  




// patch request Update user some content

router.patch("/api/users/:id", (request, response) => {
    // const {body, parent:{id}} = body;
    const body = request.body;
    const id = request.params.id;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.status(400).send(`InValid Id ${id}`);
    const findUserByIndex = mockUser.findIndex((user) => user.id === parsedId);
  
    if (findUserByIndex === -1)
      return response
        .status(404)
        .send(`Sorry Dear User with this ${id} doesn't exist`);
    mockUser[findUserByIndex] = { ...mockUser[findUserByIndex], ...body };
    return response.status(200).send({
      "User Successfully Updated! ": (mockUser[findUserByIndex] = {
        ...mockUser[findUserByIndex],
        ...body,
      }),
    });
  });

  
export default router;