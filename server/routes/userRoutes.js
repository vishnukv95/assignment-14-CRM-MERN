import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/userController.js"


const userRouter = express.Router()


userRouter.get('/',protect(['admin']),getAllUsers)
userRouter.post('/',protect(['admin']),createUser)
userRouter.patch('/:id',protect(['admin']),updateUser)
userRouter.delete('/:id',protect(['admin']),deleteUser)

export default userRouter