import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode, setPrimaryColor } from '../redux/slices/themeSlice';
import { Bell, Lock, User, Palette } from 'lucide-react';

const Settings = () => {
  const dispatch = useDispatch();
  const { darkMode, primaryColor } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.users);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const colors = [
    { name: 'Purple', value: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Blue', value: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Green', value: 'green', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Orange', value: 'orange', gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Paramètres
        </h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Personnalisez votre expérience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-purple-500" />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Profil
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nom
              </label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
              />
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
              />
            </div>
            <button className="btn-primary w-full">
              Sauvegarder
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
          <div className="flex items-center gap-3 mb-6">
            <Palette size={24} className="text-purple-500" />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Apparence
            </h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Thème
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => dispatch(setDarkMode(true))}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    darkMode
                      ? 'border-purple-500 bg-slate-900'
                      : 'border-gray-300 bg-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-2">🌙</div>
                  <div className={darkMode ? 'text-white' : 'text-gray-400'}>Dark</div>
                </button>
                <button
                  onClick={() => dispatch(setDarkMode(false))}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    !darkMode
                      ? 'border-purple-500 bg-white'
                      : 'border-gray-700 bg-gray-100'
                  }`}
                >
                  <div className="text-2xl mb-2">☀️</div>
                  <div className={!darkMode ? 'text-gray-900' : 'text-gray-600'}>Light</div>
                </button>
              </div>
            </div>

            <div>
              <label className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Couleur Principale
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => dispatch(setPrimaryColor(color.value))}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${color.gradient} ${
                      primaryColor === color.value ? 'ring-4 ring-white/50' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-purple-500" />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h3>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notifications {key === 'email' ? 'Email' : key === 'push' ? 'Push' : 'SMS'}
                </span>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    value ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-purple-500" />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Sécurité
            </h3>
          </div>
          <div className="space-y-4">
            <button className="btn-secondary w-full text-left">
              Changer le mot de passe
            </button>
            <button className="btn-secondary w-full text-left">
              Authentification à deux facteurs
            </button>
            <button className="btn-secondary w-full text-left text-red-500">
              Déconnecter tous les appareils
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;