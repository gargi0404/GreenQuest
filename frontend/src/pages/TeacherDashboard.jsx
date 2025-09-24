import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';
import axios from 'axios';
import CreateChallengeForm from '../components/CreateChallengeForm';
import ClassLeaderboard from '../components/ClassLeaderboard';

const API_BASE_URL = 'http://localhost:5001/api';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeChallenges: 0,
    totalPointsAwarded: 0,
    averageProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showClassLeaderboard, setShowClassLeaderboard] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch students (in a real app, this would be filtered by teacher's class/school)
      const studentsRes = await axios.get(`${API_BASE_URL}/leaderboard?role=student&limit=20`);
      setStudents(studentsRes.data.data.leaderboard);

      // Mock challenges data (in a real app, this would come from the API)
      setChallenges([
        {
          id: 1,
          title: "Climate Change Basics",
          description: "Learn about the fundamentals of climate change",
          points: 50,
          status: "active",
          studentsCompleted: 15,
          totalStudents: 25
        },
        {
          id: 2,
          title: "Renewable Energy Quiz",
          description: "Test your knowledge about renewable energy sources",
          points: 75,
          status: "draft",
          studentsCompleted: 0,
          totalStudents: 25
        },
        {
          id: 3,
          title: "Ocean Conservation",
          description: "Explore marine ecosystems and conservation efforts",
          points: 100,
          status: "completed",
          studentsCompleted: 25,
          totalStudents: 25
        }
      ]);

      // Calculate stats
      setStats({
        totalStudents: studentsRes.data.data.leaderboard.length,
        activeChallenges: 1,
        totalPointsAwarded: studentsRes.data.data.leaderboard.reduce((sum, student) => sum + student.points, 0),
        averageProgress: 75 // Mock data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const awardPoints = async (studentId, points, reason) => {
    try {
      await axios.post(`${API_BASE_URL}/gamification/award-points`, {
        userId: studentId,
        points,
        reason
      });
      
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error awarding points:', error);
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
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Teacher Dashboard 👨‍🏫</h1>
            <p className="text-green-100 mt-1">Manage your students and environmental education</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.totalStudents}</div>
            <div className="text-green-100">Students</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Challenges</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeChallenges}</p>
            </div>
          </div>
        </div>

        {/* Points Awarded */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Points Awarded</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPointsAwarded}</p>
            </div>
          </div>
        </div>

        {/* Average Progress */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenges Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Challenges</h3>
            <button 
              onClick={() => setShowCreateChallenge(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </button>
          </div>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-500">{challenge.points} points</span>
                      <span className={`badge ${
                        challenge.status === 'active' ? 'badge-uncommon' :
                        challenge.status === 'completed' ? 'badge-common' :
                        'badge-common'
                      }`}>
                        {challenge.status}
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
                {challenge.status === 'active' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{challenge.studentsCompleted}/{challenge.totalStudents}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(challenge.studentsCompleted / challenge.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Student Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Students</h3>
            <button 
              onClick={() => setShowClassLeaderboard(true)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Class Leaderboard
            </button>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">Level {student.level}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{student.points}</p>
                    <p className="text-sm text-gray-600">points</p>
                  </div>
                  <button
                    onClick={() => awardPoints(student.id, 10, 'Good participation')}
                    className="btn-primary text-xs py-1 px-2"
                  >
                    +10
                  </button>
                </div>
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
            <BookOpen className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Create Quiz</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Award className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Award Points</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <BarChart3 className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateChallengeForm
        isOpen={showCreateChallenge}
        onClose={() => setShowCreateChallenge(false)}
        onSubmit={(challengeData) => {
          console.log('Creating challenge:', challengeData);
          // In a real app, this would call the API to create the challenge
          setShowCreateChallenge(false);
        }}
      />

      <ClassLeaderboard
        school={user?.school || 'Demo School'}
        onClose={() => setShowClassLeaderboard(false)}
      />
    </div>
  );
};

export default TeacherDashboard;
