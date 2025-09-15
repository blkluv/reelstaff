import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-secondary-100">
      {/* Main Footer */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NC</span>
                </div>
                <div>
                  <div className="font-bold text-xl text-white">Nafees Cables</div>
                  <div className="text-xs text-secondary-400">Powering Connections</div>
                </div>
              </div>
              <p className="text-secondary-300 leading-relaxed">
                Leading manufacturer of premium electrical wires and cables, 
                delivering trusted solutions for over 25 years.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=electrical-wires" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Electrical Wires
                </Link>
              </li>
              <li>
                <Link href="/shop?category=power-cables" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Power Cables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=communication-cables" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Communication Cables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=specialized-cables" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Specialized Cables
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300">
                    123 Industrial Avenue<br />
                    Manufacturing District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:info@nafeescables.com" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  info@nafeescables.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Nafees Cables. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}