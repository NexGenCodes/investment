
const watchListData = [
  { symbol: "MS", name: "Mounting Structure", price: 323.55, change: 4.23 },
  { symbol: "SPF", name: "Solar Panel Frame", price: 178.15, change: -2.34 },
];

export default function WatchList() {
  return (
    <div className="w-full">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md">
        <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
          Watchlist
        </h3>
        <div className="space-y-4">
          {watchListData.map((item) => (
            <div
              key={item.symbol}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-900"
            >
              <div className="text-center sm:text-left">
                <p className="text-white font-medium">{item.symbol}</p>
                <p className="text-sm text-gray-400">{item.name}</p>
              </div>
              <div className="text-center sm:text-right mt-2 sm:mt-0">
                <p className="text-white text-lg sm:text-xl">
                  ₦{item.price.toLocaleString("en-NG")}
                </p>
                <p
                  className={`text-sm sm:text-base ${
                    item.change > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
