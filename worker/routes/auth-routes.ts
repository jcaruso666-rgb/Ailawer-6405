import { Hono } from "hono";
import type { HonoContext } from "../types";
import { createAuth } from "../auth";

export const authRoutes = new Hono<HonoContext>();

authRoutes.all("/*", async (c) => {
  const requestUrl = c.req.url;
  console.log("[AUTH ROUTE] Handling auth request:", c.req.method, requestUrl);
  console.log("[AUTH ROUTE] Headers:", Object.fromEntries(c.req.raw.headers.entries()));
  
  try {
    const auth = createAuth(
      c.env, 
      c.req.raw.cf as IncomingRequestCfProperties,
      requestUrl
    );
    
    const response = await auth.handler(c.req.raw);
    console.log("[AUTH ROUTE] Response status:", response.status);
    return response;
  } catch (error) {
    console.error("[AUTH ROUTE] Error:", error);
    return c.json({
      error: "Authentication error",
      message: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});