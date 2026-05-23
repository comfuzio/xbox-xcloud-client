import React from 'react'

import { useAuth } from '../contexts/AuthContext'
import AuthHome from './auth/home'

export default function App({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      {! isAuthenticated ? <AuthHome /> : children}
    </React.Fragment>
  )
}
