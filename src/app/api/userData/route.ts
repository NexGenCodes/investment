// src/app/api/userData/route.ts (or pages/api/userData.ts if you're using Pages Router)
export async function GET() {
  return new Response(
    JSON.stringify({
      balance: 5000,
      transactions: [
        { id: 1, type: 'Deposit', amount: 1000, date: '2025-01-01' },
        { id: 2, type: 'Withdraw', amount: 500, date: '2025-01-15' },
        // Add more mock data here
      ]
    }),
    { status: 200 }
  );
}
