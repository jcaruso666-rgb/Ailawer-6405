import { createMiddleware } from "hono/factory";
import { createAuth } from "../auth";
import { createDb } from "../db";
import type { HonoContext } from "../types";

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const auth = createAuth(
      c.env, 
      c.req.raw.cf as IncomingRequestCfProperties,
      c.req.url
    );
    const db = createDb(c.env.D1);
    
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      c.set("db", db);
      return next();
    }
    
    c.set("user", session.user);
    c.set("session", session.session);
    c.set("db", db);
    return next();
  } catch (error) {
    console.error("[AUTH MIDDLEWARE] Error:", error);
    c.set("user", null);
    c.set("session", null);
    c.set("db", createDb(c.env.D1));
    return next();
  }
});

export const authenticatedOnly = createMiddleware<HonoContext>(
  async (c, next) => {
    const session = c.get("session");
    if (!session) {
      console.log("[AUTH] Unauthorized access attempt to:", c.req.url);
      return c.json(
        {
          message: "You are not authenticated",
        },
        401
      );
    } else {
      return next();
    }
  }
);

export const requireRole = (role: string) =>
  createMiddleware<HonoContext>(async (c, next) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session) {
      return c.json({ message: "You are not authenticated" }, 401);
    }

    if (!user || user.role !== role) {
      console.log("[AUTH] Insufficient role. Required:", role, "User role:", user?.role);
      return c.json({ message: "Forbidden: insufficient role" }, 403);
    }

    return next();
  });

export const requireAdmin = requireRole("admin");
