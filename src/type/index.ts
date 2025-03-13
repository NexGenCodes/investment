export interface StockData {
    symbol: string;
    lastPrice: number;
    change: number;
    marketCap: string;
    volume: string;
    lastSevenDays: number[];
  }
  
  export interface PortfolioData {
    symbol: string;
    shares: number;
    value: number;
    change: number;
  }
  
  export interface WatchlistItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }