# WeaveFash - E-Commerce Fashion Platform

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Authentication & Authorization](#authentication--authorization)
9. [Environment Variables](#environment-variables)
10. [Getting Started](#getting-started)
11. [Deployment](#deployment)

---

## 🎯 Project Overview

**WeaveFash** is a full-stack e-commerce fashion platform that provides a seamless online shopping experience for fashion enthusiasts. The platform features a modern, responsive design with a complete shopping workflow including product browsing, cart management, secure checkout with PayPal integration, and order tracking.

### Key Highlights
- **Modern E-Commerce Platform**: Complete shopping experience from browsing to checkout
- **Role-Based Access**: Separate interfaces for customers and super admins
- **PayPal Integration**: Secure payment processing
- **Cloud Storage**: Product images stored on Cloudinary
- **Real-time Cart Management**: Persistent cart with quantity management
- **Coupon System**: Discount codes with usage limits and validity periods
- **Order Management**: Track orders from placement to delivery

---

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Radix UI** | Accessible UI components |
| **Zustand** | State management |
| **Axios** | HTTP client |
| **Lucide React** | Icons |
| **PayPal React SDK** | Payment integration |
| **Jose** | JWT verification in middleware |

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **TypeScript** | Type safety |
| **Prisma** | ORM & database management |
| **PostgreSQL** | Primary database |
| **Cloudinary** | Image storage & CDN |
| **JWT (Jose)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |
| **Cookie-Parser** | Cookie management |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT (Next.js 15 - App Router)             │
├─────────────────────────────────────────────────────────────────┤
│  Pages (App Router)           │  State Management (Zustand)     │
│  ├── / (Home)                 │  ├── useAuthStore               │
│  ├── /auth/login              │  ├── useProductStore            │
│  ├── /auth/register           │  ├── useCartStore               │
│  ├── /listing                 │  ├── useCouponStore             │
│  ├── /listing/[id]            │  ├── useSettingsStore           │
│  ├── /cart                    │  ├── useAddressStore            │
│  ├── /checkout                │  └── useOrderStore              │
│  ├── /orders                  │                                 │
│  └── /super-admin/*           │                                 │
├─────────────────────────────────────────────────────────────────┤
│                    Middleware (JWT Verification)                │
│         Route Protection: Public | User | Super Admin           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                           HTTP (REST)
                                │
┌───────────────────────────────┴─────────────────────────────────┐
│                    SERVER (Express.js + TypeScript)             │
├─────────────────────────────────────────────────────────────────┤
│  API Routes                   │  Middlewares                    │
│  ├── /api/auth                │  ├── authenticateJwt            │
│  ├── /api/products            │  ├── isSuperAdmin               │
│  ├── /api/cart                │  └── upload (Multer)            │
│  ├── /api/coupons             │                                 │
│  ├── /api/settings            │  External Services              │
│  ├── /api/address             │  ├── Cloudinary (Images)        │
│  └── /api/order               │  └── PayPal (Payments)          │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                           Prisma ORM
                                │
┌───────────────────────────────┴─────────────────────────────────┐
│                        PostgreSQL Database                      │
│  Tables: User, Product, Cart, CartItem, Order, OrderItem,       │
│          Address, Coupon, FeatureBanner                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
WeaveFash/
├── client/                          # Frontend (Next.js)
│   ├── public/
│   │   └── images/                  # Static images
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── home-page/
│   │   │   ├── listing/
│   │   │   │   └── [id]/            # Dynamic product page
│   │   │   ├── orders/
│   │   │   ├── super-admin/
│   │   │   │   ├── coupons/
│   │   │   │   ├── orders/
│   │   │   │   ├── products/
│   │   │   │   └── settings/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── super-admin/
│   │   │   ├── ui/                  # Radix UI components
│   │   │   └── user/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── store/                   # Zustand stores
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useProductStore.ts
│   │   │   ├── useCartStore.ts
│   │   │   ├── useCouponStore.ts
│   │   │   ├── useSettingStore.ts
│   │   │   ├── useAddressStore.ts
│   │   │   └── useOrderStore.ts
│   │   ├── utils/
│   │   │   ├── api.ts               # API routes config
│   │   │   └── config.ts
│   │   └── middleware.ts            # Route protection
│   ├── next.config.ts
│   └── package.json
│
├── server/                          # Backend (Express)
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── seed.ts                  # Database seeding
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── cartController.ts
│   │   │   ├── couponController.ts
│   │   │   ├── settingController.ts
│   │   │   ├── addressController.ts
│   │   │   └── orderController.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts    # JWT & role verification
│   │   │   └── uploadMiddleware.ts  # Multer config
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── cartRoutes.ts
│   │   │   ├── couponRoutes.ts
│   │   │   ├── settingRoutes.ts
│   │   │   ├── addressRoutes.ts
│   │   │   └── orderRoutes.ts
│   │   └── server.ts                # Express app entry
│   └── package.json
└── README.md
```

---

## ✨ Features

### Customer Features
| Feature | Description |
|---------|-------------|
| 🛍️ **Product Browsing** | Browse products with filters (category, brand, size, color, price) |
| 🔍 **Product Search** | Search and sort products |
| 📄 **Product Details** | View detailed product information with multiple images |
| 🛒 **Shopping Cart** | Add/remove items, update quantities |
| 💳 **Secure Checkout** | PayPal payment integration |
| 🎟️ **Coupon Codes** | Apply discount coupons at checkout |
| 📍 **Address Management** | Save and manage delivery addresses |
| 📦 **Order Tracking** | View order history and status |
| 🔐 **Authentication** | Register, login, logout with JWT |

### Super Admin Features
| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Admin control panel |
| 📦 **Product Management** | Add, edit, delete products |
| 🖼️ **Banner Management** | Upload and manage homepage banners |
| ⭐ **Featured Products** | Select up to 8 featured products |
| 🎟️ **Coupon Management** | Create and manage discount coupons |
| 📋 **Order Management** | View all orders, update status |

### Technical Features
| Feature | Description |
|---------|-------------|
| 🔒 **Route Protection** | Middleware-based access control |
| 🍪 **Cookie Authentication** | Secure HTTP-only cookies for tokens |
| 🔄 **Token Refresh** | Automatic access token refresh |
| ☁️ **Cloud Storage** | Cloudinary for image hosting |
| 📱 **Responsive Design** | Mobile-first responsive UI |
| ⚡ **State Management** | Zustand for efficient state handling |
| 🔐 **Password Security** | bcrypt password hashing |

---

## 🗄 Database Schema

### Entity Overview

| Model | Description |
|-------|-------------|
| **User** | Customer/Admin accounts with role-based access |
| **Product** | Fashion items with variants (sizes, colors) |
| **Cart** | User shopping cart |
| **CartItem** | Individual items in cart |
| **Order** | Customer orders |
| **OrderItem** | Products within an order |
| **Address** | Delivery addresses |
| **Coupon** | Discount codes |
| **FeatureBanner** | Homepage banner images |

### Enums
| Enum | Values |
|------|--------|
| **Role** | USER, SUPER_ADMIN |
| **OrderStatus** | PENDING, PROCESSING, SHIPPED, DELIVERED |
| **PaymentMethod** | CREDIT_CARD |
| **PaymentStatus** | PENDING, COMPLETED |

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Create new user account | Public |
| POST | `/login` | User login | Public |
| POST | `/logout` | User logout | Public |
| POST | `/refresh-token` | Refresh access token | Public |

### Products (`/api/products`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/fetch-admin-products` | Get all products (admin) | Super Admin |
| GET | `/fetch-client-products` | Get products with filters | Authenticated |
| GET | `/:id` | Get product by ID | Authenticated |
| POST | `/create-new-product` | Create product | Super Admin |
| PUT | `/:id` | Update product | Super Admin |
| DELETE | `/:id` | Delete product | Super Admin |

### Cart (`/api/cart`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/fetch-cart` | Get user's cart | Authenticated |
| POST | `/add-to-cart` | Add item to cart | Authenticated |
| PUT | `/update/:id` | Update item quantity | Authenticated |
| DELETE | `/remove/:id` | Remove item from cart | Authenticated |
| POST | `/clear-cart` | Clear entire cart | Authenticated |

### Coupons (`/api/coupons`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/fetch-all-coupons` | Get all coupons | Super Admin |
| POST | `/create-coupon` | Create new coupon | Super Admin |
| DELETE | `/:id` | Delete coupon | Super Admin |

### Settings (`/api/settings`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/get-banners` | Get homepage banners | Public |
| POST | `/banners` | Upload banners | Super Admin |
| GET | `/fetch-feature-products` | Get featured products | Public |
| POST | `/update-feature-products` | Update featured products | Super Admin |

### Orders (`/api/order`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/create-paypal-order` | Create PayPal order | Authenticated |
| POST | `/capture-paypal-order` | Capture PayPal payment | Authenticated |
| POST | `/create-final-order` | Create order after payment | Authenticated |
| GET | `/get-single-order/:orderId` | Get order details | Authenticated |
| GET | `/get-order-by-user-id` | Get user's orders | Authenticated |
| GET | `/get-all-orders-for-admin` | Get all orders | Super Admin |
| PUT | `/:orderId/status` | Update order status | Super Admin |

### Address (`/api/address`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user's addresses | Authenticated |
| POST | `/` | Create new address | Authenticated |
| PUT | `/:id` | Update address | Authenticated |
| DELETE | `/:id` | Delete address | Authenticated |

---

## 🔐 Authentication & Authorization

### Authentication Flow
1. User registers/logs in → Server generates access & refresh tokens
2. Tokens stored in HTTP-only cookies
3. Access token used for API requests
4. Refresh token used to get new access token when expired

### Route Protection

| Route Type | Examples | Access |
|------------|----------|--------|
| **Public** | `/auth/login`, `/auth/register`, `/` | Anyone |
| **User** | `/cart`, `/checkout`, `/orders`, `/listing` | Authenticated users |
| **Super Admin** | `/super-admin/*` | Super Admin role only |

### Middleware Chain
1. `authenticateJwt` - Verifies access token from cookies
2. `isSuperAdmin` - Checks if user has SUPER_ADMIN role

---

## ⚙️ Environment Variables

### Client (`client/.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
JWT_SECRET_BACKEND=your-jwt-secret
```

### Server (`server/.env`)
```env
# Server
PORT=3001
CLIENT_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/weavefash_db

# JWT
JWT_SECRET_BACKEND=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account
- PayPal Developer account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rohitrath0d/WeaveFash.git
cd WeaveFash
```

2. **Setup Server**
```bash
cd server
npm install
```

3. **Configure server environment**
```bash
cp .env.example .env
# Edit .env with your values
```

4. **Initialize database**
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed  # Optional: seed sample data
```

5. **Start server**
```bash
npm run dev
```

6. **Setup Client (new terminal)**
```bash
cd client
npm install
```

7. **Configure client environment**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

8. **Start client**
```bash
npm run dev
```

9. **Open browser**
- Client: [http://localhost:3000](http://localhost:3000)
- Server: [http://localhost:3001](http://localhost:3001)

### Available Scripts

#### Client
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

#### Server
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (nodemon) |
| `npm run build` | Compile TypeScript |
| `npm run start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database |

---

## 🌐 Deployment

### Server Deployment (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Configure environment variables
5. Deploy

### Client Deployment (Vercel)
1. Import project from GitHub
2. Set framework preset to Next.js
3. Configure environment variables
4. Deploy

### Database (Supabase/Neon)
1. Create PostgreSQL database
2. Copy connection string to `DATABASE_URL`
3. Run migrations: `npx prisma migrate deploy`

---

## 📚 Reference Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [PayPal Developer Documentation](https://developer.paypal.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 👤 Author

**Rohit Rathod**
- GitHub: [@rohitrath0d](https://github.com/rohitrath0d)

---
