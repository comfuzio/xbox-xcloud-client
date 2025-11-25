import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Menu({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { isAuthenticated } = useAuth();


  return (
    <>
        <div className="procedure-menu">
            <div className="procedure-list">

                <div key="auth" className="procedure-category">
                    <h3>Auth</h3>
                    <button
                        key="auth_login"
                        className="procedure-item"
                        onClick={() => { setCurrentPage('auth'); }}
                    >
                        <span className="procedure-name">auth</span>
                        <span className={`procedure-type query`}>auth</span>
                    </button>
                </div>

            </div>
        </div>

        { isAuthenticated &&<div className="procedure-menu">
            <div className="procedure-list">

                <div key="auth" className="procedure-category">
                    <h3>Profile</h3>
                    <button
                        key="profile_get"
                        className="procedure-item"
                        onClick={() => { setCurrentPage('profile'); }}
                    >
                        <span className="procedure-name">profile_get_current</span>
                        <span className={`procedure-type query`}>Query</span>
                    </button>
                </div>

            </div>
        </div> }
    </>
  );
}
