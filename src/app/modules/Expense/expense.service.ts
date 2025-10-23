/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../shared/prisma';
import AppError from '../../helpers/AppError';
import status from 'http-status';
import { Expense } from '@prisma/client';
import { PrismaQueryBuilder } from '../../builders/PrismaQueryBuilder';

const createExpense = async (userId: string, payload: Expense) => {
  const { title, amount, category, type, note } = payload;

  const numericAmount = Number(amount);

  const isLarge = type === 'EXPENSE' && numericAmount > 5000;

  const expense = await prisma.expense.create({
    data: {
      title,
      amount: numericAmount,
      category,
      type,
      note,
      isLarge,
      user: { connect: { id: userId } },
    },
  });

  return expense;
};

const getExpenses = async (userId: string, filters: any = {}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    type,
    category,
    sortField,
    sortOrder,
  } = filters;

  const where: any = { userId };

  // Validate type
  if (type) {
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new AppError(status.BAD_REQUEST, 'Invalid type filter');
    }
    where.type = type;
  }

  // Filter by category
  if (category) {
    where.category = category;
  }

  const result = await PrismaQueryBuilder({
    model: prisma.expense,
    where,
    searchFields: ['title', 'note', 'category'],
    search,
    sortField,
    sortOrder,
    page: Number(page),
    limit: Number(limit),
  });

  return result;
};

const getExpenseById = async (expenseId: string, userId: string) => {
  const expense = await prisma.expense.findUnique({ where: { id: expenseId } });
  if (!expense || expense.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Expense not found');
  }
  if (expense.userId !== userId) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Unauthorized to access this expense',
    );
  }
  return expense;
};

const updateExpense = async (
  expenseId: string,
  userId: string,
  payload: Partial<Expense>,
) => {
  const existing = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (!existing || existing.isDeleted) {
    throw new AppError(status.NOT_ACCEPTABLE, 'Expense not found');
  }
  if (existing.userId !== userId) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Unauthorized to update this expense',
    );
  }

  const newAmount = payload.amount ?? existing.amount;
  const newType = payload.type ?? existing.type;

  const isLarge = newType === 'EXPENSE' && newAmount > 5000;

  return prisma.expense.update({
    where: { id: expenseId },
    data: {
      ...payload,
      isLarge,
    },
  });
};

const softDeleteExpense = async (expenseId: string, userId: string) => {
  const existing = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (!existing || existing.isDeleted) {
    throw new AppError(status.NOT_ACCEPTABLE, 'Expense not found');
  }
  if (existing.userId !== userId) {
    throw new AppError(
      status.UNAUTHORIZED,
      'Unauthorized to delete this expense',
    );
  }

  return prisma.expense.update({
    where: { id: expenseId },
    data: { isDeleted: true },
  });
};

const getSummary = async (userId: string) => {
  const incomes = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: { userId, type: 'INCOME', isDeleted: false },
  });

  const expenses = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: { userId, type: 'EXPENSE', isDeleted: false },
  });

  const totalIncome = incomes._sum.amount ?? 0;
  const totalExpense = expenses._sum.amount ?? 0;
  const balance = totalIncome - totalExpense;
  const balanceStatus = totalExpense > totalIncome ? 'Negative' : 'Positive';

  return { totalIncome, totalExpense, balance, balanceStatus };
};

export const ExpenseService = {
  createExpense,
  getExpenses,
  updateExpense,
  softDeleteExpense,
  getSummary,
  getExpenseById,
};
