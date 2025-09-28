import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Upload, CheckCircle, Award, Users, MapPin, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const RealWorldEcoTasks = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskData, setTaskData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ecoTasks = [
    {
      id: 'cleanup_drive',
      title: 'Clean-Up Drive Leader',
      icon: '🧹',
      description: 'Organize or participate in a street, lake, or school cleanup',
      requirements: [
        'Take a group photo during the cleanup',
        'Count and report trash bags filled',
        'Upload proof of participation',
        'Share location and date of cleanup'
      ],
      points: 200,
      difficulty: 'Medium',
      estimatedTime: '2-4 hours',
      category: 'Community Action',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'recycling_station',
      title: 'Recycling Station Setup',
      icon: '♻️',
      description: 'Install labeled recycling bins in your classroom or hostel',
      requirements: [
        'Install labeled recycling bins',
        'Share setup photos',
        'Monitor usage over a week',
        'Report on bin usage statistics'
      ],
      points: 150,
      difficulty: 'Easy',
      estimatedTime: '1-2 hours',
      category: 'Infrastructure',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'water_leak_fix',
      title: 'Water Conservation Hero',
      icon: '💧',
      description: 'Identify leaking taps at home or public places and fix or report them',
      requirements: [
        'Identify leaking taps or water sources',
        'Either fix them yourself or report to authority',
        'Upload before/after photos',
        'Provide proof of action taken'
      ],
      points: 120,
      difficulty: 'Easy',
      estimatedTime: '30 minutes - 2 hours',
      category: 'Water Conservation',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    },
    {
      id: 'climate_presentation',
      title: 'Climate Change Educator',
      icon: '🎓',
      description: 'Educate your juniors or a local group on climate change',
      requirements: [
        'Prepare presentation on climate change',
        'Conduct workshop for juniors or local group',
        'Upload video/photo of presentation',
        'Share presentation slides'
      ],
      points: 250,
      difficulty: 'Hard',
      estimatedTime: '4-8 hours',
      category: 'Education',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setTaskData({
      location: '',
      date: '',
      description: '',
      photos: [],
      additionalInfo: ''
    });
    setSubmitted(false);
  };

  const handleSubmitTask = async () => {
    if (!selectedTask) return;

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/gamification/eco-task-certificate`, {
        taskType: selectedTask.id,
        taskData: {
          ...taskData,
          submittedAt: new Date(),
          studentName: user.name,
          school: user.school
        }
      });

      if (response.data.success) {
        setSubmitted(true);
        alert(`🎉 Task completed! You earned the "${response.data.data.badge.name}" certificate!`);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Error submitting task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌍 Real-World Eco Tasks
          </h1>
          <p className="text-xl text-green-100 mb-6">
            Make a real impact! Complete these tasks to earn certificates from your school.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 rounded-lg p-4">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">4</div>
              <div className="text-green-100">Eco Tasks</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">720</div>
              <div className="text-green-100">Total Points</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">∞</div>
              <div className="text-green-100">Impact Made</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ecoTasks.map((task) => (
            <div
              key={task.id}
              className={`${task.bgColor} ${task.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
              onClick={() => handleTaskSelect(task)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{task.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{task.points}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-4">{task.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {task.estimatedTime}
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {task.category}
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Requirements:</span>
                <ul className="mt-1 space-y-1">
                  {task.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                  {task.requirements.length > 2 && (
                    <li className="text-gray-500">+{task.requirements.length - 2} more...</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Task Details Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{selectedTask.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedTask.title}</h2>
                      <p className="text-gray-600">{selectedTask.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {!submitted ? (
                  <div className="space-y-6">
                    {/* Task Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Task Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Points:</span> {selectedTask.points}
                        </div>
                        <div>
                          <span className="font-medium">Difficulty:</span> {selectedTask.difficulty}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {selectedTask.estimatedTime}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {selectedTask.category}
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedTask.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Task Form */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800">Submit Your Task</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <MapPin className="h-4 w-4 inline ml-1" />
                        </label>
                        <input
                          type="text"
                          value={taskData.location}
                          onChange={(e) => setTaskData(prev => ({ ...prev, location: e.target.value }))}
                          className="input-field"
                          placeholder="Where did you complete this task?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date <Calendar className="h-4 w-4 inline ml-1" />
                        </label>
                        <input
                          type="date"
                          value={taskData.date}
                          onChange={(e) => setTaskData(prev => ({ ...prev, date: e.target.value }))}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={taskData.description}
                          onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                          className="input-field h-24"
                          placeholder="Describe what you did and the impact made..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Photos <Camera className="h-4 w-4 inline ml-1" />
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload photos or drag and drop</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Information
                        </label>
                        <textarea
                          value={taskData.additionalInfo}
                          onChange={(e) => setTaskData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                          className="input-field h-20"
                          placeholder="Any additional details, measurements, or impact data..."
                        />
                      </div>

                      <button
                        onClick={handleSubmitTask}
                        disabled={submitting || !taskData.location || !taskData.date}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          submitting || !taskData.location || !taskData.date
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : `bg-gradient-to-r ${selectedTask.color} text-white hover:shadow-lg transform hover:scale-105`
                        }`}
                      >
                        {submitting ? 'Submitting...' : `Submit Task (+${selectedTask.points} points)`}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Task Submitted Successfully!</h3>
                    <p className="text-gray-600 mb-4">
                      Your task has been submitted for review. You'll receive your certificate once approved.
                    </p>
                    <button
                      onClick={() => setSelectedTask(null)}
                      className="btn-primary"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Ready to Make a Real Impact?</h3>
          <p className="text-green-100 mb-6">
            Complete these real-world eco tasks to earn certificates from your school and make a positive environmental impact in your community!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📸</div>
              <div className="font-semibold">Document Everything</div>
              <div className="text-sm text-green-100">Take photos and videos as proof</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📋</div>
              <div className="font-semibold">Follow Requirements</div>
              <div className="text-sm text-green-100">Complete all task requirements</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold">Earn Certificates</div>
              <div className="text-sm text-green-100">Get official recognition from school</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealWorldEcoTasks;
