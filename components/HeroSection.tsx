import Link from 'next/link'
import { ArrowRight, Shield, Zap, Award } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&auto=format"
          alt="Electrical cables background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Powering</span>
                <span className="block text-gradient">Connections,</span>
                <span className="block">Building Trust</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Leading manufacturer of premium electrical wires and cables. 
                Delivering reliable, durable solutions for residential, commercial, 
                and industrial applications worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Get Quote
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-sm text-blue-100">Quality</div>
                <div className="font-semibold">Assured</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-sm text-blue-100">Fast</div>
                <div className="font-semibold">Delivery</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-sm text-blue-100">ISO</div>
                <div className="font-semibold">Certified</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop&auto=format"
                alt="High-quality electrical cables"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-2xl"></div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-white text-secondary-900 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary-600">25+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white text-secondary-900 p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-1 h-12 bg-white/30 rounded-full">
          <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}