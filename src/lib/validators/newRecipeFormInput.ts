import z from 'zod';
import { numberToString } from '../helpers/numberToString';

const uomValues = [
  '',
  'OZ',
  'FLOZ',
  'LB',
  'G',
  'C',
  'TSP',
  'TBSP',
  'BUNCH',
  'CAN',
  'BAG',
  'CONTAINER',
  'OTHER',
] as const;

const newRecipeFormInputSchema = z.object({
  title: z.string().min(1, { message: 'Recipe must have a title.' }),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  ingredientGroups: z
    .object({
      groupTitle: z.string(),
      description: z.string().optional(),
      ingredients: z
        .object({
          // qty: z.number().positive().optional(),
          qty: z.string().transform(numberToString).optional(),
          uom: z.enum(uomValues).optional(),
          description: z
            .string()
            .min(1, { message: 'Description cannot be blank.' }),
        })
        .array()
        .nonempty({ message: 'Group must contain at least 1 ingredient.' }),
    })
    .array()
    .nonempty({ message: 'Must contain at least 1 set of ingredients.' }),
  procedureGroups: z
    .object({
      groupTitle: z.string(),
      description: z.string().optional(),
      procedureSteps: z
        .object({
          description: z
            .string()
            .min(1, { message: 'Description cannot be blank.' }),
          timer: z.number().positive().int().optional(),
        })
        .array(),
    })
    .array()
    .nonempty({ message: 'Must contain at least one set of steps.' }),
  tags: z
    .object({
      description: z.string(),
    })
    .array()
    .optional(),
});

export { newRecipeFormInputSchema, uomValues };
export type FormInputs = z.infer<typeof newRecipeFormInputSchema>;
