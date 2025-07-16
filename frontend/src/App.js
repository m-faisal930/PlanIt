


import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskList from './components/TaskList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useTheme } from './context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import ZenEscape from './components/ZenEscape';
import "./App.css"; // Ensure global styles are imported

const AppContent = () => {
  const { user, logout, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return showLogin ? (
      <Login onToggle={() => setShowLogin(false)} />
    ) : (
      <Register onToggle={() => setShowLogin(true)} />
    );
  }

  return (
    <div
      className={`min-h-screen font-poppins relative overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden opacity-20 dark:opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      </div>

      <header
        className={`transition-colors duration-500 relative z-10 ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700 shadow-sm backdrop-blur-sm'
            : 'bg-white/80 border-gray-200 shadow-sm backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              {/* <BreathingExercise /> */}
              <h1
                className={`text-2xl font-bold transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                PlanIT
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="transition-all duration-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800" />
                )}
              </button>

              <span
                className={`text-sm transition-colors duration-500 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Welcome, {user.username}!
              </span>

              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>


      <main className="py-6 relative z-10">
        <TaskList />
      </main>

      {/* Add these styles to your global CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {/* <BreathingExercise /> */}
      {/* <BrainBreak /> */}
      <ZenEscape />

    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;