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

// Demo data fallback - FIXED VERSION
function getDemoServiceBySlug(slug: string): Service {
  // Validate slug parameter to prevent split errors
  if (!slug || typeof slug !== 'string') {
    console.error('❌ Invalid slug provided to getDemoServiceBySlug:', slug)
    slug = 'unknown-service' // Fallback slug
  }

  const demoServices: Record<string, Service> = {
    'rfp-response-writing-service': {
      id: 'demo-rfp-writing',
      title: 'RFP Response Writing Service',
      slug: 'rfp-response-writing-service',
      type: 'rfp-services',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'Professional RFP response writing service to help you win more bids and secure government contracts.',
        price: 3500,
        delivery_time: '7-10 business days',
        category: 'Writing Services',
        featured_image: { 
          imgix_url: 'https://imgix.cosmicjs.com/e9a89940-a06f-11f0-8c2f-71055d67fae4-wizard-of-hahz-rfp-ai-services.png'
        },
        features: [
          'Professional quality writing',
          'Industry-specific expertise', 
          'Timely delivery guarantee',
          'Unlimited revisions',
          'Expert consultation included'
        ],
        process: 'Our comprehensive RFP response process includes: 1) Initial consultation and requirement analysis, 2) Content development and strategy, 3) Quality assurance review, 4) Final delivery and presentation support.'
      }
    },
    'rfp-consultation': {
      id: 'demo-consultation',
      title: 'RFP Consultation Service',
      slug: 'rfp-consultation',
      type: 'rfp-services', 
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'Expert RFP consultation and strategy development to improve your bidding success rate.',
        price: 499,
        delivery_time: '3-5 business days',
        category: 'Consultation',
        featured_image: {
          imgix_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format'
        },
        features: [
          'Strategic bid analysis',
          'Competitive assessment',
          'Pricing strategy development',
          'Risk mitigation planning'
        ],
        process: 'Consultation process includes: 1) Current state analysis, 2) Competitive landscape review, 3) Strategy development, 4) Implementation roadmap.'
      }
    },
    'proposal-development': {
      id: 'demo-proposal',
      title: 'Proposal Development Service',
      slug: 'proposal-development',
      type: 'rfp-services',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'Complete proposal development from concept to final submission.',
        price: 1499,
        delivery_time: '10-14 business days',
        category: 'Development',
        featured_image: {
          imgix_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&auto=format'
        },
        features: [
          'End-to-end proposal development',
          'Custom graphics and design',
          'Compliance checking',
          'Submission management'
        ],
        process: 'Full development process: 1) Requirements gathering, 2) Content creation, 3) Design and formatting, 4) Quality assurance, 5) Final submission.'
      }
    }
  }
  
  // Return demo service if it exists - FIXED: Use bracket notation with type assertion
  const demoService = demoServices[slug]
  if (demoService) {
    return demoService
  }

  // Create a safe fallback service with proper slug validation
  const safeSlug = slug || 'unknown-service'
  
  // Safe title generation - handle empty strings and invalid slugs
  let fallbackTitle = 'Professional Service'
  try {
    const titleWords = safeSlug.split('-')
      .map(word => {
        if (!word || word.length === 0) return ''
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .filter(word => word.length > 0)
    
    fallbackTitle = titleWords.length > 0 
      ? titleWords.join(' ') 
      : 'Professional Service'
  } catch (error) {
    console.error('Error generating fallback title for slug:', safeSlug, error)
    fallbackTitle = 'Professional Service'
  }

  // Safe description generation
  let description = `Professional ${fallbackTitle.toLowerCase()} service.`
  try {
    description = `Professional ${fallbackTitle.toLowerCase()} service.`
  } catch (error) {
    console.error('Error generating description for slug:', safeSlug, error)
    description = 'Professional service tailored to your needs.'
  }

  return {
    id: `demo-fallback-${Date.now()}`,
    title: fallbackTitle,
    slug: safeSlug,
    type: 'rfp-services',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      description: description,
      price: 799,
      delivery_time: '5-7 business days',
      category: 'Professional Services',
      featured_image: {
        imgix_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format'
      },
      features: [
        'Professional quality service',
        'Timely delivery guarantee',
        'Expert consultation included',
        'Satisfaction guaranteed'
      ],
      process: 'Our professional service process ensures quality delivery and client satisfaction.'
    }
  }
}

