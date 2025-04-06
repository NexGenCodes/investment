type RiskLevel = "Low" | "Medium" | "High";

export type InvestmentPlan = {
  name: string;
  duration: number;
  investment: number;
  returnAmount: number;
  riskLevel: RiskLevel;
  imageUrl: string;
  description: string;
};
