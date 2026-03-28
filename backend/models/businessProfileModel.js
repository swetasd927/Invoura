import mongoose from "mongoose";
const businessProfileSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        index: true
    },
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true,
        lowercase: true,
        default: ""        
    },
    address: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    vat: {
        type: String,
        required: true,
        default: ""
    },
    //for images
    logoUrl: {
         type: String,
        required: false,
        default: null
    },
    stampUrl: {
          type: String,
        required: false,
        default: null
    },
    signatureUrl: {
        type: String,
        required: false,
        default: null
    },
    signatureOwnerName: {
        type: String,
        required: false,
        default: ""
    },
    signatureOwnerTitle: {
        type: String,
        required: false,
        default: ""
    },
    defaultTaxPercent: {
        type: Number,
        required: true,
        default: 20
    }
}, {
    timestamps: true
});

const BusinessProfile = mongoose.models.BusinessProfile || mongoose.model("BusinessProfile", businessProfileSchema); 

export default BusinessProfile;