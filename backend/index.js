import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/InvoiceRouter.js';
import businessProfileRouter from './routes/businessProfileRoutes.js';
import aiInvoiceRouter from './routes/aiinvoiceRouter.js';

const app = express();
const port = process.env.PORT || 5000;

//Middleware

app.use(cors({
    origin: [
        process.env.CLIENT_URL || "http://localhost:5173",
        "https://invoura.vercel.app",
        "https://invouraa.vercel.app",
        "https://invourafe.vercel.app",  
        /^https:\/\/invourafe-.*\.vercel\.app$/  
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({limit: "20mb", extended: true}));
app.use(clerkMiddleware())

//DB
connectDB();


//Routes
app.use('/api/ai', aiInvoiceRouter);

app.use('/uploads', express.static(path.join(process.cwd(), "uploads")));
app.use('/api/invoice', invoiceRouter);
app.use('/api/businessProfile', businessProfileRouter);

app.get('/',( req, res ) => {
    res.send("API is working");
});

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// }); 

//for vercel prod
export default app;