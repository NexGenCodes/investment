// src/app/api/dashboard/route.ts

export async function GET() {
    return new Response(
      JSON.stringify({
        user: {
          name: "John Doe",
          balance: 5000,
          transactions: [
            { id: 1, amount: 200, type: 'Deposit', date: '2025-02-20' },
            { id: 2, amount: -150, type: 'Withdraw', date: '2025-02-19' },
            { id: 3, amount: 300, type: 'Deposit', date: '2025-02-18' },
          ],
        },
      }),
      { status: 200 }
    );
  }
  