// Helper function for getting service image URLs
export function getServiceImageUrl(service: Service): string {
  if (!service.metadata?.featured_image) {
    console.log(`📸 No featured image for: ${service.title}`)
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format'
  }
  
  const { featured_image } = service.metadata
  
  // Log what we're getting for debugging
  console.log(`📸 Image data for ${service.title}:`, {
    hasImgix: !!featured_image.imgix_url,
    hasUrl: !!featured_image.url,
    imgix_url: featured_image.imgix_url,
    url: featured_image.url
  })
  
  // Try imgix_url first, then url
  const imageUrl = featured_image.imgix_url || featured_image.url
  
  if (imageUrl) {
    // Add imgix parameters for optimization if it's an imgix URL
    if (imageUrl.includes('imgix.net')) {
      return `${imageUrl}?w=600&h=400&fit=crop&auto=format,compress`
    }
    return imageUrl
  }
  
  return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format'
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
        'metadata.featured_image',
        'metadata.features',
        'metadata.service_type',
        'metadata.featured',
        'metadata.tags',
        'metadata.excerpt',
        'created_at' 
      ])
      .depth(1);
    
    const services = response.objects || []
    
    // Log detailed image information
    console.log('=== SERVICE IMAGE DEBUG ===')
    services.forEach((service: Service) => { // FIXED: Added type annotation
      if (service.metadata?.featured_image) {
        console.log(`📸 ${service.title}:`, {
          hasImage: true,
          imgix_url: service.metadata.featured_image.imgix_url || 'NOT PROVIDED',
          url: service.metadata.featured_image.url || 'NOT PROVIDED',
          fullImageObject: service.metadata.featured_image
        })
      } else {
        console.log(`📸 ${service.title}: NO FEATURED IMAGE`)
      }
    })
    console.log('=== END DEBUG ===')
    
    return services.sort((a: Service, b: Service) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching RFP services:', error);
    return [];
  }
}

// FIXED getServiceBySlug with slug validation
export async function getServiceBySlug(slug: string): Promise<Service> {
  // Validate slug parameter to prevent errors
  if (!slug || typeof slug !== 'string') {
    console.error('❌ Invalid slug provided to getServiceBySlug:', slug)
    return getDemoServiceBySlug('unknown-service')
  }

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
    
    if (response.object) {
      console.log('✅ Found service in Cosmic:', response.object.title)
      if (response.object?.metadata) {
  const m = response.object.metadata as any;

  // ✅ Ensure features is always an array
  if (!Array.isArray(m.features)) {
    if (typeof m.features === "string" && m.features.trim() !== "") {
      m.features = [m.features];
    } else {
      m.features = [];
    }
  }

  // ✅ Normalize other potential repeatable fields for safety
  if (!Array.isArray(m.images)) m.images = [];
  if (!Array.isArray(m.gallery)) m.gallery = [];
}

      return response.object as Service;
    }
    
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      console.log('⚠️ Cosmic 404 - Service not found:', slug)
    } else {
      console.error('Error fetching RFP service:', error);
    }
  }
  
  // Fallback to demo data if not found in Cosmic
  console.log('🔄 Using demo data for:', slug)
  return getDemoServiceBySlug(slug);
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
        'metadata.featured_image',
        'metadata.features',
        'metadata.excerpt',
        'metadata.service_type',
        'metadata.featured',
        'created_at'
      ])
      .depth(1);
    
    const featuredServices = response.objects || []
    
    console.log('⭐ Featured services found:', featuredServices.length)
    featuredServices.forEach((service: Service) => { // FIXED: Added type annotation
      console.log(`- ${service.title}:`, {
        featured: service.metadata?.featured,
        hasImage: !!service.metadata?.featured_image,
        imgix_url: service.metadata?.featured_image?.imgix_url
      })
    })
    
    return featuredServices
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching featured RFP services:', error);
    return [];
  }
}

