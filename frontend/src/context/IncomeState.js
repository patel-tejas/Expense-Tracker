import React, { useState } from 'react'
import IncomeContext from './IncomeContext'

const IncomeState = (props) => {
  const host = "https://expense-tracker-backend-vatv.onrender.com/api/transaction/"
  const InitialExpense = []
  const InitialIncome = []

  const [income, setIncome] = useState(InitialIncome)
  const [expense, setExpense] = useState(InitialExpense)

  const [token, setToken] = useState(false)

  const getIncome = async () => {
    const response = await fetch(`${host}get-incomes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const json = await response.json()
    setIncome(json)
    console.log(income);
    // eslint-disable-next-line
  }
  const deleteIncome = async (id) => {
    const response = await fetch(`${host}delete-income/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const json = await response.json()
    return json
    // eslint-disable-next-line
  }

  const getExpense = async () => {
    const response = await fetch(`${host}get-expenses`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const json = await response.json()
    setExpense(json)
    console.log(expense);
    // eslint-disable-next-line
  }

  const deleteExpense = async (id) => {
    const response = await fetch(`${host}delete-expense/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const json = await response.json()
    return json
    // eslint-disable-next-line
  }

  const totalIncome = () => {
    let totalincome = 0;
    if (income.length > 0) {
      income.forEach((val) => {
        totalincome += val.amount
      })
    }

    return totalincome
  }

  const totalExpense = () => {
    let totalexpense = 0;
    expense.forEach((val) => {
      totalexpense += val.amount
    })

    return totalexpense
  }

  const totalBalance = () => {

    return totalIncome() - totalExpense()
  }

  const transactionHistory = (sliceNum) =>{
    const history = [...income, ...expense]
    history.sort((a,b)=>{
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return history.slice(0,sliceNum)
  }

  return (
    <IncomeContext.Provider value={{ income, getIncome, deleteIncome, expense, getExpense, deleteExpense, totalExpense, totalIncome, totalBalance, transactionHistory, token, setToken }}>
      {props.children}
    </IncomeContext.Provider>
  )
}

export default IncomeState