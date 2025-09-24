import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Globe, 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  MapPin
} from 'lucide-react';
import CreateEventForm from '../components/CreateEventForm';

const NGODashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeCampaigns: 0,
    participants: 0,
    reach: 0
  });
  const [loading, setLoading] = useState(true);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for NGO dashboard
      setEvents([
        {
          id: 1,
          title: "Beach Cleanup Drive",
          description: "Join us for a community beach cleanup event",
          date: "2024-02-15",
          location: "Marina Beach, Chennai",
          participants: 45,
          status: "upcoming"
        },
        {
          id: 2,
          title: "Tree Planting Workshop",
          description: "Learn about tree planting and environmental conservation",
          date: "2024-02-20",
          location: "Central Park, Mumbai",
          participants: 32,
          status: "upcoming"
        },
        {
          id: 3,
          title: "Climate Change Awareness",
          description: "Educational session on climate change impacts",
          date: "2024-01-30",
          location: "Online Event",
          participants: 120,
          status: "completed"
        }
      ]);

      setCampaigns([
        {
          id: 1,
          title: "Plastic-Free February",
          description: "Encourage students to reduce plastic usage",
          startDate: "2024-02-01",
          endDate: "2024-02-29",
          participants: 250,
          status: "active"
        },
        {
          id: 2,
          title: "Energy Conservation Drive",
          description: "Promote energy-saving practices in schools",
          startDate: "2024-01-15",
          endDate: "2024-03-15",
          participants: 180,
          status: "active"
        }
      ]);

      setStats({
        totalEvents: 3,
        activeCampaigns: 2,
        participants: 430,
        reach: 1200
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">NGO Dashboard 🌍</h1>
            <p className="text-purple-100 mt-1">Make a positive environmental impact</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.participants}</div>
            <div className="text-purple-100">Participants</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Events */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900">{stats.participants}</p>
            </div>
          </div>
        </div>

        {/* Reach */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">{stats.reach}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Events</h3>
            <button 
              onClick={() => setShowCreateEvent(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-500">{event.participants} participants</span>
                      <span className={`badge ${
                        event.status === 'upcoming' ? 'badge-uncommon' :
                        event.status === 'completed' ? 'badge-common' :
                        'badge-common'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Campaigns</h3>
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Launch Campaign
            </button>
          </div>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                    <p className="text-sm text-gray-600">{campaign.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-500">{campaign.participants} participants</span>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-uncommon' :
                        campaign.status === 'completed' ? 'badge-common' :
                        'badge-common'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {campaign.status === 'active' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Campaign Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Calendar className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Schedule Event</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Globe className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Launch Campaign</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Users className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Manage Volunteers</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateEventForm
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={(eventData) => {
          console.log('Creating event:', eventData);
          // In a real app, this would call the API to create the event
          setShowCreateEvent(false);
        }}
      />
    </div>
  );
};

export default NGODashboard;
