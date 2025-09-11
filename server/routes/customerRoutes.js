import express from "express"
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from "../controllers/customerController.js"

import { protect } from "../middlewares/authMiddleware.js"

const customerRouter = express.Router()

customerRouter.get('/',getAllCustomers)
customerRouter.post('/',createCustomer)
customerRouter.patch('/:id',updateCustomer)
customerRouter.delete('/:id',protect(['admin']),deleteCustomer)


export default customerRouter