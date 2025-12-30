import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../redux/slices/userSlice';
import { UserPlus, Edit, Trash2, Search } from 'lucide-react';
import { getStatusColor } from '../utils/mockData';

const Users = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { users } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'active',
    avatar: '👤',
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({ ...formData, id: editingUser.id }));
    } else {
      dispatch(addUser(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      dispatch(deleteUser(id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'User',
      status: 'active',
      avatar: '👤',
    });
    setEditingUser(null);
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestion des Utilisateurs
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Gérez vos utilisateurs et leurs permissions
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus size={20} />
            Ajouter Utilisateur
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? 'glass' : 'glass-light'}`}>
          <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none flex-1"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className={`${darkMode ? 'glass' : 'glass-light'} rounded-2xl overflow-hidden hover-lift`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Utilisateur
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Rôle
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Statut
                </th>
                <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const statusStyle = getStatusColor(user.status);
                return (
                  <tr
                    key={user.id}
                    className={`border-b table-row ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                          {user.avatar}
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.email}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                        user.role === 'Manager' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ color: statusStyle.text, background: statusStyle.bg }}
                      >
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                          }`}
                        >
                          <Edit size={18} className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                          }`}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className={`${darkMode ? 'glass' : 'glass-light'} rounded-2xl p-6 w-full max-w-md modal-content-enter`}>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingUser ? 'Modifier Utilisateur' : 'Nouvel Utilisateur'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rôle
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  {editingUser ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn-secondary flex-1"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;