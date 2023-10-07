import { string } from 'zod';

type User = {
  id: string;
  username: string;
  recipes?: Recipe[];
  favorites?: Recipe[];
};

type Recipe = {
  id: string;
  title: string;
  prepTime?: string | number | null;
  cookTime?: string | number | null;
  authorId: string;
  favoritedById?: string[] | string | null;
  author: User;
  ingredientGroups: IngredientGroup[];
  procedureGroups: ProcedureGroup[];
  notes?: Note[];
  tags?: Tag[];
};

type IngredientGroup = {
  // belongs to recipe
  groupTitle: string;
  description?: string | null;
  ingredients: Ingredient[];
  notes?: Note[];
};

type Ingredient = {
  // belongs to ingredient group
  qty?: number | null;
  uom?: Unit | null | string;
  description: string;
  notes?: Note[];
};

type Unit =
  | 'OZ'
  | 'FLOZ'
  | 'LB'
  | 'G'
  | 'C'
  | 'TSP'
  | 'TBSP'
  | 'BUNCH'
  | 'CAN'
  | 'BAG'
  | 'CONTAINER'
  | 'OTHER';

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
  timer?: number | null; // in seconds
  notes?: Note[];
};

type Note = {
  description: string;
};

type Tag = {
  // belongs to recipe
  description: string;
  tagGroup?: string;
};

type Reference = {
  // belongs to recipe
  type: 'original' | 'related';
  url?: string;
  description?: string;
};
