'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-800 text-white py-2 px-4">
        <div className="container-max flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@nafeescables.com</span>
            </div>
          </div>
          <div className="text-xs">
            Quality Assured • ISO Certified
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-max">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NC</span>
              </div>
              <div>
                <div className="font-bold text-xl text-secondary-900">RFP.AUCTION</div>
                <div className="text-xs text-secondary-500">Powering Connections</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-secondary-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-secondary-700 hover:text-primary-600"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container-max py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-secondary-700 hover:text-primary-600 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}