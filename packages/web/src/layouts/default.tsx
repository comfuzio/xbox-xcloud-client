import { Navbar } from "@/components/navbar";
import Authentication from "@/components/authentication";
import { Outlet } from "react-router-dom";
import { getStreamingToken } from "@/utils/tokenhelper";
import Announcement from "@/components/announcement";

export default function DefaultLayout(){
  console.log('token:', getStreamingToken().token)

  return (
    <div className="greenlight bg-background text-foreground">
      <div className="relative flex flex-col min-h-screen">
        <Authentication>
          <Navbar />
          <Announcement />

          <main className="container mx-auto max-w-full px-6 flex-grow pt-4">
            <Outlet />
          </main>
        </Authentication>
      </div>
    </div>
  );
}
