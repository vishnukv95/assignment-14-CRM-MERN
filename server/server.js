import express from "express"
import customerRouter from "./routes/customerRoutes.js"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv"
import caseRouter from "./routes/caseRoutes.js"
import cors from "cors"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors('http://localhost:5173'))
connectDb()
app.use('/api/auth',authRouter)
app.use('/api/customers',customerRouter)
app.use('/api/users',userRouter)
app.use('/api/case',caseRouter)

app.listen(process.env.PORT,()=> console.log("server started"))
 