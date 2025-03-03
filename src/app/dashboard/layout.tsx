import Navbar from "@/components/Dashnavbar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-backgroundStart dark:bg-backgroundEnd">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-foreground">
          {children}
        </main>
      </div>
    </div>
  );
}