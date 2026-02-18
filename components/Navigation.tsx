import { ShoppingCart, Menu, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const { totalItems, items, totalPrice, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', href: '#products' },
    { label: 'Categories', href: '#categories' },
    { label: 'Deals', href: '#deals' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-[#F5F5F7] font-bold text-lg tracking-tight">
          Washington's Works
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#B7B7C2] hover:text-[#F5F5F7] transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative p-2 text-[#F5F5F7] hover:text-[#FF4D6D] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D6D] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#141419] border-l border-white/[0.08] w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-[#F5F5F7] text-xl font-bold uppercase tracking-tight">
                  Your Cart
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="w-16 h-16 text-[#B7B7C2] mb-4" />
                    <p className="text-[#B7B7C2]">Your cart is empty</p>
                    <p className="text-[#B7B7C2] text-sm mt-1">Add some neat tech!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto space-y-4 pr-2">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 rounded-xl bg-[#0B0B0D] border border-white/[0.08]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-[#F5F5F7] font-medium text-sm">{item.name}</h4>
                            <p className="text-[#FF4D6D] font-semibold mt-1">${item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded bg-white/5 text-[#B7B7C2] hover:text-[#F5F5F7] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[#F5F5F7] text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded bg-white/5 text-[#B7B7C2] hover:text-[#F5F5F7] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto p-1 text-[#B7B7C2] hover:text-[#FF4D6D] transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/[0.08] pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#B7B7C2]">Subtotal</span>
                        <span className="text-[#F5F5F7] font-bold text-xl">${totalPrice.toFixed(2)}</span>
                      </div>
                      <button className="ww-btn-primary w-full text-center">
                        Checkout
                      </button>
                      <p className="text-[#B7B7C2] text-xs text-center mt-3">
                        Free shipping on orders over $75
                      </p>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#F5F5F7]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#141419]/95 backdrop-blur-lg border-b border-white/[0.08] py-4 px-4">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-[#B7B7C2] hover:text-[#F5F5F7] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
