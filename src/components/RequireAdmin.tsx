import { authClient } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let checkCount = 0;
    const maxChecks = 3;
    
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!mounted) return;
        
        const hasSession = !!data?.session;
        const userRole = data?.user?.role;
        const adminStatus = hasSession && userRole === "admin";
        
        setAuthenticated(hasSession);
        setIsAdmin(adminStatus);
        
        if (!hasSession && checkCount < maxChecks) {
          checkCount++;
          setTimeout(checkAuth, 300);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Admin auth check error:", error);
        if (!mounted) return;
        setAuthenticated(false);
        setIsAdmin(false);
        
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
      <div className="flex items-center justify-center min-h-screen">
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

  if (!isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
