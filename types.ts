// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: number;
    category?: Category;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    technical_specs?: {
      voltage?: string;
      conductor?: string;
      insulation?: string;
      size?: string;
      length?: string;
      application?: string;
    };
    stock_quantity?: number;
    sku?: string;
    weight?: number;
    dimensions?: string;
    certifications?: string[];
    usage_type?: 'residential' | 'commercial' | 'industrial';
    featured?: boolean;
  };
}

// Service interface - ONLY ONE VERSION
export interface Service extends CosmicObject {
  type: 'rfp-services';
  metadata: {
    description?: string;
    price?: number;
    delivery_time?: string;
    delivery_days?: number;
    category?: string | Category;
    featured_image?: {
      url?: string;           // Make optional
      imgix_url?: string;     
    };
    features?: string[];
    process?: string;
    service_type?: string;
    featured?: boolean;
    images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    certifications?: string[];
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    icon?: string;
    color?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Order interface
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    customer_name: string;
    email: string;
    phone?: string;
    company?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    items: CartItem[];
    total: number;
    subtotal: number;
    tax?: number;
    shipping?: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    payment_method: 'card' | 'paypal' | 'bank_transfer';
    payment_status: 'pending' | 'paid' | 'failed';
    stripe_payment_intent_id?: string;
    notes?: string;
    bulk_order?: boolean;
  };
}

// Certification interface
export interface Certification extends CosmicObject {
  type: 'certifications';
  metadata: {
    description?: string;
    certificate_image?: {
      url: string;
      imgix_url: string;
    };
    issuing_body?: string;
    issue_date?: string;
    expiry_date?: string;
    certificate_number?: string;
  };
}

// Bulk Request interface
export interface BulkRequest extends CosmicObject {
  type: 'bulk_requests';
  metadata: {
    customer_name: string;
    email: string;
    phone?: string;
    company: string;
    project_details: string;
    required_products: string;
    quantity_estimate: string;
    timeline?: string;
    budget_range?: string;
    status: 'pending' | 'reviewed' | 'quoted' | 'closed';
  };
}

// Contact Message interface
export interface ContactMessage extends CosmicObject {
  type: 'contact_messages';
  metadata: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    inquiry_type: 'general' | 'distributor' | 'support' | 'bulk_order';
    status: 'new' | 'responded' | 'closed';
  };
}

// Cart item interface
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

// Cart context interface
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Filter types - UPDATED with service fields
export type ProductFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  deliveryTime?: string;
  serviceType?: string;
  usageType?: string;
  inStock?: boolean;
  search?: string;
};

// Form validation schemas
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'distributor' | 'support' | 'bulk_order';
}

export interface BulkRequestFormData {
  customerName: string;
  email: string;
  phone?: string;
  company: string;
  projectDetails: string;
  requiredProducts: string;
  quantityEstimate: string;
  timeline?: string;
  budgetRange?: string;
}

export interface CheckoutFormData {
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: 'card' | 'paypal' | 'bank_transfer';
  notes?: string;
}

// Service Standards Props
export interface ServiceStandardsProps {
  certifications: string[];
}

// Service Grid Props
export interface ServiceGridProps {
  services: Service[];
  searchParams: { [key: string]: string | string[] | undefined };
}

// Type guards - ONLY ONE OF EACH
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}

export function isCertification(obj: CosmicObject): obj is Certification {
  return obj.type === 'certifications';
}

export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'rfp-services';
}