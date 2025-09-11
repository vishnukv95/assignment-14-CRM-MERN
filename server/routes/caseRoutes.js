import express from "express"
import { createCase, deleteCase, getAllCases, getMyCase, updateCase } from "../controllers/caseController.js"
import { protect } from "../middlewares/authMiddleware.js"

const caseRouter = express.Router()

caseRouter.get('/',protect(['user','admin']),getAllCases)
caseRouter.get('/getmycase/:id',getMyCase)
caseRouter.post('/',createCase)
caseRouter.patch('/:id',protect(['user','admin']),updateCase)
caseRouter.delete('/:id',protect(['user','admin']),deleteCase)

export default caseRouter