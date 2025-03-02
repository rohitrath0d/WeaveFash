import { API_ROUTES } from '@/utils/api';
import { create } from 'zustand'
import axios from 'axios'


export interface Coupon {
    id: string,
    code: string,
    discountPercent: number,
    startDate: string,
    endDate: string,
    usageLimit: number,
    usageCount: number
}

interface CouponStore {
    couponList: Coupon[];
    isLoading: boolean,
    error: string | null,
    fetchCoupons: () => Promise<void>;
    createCoupon: (
        coupon: Omit<Coupon, 'id' | 'usageCount'>
    ) => Promise<Coupon | null>;
    deleteCoupon: (id: string) => Promise<boolean>;
}

export const useCouponStore = create<CouponStore>((set, get) => ({
    couponList: [],
    isLoading: false,
    error: null,
    fetchCoupons: async() => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.get(`${API_ROUTES.COUPONS}/fetch-all-coupons`, {withCredentials: true}
            );

            set({couponList: response.data.couponList, isLoading: false})

        } catch (e) {
            set({
                isLoading: false, 
                error: 'Failed to fetch coupons'
            });
        }
    },
    

    createCoupon: async(coupon) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${API_ROUTES.COUPONS}/create-coupon`, 
                coupon,
                {withCredentials: true}
                
            );
            console.log(response);
            

            set({isLoading: false})
            return response.data.coupon

        } catch (e) {
            set({
                isLoading: false, 
                error: 'Failed to create coupons'
            });
            return null;

        }
    },
    

    deleteCoupon: async(id: string) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.delete(
                `${API_ROUTES.COUPONS}/${id}`, 
                {withCredentials: true}
            );

            set({isLoading: false})
            return response.data.success

        } catch (e) {
            set({
                isLoading: false, 
                error: 'Failed to delete coupons'
            });
            return null;

        }
    },

}));


