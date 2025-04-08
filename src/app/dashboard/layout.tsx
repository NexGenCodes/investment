import DashboardNavbar from "@/components/navs/Dashnavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-backgroundStart dark:bg-backgroundEnd overflow-visible">
      <DashboardNavbar />
      <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-foreground mt-16">
        {children}
      </main>
    </div>
  );
}
