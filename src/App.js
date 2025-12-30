import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  const { darkMode, sidebarOpen } = useSelector((state) => state.theme);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950' : 'bg-gray-50'} transition-colors duration-300`}>
        <Sidebar />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          <Topbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;