import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Phone, MapPin, Clock, Users, Leaf, Recycle, Zap, Plus, Filter, Search, Heart } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Mock data for eco-friendly products
      const mockProducts = [
        {
          id: 1,
          seller: {
            name: "Eco Warrior Sarah",
            role: "student",
            level: 8,
            points: 450,
            avatar: "👩‍🎓",
            rating: 4.8,
            sales: 23
          },
          title: "Handmade Bamboo Water Bottle",
          description: "Sustainable bamboo water bottle with stainless steel interior. Perfect for reducing plastic waste!",
          category: "sustainable-products",
          image: "🌿",
          tags: ["bamboo", "water bottle", "plastic-free"],
          location: "Mumbai, India",
          contactNumber: "+91 98765 43210",
          posted: "2 hours ago",
          likes: 12,
          liked: false,
          inStock: true,
          ecoRating: 5
        },
        {
          id: 2,
          seller: {
            name: "Green Thumb Mike",
            role: "student",
            level: 6,
            points: 320,
            avatar: "👨‍🌾",
            rating: 4.6,
            sales: 15
          },
          title: "Organic Seed Starter Kit",
          description: "Complete kit with organic seeds, biodegradable pots, and growing guide. Start your own garden!",
          category: "gardening",
          image: "🌱",
          tags: ["seeds", "organic", "gardening", "starter kit"],
          location: "Delhi, India",
          contactNumber: "+91 87654 32109",
          posted: "5 hours ago",
          likes: 8,
          liked: true,
          inStock: true,
          ecoRating: 5
        },
        {
          id: 3,
          seller: {
            name: "Recycle Master Priya",
            role: "student",
            level: 9,
            points: 520,
            avatar: "👩‍🔬",
            rating: 4.9,
            sales: 31
          },
          title: "Upcycled Glass Jars Set",
          description: "Beautiful set of 6 upcycled glass jars perfect for storage, DIY projects, or as planters.",
          category: "upcycled",
          image: "🫙",
          tags: ["upcycled", "glass", "storage", "DIY"],
          location: "Bangalore, India",
          contactNumber: "+91 76543 21098",
          posted: "1 day ago",
          likes: 15,
          liked: false,
          inStock: true,
          ecoRating: 4
        },
        {
          id: 4,
          seller: {
            name: "Solar Sam",
            role: "student",
            level: 7,
            points: 380,
            avatar: "👨‍💻",
            rating: 4.7,
            sales: 19
          },
          title: "Solar-Powered Phone Charger",
          description: "Portable solar charger for phones and small devices. Perfect for outdoor adventures!",
          category: "solar-tech",
          image: "☀️",
          tags: ["solar", "charger", "portable", "renewable"],
          location: "Chennai, India",
          contactNumber: "+91 65432 10987",
          posted: "3 days ago",
          likes: 22,
          liked: true,
          inStock: true,
          ecoRating: 5
        },
        {
          id: 5,
          seller: {
            name: "Compost Queen Lisa",
            role: "student",
            level: 5,
            points: 280,
            avatar: "👩‍🍳",
            rating: 4.5,
            sales: 12
          },
          title: "Composting Bin with Worms",
          description: "Complete composting setup with red wiggler worms and instructions. Turn kitchen waste into gold!",
          category: "composting",
          image: "🪱",
          tags: ["compost", "worms", "kitchen waste", "fertilizer"],
          location: "Pune, India",
          contactNumber: "+91 54321 09876",
          posted: "1 week ago",
          likes: 18,
          liked: false,
          inStock: true,
          ecoRating: 5
        },
        {
          id: 6,
          seller: {
            name: "Eco Artist Raj",
            role: "student",
            level: 4,
            points: 200,
            avatar: "👨‍🎨",
            rating: 4.3,
            sales: 8
          },
          title: "Handmade Paper from Recycled Materials",
          description: "Beautiful handmade paper sheets made from recycled newspapers and cotton. Perfect for art projects!",
          category: "crafts",
          image: "📄",
          tags: ["handmade", "recycled", "paper", "art"],
          location: "Kolkata, India",
          contactNumber: "+91 43210 98765",
          posted: "2 weeks ago",
          likes: 6,
          liked: false,
          inStock: false,
          ecoRating: 4
        }
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'sustainable-products', name: 'Sustainable Products' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'upcycled', name: 'Upcycled Items' },
    { id: 'solar-tech', name: 'Solar Technology' },
    { id: 'composting', name: 'Composting' },
    { id: 'crafts', name: 'Eco Crafts' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sustainable-products': return <Leaf className="h-4 w-4" />;
      case 'gardening': return <Recycle className="h-4 w-4" />;
      case 'upcycled': return <Zap className="h-4 w-4" />;
      case 'solar-tech': return <Zap className="h-4 w-4" />;
      case 'composting': return <Recycle className="h-4 w-4" />;
      case 'crafts': return <Leaf className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const getEcoRatingStars = (rating) => {
    return '🌱'.repeat(rating) + '⚪'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            <Leaf className="inline-block h-10 w-10 mr-3 text-primary-600" />
            Community Eco Bazaar
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover and share eco-friendly products with your community. Connect directly with sellers!
          </p>
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">{products.length}</div>
            <div className="text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{products.filter(p => p.inStock).length}</div>
            <div className="text-gray-600">In Stock</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{new Set(products.map(p => p.seller.name)).size}</div>
            <div className="text-gray-600">Active Sellers</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">1.2K+</div>
            <div className="text-gray-600">Community Members</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>List Product</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-6xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center space-x-2 mb-3">
                  {getCategoryIcon(product.category)}
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {categories.find(c => c.id === product.category)?.name || 'Other'}
                  </span>
                  {!product.inStock && (
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Eco Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Eco Rating:</span>
                  <span className="text-lg">{getEcoRatingStars(product.ecoRating)}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Seller Info */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{product.seller.avatar}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.seller.name}</div>
                    <div className="text-sm text-gray-600">
                      Level {product.seller.level} • {product.seller.points} points
                    </div>
                    <div className="text-xs text-gray-500">
                      ⭐ {product.seller.rating} • {product.seller.sales} sales
                    </div>
                  </div>
                </div>

                {/* Contact and Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{product.contactNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{product.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{product.posted}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Heart className={`h-4 w-4 ${product.liked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marketplace Guidelines */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Eco Bazaar Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-green-50 border-green-200">
              <h4 className="text-lg font-semibold text-green-900 mb-2">For Sellers</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• All products must be environmentally friendly and sustainable</li>
                <li>• Provide accurate descriptions and honest ratings</li>
                <li>• Include clear contact information</li>
                <li>• Update stock status regularly</li>
                <li>• Respond to inquiries promptly</li>
              </ul>
            </div>
            <div className="card bg-blue-50 border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">For Buyers</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Contact sellers directly using provided phone numbers</li>
                <li>• Ask questions before making arrangements</li>
                <li>• Support local and handmade eco-friendly products</li>
                <li>• Leave honest feedback after transactions</li>
                <li>• Report any inappropriate listings to moderators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;