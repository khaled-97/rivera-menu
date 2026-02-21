/**
 * Maps menu category IDs to the folder name under public/pictures/
 * Used by the menu display and the upload API.
 */
export const categoryToFolder: Record<string, string> = {
  antipasti: "antipasti",
  sandwiches: "sandwiches",
  drinks: "drinks",
  coupons: "green_garden",
  "special-offers": "macaroni",
  pasta: "macaroni",
  desserts: "deserts",
  kids: "kids",
  meat: "meat",
  fish: "fish",
  pizza: "pizza",
  salads: "green_garden",
};

export function getPictureFolder(categoryId: string): string {
  return categoryToFolder[categoryId] ?? "multi_plates";
}
