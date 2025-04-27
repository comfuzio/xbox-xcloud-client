import { Navbar } from "@/components/navbar";

import Authentication from "@/components/authentication";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="greenlight bg-background text-foreground">
      <div className="relative flex flex-col h-screen">
        <Authentication>
          <Navbar />
          <main className="container mx-auto max-w-full px-6 flex-grow pt-4">
            {children}
          </main>
        </Authentication>
      </div>
    </div>
  );
}
