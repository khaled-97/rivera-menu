import { db } from "@riveraitalian/db";
import { menuCategory, menuItem } from "@riveraitalian/db/schema/menu";
import { eq, asc } from "drizzle-orm";
import z from "zod";

import { publicProcedure, protectedProcedure } from "../index";

const menuItemSchema = z.object({
  categoryId: z.string(),
  nameAr: z.string().min(1),
  nameHe: z.string(),
  descriptionAr: z.string().optional(),
  descriptionHe: z.string().optional(),
  price: z.number().min(0),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const categorySchema = z.object({
  id: z.string().min(1),
  nameAr: z.string().min(1),
  nameHe: z.string(),
  descriptionAr: z.string().optional(),
  descriptionHe: z.string().optional(),
});

export const menuRouter = {
  getAll: publicProcedure.handler(async () => {
    const categories = await db.query.menuCategory.findMany({
      orderBy: [asc(menuCategory.sortOrder)],
      with: {
        items: {
          orderBy: [asc(menuItem.sortOrder)],
        },
      },
    });

    return {
      restaurant: {
        name: "Rivera",
        nameAr: "ריברה",
        nameHe: "ריברה",
        tagline: "Italian Kitchen",
        taglineAr: "مطبخ إيطالي",
        taglineHe: "מטבח איטלקי",
      },
      categories: categories.map((cat) => ({
        id: cat.id,
        nameAr: cat.nameAr,
        nameHe: cat.nameHe,
        descriptionAr: cat.descriptionAr ?? undefined,
        descriptionHe: cat.descriptionHe ?? undefined,
        items: cat.items.map((item) => ({
          id: item.id,
          nameAr: item.nameAr,
          nameHe: item.nameHe,
          descriptionAr: item.descriptionAr ?? undefined,
          descriptionHe: item.descriptionHe ?? undefined,
          price: item.price,
          image: item.image ?? "",
          tags: item.tags ?? undefined,
        })),
      })),
    };
  }),

  createItem: publicProcedure
    .input(menuItemSchema)
    .handler(async ({ input }) => {
      const maxOrder = await db
        .select({ sortOrder: menuItem.sortOrder })
        .from(menuItem)
        .where(eq(menuItem.categoryId, input.categoryId))
        .orderBy(menuItem.sortOrder)
        .limit(1);

      const newOrder = maxOrder.length > 0 ? maxOrder[0].sortOrder + 1 : 0;

      const [newItem] = await db
        .insert(menuItem)
        .values({
          categoryId: input.categoryId,
          nameAr: input.nameAr,
          nameHe: input.nameHe,
          descriptionAr: input.descriptionAr,
          descriptionHe: input.descriptionHe,
          price: input.price,
          image: input.image || null,
          tags: input.tags || [],
          sortOrder: newOrder,
        })
        .returning();

      return newItem;
    }),

  updateItem: publicProcedure
    .input(
      z.object({
        id: z.number(),
        categoryId: z.string(),
        nameAr: z.string().min(1),
        nameHe: z.string(),
        descriptionAr: z.string().optional(),
        descriptionHe: z.string().optional(),
        price: z.number().min(0),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .handler(async ({ input }) => {
      const [updatedItem] = await db
        .update(menuItem)
        .set({
          categoryId: input.categoryId,
          nameAr: input.nameAr,
          nameHe: input.nameHe,
          descriptionAr: input.descriptionAr,
          descriptionHe: input.descriptionHe,
          price: input.price,
          image: input.image || null,
          tags: input.tags || [],
        })
        .where(eq(menuItem.id, input.id))
        .returning();

      return updatedItem;
    }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      await db.delete(menuItem).where(eq(menuItem.id, input.id));
      return { success: true };
    }),

  createCategory: publicProcedure
    .input(categorySchema)
    .handler(async ({ input }) => {
      const maxOrder = await db
        .select({ sortOrder: menuCategory.sortOrder })
        .from(menuCategory)
        .orderBy(menuCategory.sortOrder)
        .limit(1);

      const newOrder = maxOrder.length > 0 ? maxOrder[0].sortOrder + 1 : 0;

      const [newCategory] = await db
        .insert(menuCategory)
        .values({
          id: input.id,
          nameAr: input.nameAr,
          nameHe: input.nameHe,
          descriptionAr: input.descriptionAr,
          descriptionHe: input.descriptionHe,
          sortOrder: newOrder,
        })
        .returning();

      return newCategory;
    }),

  updateCategory: publicProcedure
    .input(categorySchema)
    .handler(async ({ input }) => {
      const [updatedCategory] = await db
        .update(menuCategory)
        .set({
          nameAr: input.nameAr,
          nameHe: input.nameHe,
          descriptionAr: input.descriptionAr,
          descriptionHe: input.descriptionHe,
        })
        .where(eq(menuCategory.id, input.id))
        .returning();

      return updatedCategory;
    }),

  deleteCategory: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      await db.delete(menuCategory).where(eq(menuCategory.id, input.id));
      return { success: true };
    }),

  importData: publicProcedure
    .input(
      z.object({
        categories: z.array(
          z.object({
            id: z.string(),
            nameAr: z.string(),
            nameHe: z.string(),
            descriptionAr: z.string().optional(),
            descriptionHe: z.string().optional(),
            items: z.array(
              z.object({
                id: z.number().optional(),
                nameAr: z.string(),
                nameHe: z.string(),
                descriptionAr: z.string().optional(),
                descriptionHe: z.string().optional(),
                price: z.number(),
                image: z.string().optional(),
                tags: z.array(z.string()).optional(),
              })
            ),
          })
        ),
      })
    )
    .handler(async ({ input }) => {
      await db.delete(menuItem);
      await db.delete(menuCategory);

      for (let catIndex = 0; catIndex < input.categories.length; catIndex++) {
        const cat = input.categories[catIndex];
        await db.insert(menuCategory).values({
          id: cat.id,
          nameAr: cat.nameAr,
          nameHe: cat.nameHe,
          descriptionAr: cat.descriptionAr,
          descriptionHe: cat.descriptionHe,
          sortOrder: catIndex,
        });

        for (let itemIndex = 0; itemIndex < cat.items.length; itemIndex++) {
          const item = cat.items[itemIndex];
          await db.insert(menuItem).values({
            categoryId: cat.id,
            nameAr: item.nameAr,
            nameHe: item.nameHe,
            descriptionAr: item.descriptionAr,
            descriptionHe: item.descriptionHe,
            price: item.price,
            image: item.image || null,
            tags: item.tags || [],
            sortOrder: itemIndex,
          });
        }
      }

      return { success: true };
    }),
};
