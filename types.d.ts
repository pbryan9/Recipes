type User = {
  id: string;
  username: string;
  recipes: Recipe[];
  favorites: Recipe[];
};

type Recipe = {
  id: string;
  title: string;
  author: User;
  prepTime?: number;
  cookTime?: number;
  ingredientGroups: IngredientGroup[];
  procedureGroups: ProcedureGroup[];
  notes: Note[];
  tags: Tag[];
  references: Reference[];
  notes?: Note[];
};

type IngredientGroup = {
  // belongs to recipe
  groupTitle: string;
  ingredients: Ingredient[];
  notes?: Note[];
};

type Ingredient = {
  // belongs to ingredient group
  qty: number;
  uom?: Unit;
  description: string;
  notes?: Note[];
};

type Unit = {
  // belongs to ingredient
  symbol: string;
  description: string;
  type: UnitType;
};

type UnitType = 'volume' | 'weight' | 'other';

type ProcedureGroup = {
  // belongs to recipe
  groupTitle: string;
  procedureSteps: ProcedureStep[];
  notes?: Note[];
};

type ProcedureStep = {
  // belongs to procedure group
  description: string;
  timer?: number; // in seconds
  notes?: Note[];
};

type Note = {
  description: string;
};

type Tag = {
  // belongs to recipe
  name: string;
  description?: string;
};

type Reference = {
  // belongs to recipe
  type: 'original' | 'related';
  url?: string;
  description?: string;
};
