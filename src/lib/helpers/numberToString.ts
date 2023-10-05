import { type RefinementCtx, ZodIssueCode, NEVER } from 'zod';

export function numberToString(val: string, ctx: RefinementCtx) {
  if (val === '') return null;

  const parsed = parseInt(val);

  if (isNaN(parsed)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Not a number.',
    });

    return NEVER;
  }

  return parsed;
}
