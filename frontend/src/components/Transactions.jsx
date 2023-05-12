import React, { useContext, useEffect } from 'react'
import IncomeContext from '../context/IncomeContext'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const Transactions = () => {
  const context = useContext(IncomeContext)
  const { transactionHistory } = context
  const [...history] = transactionHistory(15)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {

    }
    else {
      navigate('/signin')
      // eslint-disable-line react-hooks/exhaustive-deps
      }
    }, [])
  return (
    <>
      <h2>All Transactions</h2>
      <div className='flex flex-col gap-2 mt-6'>
        {history.map((item) => {
          return (
            <div className='flex justify-between items-center rounded-xl p-3' style={{ backgroundColor: item.type === "income" ? "#59CE8F" : "#FF7D7D", color: item.type === "income" ? "black" : "white" }}>
              <p className="font-bold" >{item.title}</p>
              <p className="hidden sm:absolute" >{item.description.slice(0, 30) + "..."}</p>
              <p className="text-[12px] sm:text-[16px] text-center" >{moment(item.date).format('DD/MM/YYYY')}</p>
              <p className="italic font-bold" >{item.type === "income" ? `+` : `-`} &#x20b9;{item.amount}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Transactions