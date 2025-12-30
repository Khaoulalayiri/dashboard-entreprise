import { useSelector } from 'react-redux';

const Card = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient = 'from-purple-500 to-pink-500',
  delay = 0 
}) => {
  const { darkMode } = useSelector((state) => state.theme);

  const changeColor = change?.startsWith('+') ? 'text-green-500' : 'text-red-500';

  return (
    <div
      className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift animate-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          {Icon && <Icon size={24} className="text-white" />}
        </div>
        {change && (
          <span className={`text-sm font-semibold ${changeColor}`}>
            {change}
          </span>
        )}
      </div>
      
      <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>
      
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {title}
      </p>
    </div>
  );
};

export default Card;