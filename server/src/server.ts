import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes'         // now, we need to use authRoutes, bcoz we need to create Main Auth handler, which will handle all the child routes of this auth.
import productRoutes from './routes/productRoutes'   
import couponRoutes from './routes/couponRoutes'
import settingRoutes from './routes/settingRoutes'
import cartRoutes from './routes/cartRoutes'
import addressRoutes from './routes/addressRoutes'
import orderRoutes from './routes/orderRoutes'


// the first thing we need to do in this file (server.ts) --> always, the first main thing is to do to load environment variables
// load all  you r environment variables
dotenv.config();

// start express
const app = express();

// enable port
const PORT = process.env.PORT || 3001;  
 
// enable cors & corsOptions
const corsOptions    = {
    // origin:'http://localhost:3000',
    origin:'https://weavefash.vercel.app',
    credentials: true,                                      // as we are using cookie, credentials will be true.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

export const prisma = new PrismaClient()

// for login/register or in case of double check validation
app.use('/api/auth', authRoutes)                // main handler route of authRoutes

// product routes
app.use('/api/products', productRoutes)      
// coupon routes
app.use('/api/coupons', couponRoutes)
// setting routes
app.use('/api/settings', settingRoutes)
// cart routes
app.use('/api/cart', cartRoutes)
// address routes
app.use('/api/address', addressRoutes)
// order routes
app.use('/api/order', orderRoutes)



app.get('/', (req, res) => {
    res.send('Hello from E-commerce backend')
})

app.listen(PORT, ()=>{
    console.log(`Server is now running on port ${PORT}`);
    
})

process.on('SIGINT', async() => {
    await prisma.$disconnect()
    process.exit();
});
