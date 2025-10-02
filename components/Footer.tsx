import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-secondary-100">
      {/* Main Footer */}
      <div className="py-16 container-max">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600">
                  <span className="text-lg font-bold text-white">NC</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">RFP.AUCTION</div>
                  <div className="text-xs text-secondary-400">Modern RFPs</div>
                </div>
              </div>
              <p className="leading-relaxed text-secondary-300">
                Leading manufacturer of premium electrical wires and cables, 
                delivering trusted solutions for over 25 years.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=electrical-wires" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Electrical Wires
                </Link>
              </li>
              <li>
                <Link href="/shop?category=power-cables" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Power Cables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=communication-cables" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Communication Cables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=specialized-cables" className="transition-colors duration-200 text-secondary-300 hover:text-primary-400">
                  Specialized Cables
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">American Made</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300">
                    2960 Industrial Drive<br />
                    ATL<br />
                    Atlanta, GA 30339
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="flex-shrink-0 w-5 h-5 text-primary-400" />
                <a 
                  href="tel:+14048895545" 
                  className="transition-colors duration-200 text-secondary-300 hover:text-primary-400"
                >
                  +1 (404) 889-5545
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 w-5 h-5 text-primary-400" />
                <a 
                  href="mailto:info@rfp.auction" 
                  className="transition-colors duration-200 text-secondary-300 hover:text-primary-400"
                >
                  info@rfp.auction
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="py-6 container-max">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-secondary-400">
              © {currentYear} RFP.AUCTION. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="transition-colors duration-200 text-secondary-400 hover:text-primary-400">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}