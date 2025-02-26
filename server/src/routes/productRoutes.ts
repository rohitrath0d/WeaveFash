import express from 'express';
import { authenticateJWT, isSuperAdmin } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { createProduct, deleteProduct, fetchAllProductsForAdmin, getProductByID, updateProduct } from '../controllers/productController';


const router = express.Router();

router.post('create-new-product', authenticateJWT, isSuperAdmin, upload.array('images', 5), createProduct);

router.get('fetch-admin-products', authenticateJWT, isSuperAdmin, fetchAllProductsForAdmin);

router.get('/:id', authenticateJWT, isSuperAdmin, getProductByID ); 
router.put('/:id', authenticateJWT, isSuperAdmin, updateProduct);
router.delete('/:id', authenticateJWT, isSuperAdmin, deleteProduct);

export default router;


// here, if implementing 'image update' function, then the router has to be also create separately for that.