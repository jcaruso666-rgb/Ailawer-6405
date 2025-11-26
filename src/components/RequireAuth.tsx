export default function RequireAuth({ children }: { children: React.ReactNode }) {
  // Temporarily disabled auth check - allow all access
  return <>{children}</>;
}
