import { Elysia, t } from "elysia";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: '/users' })
  .get("/", async () => {
    return await db.select().from(users);
  })
  .get("/:id", async ({ params: { id }, error }) => {
    const user = await db.select().from(users).where(eq(users.id, Number(id))).limit(1);
    if (!user.length) return error(404, "User not found");
    return user[0];
  })
  .post("/", async ({ body }) => {
    const [result] = await db.insert(users).values(body).$returningId();
    const newUser = await db.select().from(users).where(eq(users.id, result.id)).limit(1);
    return newUser[0];
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    })
  })
  .put("/:id", async ({ params: { id }, body, error }) => {
    await db.update(users).set(body).where(eq(users.id, Number(id)));
    const updatedUser = await db.select().from(users).where(eq(users.id, Number(id))).limit(1);
    if (!updatedUser.length) return error(404, "User not found");
    return updatedUser[0];
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String()),
    })
  })
  .delete("/:id", async ({ params: { id }, error }) => {
    const deletedUser = await db.select().from(users).where(eq(users.id, Number(id))).limit(1);
    if (!deletedUser.length) return error(404, "User not found");
    await db.delete(users).where(eq(users.id, Number(id)));
    return { message: "User deleted successfully" };
  });
