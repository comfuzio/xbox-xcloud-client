import { Navbar } from "@/components/navbar";
import Authentication from "@/components/authentication";
import { Outlet } from "react-router-dom";
import { getStreamingToken } from "@/utils/tokenhelper";

// export default function DefaultLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
export default function DefaultLayout(){
  return (
    <div className="greenlight bg-background text-foreground">
      <div className="relative flex flex-col min-h-screen">
        <Authentication>
          <Navbar />

          { (getStreamingToken().token === '') ?
          <div className="border-b border-gray-900 bg-warning-300 px-4 py-2 text-gray-100">
            <p className="text-center font-medium">
              Xbox Cloud Gaming is currently experiencing issues. Streaming may not work as expected.
            </p>
          </div> : ''}

          <main className="container mx-auto max-w-full px-6 flex-grow pt-4">
            <Outlet />
          </main>
        </Authentication>
      </div>
    </div>
  );
}
