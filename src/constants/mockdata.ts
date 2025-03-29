const MockData = {
  totalHolding: 12304.11,
  return: 165.2,

  portfolioPerformance: Array.from({ length: 30 }, (_, i) => ({
    date: `2024-02-${i + 1}`,
    value: 10000 + Math.random() * 5000, // Keep as number
    formattedValue: `₦${(10000 + Math.random() * 5000).toLocaleString(
      "en-NG"
    )}`, 
  })),
};

export default MockData;
