export interface CandleData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  // Extended Mock Data with more candlesticks
  export const mockData: CandleData[] = [
    { date: new Date(2023, 0, 1), open: 100, high: 110, low: 95, close: 105, volume: 5000 },
    { date: new Date(2023, 0, 2), open: 106, high: 113, low: 102, close: 108, volume: 6000 },
    { date: new Date(2023, 0, 3), open: 107, high: 116, low: 104, close: 110, volume: 7000 },
    { date: new Date(2023, 0, 4), open: 109, high: 118, low: 108, close: 116, volume: 6500 },
    { date: new Date(2023, 0, 5), open: 115, high: 121, low: 110, close: 112, volume: 7200 },
  
    // Red Candlesticks (close < open)
    { date: new Date(2023, 0, 6), open: 113, high: 120, low: 109, close: 105, volume: 7300 },  // Red candle
    { date: new Date(2023, 0, 7), open: 121, high: 129, low: 118, close: 120, volume: 7500 },  // Red candle
    { date: new Date(2023, 0, 8), open: 126, high: 135, low: 124, close: 125, volume: 7100 },  // Red candle
    { date: new Date(2023, 0, 9), open: 129, high: 138, low: 127, close: 130, volume: 7400 },  // Red candle
    { date: new Date(2023, 0, 10), open: 137, high: 146, low: 133, close: 138, volume: 8000 },
    { date: new Date(2023, 0, 11), open: 143, high: 150, low: 140, close: 148, volume: 7600 },
  
    // More red candlesticks
    { date: new Date(2023, 0, 12), open: 147, high: 155, low: 144, close: 140, volume: 7800 },  // Red candle
    { date: new Date(2023, 0, 13), open: 152, high: 160, low: 149, close: 150, volume: 7900 },  // Red candle
    { date: new Date(2023, 0, 14), open: 157, high: 165, low: 153, close: 155, volume: 8000 },  // Red candle
    { date: new Date(2023, 0, 15), open: 164, high: 173, low: 160, close: 162, volume: 8100 },
    { date: new Date(2023, 0, 16), open: 170, high: 178, low: 167, close: 168, volume: 8200 },
    { date: new Date(2023, 0, 17), open: 176, high: 185, low: 172, close: 173, volume: 8300 },  // Red candle
    { date: new Date(2023, 0, 18), open: 179, high: 190, low: 175, close: 180, volume: 8500 },
    { date: new Date(2023, 0, 19), open: 184, high: 193, low: 180, close: 185, volume: 8600 },
    { date: new Date(2023, 0, 20), open: 189, high: 198, low: 185, close: 190, volume: 8700 },
    { date: new Date(2023, 0, 21), open: 196, high: 205, low: 190, close: 200, volume: 8800 },
  
    // More red candlesticks (close < open)
    { date: new Date(2023, 0, 22), open: 203, high: 210, low: 200, close: 202, volume: 8900 },  // Red candle
    { date: new Date(2023, 0, 23), open: 210, high: 215, low: 205, close: 210, volume: 9000 },  // Red candle
    { date: new Date(2023, 0, 24), open: 215, high: 220, low: 210, close: 213, volume: 9200 },  // Red candle
    { date: new Date(2023, 0, 25), open: 220, high: 225, low: 215, close: 222, volume: 9300 },

    { date: new Date(2024, 1, 1), open: 100, high: 110, low: 95, close: 105, volume: 5000 },
    { date: new Date(2023, 0, 1), open: 100, high: 110, low: 95, close: 105, volume: 5000 },
    { date: new Date(2023, 0, 2), open: 106, high: 113, low: 102, close: 108, volume: 6000 },
    { date: new Date(2023, 0, 3), open: 107, high: 116, low: 104, close: 110, volume: 7000 },
    { date: new Date(2023, 0, 4), open: 109, high: 118, low: 108, close: 116, volume: 6500 },
    { date: new Date(2023, 0, 5), open: 115, high: 121, low: 110, close: 112, volume: 7200 },
  
    // Red Candlesticks (close < open)
    { date: new Date(2023, 0, 6), open: 113, high: 120, low: 109, close: 105, volume: 7300 },  // Red candle
    { date: new Date(2023, 0, 7), open: 121, high: 129, low: 118, close: 120, volume: 7500 },  // Red candle
    { date: new Date(2023, 0, 8), open: 126, high: 135, low: 124, close: 125, volume: 7100 },  // Red candle
    { date: new Date(2023, 0, 9), open: 129, high: 138, low: 127, close: 130, volume: 7400 },  // Red candle
    { date: new Date(2023, 0, 10), open: 137, high: 146, low: 133, close: 138, volume: 8000 },
    { date: new Date(2023, 0, 11), open: 143, high: 150, low: 140, close: 148, volume: 7600 },
  
    // More red candlesticks
    { date: new Date(2023, 0, 12), open: 147, high: 155, low: 144, close: 140, volume: 7800 },  // Red candle
    { date: new Date(2023, 0, 13), open: 152, high: 160, low: 149, close: 150, volume: 7900 },  // Red candle
    { date: new Date(2023, 0, 14), open: 157, high: 165, low: 153, close: 155, volume: 8000 },  // Red candle
    { date: new Date(2023, 0, 15), open: 164, high: 173, low: 160, close: 162, volume: 8100 },
    { date: new Date(2023, 0, 16), open: 170, high: 178, low: 167, close: 168, volume: 8200 },
    { date: new Date(2023, 0, 17), open: 176, high: 185, low: 172, close: 173, volume: 8300 },  // Red candle
    { date: new Date(2023, 0, 18), open: 179, high: 190, low: 175, close: 180, volume: 8500 },
    { date: new Date(2023, 0, 19), open: 184, high: 193, low: 180, close: 185, volume: 8600 },
    { date: new Date(2023, 0, 20), open: 189, high: 198, low: 185, close: 190, volume: 8700 },
    { date: new Date(2023, 0, 21), open: 196, high: 205, low: 190, close: 200, volume: 8800 },
  
    // More red candlesticks (close < open)
    { date: new Date(2023, 0, 22), open: 203, high: 210, low: 200, close: 202, volume: 8900 },  // Red candle
    { date: new Date(2023, 0, 23), open: 210, high: 215, low: 205, close: 210, volume: 9000 },  // Red candle
    { date: new Date(2023, 0, 24), open: 215, high: 220, low: 210, close: 213, volume: 9200 },  // Red candle
    { date: new Date(2023, 0, 25), open: 220, high: 225, low: 215, close: 222, volume: 9300 },
    { date: new Date(2024, 1, 2), open: 106, high: 112, low: 102, close: 108, volume: 6000 },
    { date: new Date(2024, 1, 3), open: 107, high: 115, low: 104, close: 110, volume: 7000 },
    { date: new Date(2024, 1, 4), open: 109, high: 118, low: 108, close: 116, volume: 6500 },
    { date: new Date(2024, 1, 5), open: 115, high: 120, low: 110, close: 112, volume: 7200 },
    { date: new Date(2024, 1, 6), open: 113, high: 125, low: 110, close: 122, volume: 7300 },
    { date: new Date(2024, 1, 7), open: 121, high: 130, low: 118, close: 128, volume: 7500 },
    { date: new Date(2024, 1, 8), open: 126, high: 135, low: 124, close: 130, volume: 7100 },
    { date: new Date(2024, 1, 9), open: 129, high: 140, low: 127, close: 138, volume: 7400 },
    { date: new Date(2024, 1, 10), open: 137, high: 145, low: 133, close: 141, volume: 8000 },
    { date: new Date(2024, 1, 11), open: 143, high: 150, low: 140, close: 148, volume: 7600 },
    { date: new Date(2024, 1, 12), open: 147, high: 155, low: 144, close: 153, volume: 7800 },
    { date: new Date(2024, 1, 13), open: 152, high: 160, low: 149, close: 158, volume: 7900 },
    { date: new Date(2024, 1, 14), open: 157, high: 165, low: 153, close: 162, volume: 8000 },
    { date: new Date(2024, 1, 15), open: 164, high: 172, low: 160, close: 168, volume: 8100 },
    { date: new Date(2024, 1, 16), open: 170, high: 178, low: 167, close: 175, volume: 8200 },
    { date: new Date(2024, 1, 17), open: 176, high: 185, low: 172, close: 180, volume: 8300 },
    { date: new Date(2024, 1, 18), open: 179, high: 190, low: 175, close: 185, volume: 8500 },
    { date: new Date(2024, 1, 19), open: 184, high: 193, low: 180, close: 188, volume: 8600 },
    { date: new Date(2024, 1, 20), open: 189, high: 198, low: 185, close: 195, volume: 8700 },
    { date: new Date(2024, 1, 21), open: 196, high: 205, low: 190, close: 202, volume: 8800 },
    { date: new Date(2024, 1, 22), open: 203, high: 210, low: 200, close: 208, volume: 8900 },
    { date: new Date(2024, 1, 23), open: 210, high: 215, low: 205, close: 212, volume: 9000 },
    { date: new Date(2024, 1, 24), open: 210, high: 215, low: 100, close: 60, volume: 9000 },
    { date: new Date(2024, 1, 25), open: 100, high: 30, low: 160, close: 60, volume: 9000 },
      
      // Extended Mock Data with more candlesticks including red ones (close < open)

        { date: new Date(2024, 1, 26), open: 100, high: 110, low: 95, close: 105, volume: 5000 },
        { date: new Date(2024, 1, 27), open: 106, high: 112, low: 102, close: 108, volume: 6000 },
        { date: new Date(2024, 1, 28), open: 107, high: 115, low: 104, close: 110, volume: 7000 },
        { date: new Date(2024, 1, 29), open: 109, high: 118, low: 108, close: 116, volume: 6500 },
        { date: new Date(2024, 1, 30), open: 115, high: 120, low: 110, close: 112, volume: 7200 },
        
        // Red Candlesticks (close < open)
        { date: new Date(2024, 2, 1), open: 13, high: 102, low: 10, close: 5, volume: 7300 },  // Red candle
        { date: new Date(2024, 2, 2), open: 200, high: 13, low: 0, close: 12, volume: 7500 },  // Red candle
        { date: new Date(2024, 2, 3), open: 18, high: 15, low: 102, close: 25, volume: 7100 },  // Red candle
        { date: new Date(2024, 2, 4), open: 19, high: 140, low: 12, close: 133, volume: 7400 },  // Red candle
        { date: new Date(2024, 2, 5), open: 17, high: 150, low: 13, close: 38, volume: 400 },
        { date: new Date(2024, 2, 6), open: 143, high: 105, low: 100, close: 14, volume: 7600 },
        { date: new Date(2024, 2, 7), open: 143, high: 60, low: 210, close: 48, volume: 700 },
        { date: new Date(2024, 2, 8), open: 143, high: 150, low: 10, close: 19, volume: 7600 },
        { date: new Date(2024, 2, 9), open: 143, high: 10, low: 140, close: 88, volume: 600 },
        { date: new Date(2024, 2, 10), open: 143, high: 150, low: 10, close: 142, volume: 7600 },
        { date: new Date(2024, 2, 11), open: 143, high: 70, low: 250, close: 248, volume: 760 },
      
        // More red candlesticks
        { date: new Date(2024, 2, 12), open: 147, high: 155, low: 144, close: 140, volume: 7800 },  // Red candle
        { date: new Date(2024, 2, 13), open: 152, high: 160, low: 149, close: 150, volume: 7900 },  // Red candle
        { date: new Date(2024, 2, 14), open: 157, high: 165, low: 153, close: 155, volume: 8000 },  // Red candle
        { date: new Date(2024, 2, 15), open: 164, high: 172, low: 160, close: 162, volume: 8100 },
        { date: new Date(2024, 2, 16), open: 170, high: 178, low: 167, close: 168, volume: 8200 },
        { date: new Date(2024, 2, 17), open: 176, high: 185, low: 172, close: 173, volume: 8300 },  // Red candle
        { date: new Date(2024, 2, 18), open: 179, high: 190, low: 175, close: 180, volume: 8500 },
        { date: new Date(2024, 2, 19), open: 184, high: 193, low: 180, close: 185, volume: 8600 },
        { date: new Date(2024, 2, 20), open: 189, high: 198, low: 185, close: 190, volume: 8700 },
        { date: new Date(2024, 2, 21), open: 196, high: 205, low: 190, close: 200, volume: 8800 },
      
        // More red candlesticks (close < open)
        { date: new Date(2024, 2, 22), open: 203, high: 210, low: 200, close: 202, volume: 8900 },  // Red candle
        { date: new Date(2024, 2, 23), open: 210, high: 215, low: 205, close: 210, volume: 9000 },  // Red candle
        { date: new Date(2024, 2, 24), open: 215, high: 220, low: 210, close: 213, volume: 9200 },  // Red candle
        { date: new Date(2024, 2, 25), open: 220, high: 225, low: 215, close: 222, volume: 9300 },  
        { date: new Date(2024, 2, 26), open: 220, high: 225, low: 215, close: 222, volume: 9300 },  
        { date: new Date(2024, 2, 27), open: 220, high: 225, low: 215, close: 222, volume: 9300 },  
        { date: new Date(2024, 2, 28), open: 220, high: 225, low: 215, close: 222, volume: 9300 },  
      
  ];
  