import { useAuth } from "../contexts/AuthContext";
import Link from 'next/link'

export default function Sidebar() {

  const { authState, logout } = useAuth();

  function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
      return logout();
    }
  }

  return (
    <aside className="w-64 h-full flex flex-col bg-[#0d0d0d] border-r border-white/5 relative z-20">
    
        <div className="h-full overflow-y-auto">
            <div className="p-6 md:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Greenlight</h2>
                <p className="text-white/40 text-sm">{ (authState?.webToken?.data.DisplayClaims?.xui?.[0] as any)?.gtg || 'Gamertag'}</p>
                <p className="text-white/70 text-sm"><Link href="#" onClick={handleLogout}>Logout</Link></p>
                </div>
            </div>

            <ul className="space-y-2 font-medium">
              <li>
                  <Link href="/home/" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                      <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
                      <span className="ms-3">Dashboard</span>
                  </Link>
              </li>
              <li>
                  <Link href="/consoles/" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                      <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
                      <span className="ms-3">My Consoles</span>
                  </Link>
              </li>
              <li>
                  <Link href="/settings/" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                      <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
                      <span className="ms-3">Settings</span>
                  </Link>
              </li>
            </ul>

        </div>

    </aside>
  )
}