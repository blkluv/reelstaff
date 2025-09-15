import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Order, Certification, ContactMessage, BulkRequest } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Product functions
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a: Product, b: Product) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1);
    
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      console.log('No featured products found, returning empty array');
      return [];
    }
    console.error('Error fetching featured products:', error);
    // Return empty array instead of throwing to prevent build failures
    return [];
  }
}

// Category functions
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug });
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching category:', error);
    return null;
  }
}

// Order functions
export async function createOrder(orderData: Order['metadata']): Promise<Order> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'orders',
      title: `Order #${Date.now()}`,
      metadata: orderData
    });
    
    return response.object as Order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

// Contact and bulk request functions
export async function createContactMessage(messageData: ContactMessage['metadata']): Promise<ContactMessage> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'contact_messages',
      title: `Message from ${messageData.name}`,
      metadata: {
        ...messageData,
        status: 'new'
      }
    });
    
    return response.object as ContactMessage;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw new Error('Failed to send message');
  }
}

export async function createBulkRequest(requestData: BulkRequest['metadata']): Promise<BulkRequest> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'bulk_requests',
      title: `Bulk Request from ${requestData.customer_name}`,
      metadata: {
        ...requestData,
        status: 'pending'
      }
    });
    
    return response.object as BulkRequest;
  } catch (error) {
    console.error('Error creating bulk request:', error);
    throw new Error('Failed to submit bulk request');
  }
}

// Certification functions
export async function getCertifications(): Promise<Certification[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'certifications' })
      .props(['id', 'title', 'metadata']);
    
    return response.objects as Certification[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching certifications:', error);
    return [];
  }
}