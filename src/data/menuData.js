export const menuData = {
  restaurant: {
    name: "Rivera",
    tagline: "Italian Kitchen",
    description: "Modern Italian cuisine with a contemporary twist",
  },
  categories: [
    {
      id: "antipasti",
      name: "Antipasti",
      nameIt: "Antipasti",
      description: "Start your journey with our selection of Italian starters",
      items: [
        {
          id: 1,
          name: "Mezze Selection",
          nameIt: "Selezione di Antipasti",
          description: "Kalamata olives, sun-dried tomatoes, roasted garlic confit, capers, pickles, olive oil & balsamic",
          price: 45,
          image: "rivera 21325.JPG",
          tags: ["vegetarian", "shareable"],
        },
        {
          id: 2,
          name: "Crispy Chicken Wings",
          nameIt: "Ali di Pollo Croccanti",
          description: "Honey-glazed crispy wings served with butter lettuce",
          price: 38,
          image: "rivera 21827.JPG",
          tags: ["popular"],
        },
        {
          id: 3,
          name: "Tabbouleh napoli",
          nameIt: "Tabbouleh napoli",
          description: "Fresh herb tabbouleh with burrata, mixed nuts, and frisée lettuce",
          price: 42,
          image: "rivera1118.JPG",
          tags: ["vegetarian"],
        },
        {
          id: 4,
          name: "Eggplant Parmigiana",
          nameIt: "Melanzane alla Parmigiana",
          description: "Grilled eggplant medallions in creamy basil sauce with melted cheese",
          price: 48,
          image: "rivera 21805.JPG",
          tags: ["vegetarian", "chef's choice"],
        },
      ],
    },
    {
      id: "breads",
      name: "Breads & Focaccia",
      nameIt: "Pane e Focaccia",
      description: "Wood-fired artisan breads fresh from our oven",
      items: [
        {
          id: 5,
          name: "Rosemary Focaccia",
          nameIt: "Focaccia al Rosmarino",
          description: "Wood-fired focaccia with rosemary, sea salt, and olive oil",
          price: 28,
          image: "rivera 21354.JPG",
          tags: ["vegetarian"],
        },
        {
          id: 6,
          name: "Focaccia Spread",
          nameIt: "Focaccia con Accompagnamenti",
          description: "Assorted focaccia with sun-dried tomatoes, olives, garlic confit, and dipping oils",
          price: 58,
          image: "rivera 21347.JPG",
          tags: ["vegetarian", "shareable"],
        },
      ],
    },
    {
      id: "pizza",
      name: "Pizza & Calzone",
      nameIt: "Pizza e Calzone",
      description: "Neapolitan-style pizza from our wood-burning oven",
      items: [
        {
          id: 7,
          name: "Chicken Shawarma Calzone",
          nameIt: "Calzone Shawarma di Pollo",
          description: "Folded pizza filled with spiced chicken, peppers, onions, and cheese",
          price: 58,
          image: "rivera 21845.JPG",
          tags: ["popular"],
        },
        {
          id: 8,
          name: "Nutella Calzone",
          nameIt: "Calzone alla Nutella",
          description: "Sweet calzone filled with Nutella and strawberry gelato, dusted with powdered sugar",
          price: 42,
          image: "rivera 21288.JPG",
          tags: ["dessert", "sweet"],
        },
      ],
    },
    {
      id: "pasta",
      name: "Pasta",
      nameIt: "Pasta",
      description: "Fresh handmade pasta crafted daily",
      items: [
        {
          id: 9,
          name: "Pesto Tagliatelle",
          nameIt: "Tagliatelle al Pesto",
          description: "Spinach tagliatelle with basil pesto, grilled chicken, parmesan shavings",
          price: 62,
          image: "rivera 21266.JPG",
          tags: ["popular"],
        },
        {
          id: 10,
          name: "Pomodoro Tagliatelle",
          nameIt: "Tagliatelle al Pomodoro",
          description: "Tomato tagliatelle in rich tomato sauce with grilled chicken and fresh herbs",
          price: 62,
          image: "rivera 21270.JPG",
        },
        {
          id: 11,
          name: "Pelmeni",
          nameIt: "Pelmeni",
          description: "Traditional Russian dumplings in creamy parmesan sauce with fresh herbs",
          price: 55,
          image: "rivera 21312.JPG",
          tags: ["chef's choice"],
        },
      ],
    },
    {
      id: "seafood",
      name: "From the Sea",
      nameIt: "Dal Mare",
      description: "Fresh catches prepared with Mediterranean flair",
      items: [
        {
          id: 12,
          name: "Pan-Seared Sea Bass",
          nameIt: "Branzino in Padella",
          description: "Crispy sea bass with saffron cream sauce, cherry tomatoes, olives, and fried leeks",
          price: 95,
          image: "rivera 21263.JPG",
          tags: ["chef's choice"],
        },
        {
          id: 13,
          name: "Sea Bass with Rigatoni",
          nameIt: "Branzino con Rigatoni",
          description: "Grilled sea bass fillet on tomato cream rigatoni with mushrooms and green peas",
          price: 88,
          image: "rivera 21332.JPG",
        },
        {
          id: 14,
          name: "Salmon Gnocchi",
          nameIt: "Gnocchi con Salmone",
          description: "Pan-seared salmon on potato gnocchi in creamy sauce with spinach and green peas",
          price: 82,
          image: "rivera 21855.JPG",
          tags: ["popular"],
        },
        {
          id: 15,
          name: "Chicken Piccata",
          nameIt: "Pollo alla Piccata",
          description: "Tender chicken breast with capers, lemon butter, herbs, and balsamic reduction",
          price: 68,
          image: "rivera 21822.JPG",
        },
      ],
    },
    {
      id: "steaks",
      name: "From the Grill",
      nameIt: "Alla Griglia",
      description: "Premium cuts grilled to perfection",
      items: [
        {
          id: 16,
          name: "Ribeye Steak",
          nameIt: "Costata di Manzo",
          description: "Prime ribeye with roasted asparagus, herb potatoes, and fresh thyme",
          price: 145,
          image: "rivera 21260.JPG",
          tags: ["signature"],
        },
        {
          id: 17,
          name: "Wagyu Striploin",
          nameIt: "Controfiletto Wagyu",
          description: "A5 Wagyu striploin, medium-rare, with truffle mash and roasted carrots",
          price: 220,
          image: "rivera 21276.JPG",
          tags: ["premium", "chef's choice"],
        },
        {
          id: 18,
          name: "Filet Mignon",
          nameIt: "Filetto di Manzo",
          description: "Grilled filet with creamy mashed potatoes, asparagus, and sides",
          price: 165,
          image: "rivera 21319.JPG",
          tags: ["signature"],
        },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      nameIt: "Bevande",
      description: "Refreshing drinks and signature cocktails",
      items: [
        {
          id: 19,
          name: "Tropical Sunrise",
          nameIt: "Alba Tropicale",
          description: "Fresh mango, passion fruit, and orange juice blend",
          price: 28,
          image: "rivera 21251.JPG",
        },
        {
          id: 20,
          name: "Pineapple Mojito",
          nameIt: "Mojito all'Ananas",
          description: "Fresh pineapple, mint, lime, and sparkling water",
          price: 32,
          image: "rivera 21257.JPG",
          tags: ["refreshing"],
        },
      ],
    },
  ],
};

export const getCategory = (categoryId) => {
  return menuData.categories.find((cat) => cat.id === categoryId);
};

export const getItem = (itemId) => {
  for (const category of menuData.categories) {
    const item = category.items.find((item) => item.id === itemId);
    if (item) return { ...item, category: category.name };
  }
  return null;
};

export const getAllItems = () => {
  return menuData.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.name, categoryId: cat.id }))
  );
};

export const getPopularItems = () => {
  return getAllItems().filter((item) => item.tags?.includes("popular"));
};

export const getChefChoices = () => {
  return getAllItems().filter((item) => item.tags?.includes("chef's choice"));
};
