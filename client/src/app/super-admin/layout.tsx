'use client'
import SuperAdminSideBar from '@/components/super-admin/SideBar'
import { cn } from '@/lib/utils';
import { useState } from 'react'


import React from 'react'

function SuperAdminLayout({children}: {children: React.ReactNode}) {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const handleToggle = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className='min-h-screen bg-background'>

        <SuperAdminSideBar
        //error will be shown, when passing it without the SidebarProps properties. Hence isOpen and toggle have to be mentioned here.
        isOpen={isSidebarOpen}
        // 1st way: 
        // toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className= {cn('transition-all duration-300', isSidebarOpen ? 'ml-64' : 'ml-16', 'min-h-screen' )}>
            {/*  in this, here, all the children nodes will be rendered. */}
            {/*  children --> child pages in sidebar --> which will be a full-fledged rendered component */}

            {children}
        
        </div>
    </div>
  )
}

export default SuperAdminLayout