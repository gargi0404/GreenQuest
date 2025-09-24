import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, Filter, Search } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const ClassLeaderboard = ({ school, onClose }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    grade: '',
    timeframe: 'all'
  });

  useEffect(() => {
    if (school) {
      fetchClassStudents();
    }
  }, [school, filters]);

  const fetchClassStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('school', school);
      params.append('role', 'student');
      if (filters.grade) params.append('grade', filters.grade);
      if (filters.timeframe) params.append('timeframe', filters.timeframe);

      const response = await axios.get(`${API_BASE_URL}/leaderboard?${params}`);
      setStudents(response.data.data.leaderboard);
    } catch (error) {
      console.error('Error fetching class students:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-500" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gray-100 border-gray-300';
    if (rank === 3) return 'bg-orange-100 border-orange-300';
    return 'bg-white border-gray-200';
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
          <h2 className="text-xl font-bold text-gray-900">Class Leaderboard</h2>
          <p className="text-gray-600">{school} - Student Rankings</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.grade}
            onChange={(e) => setFilters(prev => ({ ...prev, grade: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="">All Grades</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          <select
            value={filters.timeframe}
            onChange={(e) => setFilters(prev => ({ ...prev, timeframe: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{students.length}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.points, 0) / students.length) : 0}
          </div>
          <div className="text-sm text-gray-600">Average Points</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {students.length > 0 ? students[0].points : 0}
          </div>
          <div className="text-sm text-gray-600">Highest Score</div>
        </div>
      </div>

      {/* Students List */}
      <div className="card">
        <div className="space-y-3">
          {students.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${getRankColor(student.rank)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(student.rank)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Level {student.level}</span>
                      {student.grade && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{student.grade}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{student.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600">points</div>
                <div className="flex items-center justify-end mt-1">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{student.badges} badges</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassLeaderboard;
