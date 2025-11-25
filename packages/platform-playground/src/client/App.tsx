import { useState } from 'react';
import { Menu } from './components/Menu';

import { AuthPage } from './pages/Auth';

function App() {

  return (
    <>
      <header id="header">
        <h1>Greenlight Platform Playground</h1>
      </header>
      <div id="main-container">
        <div id="submenu">
          <Menu />
        </div>
        <div id="content">
          <AuthPage />
        </div>
      </div>
    </>
  );
}

export default App;
