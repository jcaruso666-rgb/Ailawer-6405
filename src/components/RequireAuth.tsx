import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authClient } from "@/lib/auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let checkCount = 0;
    const maxChecks = 3;
    
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!mounted) return;
        
        const isAuth = !!data?.session;
        setAuthenticated(isAuth);
        
        if (!isAuth && checkCount < maxChecks) {
          checkCount++;
          setTimeout(checkAuth, 300);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (!mounted) return;
        setAuthenticated(false);
        
        if (checkCount < maxChecks) {
          checkCount++;
          setTimeout(checkAuth, 300);
        } else {
          setLoading(false);
        }
      }
    };

    checkAuth();
    
    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  if (!authenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
}
