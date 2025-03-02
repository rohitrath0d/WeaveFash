"use client"

import { protectCouponFormAction } from '@/actions/coupon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useCouponStore } from '@/store/useCouponStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SuperAdminManageCouponPage() {


  const [formData, setFormData] = useState({
    code: '',
    discountPercent: 0,
    startDate: '',
    endDate: '',
    usageLimit: 0,
  });


  const router = useRouter();
  const {toast} = useToast()
  const {createCoupon, isLoading} = useCouponStore()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value,         
    }));
  };

  const handleCreateUniqueCoupon = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    let result = ''
    for (let i = 0; i <8;  i++) {
        result += characters.charAt(Math.floor(Math.random()*characters.length))
    }
    setFormData((prev) => ({
      ...prev,
      code: result
    }))
  }
  

  const handleCouponSubmit = async(event: React.FormEvent) => {
    event.preventDefault()
    if(new Date(formData.endDate) <= new Date(formData.startDate)){
      console.log("handleCouponSubmit");
      toast({
        title: "End date must be after start date!",
        variant: 'destructive'
      })
      return
    }

    const checkCouponFormvalidation = await protectCouponFormAction();
    if (!checkCouponFormvalidation.success) {
      toast({
        title: checkCouponFormvalidation.error,
        variant: "destructive",
      });
      return;
    }


    const couponData = {
      ...formData,
      discountPercent : parseFloat(formData.discountPercent.toString()),
      usageLimit : parseInt(formData.usageLimit.toString())
    }

    const result = await createCoupon(couponData)
    // console.log(couponData);
    // console.log(result);
  
      if(result){
        toast({
          title: "Coupon added successfully"
        })

        // navigate
        router.push('/super-admin/coupons/list')
      }
    }

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-6'>
        <header className='flex items-center justify-between'>
          <h1>Create New Coupon</h1>
        </header>


        <form
          onSubmit={handleCouponSubmit} 
          className='grid gap-6 md:grid-cols-2 lg:grid-cols-1'>
          <div className='space-y-4'>


            {/*Coupon start date  */}
            <div> 
                <Label>Start Date</Label>
                <Input
                  name='startDate'
                  type='date'
                  className='mt-1.5'
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
            </div>

            {/* End Date  */}
            <div> 
                <Label>End Date</Label>
                <Input
                  name='endDate'
                  type='date' 
                  className='mt-1.5'
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
            </div>

            {/* Coupon code */}
            <div> 
                <Label>Coupon Code</Label>
                <div className='flex justify-between items-center gap-2'>
                 <Input
                  type='text'
                  name='code'
                  placeholder='Enter Coupon code'
                  className='mt-1.5'
                  required
                  value={formData.code}
                  onChange={handleInputChange}   
                />
                 <Button
                  type='button'
                  onClick={handleCreateUniqueCoupon}
                >
                  Create unique code
                </Button>

                </div>
            </div>  

            {/* Discount Percent */}
            <div> 
                <Label>Discount Percentage</Label>
                <Input
                  type='number' 
                  name='discountPercent'
                  placeholder='Enter discount percentage'
                  className='mt-1.5'
                  required
                  value={formData.discountPercent}
                  onChange={handleInputChange}
                />
            </div>

            <div> 
                <Label>Usage Limit</Label>
                <Input
                  type='number' 
                  name='usageLimit'
                  placeholder='Enter usage limits'
                  className='mt-1.5'
                  required
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                /> 
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
            >
              {
                isLoading ? "creating..." : "Create"
              }  
            </Button>

          </div>
        </form>

      </div>
    </div>
  )
}

export default SuperAdminManageCouponPage