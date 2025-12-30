import { useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { categoryData, trafficData, topProducts } from '../utils/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/mockData';

const Analytics = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const { salesData } = useSelector((state) => state.data);

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Analytics
        </h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Analysez vos données et performances
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart
          type="line"
          data={salesData}
          dataKey="revenue"
          secondaryDataKey="profit"
          title="Revenue vs Profit"
          color="#8B5CF6"
          secondaryColor="#10B981"
        />

        <Chart
          type="pie"
          data={categoryData}
          dataKey="value"
          title="Ventes par Catégorie"
        />

        <Chart
          type="bar"
          data={trafficData}
          dataKey="visits"
          secondaryDataKey="unique"
          title="Trafic Hebdomadaire"
          color="#3B82F6"
          secondaryColor="#F59E0B"
        />

        <Chart
          type="area"
          data={salesData}
          dataKey="orders"
          title="Commandes Mensuelles"
          color="#10B981"
        />
      </div>

      {/* Top Products */}
      <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Top Produits
        </h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className={`flex items-center justify-between p-4 rounded-xl ${
                darkMode ? 'bg-white/5' : 'bg-black/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                  'bg-gradient-to-br from-purple-500 to-pink-500'
                } text-white`}>
                  #{index + 1}
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.sales} ventes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(product.revenue)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {product.trend === 'up' ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;