
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Truck, Shield, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredProducts = [
  {
    id: 1,
    name: 'Digital Blood Pressure Monitor',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Digital Thermometer',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1576091160549-2173dba999ef?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: 'Stethoscope - Professional Grade',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 203
  }
];

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Fast delivery for urgent medical needs'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All equipment meets medical standards'
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30-day return policy on all equipment'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Store Name Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary animate-fade-in">Medicare</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Professional Medical Equipment
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Quality medical equipment for healthcare professionals and patients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300 group">
              <Link to="/shop">
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Browse Equipment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Featured Equipment</h2>
            <p className="text-muted-foreground text-lg">
              Discover our most trusted medical devices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 animate-pulse">
                    Sale
                  </Badge>
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors story-link">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <Button asChild className="hover:scale-105 transition-transform group">
                      <Link to={`/product/${product.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button asChild size="lg" className="hover:scale-105 transition-transform group">
              <Link to="/shop">
                View All Equipment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest medical equipment updates, 
            health tips, and exclusive offers for healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-md transition-all duration-300 focus:scale-105 focus:shadow-lg"
            />
            <Button className="hover:scale-105 transition-transform">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
