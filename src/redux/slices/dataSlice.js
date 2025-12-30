import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: {
    revenue: 28500,
    orders: 1754,
    users: 12483,
    products: 847,
  },
  salesData: [
    { name: 'Jan', revenue: 4000, orders: 240, profit: 2400 },
    { name: 'Fév', revenue: 3000, orders: 198, profit: 1800 },
    { name: 'Mar', revenue: 5000, orders: 300, profit: 3000 },
    { name: 'Avr', revenue: 4500, orders: 278, profit: 2700 },
    { name: 'Mai', revenue: 6000, orders: 389, profit: 3600 },
    { name: 'Jun', revenue: 5500, orders: 349, profit: 3300 },
  ],
  products: [
    { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', price: 1299, stock: 45, status: 'in_stock' },
    { id: 2, name: 'MacBook Pro M3', category: 'Electronics', price: 2499, stock: 23, status: 'in_stock' },
    { id: 3, name: 'Nike Air Max', category: 'Clothing', price: 189, stock: 0, status: 'out_of_stock' },
    { id: 4, name: 'Samsung Galaxy S24', category: 'Electronics', price: 999, stock: 67, status: 'in_stock' },
    { id: 5, name: 'Sony WH-1000XM5', category: 'Electronics', price: 399, stock: 12, status: 'low_stock' },
  ],
  orders: [
    { id: '#12345', customer: 'Jean Dupont', amount: 245, status: 'completed', date: '2025-01-15' },
    { id: '#12346', customer: 'Marie Martin', amount: 189, status: 'pending', date: '2025-01-14' },
    { id: '#12347', customer: 'Pierre Dubois', amount: 432, status: 'completed', date: '2025-01-13' },
    { id: '#12348', customer: 'Sophie Laurent', amount: 156, status: 'shipping', date: '2025-01-12' },
    { id: '#12349', customer: 'Luc Bernard', amount: 789, status: 'completed', date: '2025-01-11' },
  ],
  notifications: [
    { id: 1, type: 'success', message: 'Nouvelle commande reçue', time: '5 min', read: false },
    { id: 2, type: 'warning', message: 'Stock faible pour 3 produits', time: '1h', read: false },
    { id: 3, type: 'info', message: 'Nouveau utilisateur inscrit', time: '2h', read: true },
  ],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: state.products.length + 1,
      });
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
      }
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
});

// Exporter les actions
export const { 
  updateStats, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  addOrder,
  updateOrderStatus,
  markNotificationRead,
  addNotification,
} = dataSlice.actions;

// Exporter le reducer par défaut
export default dataSlice.reducer;