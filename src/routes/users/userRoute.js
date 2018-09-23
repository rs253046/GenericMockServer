import express from 'express';
import UserController from '../../controllers/users/userController';

const userRouter = express.Router();
const userRoute = (db) => {
  const userController = new UserController(db);
  userRouter.route('/').get(userController.get);
  return userRouter;
}

export default userRoute;