export type Entitlement = "wealth" | "growth" | "free";

export const ENTITLEMENT_LIMIT: Record<Entitlement, Record<string, number>> = {
  free: {
    "ai-transactions": 2,
    budgets: 3,
    wallets: 3
  },
  growth: {
    "ai-transactions": 10,
    budgets: 6,
    wallets: 6
  },
  wealth: {
    "ai-transactions": 25,
    budgets: Infinity,
    wallets: Infinity
  }
};

export const listOfYears = [
  { id: 0, value: "2025" },
  { id: 1, value: "2024" },
  { id: 2, value: "2023" },
  { id: 3, value: "2022" },
  { id: 4, value: "2021" }
];

export const listOfMonths = [
  { id: 11, value: "December" },
  { id: 10, value: "November" },
  { id: 9, value: "October" },
  { id: 8, value: "September" },
  { id: 7, value: "August" },
  { id: 6, value: "July" },
  { id: 5, value: "June" },
  { id: 4, value: "May" },
  { id: 3, value: "April" },
  { id: 2, value: "March" },
  { id: 1, value: "February" },
  { id: 0, value: "January" }
];
