import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, MessageCircle, Heart, Share, Plus, Filter, Search } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Mock data for community posts
      const mockPosts = [
        {
          id: 1,
          author: {
            name: "Eco Warrior Sarah",
            role: "student",
            level: 8,
            points: 450,
            avatar: "👩‍🎓"
          },
          content: "Just completed the Ocean Conservation challenge! Learned so much about marine ecosystems. The quiz was challenging but really informative. 🌊🐋",
          timestamp: "2 hours ago",
          likes: 12,
          comments: 5,
          shares: 3,
          liked: false,
          category: "achievement"
        },
        {
          id: 2,
          author: {
            name: "Green Teacher Mike",
            role: "teacher",
            level: 15,
            points: 1200,
            avatar: "👨‍🏫"
          },
          content: "Sharing some amazing tips for reducing plastic waste in schools. We've reduced our plastic usage by 60% this semester! Here's what we did: 1) Reusable water bottles 2) Paper straws 3) Cloth bags for lunch. What are your school's eco-friendly initiatives?",
          timestamp: "4 hours ago",
          likes: 28,
          comments: 12,
          shares: 8,
          liked: true,
          category: "tips"
        },
        {
          id: 3,
          author: {
            name: "Ocean Guardian NGO",
            role: "ngo",
            level: 20,
            points: 2500,
            avatar: "🌍"
          },
          content: "🌊 Beach Cleanup Event Alert! Join us this Saturday at Marina Beach for our monthly cleanup drive. We'll provide all equipment. Let's make a difference together! #BeachCleanup #OceanConservation",
          timestamp: "6 hours ago",
          likes: 45,
          comments: 18,
          shares: 15,
          liked: false,
          category: "event"
        },
        {
          id: 4,
          author: {
            name: "Climate Crusader Alex",
            role: "student",
            level: 12,
            points: 800,
            avatar: "👨‍🎓"
          },
          content: "Just reached Level 12! 🎉 The renewable energy quiz was tough but I aced it. Solar panels are so cool - did you know they can power entire cities? The future is bright! ☀️",
          timestamp: "8 hours ago",
          likes: 18,
          comments: 7,
          shares: 4,
          liked: true,
          category: "achievement"
        },
        {
          id: 5,
          author: {
            name: "Eco Mom Lisa",
            role: "student",
            level: 6,
            points: 320,
            avatar: "👩‍🎓"
          },
          content: "Started a composting project in our neighborhood! It's amazing how much waste we can turn into nutrient-rich soil. My garden has never looked better! 🌱 Anyone else into composting?",
          timestamp: "1 day ago",
          likes: 22,
          comments: 9,
          shares: 6,
          liked: false,
          category: "project"
        }
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'ngo': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'achievement': return '🏆';
      case 'tips': return '💡';
      case 'event': return '📅';
      case 'project': return '🌱';
      default: return '💬';
    }
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community 🤝</h1>
          <p className="text-gray-600">Connect with fellow eco-warriors and share your journey</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">1.2K</div>
          <div className="text-sm text-gray-600">Active Members</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">456</div>
          <div className="text-sm text-gray-600">Posts This Week</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">89</div>
          <div className="text-sm text-gray-600">Events Shared</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">234</div>
          <div className="text-sm text-gray-600">Tips Shared</div>
        </div>
      </div>

      {/* Create Post Card */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg">{user?.name?.charAt(0) || '👤'}</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Share your eco-journey with the community..."
              className="input-field"
            />
          </div>
          <button className="btn-primary">Post</button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="card">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">{post.author.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                    <span className={`badge ${getRoleColor(post.author.role)}`}>
                      {post.author.role}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Level {post.author.level}</span>
                    <span>•</span>
                    <span>{post.author.points} points</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getCategoryIcon(post.category)}</span>
                <span className="text-sm text-gray-500 capitalize">{post.category}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-900 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 ${
                    post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  } transition-colors duration-200`}
                >
                  <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200">
                  <Share className="h-5 w-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="btn-secondary">
          Load More Posts
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Community Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Be respectful and supportive of fellow community members</li>
          <li>• Share authentic experiences and helpful tips</li>
          <li>• Keep posts relevant to environmental education and sustainability</li>
          <li>• Report any inappropriate content to moderators</li>
        </ul>
      </div>
    </div>
  );
};

export default Community;
