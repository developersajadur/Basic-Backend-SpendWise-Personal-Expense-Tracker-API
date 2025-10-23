import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ExpenseRoutes } from '../modules/Expense/expense.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/users/auth',
    route: AuthRoutes,
  },
  {
    path: '/expenses',
    route: ExpenseRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
