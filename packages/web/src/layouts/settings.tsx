import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SettingsLayout(){

  return (
    <>
      <main className="container mx-auto flex flex-row max-w-full px-6 flex-grow pt-4">
        <aside className="md:min-w-64 p-8 main-w-32">
          <nav className="space-y-4">
            <Link to="/settings/about" data-nav data-nav-group="default" className="block px-4 py-2">About</Link>
            <Link to="/settings/general" data-nav data-nav-group="default" className="block px-4 py-2">General</Link>
            <Link to="/settings/streaming" data-nav data-nav-group="default" className="block px-4 py-2">Streaming</Link>
            <Link to="/settings/input" data-nav data-nav-group="default" className="block px-4 py-2">Input</Link>
            <Link to="/settings/audiovideo" data-nav data-nav-group="default" className="block px-4 py-2">Video & Audio</Link>
            <Link to="/settings/debug" data-nav data-nav-group="default" className="block px-4 py-2">Debug</Link>
          </nav>

        </aside>


        <section className="flex flex-col flex-grow px-6">
            <Outlet />
        </section>
      </main>
    </>
  );
}
