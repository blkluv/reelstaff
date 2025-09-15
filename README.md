# Nafees Cables eCommerce Platform

![Nafees Cables Preview](https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=300&fit=crop&auto=format)

A modern, professional eCommerce platform for Nafees Cables, a leading manufacturer of electrical wires and cables. Built with Next.js 15, TypeScript, and Cosmic CMS to deliver a complete online shopping experience that reflects trust, durability, and innovation in the electrical industry.

## Features

- **Complete eCommerce Functionality**: Full shopping cart, checkout flow, and order management
- **Product Catalog**: Organized categories for Electrical Wires, Power Cables, Communication Cables, and Specialized Cables
- **Advanced Filtering**: Filter products by type, size, usage, and price
- **Multiple Payment Options**: PayPal, Credit/Debit Card, and Bank Transfer integration
- **Bulk Orders**: Special requests for distributors and contractors
- **Quality Showcase**: Certifications and standards compliance section
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Fast-loading with proper meta tags and structured data
- **Professional Design**: Blue, gray, and white color scheme with smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c8018ffe0840663f64f5ba&clone_repository=68c803f2fe0840663f64f5c0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modern, professional eCommerce website for Nafees Cables, a leading manufacturer of electrical wires and cables. The design should reflect trust, durability, and innovation in the electrical industry.

The homepage should include:

A clean hero section with the tagline: 'Powering Connections, Building Trust'

A showcase of product categories: Electrical Wires, Power Cables, Communication Cables, Specialized Cables

A featured products section with 'Add to Cart' buttons

A section highlighting quality certifications and standards compliance

An 'About Us' section with the brand's story and mission

A contact form and distributor/partner inquiry section

Store Requirements:

Dedicated Shop Page listing all products with filters (by type, size, usage, price)

Individual Product Pages with images, descriptions, technical specs, and pricing

Shopping cart and checkout flow (with guest checkout option)

Payment gateway integration (PayPal, Credit/Debit Card, Bank Transfer option)

Option for bulk order requests for distributors and contractors

Design guidelines:

Color scheme: Blue, Gray, White (symbolizing reliability & professionalism)

Clean modern typography with bold headings and easy-to-read product details

Grid-based product layout with high-quality images

Responsive across desktop, tablet, and mobile

Smooth animations on product hover and cart interactions

Make the site SEO-friendly, fast-loading, secure, and scalable for future product expansions."

### Code Generation Prompt

> "Create a modern, professional eCommerce website for Nafees Cables, a leading manufacturer of electrical wires and cables. The design should reflect trust, durability, and innovation in the electrical industry.

The homepage should include:

A clean hero section with the tagline: 'Powering Connections, Building Trust'

A showcase of product categories: Electrical Wires, Power Cables, Communication Cables, Specialized Cables

A featured products section with 'Add to Cart' buttons

A section highlighting quality certifications and standards compliance

An 'About Us' section with the brand's story and mission

A contact form and distributor/partner inquiry section

Store Requirements:

Dedicated Shop Page listing all products with filters (by type, size, usage, price)

Individual Product Pages with images, descriptions, technical specs, and pricing

Shopping cart and checkout flow (with guest checkout option)

Payment gateway integration (PayPal, Credit/Debit Card, Bank Transfer option)

Option for bulk order requests for distributors and contractors

Design guidelines:

Color scheme: Blue, Gray, White (symbolizing reliability & professionalism)

Clean modern typography with bold headings and easy-to-read product details

Grid-based product layout with high-quality images

Responsive across desktop, tablet, and mobile

Smooth animations on product hover and cart interactions

Make the site SEO-friendly, fast-loading, secure, and scalable for future product expansions."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Payment Processing**: Stripe (PayPal, Cards, Bank Transfer)
- **Email**: Resend API
- **State Management**: React Context
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content model set up
- Stripe account for payments
- Resend account for emails

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   RESEND_API_KEY=your-resend-api-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with categories
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get products by category
const categoryProducts = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Creating Orders

```typescript
// Create a new order
await cosmic.objects.insertOne({
  type: 'orders',
  title: `Order #${orderNumber}`,
  metadata: {
    customer_name: 'John Doe',
    email: 'john@example.com',
    total: 299.99,
    items: cartItems,
    status: 'pending',
    payment_method: 'card'
  }
})
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS to manage:

- **Products**: Complete product catalog with images, specs, and pricing
- **Categories**: Product categorization and filtering
- **Orders**: Customer orders and order management
- **Certifications**: Quality standards and compliance information
- **Company Info**: About section and contact details
- **Bulk Requests**: Distributor and contractor inquiries

## Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out`
4. Add environment variables

### Environment Variables for Production

Set these in your deployment platform:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key  
- `COSMIC_WRITE_KEY`: Your Cosmic write key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `RESEND_API_KEY`: Your Resend API key
- `NEXT_PUBLIC_SITE_URL`: Your production URL

<!-- README_END -->