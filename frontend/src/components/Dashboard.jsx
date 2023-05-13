import IncomeContext from '../context/IncomeContext'
import React, { useContext, useEffect } from 'react'
import Chart from './Chart'
import { useNavigate } from 'react-router-dom'
import History from './History'

const Dashboard = () => {
  const context = useContext(IncomeContext)
  const { totalExpense, totalIncome, totalBalance, getExpense, getIncome, income, expense } = context
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      
      getIncome()
      getExpense()
  
    }
    else {
      navigate('/signin')

    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className="font-bolder text-xl sm:3xl">Portfolio</h1>
      <div className='flex flex-col sm:flex-row items-center sm:items-start w-full justify-start'>
        <div className='mt-5 mb-3 w-full sm:w-[70%]'>
          <div className="relative h-[25vh] w-[80vw] sm:h-[100%] sm:w-[100%] m-auto">
          <Chart className='h-full w-full'/>
          </div>
          <div className='mt-8 text-[16px] sm:text-xl'>
            <div className='flex items-center gap-5 justify-around'>
              <div className='bg-[#060930] rounded-xl p-2 text-center'>
                <h2 className=''>Total Income</h2>
                <p style={{ color: 'lime' }}>+{totalIncome()}</p>
              </div>
              <div className='bg-[#060930] rounded-xl p-2 text-center'>
                <h2>Total Expense</h2>
                <p style={{ color: '#F05454' }}>-{totalExpense()}</p>
              </div>
            </div>
            <div className='flex items-center justify-center mt-3 text-center'>
              <div className='bg-[#060930] rounded-xl p-2'>
                <h2>Total Balance</h2>
                <p style={{ color: 'yellow' }}>{totalBalance() > 0 ? `+${totalBalance()}` : `-${totalBalance()}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full sm:w-[30%]'>
          <div className='text-center bg-[#060930] rounded-xl p-2'>
            <History />
          </div>
          <div className='mt-4 bg-[#060930] rounded-xl p-2'>
            <h2 className='flex justify-between'>Min<span>Salary</span>Max</h2>
            <div className='flex justify-between'>
              <p>
                {Math.min(...income.map((item)=> item.amount))}
              </p>
              <p>
                {Math.max(...income.map((item)=> item.amount))}
              </p>
            </div>
          </div>
          <div className='mt-4 bg-[#060930] rounded-xl p-2'>
            <h2 className='flex justify-between'>Min<span>Expense</span>Max</h2>
            <div className='flex justify-between'>
              <p>
                {Math.min(...expense.map((item)=> item.amount))}
              </p>
              <p>
                {Math.max(...expense.map((item)=> item.amount))}
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard