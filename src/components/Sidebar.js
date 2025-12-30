import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOpen } from '../redux/slices/themeSlice';
import { Home, Users, ShoppingCart, BarChart3, Settings, X, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { darkMode, sidebarOpen } = useSelector((state) => state.theme);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Utilisateurs', path: '/users', icon: Users },
    { name: 'Produits', path: '/products', icon: ShoppingCart },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Paramètres', path: '/settings', icon: Settings },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!sidebarOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
        onClick={() => dispatch(setSidebarOpen(false))}
      />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 z-50 transition-all duration-300 animate-slide-in ${
        darkMode ? 'glass' : 'glass-light'
      }`}>
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">AdminPro</h1>
            </div>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 animate-slide-up stagger-${index + 1} ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover-glow'
                    : darkMode
                    ? 'text-gray-300 hover:bg-white/10'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className={`mt-auto pt-6 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg">
                👨‍💼
              </div>
              <div className="flex-1">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Admin User
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;