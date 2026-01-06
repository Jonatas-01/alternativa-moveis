# Alternativa Móveis - Furniture Catalog

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

A full-stack furniture catalog website with an admin dashboard, developed for Alternativa Móveis, a furniture store. The platform enables the store owner to manage their product catalog while providing customers with an intuitive browsing experience and direct WhatsApp contact for inquiries.

## Live Site

🔗 **[View Live Site](https://alternativa-moveis.vercel.app/)**

---

## Screenshots

| Home Page |
|:---------:|
| ![Landing Page](/public/image/landingpage-readme.png) |

| Product Catalog |
|:---------------:|
| ![Product Catalog](/public/image/catalogo-readme.png) |

| About Us |
|:---------------:|
| ![Product Details](/public/image/sobre-nos-readme.png) |

| Admin Dashboard |
|:---------:|
| ![Admin Dashboard](/public/image/dashboard-readme.png) |

---

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router architecture
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Supabase** - PostgreSQL database with Row Level Security
- **Cloudinary** - Cloud-based image storage and optimization

### Authentication & Security
- **Supabase Auth** - Email/password authentication
- **Row Level Security (RLS)** - Database-level access control

### Deployment
- **Vercel** - Continuous deployment from GitHub

---

## Key Features

### Public Features
- **Product Catalog** - Browse all products organized by categories
- **Featured Products Section** - Curated selection of 5 highlighted products on the homepage
- **Dynamic Product Pages** - Individual product pages with image galleries (1-3 images)
- **Category-Based Organization** - Products grouped by color-coded categories
- **WhatsApp Integration** - One-click inquiry with pre-filled product messages
- **Responsive Design** - Fully optimized for mobile and desktop devices

### Admin Dashboard
- **Complete CRUD Operations** - Create, read, update, and delete products and categories
- **Featured Products Management** - Select and order exactly 5 featured products
- **Server-Side Image Upload** - Secure upload with validation (max 3 images, 5MB each)
- **Category Color System** - 6 predefined colors for visual organization
- **Cascade Delete** - Automatic cleanup of related products when categories are removed

### Security
- **Row Level Security Policies** - Public can view, only authenticated users can modify
- **Server-Side API Credentials** - Cloudinary keys never exposed to client
- **Protected Admin Routes** - Authentication required for dashboard access

---

## Architecture

### Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                         CATEGORIES                              │
├─────────────────────────────────────────────────────────────────┤
│  id (uuid, PK)                                                  │
│  name (text)                                                    │
│  color (text)                                                   │
│  created_at (timestamp)                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ FK (ON DELETE CASCADE)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          PRODUCTS                               │
├─────────────────────────────────────────────────────────────────┤
│  id (uuid, PK)                                                  │
│  name (text)                                                    │
│  photos (text[]) - Array of Cloudinary URLs                     │
│  brief_description (text)                                       │
│  detailed_description (text)                                    │
│  category_id (uuid, FK → categories.id)                         │
│  price (numeric)                                                │
│  is_featured (boolean)                                          │
│  created_at (timestamp)                                         │
│  updated_at (timestamp)                                         │
└─────────────────────────────────────────────────────────────────┘
```

### Row Level Security Policies

| Table | Operation | Policy |
|-------|-----------|--------|
| Products | SELECT | Public access (anonymous users) |
| Products | INSERT/UPDATE/DELETE | Authenticated users only |
| Categories | SELECT | Public access (anonymous users) |
| Categories | INSERT/UPDATE/DELETE | Authenticated users only |

---

## Technical Highlights

- **Secure Server-Side Image Upload** - Images are uploaded through Next.js API routes, keeping Cloudinary credentials secure on the server
- **Featured Products System** - Customizable selection of 5 highlighted products with preserved ordering
- **Static Site Generation** - Product pages are pre-rendered at build time for optimal SEO and fast loading
- **Row Level Security** - Database-level access control ensures only authenticated users can modify data

---

## Installation

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account
- Cloudinary account

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alternativa-moveis.git
   cd alternativa-moveis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Cloudinary (server-side only)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Set up the database**
   
   Run the SQL scripts in your Supabase dashboard to create the `categories` and `products` tables with the schema described above. Enable Row Level Security and create the appropriate policies.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (root)/             # Public homepage
│   ├── api/                # API routes (upload, delete)
│   ├── auth/               # Authentication pages
│   ├── catalogo/           # Product catalog and detail pages
│   ├── dashboard/          # Admin dashboard
│   └── sobre-nos/          # About page
├── components/             # React components
│   ├── Auth/               # Authentication components
│   ├── Dashboard/          # Admin dashboard components
│   ├── Header/             # Navigation components
│   ├── Footer/             # Footer component
│   ├── LandingPage/        # Homepage sections
│   └── ui/                 # Reusable UI components
├── lib/                    # Utilities and Supabase client
├── public/                 # Static assets
└── middleware.ts           # Route protection middleware
```

---

## Future Enhancements

- **Search & Filter** - Product search with category and price filters
- **Inventory Tracking** - Stock management with low-stock alerts
- **Order Management** - Customer order tracking system
- **Email Notifications** - Admin alerts for new inquiries
- **Analytics Dashboard** - Product views and engagement metrics


