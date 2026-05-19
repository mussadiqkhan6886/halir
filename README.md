<div align="center">

# 🌸 Halir Perfumery — Full-Stack E-Commerce Platform

**Production-grade e-commerce application built with Next.js 16, TypeScript, and MongoDB**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-halirperfumerypk.com-black?style=for-the-badge)](https://halirperfumerypk.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

> **99 Lighthouse Performance Score · < 0.4s Page Load · Fully Responsive · Admin Dashboard**

</div>

---

## 📌 Project Overview

Halir Perfumery is a **pixel-perfect, production-deployed** e-commerce platform for a luxury fragrance brand. Built end-to-end as a solo full-stack project, it demonstrates real-world architecture decisions across authentication, database design, image management, email automation, and a fully functional admin control panel — all in TypeScript.

The site is **live in production** at [halirperfumerypk.com](https://halirperfumerypk.com) and serves real customers.

---

## ⚡ Performance Highlights

| Metric | Result |
|---|---|
| Lighthouse Performance | **99 / 100** |
| Page Load Time | **< 0.5 seconds** |
| TypeScript Coverage | **99.6%** of codebase |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | SSR, SSG, routing, API routes |
| **TypeScript 5** | End-to-end type safety |
| **Tailwind CSS 4** | Utility-first responsive styling |
| **Framer Motion 12** | Animations and page transitions |
| **MUI + MUI X Data Grid** | Admin dashboard UI components |
| **React Icons** | Scalable icon system |

### Backend & Database
| Technology | Purpose |
|---|---|
| **MongoDB + Mongoose** | NoSQL database with schema modeling |
| **Next.js API Routes** | RESTful backend endpoints (no separate server) |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **bcryptjs** | Password hashing with salt rounds |
| **Nodemailer** | Transactional email (order confirmations, contact) |
| **Cloudinary** | Cloud image storage and CDN delivery |
| **Axios** | HTTP client for API communication |

### Dev & Tooling
| Technology | Purpose |
|---|---|
| **TypeScript** | Static typing across the full stack |
| **UUID** | Unique ID generation |

---

## 🔑 Key Features

### 🛍️ E-Commerce Core
- Full product catalog with categories and filtering
- Product detail pages with image galleries
- Shopping cart with persistent state via Context API
- Checkout flow with order management
- Responsive design across all screen sizes

### 🔐 Authentication & Security
- **JWT-based auth** — stateless, scalable token authentication
- **bcryptjs password hashing** — salted hashing before any DB write
- Protected routes enforced at both the API and UI level
- Custom `auth` middleware applied to all sensitive endpoints
- Session management with secure token storage

### 🖥️ Admin Dashboard (Fully Functional)
- **MUI X Data Grid** — sortable, filterable, paginated data tables
- **Product Management** — create, update, delete products with Cloudinary image uploads
- **Order Management** — view and update order statuses in real time
- **User Management** — view registered users and account details
- **Analytics Overview** — key business metrics at a glance
- Role-based access control — admin-only routes protected server-side

### 📧 Email System
- **Nodemailer** integration for automated transactional emails
- Order confirmation emails sent on purchase
- Contact form submissions routed to store email

### 🖼️ Image Management
- **Cloudinary** for cloud-hosted, CDN-delivered product images
- Optimized image delivery using Next.js `<Image>` component
- Admin panel supports direct image uploads during product creation

---

## 🔒 Authentication Flow

```
User submits credentials
        ↓
API Route validates input
        ↓
bcryptjs compares hashed password (MongoDB)
        ↓
JWT signed with secret → returned to client
        ↓
Client stores token → sent in Authorization header
        ↓
Protected routes verify JWT on every request
```
---

## 🌐 Deployment

The application is deployed and live at **[halirperfumerypk.com](https://halirperfumerypk.com)**

- Hosted on **Vercel** (optimized for Next.js)
- Database on **MongoDB Atlas**
- Images served via **Cloudinary CDN**

---

## 💡 What This Project Demonstrates

This project was built entirely by a single developer and showcases:

- **Full-stack ownership** — from DB schema to pixel-perfect UI
- **Security best practices** — hashed passwords, JWT tokens, protected API routes
- **Production readiness** — live site, real users, < 0.4s load times
- **TypeScript discipline** — 99.6% TypeScript with custom type declarations
- **Modern React patterns** — App Router, Server Components, Context API, custom hooks
- **Admin system architecture** — role-based access, real-time data management
- **Third-party integrations** — Cloudinary, Nodemailer, MUI, Framer Motion

---

## 📬 Contact

**Mussadiq Khan**
- GitHub: [@mussadiqkhan6886](https://github.com/mussadiqkhan6886)
- Live Project: [halirperfumerypk.com](https://halirperfumerypk.com)

---

<div align="center">

⭐ If this project impressed you, consider giving it a star!

</div>
