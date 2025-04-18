import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, TrendingUp, Activity, RefreshCw } from 'lucide-react';
import { useSocialData } from '../context/SocialDataContext';

const Layout: React.FC = () => {
  const { refreshData, loading } = useSocialData();

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
              <Activity className="mr-2" size={24} />
              SocialMeter
            </h1>
            <button
              onClick={handleRefresh}
              className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md text-white"
              disabled={loading}
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-1 overflow-x-auto">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
              >
                <BarChart3 size={18} className="mr-2" />
                <span>Top Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trending"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
              >
                <TrendingUp size={18} className="mr-2" />
                <span>Trending Posts</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
              >
                <Activity size={18} className="mr-2" />
                <span>Feed</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading data...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 SocialMeter Analytics | Real-time social insights</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;