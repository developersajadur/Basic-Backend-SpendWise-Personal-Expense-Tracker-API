import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { ExpenseValidation } from './expense.validation';
import { ExpenseController } from './expense.controller';

const router = Router();

router.post(
  '/create',
  auth(Role.user),
  validateRequest(ExpenseValidation.createExpenseSchema),
  ExpenseController.createExpense,
);

router.patch(
  '/update/:expenseId',
  auth(Role.user),
  validateRequest(ExpenseValidation.updateExpenseSchema),
  ExpenseController.updateExpense,
);

router.get('/', auth(Role.user), ExpenseController.getAllExpenses);

router.get(
  '/get/:expenseId',
  auth(Role.user),
  ExpenseController.getExpenseById,
);

router.get('/summary', auth(Role.user), ExpenseController.getExpenseSummary);

router.delete(
  '/delete/:expenseId',
  auth(Role.user),
  ExpenseController.deleteExpense,
);

export const ExpenseRoutes = router;
