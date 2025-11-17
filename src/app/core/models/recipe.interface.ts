export interface Recipe {
  id: number;
  productId: number; // Links to product
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
  ingredients: {
    en: string[];
    ar: string[];
  };
  instructions: {
    en: string[];
    ar: string[];
  };
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
}

