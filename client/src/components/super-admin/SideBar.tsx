// In components also we have created a folder, 'super-admin' and inside this writing all the components related to the super-admin.
// This is a better approach in terms of the optimization. we can also directly, place code in individually folders, but it will be difficult to manage the code.

// 2 ways: 
// 1. components/side-bar
// 2. components/side-bar/index.tsx

'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { Bike, ChevronLeft, ChevronRight, ListOrdered, LogOut, Package, PlusCircle, SendToBack, Settings, TicketPercent } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
// import orderSidebar from '../../../public/images/orderSidebar.png'


interface SidebarProps {
    isOpen: boolean,
    toggle: () => void
}

// creating menu items
const menuItems = [
    // this sidebar labels on the homepage, when clicked upon, will have their own page/route page.. dedicated to particular page. 
    {
        name: 'Products',
        icon: Package,
        href: '/super-admin/products/list'
    },

    // new products
    {
        name: 'Add new product',
        icon: PlusCircle,
        href: '/super-admin/products/add'
    },

    // orders page
    {
        name: 'Orders',
        icon: Bike,
        href: '/super-admin/orders'
    },

    // coupons list`
    {
        name: 'Coupons',
        icon: TicketPercent,
        href: '/super-admin/coupons/list'
    },

    // coupon add
    {
        name: 'Create Coupon',
        icon: ListOrdered,
        href: '/super-admin/coupons/add'
    },

    //settings
    {
        name: 'Settings',
        icon: Settings,
        href: '/super-admin/settings'
    },

    // logout icon
    {
        name: 'Log out',
        icon: LogOut,
        href: '#'
    },

]



function SuperAdminSideBar({ isOpen, toggle }: SidebarProps) {
    const router = useRouter();
    const { logout } = useAuthStore() // Get logout function from your store


    // handle log out
    async function handleLogout() {
        try {
            await logout() // Call your auth store's logout
            router.push('/auth/login') // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }
    return (
        <div className={cn('fixed left-0 top-0 z-40 h-screen bg-background transition-all duration-300', isOpen ? 'w-64' : 'w-16', 'border-r')}>

            <div className='flex h-16 items-center justify-between px-4'>
                <h1 className={cn('font-semibold', !isOpen && 'hidden')}>Admin Dashboard</h1>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className='ml-auto'
                    onClick={toggle}
                >
                    {isOpen ? <ChevronLeft className='h-4 w-4' /> : <ChevronRight className='h-4 w -4' />}
                </Button>
            </div>
            <div className='space-y-1 py-4'>
                {
                    menuItems.map(item =>
                        <div onClick={item.name === 'Log out' ? handleLogout : () => router.push(item.href)}
                            key={item.name}
                            className={cn('flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground')}
                        >
                            <item.icon className='h-4 w-4' />
                            <span className={cn('ml-3', !isOpen && "hidden")}> {item.name}</span>
                        </div>
                    )
                }

            </div>


        </div>
    )
}

export default SuperAdminSideBar
