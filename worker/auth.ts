import { autumn } from "autumn-js/better-auth";
import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { admin } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

export const createAuth = (
  env: Cloudflare.Env,
  cf?: IncomingRequestCfProperties,
  requestUrl?: string
) => {
  const db = drizzle(env.D1, { schema, logger: false }) as any;

  let baseURL: string = env.VITE_BETTER_AUTH_URL || "http://localhost:5173";
  
  if (requestUrl) {
    const url = new URL(requestUrl);
    if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      baseURL = url.origin;
    }
  }

  console.log("[AUTH] Creating Better Auth instance with baseURL:", baseURL);
  console.log("[AUTH] Request URL:", requestUrl);
  console.log("[AUTH] CF properties:", cf ? "present" : "missing");

  const trustedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://runable.cloud",
    "https://runable.com",
  ];

  if (requestUrl) {
    const url = new URL(requestUrl);
    const origin = url.origin;
    if (!trustedOrigins.includes(origin)) {
      if (origin.includes(".workers.dev") || origin.includes(".pages.dev") || origin.includes(".e2b.app")) {
        trustedOrigins.push(origin);
      }
    }
  }

  console.log("[AUTH] Trusted origins:", trustedOrigins);

  return betterAuth({
    ...withCloudflare(
      {
        autoDetectIpAddress: true,
        geolocationTracking: true,
        cf: cf || {},
        d1: {
          db,
          options: {
            usePlural: true,
            debugLogs: false,
          },
        },
      },
      {
        trustedOrigins,
        emailAndPassword: {
          enabled: true,
          requireEmailVerification: false,
        },
        rateLimit: {
          enabled: false,
        },
        baseURL: baseURL as any,
        secret: env.BETTER_AUTH_SECRET || "dev-secret-change-in-production",
        plugins: [autumn(), admin()],
      }
    ),
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            console.log("[AUTH] Creating user:", user.email);
            console.log("[AUTH] Admin email:", env.ADMIN_EMAIL);

            const firstName = user.name?.split(" ")[0] || "";
            const lastName = user.name?.split(" ")[1] || "";

            if (user.email === env.ADMIN_EMAIL) {
              console.log("[AUTH] User is admin, setting role");
              return {
                data: {
                  ...user,
                  firstName,
                  lastName,
                  role: "admin",
                },
              };
            }
            
            return {
              data: {
                ...user,
                firstName,
                lastName,
                role: "user",
              },
            };
          },
        },
      },
    },
  });
};
