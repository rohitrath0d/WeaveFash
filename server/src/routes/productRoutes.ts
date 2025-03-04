import express from 'express';
import { authenticateJwt, isSuperAdmin } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { createProduct, deleteProduct, fetchAllProductsForAdmin, getProductByID, updateProduct } from '../controllers/productController';


const router = express.Router();

router.post('/create-new-product', authenticateJwt, isSuperAdmin, upload.array('images', 5), createProduct);

router.get('/fetch-admin-products', authenticateJwt, isSuperAdmin, fetchAllProductsForAdmin);

router.delete('/fetch-client-products', authenticateJwt, deleteProduct);



router.get('/:id', authenticateJwt, isSuperAdmin, getProductByID ); 
router.put('/:id', authenticateJwt, isSuperAdmin, updateProduct);
router.delete('/:id', authenticateJwt, isSuperAdmin, deleteProduct);

export default router;


// here, if implementing 'image update' function, then the router has to be also create separately for that.