import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import connectDb from './db/db.js'
import dotenv from 'dotenv'
import path from 'path'
import { config } from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/errorHandler.js'
import departmentRouter from './routes/departments.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingsRouter from './routes/settings.js'
import dashboardRouter from './routes/dashboard.js'
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: `${__dirname}/.env` }); // Explicitly point to server/.env

connectDb()
const app=express()
// Must come before routes
app.use(cors({
  origin: ["https://employee-ms-frontend-5q24.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json())
// app.use('/public', express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth',authRoutes)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/settings',settingsRouter)
app.use('/api/dashboard',dashboardRouter)
app.use(errorHandler);


// app.listen(process.env.PORT,()=>{
//     console.log(`server is running on ${process.env.PORT}`)
// })

export default app