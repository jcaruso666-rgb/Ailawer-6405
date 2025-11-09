import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { useEffect, useState } from "react"

function getBaseURL() {
  if (typeof window === 'undefined') {
    return 'http://localhost:5173';
  }

  const envUrl = import.meta.env.VITE_BETTER_AUTH_URL;
  
  if (envUrl && envUrl !== 'http://localhost:5173') {
    console.log('[AUTH CLIENT] Using VITE_BETTER_AUTH_URL:', envUrl);
    return envUrl;
  }

  const origin = window.location.origin;
  console.log('[AUTH CLIENT] Using window.location.origin:', origin);
  return origin;
}

const baseURL = getBaseURL();
console.log('[AUTH CLIENT] Initializing with baseURL:', baseURL);

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: 'include',
    mode: 'cors',
    onRequest(context) {
      console.log('[AUTH CLIENT] Request:', context.method);
    },
    onSuccess(context) {
      console.log('[AUTH CLIENT] Success:', context.response.status);
    },
    onError(context) {
      console.error('[AUTH CLIENT] Error:', context.error);
      
      if (context.error instanceof TypeError) {
        if (context.error.message.includes('fetch') || context.error.message.includes('Failed to fetch')) {
          throw new Error(`Network error: Unable to connect to ${baseURL}. Please check your connection and ensure the server is running.`);
        }
      }
      
      throw context.error;
    }
  },
  plugins: [adminClient()],
})

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    (async () => {
      try {
        console.log('[AUTH] Fetching session...');
        const session = await authClient.getSession();
        console.log('[AUTH] Session result:', session?.data ? 'authenticated' : 'not authenticated');
        
        if (mounted) {
          setUser(session?.data?.user || null);
        }
      } catch (error) {
        console.error('[AUTH] Session fetch error:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    
    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
