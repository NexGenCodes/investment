interface Investment {
  startDate: Date;
  duration: number;
  amount: number;
  returns: number;
}



export function generateDailyInvestmentValue(investment: Investment) {
  const startDate = new Date(investment.startDate);
  const today = new Date();
  const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const durationDays = investment.duration * 7;

  if (daysElapsed >= durationDays) return null; // Stop if investment ended

  const progress = daysElapsed / durationDays;
  const baseValue = investment.amount + (investment.returns - investment.amount) * progress;
  const fluctuation = (Math.random() - 0.5) * (baseValue * 0.05); // ±5% fluctuation

  return {
    date: today.toISOString().split("T")[0],
    amount: Math.round(baseValue + fluctuation),
  };
}


