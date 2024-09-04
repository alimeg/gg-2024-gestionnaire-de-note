import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isArchived: boolean("is_archived").default(false),

});

export type Note = typeof notes.$inferSelect;
