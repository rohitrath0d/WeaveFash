// this file for middleware for handling 'multer' functionality

import multer, { Multer } from "multer";
import path from "path";

// configure/create storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb -> callback
        cb(null, 'uploads/')       // uploads folder will be created('MANUALLY') in root directory  of the project
    },
    filename: function(req, file, cb){
        cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname)
        );
    },
    
})

// create filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);         // if file is image, then it is allowed 
    } else{
        cb(new Error('Not an image! Please upload a valid image'));
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,       // 5MB
    },
})
