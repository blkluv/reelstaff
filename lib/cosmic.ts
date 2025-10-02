import { createBucketClient } from '@cosmicjs/sdk'
import { Service, Category } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// RFP Service functions
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'rfp-services' })
      .props([
        'id', 
        'title', 
        'slug', 
        'metadata.description',
        'metadata.price',
        'metadata.delivery_time',
        'metadata.category',
        'metadata.featured_image'
      ])
      .depth(1);
    
    return response.objects?.sort((a: Service, b: Service) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching RFP services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'rfp-services', slug })
      .props([
        'id',
        'title',
        'slug',
        'metadata.description',
        'metadata.price',
        'metadata.delivery_time',
        'metadata.category',
        'metadata.featured_image',
        'metadata.features',
        'metadata.process'
      ])
      .depth(1);
    
    return response.object as Service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error('Error fetching RFP service:', error);
    return null;
  }
}

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'rfp-services',
        'metadata.featured': true
      })
      .props([
        'id', 
        'title', 
        'slug', 
        'metadata.description',
        'metadata.price',
        'metadata.delivery_time',
        'metadata.category',
        'metadata.featured_image'
      ])
      .depth(1);
    
    return response.objects as Service[] || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching featured RFP services:', error);
    return [];
  }
}

// Extract categories from services - FIXED VERSION
export async function getCategories(): Promise<Category[]> {
  try {
    const services = await getServices();
    const categoryMap = new Map();
    
    services.forEach(service => {
      const category = service.metadata?.category;
      if (category) {
        // Handle both string and Category object
        const categoryTitle = typeof category === 'string' ? category : category.title || '';
        const categorySlug = typeof category === 'string' 
          ? category.toLowerCase().replace(/\s+/g, '-')
          : category.slug || category.title?.toLowerCase().replace(/\s+/g, '-') || '';
        
        if (categoryTitle && categorySlug && !categoryMap.has(categorySlug)) {
          categoryMap.set(categorySlug, {
            id: categorySlug,
            title: categoryTitle,
            slug: categorySlug,
            type: 'categories',
            metadata: {},
            created_at: new Date().toISOString(),
            modified_at: new Date().toISOString()
          });
        }
      }
    });
    
    return Array.from(categoryMap.values());
  } catch (error) {
    console.error('Error extracting categories:', error);
    return [];
  }
}

// Alias functions for compatibility
export const getProducts = getServices;
export const getActiveServices = getServices;

export async function getCertifications(): Promise<any[]> {
  return [];
}

export async function getAllObjectTypes() {
  try {
    const objects = await cosmic.objects.find({}).props('type').limit(100)
    const types = new Set(objects.objects?.map((obj: any) => obj.type))
    console.log('Available object types:', Array.from(types))
    return Array.from(types)
  } catch (error) {
    console.error('Error fetching object types:', error)
    return []
  }
}