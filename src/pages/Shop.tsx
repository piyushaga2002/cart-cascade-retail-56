
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

// Medical equipment products
const products = [
  {
    id: 1,
    name: 'Digital Blood Pressure Monitor',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Diagnostic',
    inStock: true,
    description: 'Professional digital blood pressure monitor with advanced accuracy'
  },
  {
    id: 2,
    name: 'Digital Thermometer',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1576091160549-2173dba999ef?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 89,
    category: 'Diagnostic',
    inStock: true,
    description: 'Fast and accurate digital thermometer for clinical use'
  },
  {
    id: 3,
    name: 'Stethoscope - Professional Grade',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    category: 'Diagnostic',
    inStock: true,
    description: 'High-quality stethoscope for medical professionals'
  },
  {
    id: 4,
    name: 'Wheelchair - Standard',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop',
    rating: 4.5,
    reviews: 67,
    category: 'Mobility',
    inStock: true,
    description: 'Comfortable and durable standard wheelchair'
  },
  {
    id: 5,
    name: 'Pulse Oximeter',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 142,
    category: 'Diagnostic',
    inStock: true,
    description: 'Accurate pulse oximeter for oxygen saturation monitoring'
  },
  {
    id: 6,
    name: 'First Aid Kit - Professional',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1603398938013-07be20e6b8a3?w=300&h=300&fit=crop',
    rating: 4.4,
    reviews: 78,
    category: 'Emergency',
    inStock: true,
    description: 'Comprehensive first aid kit for medical emergencies'
  }
];

const categories = ['All', 'Diagnostic', 'Mobility', 'Emergency', 'Surgical'];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Store Name Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary animate-fade-in">Medicare</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Medical Equipment</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500 animate-pulse">
                    Sale
                  </Badge>
                )}
                
                {/* Overlay with quick actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleWishlist(product.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Heart 
                        className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                      className="hover:scale-110 transition-transform"
                    >
                      <Link to={`/product/${product.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors duration-200 story-link">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {product.category}
                </Badge>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
