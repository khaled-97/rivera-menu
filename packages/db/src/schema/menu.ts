import { relations } from "drizzle-orm";
import { pgTable, text, integer, serial, timestamp, index } from "drizzle-orm/pg-core";

export const menuCategory = pgTable(
  "menu_category",
  {
    id: text("id").primaryKey(),
    nameAr: text("name_ar").notNull(),
    nameHe: text("name_he").notNull(),
    descriptionAr: text("description_ar"),
    descriptionHe: text("description_he"),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("menu_category_sort_order_idx").on(table.sortOrder)],
);

export const menuItem = pgTable(
  "menu_item",
  {
    id: serial("id").primaryKey(),
    categoryId: text("category_id")
      .notNull()
      .references(() => menuCategory.id, { onDelete: "cascade" }),
    nameAr: text("name_ar").notNull(),
    nameHe: text("name_he").notNull(),
    descriptionAr: text("description_ar"),
    descriptionHe: text("description_he"),
    price: integer("price").notNull(),
    image: text("image"),
    tags: text("tags").array(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("menu_item_category_id_idx").on(table.categoryId),
    index("menu_item_sort_order_idx").on(table.sortOrder),
  ],
);

export const menuCategoryRelations = relations(menuCategory, ({ many }) => ({
  items: many(menuItem),
}));

export const menuItemRelations = relations(menuItem, ({ one }) => ({
  category: one(menuCategory, {
    fields: [menuItem.categoryId],
    references: [menuCategory.id],
  }),
}));
