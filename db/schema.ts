import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlistEntries = sqliteTable("waitlist_entries", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  platform: text("platform").notNull().default("both"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
