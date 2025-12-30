import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'active', avatar: '👨‍💼' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'User', status: 'active', avatar: '👩‍💼' },
    { id: 3, name: 'Pierre Dubois', email: 'pierre@example.com', role: 'User', status: 'inactive', avatar: '👨‍🔧' },
    { id: 4, name: 'Sophie Laurent', email: 'sophie@example.com', role: 'Manager', status: 'active', avatar: '👩‍🎨' },
    { id: 5, name: 'Luc Bernard', email: 'luc@example.com', role: 'User', status: 'active', avatar: '👨‍🚀' },
  ],
  currentUser: {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    avatar: '👨‍💼',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        ...action.payload,
        id: state.users.length + 1,
      });
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Exporter les actions
export const { 
  addUser, 
  updateUser, 
  deleteUser, 
  setUsers, 
  setLoading, 
  setError 
} = userSlice.actions;

// Exporter le reducer par défaut
export default userSlice.reducer;