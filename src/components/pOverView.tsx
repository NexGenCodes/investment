
const portfolioOverview = [
  {
    symbol: "Solar Panel Frame",
    lastPrice: 535.0,
    change: -3.45,
    marketCap: "₦548.6B",
    volume: "₦7.9B",
  },
  {
    symbol: "Energy Storage Battery",
    lastPrice: 322.0,
    change: 1.44,
    marketCap: "₦548.6B",
    volume: "₦7.9B",
  },
];

export default function PortfolioOverView() {
  return (
    <div className="lg:col-span-2 w-full">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md">
        <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
          Portfolio Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="text-gray-400 text-sm sm:text-base">
                <th className="text-left pb-2 sm:pb-4 px-2 sm:px-4">
                  Solar Project
                </th>
                <th className="text-right pb-2 sm:pb-4 px-2 sm:px-4">
                  Last Price
                </th>
                <th className="text-right pb-2 sm:pb-4 px-2 sm:px-4">
                  Change %
                </th>
                <th className="text-right pb-2 sm:pb-4 px-2 sm:px-4">
                  Market Cap
                </th>
                <th className="text-right pb-2 sm:pb-4 px-2 sm:px-4">Volume</th>
              </tr>
            </thead>
            <tbody>
              {portfolioOverview.map((stock) => (
                <tr key={stock.symbol} className="border-t border-gray-700">
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-white">
                    {stock.symbol}
                  </td>
                  <td className="text-right px-2 sm:px-4 text-white">
                    ₦{stock.lastPrice.toLocaleString("en-NG")}
                  </td>
                  <td
                    className={`text-right px-2 sm:px-4 ${
                      stock.change > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </td>
                  <td className="text-right px-2 sm:px-4 text-gray-300">
                    {stock.marketCap}
                  </td>
                  <td className="text-right px-2 sm:px-4 text-gray-300">
                    {stock.volume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
