const { addIncome, getIncome, deleteIncome } = require('../controllers/income')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const fetchUser = require('../controllers/fetchUser');

const router = require('express').Router()

router.post('/add-income', fetchUser, addIncome)
    .get('/get-incomes',fetchUser, getIncome)
    .delete('/delete-income/:id',fetchUser, deleteIncome)

    .post('/add-expense',fetchUser, addExpense)
    .get('/get-expenses',fetchUser, getExpense)
    .delete('/delete-expense/:id',fetchUser, deleteExpense)

module.exports = router