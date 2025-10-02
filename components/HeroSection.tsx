import Link from 'next/link'
import { ArrowRight, Shield, Zap, Award } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&auto=format"
          alt="Electrical cables background"
          className="object-cover w-full h-full opacity-20"
        />
      </div>
      
      <div className="relative container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
                <span className="block">Powering</span>
                <span className="block text-gradient">Faster</span>
                <span className="block">RFP Wins</span>
              </h1>
              <p className="max-w-2xl text-xl text-blue-100">
                Increase your win rate with our vetted services.
                The competitive RFP marketplace to streamline sourcing,
                secure better bids, and award faster.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg btn-primary"
              >
                Browse Services
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg text-white border-white btn-outline hover:bg-white hover:text-primary-700"
              >
                Get Quote
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-sm text-blue-100">Quality</div>
                <div className="font-semibold">Assured</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-sm text-blue-100">Fast</div>
                <div className="font-semibold">Delivery</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-sm text-blue-100">Tokenized</div>
                <div className="font-semibold">RFPs</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop&auto=format"
                alt="High-quality electrical cables"
                className="object-cover w-full shadow-2xl h-96 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-2xl"></div>
              
              {/* Floating Stats */}
              <div className="absolute p-4 bg-white shadow-lg -bottom-4 -left-4 text-secondary-900 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">25+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              
              <div className="absolute p-4 bg-white shadow-lg -top-4 -right-4 text-secondary-900 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce-subtle">
        <div className="w-1 h-12 rounded-full bg-white/30">
          <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}