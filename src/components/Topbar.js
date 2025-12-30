import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, toggleSidebar } from '../redux/slices/themeSlice';
import { Bell, Search, Menu, Sun, Moon } from 'lucide-react';

const Topbar = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { notifications } = useSelector((state) => state.data);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`sticky top-0 z-40 px-6 py-4 ${darkMode ? 'glass' : 'glass-light'}`}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
            }`}
          >
            <Menu size={24} />
          </button>

          {/* Search Bar */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            darkMode ? 'bg-white/5' : 'bg-black/5'
          }`}>
            <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            <input
              type="text"
              placeholder="Rechercher..."
              className={`bg-transparent border-none outline-none w-64 ${
                darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-lg transition-all hover-lift ${
                darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
              }`}
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="notification-badge animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden animate-slide-up ${
                darkMode ? 'glass' : 'glass-light'
              }`}>
                <div className="p-4 border-b border-white/10">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b transition-colors ${
                        darkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'
                      } ${!notif.read ? 'bg-purple-500/10' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          !notif.read ? 'bg-purple-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {notif.message}
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Il y a {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-white/10">
                  <button className="text-sm text-purple-500 font-medium hover:text-purple-400">
                    Voir tout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover-lift flex items-center gap-2"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden sm:inline">
              {darkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg cursor-pointer hover-scale">
            👨‍💼
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;