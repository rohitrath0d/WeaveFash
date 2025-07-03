import express from "express";
import { authenticateJwt, isSuperAdmin } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";
import {
  addFeatureBanners,
  fetchFeatureBanners,
  getFeaturedProducts,
  updateFeaturedProducts,
} from "../controllers/settingController";

const router = express.Router();

router.post(
  "/banners",
  authenticateJwt,
  isSuperAdmin,
  upload.array("images", 5),
  addFeatureBanners
);

// router.get("/get-banners", authenticateJwt, fetchFeatureBanners);
router.get("/get-banners", fetchFeatureBanners);
router.post(
  "/update-feature-products",
  authenticateJwt,
  isSuperAdmin,
  updateFeaturedProducts
);
// router.get("/fetch-feature-products", authenticateJwt, getFeaturedProducts);
router.get("/fetch-feature-products", getFeaturedProducts);

export default router;
