type Investment = {
  amount: number;
  returns: number;
};

export function generateDailyInvestmentValue(investment: Investment): number {
  const { amount, returns } = investment;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const seed = hashString(today + amount + returns); // daily unique seed

  const rng = seededRandom(seed);
  const baseValue = (amount + returns) / 2;
  const fluctuation = (rng() - 0.5) * baseValue * 0.1; // ±5% fluctuation

  return Math.round(baseValue + fluctuation);
}

// --- Helpers ---
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}
