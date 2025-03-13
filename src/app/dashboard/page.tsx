"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Search } from 'lucide-react';

const mockData = {
  totalHolding: 12304.11,
  return: 165.20,
  portfolioPerformance: Array.from({ length: 30 }, (_, i) => ({
    date: `2024-02-${i + 1}`,
    value: 10000 + Math.random() * 5000
  })),
  portfolioOverview: [
    { symbol: 'Solar Panel Frame', lastPrice: 535.00, change: -3.45, marketCap: '$548.6B', volume: '$7.9B' },
    { symbol: 'Energy Storage Battery', lastPrice: 322.00, change: 1.44, marketCap: '$548.6B', volume: '$7.9B' },
  ],
  watchlist: [
    { symbol: 'NEE', name: 'NextEra Energy', price: 323.55, change: 4.23 },
    { symbol: 'SPF', name: 'Solar Panel Frame', price: 178.15, change: -2.34 },
  ]
};

const Dashboard = () => {
  const userName = "Naya Rachel"; // Replace with dynamic user data if available

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto mt-14">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {userName}!</h1>
        <p className="text-gray-400">Here is an overview of your portfolio.</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ask stocks or anything"
              className="w-full bg-gray-800 text-gray-100 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 mb-2">Total Holding</p>
              <h2 className="text-4xl font-bold text-white">${mockData.totalHolding.toLocaleString()}</h2>
              <p className="text-green-400 flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +${mockData.return}
              </p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.portfolioPerformance}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Portfolio Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left pb-4">Solar Project</th>
                      <th className="text-right pb-4 pl-4">Last Price</th>
                      <th className="text-right pb-4 pl-4">Change %</th>
                      <th className="text-right pb-4 pl-4">Market Cap</th>
                      <th className="text-right pb-4 pl-4">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.portfolioOverview.map((stock) => (
                      <tr key={stock.symbol} className="border-t border-gray-700">
                        <td className="py-4 text-white">{stock.symbol}</td>
                        <td className="text-right text-white">${stock.lastPrice}</td>
                        <td className={`text-right ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </td>
                        <td className="text-right text-gray-300">{stock.marketCap}</td>
                        <td className="text-right text-gray-300">{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Watchlist</h3>
              <div className="space-y-4">
                {mockData.watchlist.map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{item.symbol}</p>
                      <p className="text-sm text-gray-400">{item.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">${item.price}</p>
                      <p className={`text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;