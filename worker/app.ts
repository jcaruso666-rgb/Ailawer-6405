import { Hono } from "hono";
import { cors } from "hono/cors";
import { authenticatedOnly, authMiddleware } from "./middleware/auth";
import { apiRoutes } from "./routes";
import type { HonoContext } from "./types";

const app = new Hono<HonoContext>()
  .use("*", cors({
    origin: (origin) => {
      if (!origin) return "*";
      
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://runable.cloud",
        "https://runable.com"
      ];
      
      if (allowedOrigins.includes(origin) || origin.includes(".e2b.app") || origin.includes(".workers.dev") || origin.includes(".pages.dev")) {
        console.log("[CORS] Allowing origin:", origin);
        return origin;
      }
      
      console.log("[CORS] Unknown origin, allowing with wildcard:", origin);
      return "*";
    },
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    exposeHeaders: ["Content-Length", "Content-Type"],
    maxAge: 86400,
  }))
  .onError((err, c) => {
    console.error("[WORKER ERROR]", err);
    console.error("[WORKER ERROR] Stack:", err.stack);
    return c.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred",
        details: err.message,
      },
      500
    );
  })
  .use("*", authMiddleware)
  .get("/ping", (c) => {
    console.log("[PING] Received ping request");
    return c.json({ 
      message: "pong", 
      timestamp: Date.now(),
      env: {
        hasD1: !!c.env.D1,
        hasBetterAuthSecret: !!c.env.BETTER_AUTH_SECRET,
        betterAuthUrl: c.env.VITE_BETTER_AUTH_URL || "not set"
      }
    });
  })
  .get("/api/health", (c) => {
    console.log("[HEALTH] Health check");
    return c.json({ 
      status: "ok", 
      timestamp: Date.now(),
      auth: {
        configured: !!c.env.BETTER_AUTH_SECRET,
        url: c.env.VITE_BETTER_AUTH_URL || "not set"
      }
    });
  })
  .get("/protected", authenticatedOnly, (c) =>
    c.json({ message: "ok", timestamp: Date.now() })
  )
  .get("/me", authenticatedOnly, (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "You are not authenticated" }, 401);
    }
    return c.json(user);
  })
  .route("/api", apiRoutes)
  .all("*", async (c) => {
    const url = new URL(c.req.url);
    const isHtmlRoute =
      c.req.method === "GET" &&
      (!url.pathname.includes(".") || url.pathname.endsWith("/"));

    if (isHtmlRoute) {
      const indexUrl = new URL("/index.html", url.origin);
      const req = new Request(indexUrl.toString(), c.req.raw);
      const resp = await c.env.ASSETS.fetch(req);
      const out = new Response(resp.body, resp);
      out.headers.set("Content-Type", "text/html; charset=utf-8");
      out.headers.delete("Content-Disposition");
      return out;
    }
    return c.env.ASSETS.fetch(c.req.raw);
  });

export type AppType = typeof apiRoutes;
export default app;
