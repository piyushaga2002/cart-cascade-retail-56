import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Medical Equipment</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Sale
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
