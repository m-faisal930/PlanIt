
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // import ThemeContext

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div
      className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleStatus(task._id, task.status)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                task.status === 'completed'
                  ? 'bg-green-500 border-green-500'
                  : isDark
                  ? 'border-gray-600 hover:border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.status === 'completed' && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <h3
              className={`text-lg font-medium ${
                task.status === 'completed'
                  ? 'text-gray-500 line-through'
                  : isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p
              className={`mt-2 text-sm ${
                task.status === 'completed'
                  ? 'text-gray-400'
                  : isDark
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center space-x-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
            <span
              className={`${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } text-xs`}
            >
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className={`${
              isDark
                ? 'text-blue-400 hover:text-blue-600'
                : 'text-blue-600 hover:text-blue-800'
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className={`${
              isDark
                ? 'text-red-400 hover:text-red-600'
                : 'text-red-600 hover:text-red-800'
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

