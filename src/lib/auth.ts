import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { useEffect, useState } from "react"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || window.location.origin,
  plugins: [adminClient()],
})

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await authClient.getSession();
        if (mounted) {
          setUser(session?.data?.user || null);
        }
      } catch (error) {
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
