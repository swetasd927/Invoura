import mongoose  from "mongoose";
import Invoura from "../models/InvouraModel.js";
import { getAuth } from "@clerk/express";

const API_BASE = 'http://localhost:5000';

function computeTotals(items = [], taxtPercent = 0){
    const safe = Array.isArray(items) ? items.filter(Boolean): [];
    const subtotal = safe.reduce(
        (s, it) => s + (Number(it.qty || 0 * Number(it.unitPrice || 0))),
        0
    );
    const tax = (subtotal + Number(taxtPercent || 0)) / 100;
    const total = subtotal + tax;
    return {subtotal, tax, total}
    //compute subtotal, tax and total    
}

//Parse FormData items
    function parseItemsField(val){
        if(!val) return [];
        if(Array.isArray(val)) return val;
        if(typeof val === "string"){
            try{
                return JSON.parse(val);
            } 
            catch {
                return []
            }
        }
        return val;
    }
    //check if string is Obj ID
function isObjectIdString(val){
    return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);    
}

//for helper function for uploading files to public urls
function uploadedFilesToUrls(req){
    const urls = {};
    if(!req.files) return urls;
    const mapping = {
        logoName: "logoDataUrl",
        stampName: "stampDataUrl",
        signatureNameMeta: "signatureDataUrl",
        logo: "logoDataUrl",
        stamp: "stampDataUrl",
        signature: "signatureDataUrl",
    };
    Object.keys(mapping).forEach((field) => {
        const arr = req.files[field];
        if(Array.isArray(arr) && arr[0]){
         const filename = 
         arr[0].filename || (arr[0].path && path.basename(arr[0].path));
         if(filename) urls[mapping[field]] = `${API_BASE}/uploads/${filename}`;  
        }
    });
    return urls;
}

//generate a unique number to avoid collision in the DB for invoice number
async function generateUniqueInvoiceNumber(attempts = 8){
    for(let i = 0; i< attempts; i++){
        const ts = Date.now().toString();
        const suffix = Math.floor(Math.random() * 9000).toString().padStart(6, "0");
        const candidate = `INV-${ts.slice(-6)}-${suffix}`;

        const exists = await Invoura.exists({ invouraNumber: candidate });
        if(!exists) return candidate;
        await new Promise((r) => setTimeout(r, 2));
    }
    return new mongoose.Types.ObjectId().toString();
}
//to create a invoice
//bro just change invoura to invoice its not gonna happen the way you want

//CREATE
export async function createInvoice(req, res){
    try{
        const { userId } = getAuth(req) || {};
        if(!userId){
            return res
                .status(401)
                .json({ success: false, message: "Authentication required" });
        }
        const body = req.body || {};
        const items = Array.isArray(body.items)
            ?body.items
            :parseItemsField(body.items);
        const taxPercent = Number(
            body.taxPercent ?? body.tax ?? body.defaultTaxPercent ?? 0
        );
        const totals = computeTotals(items, taxPercent);
        const fileUrls = uploadedFilesToUrls(req);

        //if client supplied invoiceNumber, ensure it doesn't already exist
        let invoiceNumberProvided = 
            typeof body.invouraNumber === "string" && body.invouraNumber.trim()
                ?String(body.invouraNumber).trim()
                :null;

            //invoice number if present then error else ok because invoiceNumber must be unique.
            if(invoiceNumberProvided){
                const duplicate = await Invoice.exists({ invoiceNumberProvided });
                if(duplicate){
                    return res
                    .status(409)
                    .json({success: false, message: "Invoice number already exists"});
                }
            }
            //generate a unique invoice number (or use provided)
            let invoiceNumber = invoiceNumberProvided || (await generateUniqueInvoiceNumber());

            //Build document
            const doc = new Invoice({
                _id: new mongoose.Types.ObjectId(),
                owner: userId, //associate invoice with Clerk userId
                invoiceNumber,
                issueDate: body.issueDate || new Date().toISOString().slice(0, 10),
                dueDate: body.dueDate || "",
                fromBusinessName: body.fromBusinessName || "",
                fromEmail: body.fromEmail || "",
                fromAddress: body.fromAddress || "",
                fromPhone: body.fromPhone || "",
                fromGst: body.fromGst || "",
                client:
                    typeof body.client === "string" && body.client.trim()
                        ? { name: body.client }
                        : body.client || {},
                items,
                subtotal: totals.subtotal,
                tax: totals.tax,
                total: totals.total,
                currency: body.currency || "NPR",
                status: body.status ? String(body.status).toLowerCase() : "draft",
                taxPercent,
                logoDataUrl:
                    fileUrls.logoDataUrl || body.logoDataUrl || body.logo || null,


            })

    }
}