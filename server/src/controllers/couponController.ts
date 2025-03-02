// create,, list, delete coupon
import {Response} from "express"
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { prisma } from "../server";


export const createCoupon = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {

        const {code, discountPercent,startDate, endDate, usageLimit} = req.body
        
        const newlyCreatedCoupon = await prisma.coupon.create({
            data:{
                code,
                discountPercent: parseInt(discountPercent),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                usageLimit: parseInt(usageLimit),
                usageCount: 0
            }
        });
        res.status(201).json({
            success: true,
            message: "Coupon created successfully!", 
            coupon: newlyCreatedCoupon         // also returning coupon
        })
        
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Failed to create coupon'
        })
        
    }
}


export const fetchAllCoupons = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {
        // for fetch --. findMany() is used
        const fetchAllCouponsList = await prisma.coupon.findMany({
            orderBy: { createdAt: 'asc'},
        });
        res.status(201).json({
            success: true,
            message: "Coupon fetched successfully!", 
            couponList : fetchAllCouponsList         // also returning coupon list
        });        
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            id: 'Failed to fetch coupon list'
        })    
    }
}


export const deleteCoupon = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {

        const {id} = req.params
        await prisma.coupon.delete({
            where: {id}
        })
        res.status(201).json({
            success: true,
            message: "Coupon deleted successfully!", 
            id: id                  // also returning id
        });        

        
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Failed to delete coupon'
        })
    }
}