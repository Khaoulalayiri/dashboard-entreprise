// Mock Data pour le Dashboard

export const categoryData = [
  { name: 'Electronics', value: 400, color: '#8B5CF6' },
  { name: 'Clothing', value: 300, color: '#3B82F6' },
  { name: 'Food', value: 200, color: '#10B981' },
  { name: 'Books', value: 100, color: '#F59E0B' },
];

export const trafficData = [
  { name: 'Lun', visits: 4000, unique: 2400 },
  { name: 'Mar', visits: 3000, unique: 1398 },
  { name: 'Mer', visits: 2000, unique: 9800 },
  { name: 'Jeu', visits: 2780, unique: 3908 },
  { name: 'Ven', visits: 1890, unique: 4800 },
  { name: 'Sam', visits: 2390, unique: 3800 },
  { name: 'Dim', visits: 3490, unique: 4300 },
];

export const revenueByRegion = [
  { region: 'Europe', revenue: 45000, growth: 12.5 },
  { region: 'Amérique du Nord', revenue: 38000, growth: 8.3 },
  { region: 'Asie', revenue: 52000, growth: 15.7 },
  { region: 'Amérique du Sud', revenue: 28000, growth: 5.2 },
  { region: 'Afrique', revenue: 15000, growth: 18.9 },
];

export const topProducts = [
  { id: 1, name: 'iPhone 15 Pro', sales: 1234, revenue: 1603860, trend: 'up' },
  { id: 2, name: 'MacBook Pro M3', sales: 567, revenue: 1416633, trend: 'up' },
  { id: 3, name: 'Samsung Galaxy S24', sales: 890, revenue: 889110, trend: 'down' },
  { id: 4, name: 'AirPods Pro', sales: 2340, revenue: 584100, trend: 'up' },
  { id: 5, name: 'iPad Air', sales: 445, revenue: 311150, trend: 'up' },
];

export const activityLog = [
  { id: 1, user: 'Jean Dupont', action: 'Créé une commande', item: '#12345', time: '5 min', type: 'order' },
  { id: 2, user: 'Marie Martin', action: 'Modifié un produit', item: 'iPhone 15', time: '12 min', type: 'product' },
  { id: 3, user: 'Pierre Dubois', action: 'Ajouté un utilisateur', item: 'Sophie L.', time: '25 min', type: 'user' },
  { id: 4, user: 'Admin', action: 'Changé les paramètres', item: 'Sécurité', time: '1h', type: 'settings' },
  { id: 5, user: 'Luc Bernard', action: 'Exporté un rapport', item: 'Ventes Q1', time: '2h', type: 'report' },
];

export const getRandomColor = () => {
  const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateChartData = (days = 7) => {
  const data = [];
  const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  for (let i = 0; i < days; i++) {
    data.push({
      name: labels[i] || `Jour ${i + 1}`,
      revenue: Math.floor(Math.random() * 5000) + 2000,
      orders: Math.floor(Math.random() * 300) + 100,
      profit: Math.floor(Math.random() * 3000) + 1000,
    });
  }
  
  return data;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

export const getStatusColor = (status) => {
  const statusColors = {
    completed: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
    pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' },
    shipping: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
    cancelled: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
    active: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
    inactive: { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280' },
    in_stock: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
    low_stock: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' },
    out_of_stock: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
  };
  
  return statusColors[status] || { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280' };
};

const mockData = {
  categoryData,
  trafficData,
  revenueByRegion,
  topProducts,
  activityLog,
  getRandomColor,
  generateChartData,
  formatCurrency,
  formatNumber,
  getStatusColor,
};

export default mockData;