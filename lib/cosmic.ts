import { createBucketClient } from '@cosmicjs/sdk'
import { Service, Category, Order, Certification, ContactMessage, BulkRequest } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// RFP Service functions
export async function getActiveServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'rfp-services',
        'metadata.status': 'active'
      })
      .props([
        'id', 
        'title', 
        'slug', 
        'metadata.description',
        'metadata.price',
        'metadata.delivery_time',
        'metadata.service_type',
        'metadata.category',
        'metadata.featured_image',
        'metadata.features',
        'metadata.deliverables',
        'metadata.blockchain_verified',
        'metadata.ai_powered',
        'metadata.emergency_service'
      ])
      .depth(1);
    
    return response.objects.sort((a: Service, b: Service) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching RFP services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'rfp-services', 
        slug 
      })
      .props([
        'id',
        'title',
        'slug',
        'created_at',
        'metadata.description',
        'metadata.price',
        'metadata.currency',
        'metadata.delivery_time',
        'metadata.delivery_days',
        'metadata.service_type',
        'metadata.category',
        'metadata.features',
        'metadata.deliverables',
        'metadata.requirements',
        'metadata.process_steps',
        'metadata.included_services',
        'metadata.excluded_services',
        'metadata.target_audience',
        'metadata.success_metrics',
        'metadata.testimonials',
        'metadata.featured_image',
        'metadata.gallery',
        'metadata.status',
        'metadata.price_tier',
        'metadata.blockchain_verified',
        'metadata.ai_powered',
        'metadata.emergency_service',
        'metadata.satisfaction_guarantee',
        'metadata.support_level',
        'metadata.revision_limit',
        'metadata.timeline_guarantee',
        'metadata.industry_specialization',
        'metadata.compliance_standards',
        'metadata.sample_work_url',
        'metadata.case_studies'
      ])
      .depth(1);
    
    return response.object as Service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching RFP service:', error);
    return null;
  }
}

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'rfp-services',
        'metadata.featured': true,
        'metadata.status': 'active'
      })
      .props([
        'id', 
        'title', 
        'slug', 
        'metadata.description',
        'metadata.price',
        'metadata.delivery_time',
        'metadata.service_type',
        'metadata.category',
        'metadata.featured_image',
        'metadata.features',
        'metadata.blockchain_verified'
      ])
      .depth(1);
    
    return response.objects as Service[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      console.log('No featured RFP services found, returning empty array');
      return [];
    }
    console.error('Error fetching featured RFP services:', error);
    return [];
  }
}

// Service booking function
export async function createServiceBooking(bookingData: any): Promise<any> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'service-bookings',
      title: `Service Booking - ${bookingData.service_title}`,
      metadata: {
        ...bookingData,
        status: 'pending',
        booking_date: new Date().toISOString()
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating service booking:', error);
    throw new Error('Failed to create service booking');
  }
}

// Category functions (updated for RFP services)
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

// RFP-specific order functions
export async function createServiceOrder(orderData: any): Promise<Order> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'service-orders',
      title: `RFP Service Order - ${orderData.service_title}`,
      metadata: {
        ...orderData,
        order_type: 'rfp_service',
        status: 'confirmed',
        order_date: new Date().toISOString()
      }
    });
    
    return response.object as Order;
  } catch (error) {
    console.error('Error creating service order:', error);
    throw new Error('Failed to create service order');
  }
}

// Contact and consultation request functions
export async function createContactMessage(messageData: ContactMessage['metadata']): Promise<ContactMessage> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'contact_messages',
      title: `RFP Consultation from ${messageData.name}`,
      metadata: {
        ...messageData,
        message_type: 'rfp_consultation',
        status: 'new'
      }
    });
    
    return response.object as ContactMessage;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw new Error('Failed to send message');
  }
}

export async function createRFPRequest(requestData: any): Promise<BulkRequest> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'rfp-requests',
      title: `Custom RFP Request from ${requestData.company_name}`,
      metadata: {
        ...requestData,
        request_type: 'custom_rfp',
        status: 'pending_review'
      }
    });
    
    return response.object as BulkRequest;
  } catch (error) {
    console.error('Error creating RFP request:', error);
    throw new Error('Failed to submit RFP request');
  }
}

// Certification functions (updated for RFP standards)
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

// Backward compatibility functions
export const getProducts = getActiveServices;
export const getProductBySlug = getServiceBySlug;
export const getFeaturedProducts = getFeaturedServices;
