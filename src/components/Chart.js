import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ 
  type = 'line', 
  data, 
  dataKey, 
  title, 
  height = 300,
  color = '#8B5CF6',
  secondaryDataKey,
  secondaryColor = '#3B82F6',
}) => {
  const { darkMode } = useSelector((state) => state.theme);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${darkMode ? 'glass' : 'glass-light'} p-3 rounded-xl`}>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {entry.name}: <span style={{ color: entry.color }}>{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    const axisProps = {
      stroke: darkMode ? '#9CA3AF' : '#6B7280',
      style: { fontSize: '12px' },
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#gradient-${dataKey})`} 
            />
            {secondaryDataKey && (
              <Area 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={secondaryColor} 
                fillOpacity={0.3} 
                fill={secondaryColor} 
              />
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
            {secondaryDataKey && (
              <Bar dataKey={secondaryDataKey} fill={secondaryColor} radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
            {secondaryDataKey && (
              <Line 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={secondaryColor} 
                strokeWidth={3}
                dot={{ fill: secondaryColor, r: 4 }}
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <div className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}>
      {title && (
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;