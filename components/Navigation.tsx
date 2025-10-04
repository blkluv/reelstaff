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
    { href: 'https://rfp.auction/services', label: 'Services' },
    { href: 'https://crypto.rfp.auction', label: 'Crypto RFP' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="px-4 py-2 text-white bg-primary-800">
        <div className="flex items-center justify-between text-sm container-max">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (404) 889-5545</span>
            </div>
            <div className="items-center hidden space-x-2 sm:flex">
              <Mail className="w-4 h-4" />
              <span>win@nrfp.auction</span>
            </div>
          </div>
          <div className="text-xs">
            Same Day RFP Services
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="https://rfp.auction" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600">
                <span className="text-lg font-bold text-white">⚡</span>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary-900">RFP.AUCTION</div>
                <div className="text-xs text-secondary-500">Modern RFP Services powered by AI & Blockcahin Tech</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium transition-colors duration-200 text-secondary-700 hover:text-primary-600"
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
                className="relative p-2 transition-colors duration-200 text-secondary-700 hover:text-primary-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-primary-600">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 md:hidden text-secondary-700 hover:text-primary-600"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="bg-white border-t md:hidden">
            <div className="py-4 container-max">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2 font-medium text-secondary-700 hover:text-primary-600"
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