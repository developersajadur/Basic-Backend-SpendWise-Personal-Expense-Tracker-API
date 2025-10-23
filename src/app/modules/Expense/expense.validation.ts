import { z } from 'zod';

const ExpenseTypeEnum = z.enum(['INCOME', 'EXPENSE']);

const createExpenseSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    amount: z.number().positive('Amount must be positive'),
    category: z.string().min(1, 'Category is required'),
    type: ExpenseTypeEnum,
    note: z.string().optional(),
  }),
});

const updateExpenseSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive').optional(),
    type: ExpenseTypeEnum.optional(),
    note: z.string().optional(),
  }),
});

export const ExpenseValidation = {
  createExpenseSchema,
  updateExpenseSchema,
};
