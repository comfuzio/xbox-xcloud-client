import { useState } from 'react';

export function Menu() {
  const [filter, setFilter] = useState('');

  return (
    <>
        <div className="procedure-menu">
            <div className="procedure-list">

                <div key="auth" className="procedure-category">
                    <h3>Auth</h3>
                    <button
                        key="auth_login"
                        className="procedure-item"
                        onClick={() => { console.log('Auth Login clicked'); }}
                    >
                        <span className="procedure-name">auth</span>
                        <span className={`procedure-type query`}>auth</span>
                    </button>
                </div>

            </div>
        </div>

        <div className="procedure-menu">
            <div className="procedure-list">

                <div key="auth" className="procedure-category">
                    <h3>Auth</h3>
                    <button
                        key="auth_login"
                        className="procedure-item"
                        onClick={() => { console.log('Auth Login clicked'); }}
                    >
                        <span className="procedure-name">auth</span>
                        <span className={`procedure-type query`}>auth</span>
                    </button>
                </div>

            </div>
        </div>
    </>
  );
}
