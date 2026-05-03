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

// app.use(cors({
//     origin: [
//         process.env.CLIENT_URL || "http://localhost:5173",
//         "http://localhost:5000",
//         "https://invoura.vercel.app",
//         "https://invouraa.vercel.app",
//         "https://invourafe.vercel.app",  
//         /^https:\/\/invourafe-.*\.vercel\.app$/  
//     ],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, curl, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CLIENT_URL || "http://localhost:5173",
            "http://localhost:3000",
            "https://invoura.vercel.app",
            "https://invouraa.vercel.app",
            "https://invourafe.vercel.app",
        ];
        
        // Check exact matches first
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        // Check if it's a Vercel preview deployment
        if (origin.match(/^https:\/\/invourafe.*\.vercel\.app$/)) {
            return callback(null, true);
        }
        
        // Reject others
        callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"]
}));

// Handle preflight requests explicitly
app.options('*', cors());

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

//adding error handling middleware
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'CORS not allowed' });
    } else {
        next(err);
    }
});

//for vercel prod
export default app;