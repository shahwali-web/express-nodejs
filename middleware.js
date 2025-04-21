
// import mockUser from "./content.js";
import { mockUser } from "./content.js";
export const resolveIndexByUserId = (req, res, next) => {
  const id = req.params.id;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserByIndex = mockUser.findIndex((user) => user.id === parsedId);

  if (findUserByIndex === -1) return res.sendStatus(404);
  req.findUserByIndex = findUserByIndex;

  next();
};
