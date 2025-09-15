'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product, CartItem, CartContextType } from '@/types'

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'UPDATE_QUANTITY' | 'CLEAR_CART' | 'LOAD_CART'
  payload?: any
}

interface CartState {
  items: CartItem[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, {
          id: product.id,
          product,
          quantity,
          price: product.metadata?.price || 0
        }]
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId)
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      }
    
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nafees-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nafees-cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const value: CartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}