import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { error } from "console";
import cloudinary from "../config/cloudinary";
import { prisma } from "../server";
import fs from 'fs';
import { stringToBytes } from "uuid/dist/cjs/v35";

// create a product
export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
     try {
        // get what is required
        const { name ,
            brand ,
            category ,
            description ,
            price ,
            gender ,
            sizes ,
            colors ,
            soldCount,
            rating,
            stock
        } = req.body;

         // get files
         const files = req.files as Express.Multer.File[];
        // upload all images to cloudinary
        const uploadPromises = files.map(file =>cloudinary.uploader.upload(file.path,{
           folder: 'ecommerce',  
        })
    );
    //now, we can resolve all the promises
    const uploadedImages = await Promise.all(uploadPromises);
    // once all images are uploaded, now we can get the image urls
    const imageUrls = uploadedImages.map(image => image.secure_url);

    // now, we can create a product
    const newlyCreatedProduct = await prisma.product.create({
        data: {
            name,
            brand,
            category,
            description,
            gender,
            sizes: sizes.split(','),
            colors: colors.split(','), 
            price: parseFloat(price),
            stock: parseInt(stock),
            images: imageUrls,
            soldCount: 0 ,              // initially, soldCount will be 0
            rating: 0,
     },
    });
    // clean the  uploaded files from local storage (we are using both cloudinary and multer  )
    files.forEach(file => fs.unlinkSync(file.path));
    res.status(201).json(newlyCreatedProduct);

    } catch (e) {
      console.error(e);
        res.status(500).json({  success: false, message: "Internal server error || Some error occured" });
        
        
     }
}


// fetch all products (only admin side can do this)
export const fetchAllProductsForAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const fetchAllProducts = await prisma.product.findMany();       // findMany() will give all the products.
        res.status(200).json(fetchAllProducts);
       
    } catch (e) {
       console.error(e);
       res.status(500).json({ success: false, message: "Internal server error || Can't fetch products" });

       
       
    }
}

// fetch a single product
export const getProductByID  = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // to fetch the single product, we need to get the product id
        const { id } = req.params;      // current product id
        const product = await prisma.product.findUnique({
            where: {id}
        })

        if(!product){
            res.status(404).json({success: false, message: "Product not found "})
        }
        res.status(200).json(product);          // if product is found, then send the product details.
        
    } catch (e) {
       console.error(e);
       res.status(500).json({ success: false, message: "Internal server error || Some error occured" });

       
    }
}

// update a product (only admin side can do this)
export const updateProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        // implement image update function
        //  --> if adding new image to a product, then have to upload that image to cloudinary
        // -->  and once, we get the url back, then we can update the existing image of that particular product
        const {id} = req.params;
        const{
            name,
            brand,
            description,
            category,
            gender,
            sizes,
            colors,
            price,
            stock,
            soldCount,  
            rating, 
            images   
        } = req.body;
        console.log(req.body, "req.body");
        
        // implement image update function
        const product = await prisma.product.update({
            where: { id },
            data:{
                name,
                brand,
                description,
                category,
                gender,
                sizes: sizes.split(','),
                colors: colors.split(','),
                price: parseFloat(price),
                stock: parseInt(stock),
                images,                         // get new image url's and sync it here.
                soldCount: parseInt(soldCount),
                rating: parseInt(rating),
            },
        });
        res.status(200).json(product);
        
    } catch (e) {
       console.error(e);
       res.status(500).json({ success: false, message: "Internal server error || Some error occured" });

       
    }
}
// delete a product (only admin side can do this)
export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // for deleting also, we need id. coz we will delete product with the help of product id.
       const {id} = req.params;
       await prisma.product.delete({
        where: { id },
       })
        res.status(200).json({ success: true, message: "Product deleted successfully! " }); 
    } catch (e) {
       console.error(e);
       res.status(500).json({ success: false, message: "Internal server error || Some error occured" });

       
    }
}
// fetch products with filter (client side can do this)
export const FilterProductsByCategory = async (req: AuthenticatedRequest, res: Response) => {
    try {
       
    } catch (e) {
       console.error(e);
       res.status(500).json({ success: false, message: "Internal server error || Some error occured" });

       
    }
}



// what is multer?
// Multer is a middleware that helps handle file uploads in Node.js applications. 
// It is an NPM package that parses requests and extracts uploaded files. 

// why use multer? 
// Multer can streamline the process of uploading files.
// It can handle file size limits.
// It can define file filters.
// It can organize uploaded files efficiently.
