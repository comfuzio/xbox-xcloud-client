import { useState } from 'react';
import { Menu } from './components/Menu';

import { AuthPage } from './pages/Auth';
import { ProfileGetPage } from './pages/ProfileGet';

function App() {

  const [currentpage, setCurrentpage] = useState('auth');

  const renderPage = () => {
    switch (currentpage) {
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfileGetPage />;
      default:
        return <AuthPage />;
    }
  };

  return (
    <>
      <header id="header">
        <h1>Greenlight Platform Playground</h1>
      </header>
      <div id="main-container">
        <div id="submenu">
          <Menu setCurrentPage={setCurrentpage} />
        </div>
        <div id="content">
          {renderPage()}
        </div>
      </div>
    </>
  );
}

export default App;
