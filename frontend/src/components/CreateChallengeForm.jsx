import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const CreateChallengeForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'environmental',
    difficulty: 'beginner',
    points: 50,
    duration: 15,
    questions: []
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.options.every(opt => opt.trim())) {
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, { ...newQuestion }]
      }));
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    }
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.questions.length > 0) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        category: 'environmental',
        difficulty: 'beginner',
        points: 50,
        duration: 15,
        questions: []
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Challenge</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter challenge title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="environmental">Environmental</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="science">Science</option>
                  <option value="social">Social</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="input-field"
                  min="10"
                  max="500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="input-field"
                  min="5"
                  max="60"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
                placeholder="Describe what students will learn from this challenge"
                required
              />
            </div>

            {/* Questions Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
              
              {/* Existing Questions */}
              {formData.questions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{question.question}</p>
                  <div className="text-xs text-gray-500">
                    Correct Answer: {question.options[question.correctAnswer]}
                  </div>
                </div>
              ))}

              {/* Add New Question */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">Add New Question</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <textarea
                      value={newQuestion.question}
                      onChange={handleQuestionChange}
                      name="question"
                      className="input-field"
                      rows="2"
                      placeholder="Enter the question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer Options
                    </label>
                    <div className="space-y-2">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="correctAnswer"
                            value={index}
                            checked={newQuestion.correctAnswer === index}
                            onChange={handleQuestionChange}
                            className="text-primary-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="input-field flex-1"
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Explanation (Optional)
                    </label>
                    <textarea
                      value={newQuestion.explanation}
                      onChange={handleQuestionChange}
                      name="explanation"
                      className="input-field"
                      rows="2"
                      placeholder="Explain why this is the correct answer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formData.questions.length === 0}
                className="btn-primary"
              >
                Create Challenge ({formData.questions.length} questions)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
