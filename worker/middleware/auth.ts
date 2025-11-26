import { createMiddleware } from "hono/factory";
import { createAuth } from "../auth";
import { createDb } from "../db";
import type { HonoContext } from "../types";

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const db = createDb(c.env.D1);
    const auth = createAuth(c.env);
    
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    
    // If no session, set demo user for development
    if (!session?.user) {
      c.set("user", { id: "demo-user", email: "demo@ailawyer.pro", name: "Demo User" });
      c.set("session", { id: "demo-session" } as any);
    } else {
      c.set("user", session.user);
      c.set("session", session.session);
    }
    
    c.set("db", db);
  } catch (error) {
    console.error("[AUTH] Error:", error);
    // Set demo user on error too
    c.set("user", { id: "demo-user", email: "demo@ailawyer.pro", name: "Demo User" });
    c.set("session", { id: "demo-session" } as any);
    c.set("db", createDb(c.env.D1));
  }
  
  return next();
});

export const authenticatedOnly = createMiddleware<HonoContext>(
  async (c, next) => {
    // Always allow for demo
    return next();
  }
);

export const requireRole = (role: string) =>
  createMiddleware<HonoContext>(async (c, next) => {
    // Always allow for demo
    return next();
  });

export const requireAdmin = requireRole("admin");
