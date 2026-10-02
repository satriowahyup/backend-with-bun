import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { userRoutes } from "./modules/user";

const app = new Elysia()
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Backend API",
        version: "1.0.0"
      }
    }
  }))
  .onError(({ code, error }) => {
    console.error(`[Error] ${code}:`, error);
    return {
      success: false,
      error: error.message
    };
  })
  .use(userRoutes)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
