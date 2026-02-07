import express from 'express';
import multer from  'multer';
import path from 'path';

import { clerkMiddleware } from '@clerk/express';
import { createBusinessProfile, updateBusinessProfile } from '../controllers/businessProfileController';

const businessProfileRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads"));        
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() *1e9);
        const ext = path.extname(file.originalName);
        cb(null, `business-${unique}${ext}`);

    },
});
const upload = multer({ storage });

//create
businessProfileRouter.post(
    "/",
    upload.fields([
        { name: "logoName", maxCount: 1 },
        { name: "stampName", max },
        { name: "signatureNameMeta", maxCount: 1 },
    ]),
    createBusinessProfile
);
//to update
businessProfileRouter.put(
    "/:id",
    upload.fields([
        { name: "logoName", maxCount: 1 },
        { name: "stampName", maxCount: 1 },
        { name: "signatureNameMeta", maxCount: 1 },
    ]),
    updateBusinessProfile
);
businessProfileRouter.get("/me", getMyBusinessProfile);

export default businessProfileRouter;