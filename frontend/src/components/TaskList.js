

import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Modal from './Modal';
import { useTasks } from '../hooks/useTasks';
import Celebration from './Celebration';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import RandomMotivationalText from './RandomMotivationalText';


const TaskList = () => {
  const { celeberate } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    date: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateTask = async (taskData) => {
    const result = await createTask(taskData);
    if (result.success) {
      setIsModalOpen(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    const result = await updateTask(editingTask._id, taskData);
    if (result.success) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTasks(newFilters);
  };

  const handleDateSelect = (date) => {
    const newFilters = { ...filters, date };
    setFilters(newFilters);
    fetchTasks(newFilters);
    setShowDatePicker(false);
  };

  const clearDateFilter = () => {
    const newFilters = { ...filters, date: null };
    setFilters(newFilters);
    fetchTasks(newFilters);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === 'all' || task.status === filters.status;
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    let matchesDate = true;
    if (filters.date) {
      const taskDate = new Date(task.dueDate || task.createdAt).toDateString();
      const filterDate = new Date(filters.date).toDateString();
      matchesDate = taskDate === filterDate;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-64 ${
          isDark ? 'bg-gray-800' : ''
        }`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
            isDark ? 'border-blue-400' : 'border-blue-600'
          }`}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center py-8 ${isDark ? 'bg-gray-800 text-white' : ''}`}
      >
        <p className={`${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
        <button
          onClick={() => fetchTasks()}
          className={`mt-4 px-4 py-2 rounded-md ${
            isDark
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${
        isDark ? 'bg-gray-900 text-white' : ''
      }`}
    >
      {celeberate && <Celebration />}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Enhanced Date Filter */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filters.date
                    ? isDark
                      ? 'bg-blue-700 text-white hover:bg-blue-600'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : isDark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    filters.date
                      ? isDark
                        ? 'text-white'
                        : 'text-blue-600'
                      : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {filters.date
                    ? format(new Date(filters.date), 'MMMM d, yyyy')
                    : 'Filter by date'}
                </span>
              </button>

              {filters.date && (
                <button
                  onClick={clearDateFilter}
                  className={`p-1.5 rounded-full transition-colors duration-200 ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                  title="Clear date filter"
                >
                  <svg
                    className={`w-4 h-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {showDatePicker && (
              <div
                className={`absolute z-10 mt-2 rounded-lg shadow-lg p-4 w-64 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3
                    className={`text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Select date
                  </h3>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className={
                      isDark
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-500'
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  type="date"
                  value={
                    filters.date
                      ? format(new Date(filters.date), 'yyyy-MM-dd')
                      : ''
                  }
                  onChange={(e) => handleDateSelect(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {filters.date && (
                  <button
                    onClick={clearDateFilter}
                    className={`mt-2 w-full py-1.5 text-sm rounded-md transition-colors duration-200 ${
                      isDark
                        ? 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    }`}
                  >
                    Clear date
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add this animated text component */}
        <div className="flex-1 px-4 mx-2 overflow-hidden hidden md:block">
          <RandomMotivationalText />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`text-white px-4 py-2 rounded-md flex items-center space-x-2 ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters */}
      <div
        className={`rounded-lg shadow-sm border p-4 mb-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) =>
                handleFilterChange({ ...filters, search: e.target.value })
              }
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 text-white'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
          </div>
          <div className="flex space-x-2">
            {['all', 'pending', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange({ ...filters, status })}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                  filters.status === status
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className={`p-4 rounded-lg shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-900' : 'bg-blue-100'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                Total Tasks
              </p>
              <p
                className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tasks.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-yellow-900' : 'bg-yellow-100'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                Pending
              </p>
              <p
                className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tasks.filter((task) => task.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg shadow-sm border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-green-900' : 'bg-green-100'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                Completed
              </p>
              <p
                className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tasks.filter((task) => task.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className={`text-center py-12 ${isDark ? 'bg-gray-900' : ''}`}>
            <svg
              className={`mx-auto h-12 w-12 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3
              className={`mt-2 text-sm font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              No tasks found
            </h3>
            <p
              className={`mt-1 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Get started by creating a new task.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={toggleTaskStatus}
              isDark={isDark}
            />
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        isDark={isDark}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCloseModal}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
};

export default TaskList;