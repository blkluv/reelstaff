import { createBucketClient } from '@cosmicjs/sdk'

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
export async function getProducts(): Promise<any[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<any[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured products');
  }
}

// Category functions
export async function getCategories(): Promise<any[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<any | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Order functions
export async function createOrder(orderData: any): Promise<any> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'orders',
      title: `Order #${Date.now()}`,
      metadata: orderData
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

// Contact and bulk request functions
export async function createContactMessage(messageData: any): Promise<any> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'contact_messages',
      title: `Message from ${messageData.name}`,
      metadata: {
        ...messageData,
        status: 'new'
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw new Error('Failed to send message');
  }
}

export async function createBulkRequest(requestData: any): Promise<any> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'bulk_requests',
      title: `Bulk Request from ${requestData.customer_name}`,
      metadata: {
        ...requestData,
        status: 'pending'
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating bulk request:', error);
    throw new Error('Failed to submit bulk request');
  }
}

// Certification functions
export async function getCertifications(): Promise<any[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'certifications' })
      .props(['id', 'title', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch certifications');
  }
}