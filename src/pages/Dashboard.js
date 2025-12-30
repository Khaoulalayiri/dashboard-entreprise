import React from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { formatCurrency, formatNumber, getStatusColor } from '../utils/mockData';

const Dashboard = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const { stats, salesData, orders } = useSelector((state) => state.data);

  const statsCards = [
    {
      title: 'Revenue Total',
      value: formatCurrency(stats.revenue),
      change: '+12.5%',
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Commandes',
      value: formatNumber(stats.orders),
      change: '+8.2%',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Utilisateurs',
      value: formatNumber(stats.users),
      change: '+15.3%',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Produits',
      value: formatNumber(stats.products),
      change: '+3.1%',
      icon: Package,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Tableau de Bord
        </h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Bienvenue sur votre dashboard administrateur
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            gradient={stat.gradient}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart
          type="area"
          data={salesData}
          dataKey="revenue"
          title="Revenue & Commandes"
          secondaryDataKey="orders"
          color="#8B5CF6"
          secondaryColor="#3B82F6"
        />

        <Chart
          type="bar"
          data={salesData}
          dataKey="profit"
          title="Profit Mensuel"
          color="#10B981"
        />
      </div>

      {/* Recent Orders */}
      <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift animate-slide-up`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Commandes Récentes
          </h3>
          <button className="text-purple-500 hover:text-purple-400 font-medium text-sm">
            Voir tout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ID
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Client
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Montant
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Date
                </th>
                <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <tr
                    key={order.id}
                    className={`border-b table-row ${
                      darkMode ? 'border-gray-800' : 'border-gray-100'
                    }`}
                  >
                    <td className={`py-4 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.id}
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.customer}
                    </td>
                    <td className={`py-4 px-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(order.amount)}
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          color: statusStyle.text,
                          background: statusStyle.bg,
                        }}
                      >
                        {order.status === 'completed'
                          ? 'Complété'
                          : order.status === 'pending'
                          ? 'En attente'
                          : 'Expédition'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;