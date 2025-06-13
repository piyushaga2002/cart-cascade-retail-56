
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            MedEquip Pro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary font-medium' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`hover:text-primary transition-colors ${isActive('/shop') ? 'text-primary font-medium' : ''}`}
            >
              Equipment
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-primary transition-colors ${isActive('/about') ? 'text-primary font-medium' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary font-medium' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search medical equipment..." className="pl-10" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <Button asChild variant="ghost">
              <Link to="/login">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>

            {/* Cart */}
            <Button asChild variant="ghost" className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