// Extract categories from services
export async function getCategories(): Promise<Category[]> {
  try {
    const services = await getServices();
    const categoryMap = new Map();
    
    services.forEach((service: Service) => { // FIXED: Added type annotation
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

export async function debugCosmicData() {
  try {
    console.log('=== COSMIC DEBUG INFO ===');
    console.log('Bucket Slug:', process.env.COSMIC_BUCKET_SLUG);
    
    // Get all object types
    const allTypes = await getAllObjectTypes();
    console.log('Available types:', allTypes);
    
    // Try to find any objects
    const allObjects = await cosmic.objects.find({}).props('type,title,slug').limit(10);
    console.log('Sample objects:', allObjects.objects);
    
    // Specifically check for rfp-services
    const rfpServices = await cosmic.objects
      .find({ type: 'rfp-services' })
      .props('title,slug')
      .limit(5);
    console.log('RFP Services found:', rfpServices.objects);
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

export async function debugAllServices() {
  try {
    console.log('=== DEBUG: CHECKING ALL SERVICES IN COSMIC ===')
    console.log('Bucket Slug:', process.env.COSMIC_BUCKET_SLUG)
    
    const services = await getServices()
    console.log(`Total services found: ${services.length}`)
    
    services.forEach((service: Service, index: number) => { // FIXED: Added type annotations
      console.log(`\nService ${index + 1}:`)
      console.log(`- Title: ${service.title}`)
      console.log(`- Slug: ${service.slug}`)
      console.log(`- ID: ${service.id}`)
      console.log(`- Has Metadata: ${!!service.metadata}`)
      console.log(`- Price: ${service.metadata?.price}`)
      console.log(`- Featured: ${service.metadata?.featured || false}`)
      console.log(`- Has Image: ${!!service.metadata?.featured_image}`)
      if (service.metadata?.featured_image) {
        console.log(`- Image URL: ${service.metadata.featured_image.imgix_url || service.metadata.featured_image.url || 'NONE'}`)
      }
    })
    
    // Check if our target service exists
    const targetService = services.find(s => s.slug === 'rfp-response-writing-service')
    console.log(`\n🔍 Target service "rfp-response-writing-service" found: ${!!targetService}`)
    
    return services
  } catch (error) {
    console.error('Error debugging services:', error)
    return []
  }
}

// Add this debug function to cosmic.ts
export async function debugServiceImages() {
  try {
    console.log('=== DEBUGGING SERVICE IMAGES ===')
    
    const services = await getServices()
    
    services.forEach((service: Service) => { // FIXED: Added type annotation
      console.log(`\n📸 ${service.title}`)
      console.log(`- Featured: ${service.metadata?.featured || false}`)
      
      if (service.metadata?.featured_image) {
        console.log(`- Featured Image Object:`, service.metadata.featured_image)
        console.log(`- imgix_url: ${service.metadata.featured_image.imgix_url || 'NOT FOUND'}`)
        console.log(`- url: ${service.metadata.featured_image.url || 'NOT FOUND'}`)
        
        // Check all properties on the image object
        console.log(`- All image properties:`, Object.keys(service.metadata.featured_image))
      } else {
        console.log(`- NO FEATURED IMAGE`)
      }
    })
    
  } catch (error) {
    console.error('Debug error:', error)
  }
}

// Alternative: If Cosmic query doesn't work, use this version that filters manually
export async function getFeaturedServicesManual(): Promise<Service[]> {
  try {
    // Get all services first
    const allServices = await getServices()
    
    // Then filter for featured ones
    const featuredServices = allServices.filter(service => 
      service.metadata?.featured === true
    )
    
    console.log('⭐ Featured services found (manual filter):', featuredServices.length)
    featuredServices.forEach((service: Service) => { // FIXED: Added type annotation
      console.log(`- ${service.title}`)
    })
    
    return featuredServices
    
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }
}