import { InvestmentPlan } from "@/types/investment";

const InvestmentPlans: InvestmentPlan[] = [
  {
    name: "Solar Panel",
    duration: 4,
    investment: 10000,
    returnAmount: 25000,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar.jpg",
    description:
      "Invest in the production of high-quality solar panel frames, the backbone of every solar system.",
  },
  {
    name: "Photoelectric Cell",
    duration: 6,
    investment: 30000,
    returnAmount: 50000,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar1.jpg",
    description:
      "Fund the production of photovoltaic cells, the heart of solar panels that convert sunlight into energy.",
  },
  {
    name: "Inverter System",
    duration: 8,
    investment: 60000,
    returnAmount: 80000,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar2.jpg",
    description:
      "Invest in solar inverters, the brains of the solar system that convert DC power to AC.",
  },
  {
    name: "Mounting Structure",
    duration: 12,
    investment: 90000,
    returnAmount: 120000,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar3.jpg",
    description:
      "Support the manufacturing of durable mounting structures that secure solar panels in place.",
  },
  {
    name: "Energy Storage Battery",
    duration: 14,
    investment: 150000,
    returnAmount: 200000,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar4.jpg",
    description:
      "Fund the production of advanced energy storage batteries, essential for storing solar power.",
  },
];

export default InvestmentPlans;
