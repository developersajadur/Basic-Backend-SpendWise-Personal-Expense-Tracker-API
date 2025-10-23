import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { tokenDecoder } from '../../helpers/tokenDecoder';
import { ExpenseService } from './expense.service';

// Create Expense
const createExpense = catchAsync(async (req, res) => {
  const decoded = tokenDecoder(req);
  const payload = req.body;

  const result = await ExpenseService.createExpense(decoded.id, payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Expense created successfully',
    data: result,
  });
});

//  Get All Expenses
const getAllExpenses = catchAsync(async (req, res) => {
  const decoded = tokenDecoder(req);
  const filters = req.query;

  const result = await ExpenseService.getExpenses(decoded.id, filters);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Expenses fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

// Get Expense by ID
const getExpenseById = catchAsync(async (req, res) => {
  const { expenseId } = req.params;
  const decoded = tokenDecoder(req);

  const result = await ExpenseService.getExpenseById(expenseId, decoded.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Expense fetched successfully',
    data: result,
  });
});

// Update Expense
const updateExpense = catchAsync(async (req, res) => {
  const { expenseId } = req.params;
  const payload = req.body;
  const decoded = tokenDecoder(req);

  const result = await ExpenseService.updateExpense(
    expenseId,
    decoded.id,
    payload,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Expense updated successfully',
    data: result,
  });
});

// Delete Expense
const deleteExpense = catchAsync(async (req, res) => {
  const { expenseId } = req.params;
  const decoded = tokenDecoder(req);

  await ExpenseService.softDeleteExpense(expenseId, decoded.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Expense deleted successfully',
    data: null,
  });
});

const getExpenseSummary = catchAsync(async (req, res) => {
  const decoded = tokenDecoder(req);

  const result = await ExpenseService.getSummary(decoded.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Expense summary fetched successfully',
    data: result,
  });
});

export const ExpenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
};
