import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const baseURL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'http://localhost:5173';

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient()],
})

export function useAuth() {
  // Temporarily return mock user so app is accessible
  return { 
    user: { 
      id: 'demo-user', 
      email: 'demo@ailawyer.pro', 
      name: 'Demo User' 
    }, 
    loading: false 
  };
}
