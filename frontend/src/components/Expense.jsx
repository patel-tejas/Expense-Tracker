import React, { useContext, useEffect, useState } from 'react'
import IncomeContext from '../context/IncomeContext'
import { MdDelete } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { AiOutlinePlus } from 'react-icons/ai'

const Expense = () => {
  const context = useContext(IncomeContext)
  const { getExpense, expense, deleteExpense } = context

  const [log, setLog] = useState({ title: "", description: "", amount: "", type: "Personal", category: "Expense", date: "" })
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      getExpense()
    }
    else {
      navigate('/signin')
    }
    // eslint-disable-next-line
  }, [])

  const deleteLog = async (id) => {
    await deleteExpense(id)
    getExpense()
    // eslint-disable-line react-hooks/exhaustive-deps
  }

  const addLog = async (title, amount, type, category, date, description,) => {
    const response = await fetch(`http://localhost:5000/api/transaction/add-expense`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      },
      body: JSON.stringify({ title, amount, type, category, date, description })
    });
    const json = response.json()
    console.log(json)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addLog(log.title, log.amount, log.type, log.category, log.date, log.description,)
    getExpense()
    setMenu(false)
    setLog({ title: "", description: "", amount: "", type: "", category: "", date: "" })
  }

  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value })
  }

  const totalIncome = () => {
    let totalincome = 0;
    expense.forEach((val) => {
      totalincome += val.amount
    })

    return totalincome
  }
  return (
    <div>
      <div className="min-h-screen w-full">
        <div className="">
          <div className="w-full mx-auto flex gap-3 justify-between items-center mb-4 ">
            <h1 className='text-[20px] sm:[35px]'>Expense Log</h1>
            <button className="bg-gradient-to-b from-blue-500 to-blue-400 text-white h-[40px] p-2 text-sm rounded-[30px] flex items-center gap-2 " onClick={() => { setMenu(true) }}><AiOutlinePlus size={20} className="hover:rotate-180 duration-500"/>Add Expense</button>
          </div>
          <div className="flex items-center justify-center w-full h-[10vh]">
            <h1 className='text-red'>Total Expense: {totalIncome()}</h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {expense.map((acc) => {
              return <div className='bg-gradient-to-b text-black from-red-200 to-red-300 p-5 h-max rounded-[30px]'>
                <p><span className='font-bold'>Title: </span> {acc.title}</p>
                <p><span className='font-bold'>Type: </span>{acc.type.charAt(0).toUpperCase() + acc.type.slice(1)}</p>
                <p><span className='font-bold'>Amount: </span>{acc.amount}</p>
                <p><span className='font-bold'>Date: </span>{moment(acc.date).format('DD/MM/YYYY')}</p>
                <p><span className='font-bold'>Description: </span>{acc.description}</p>
                <div className='flex flex-row-reverse'>
                  <MdDelete size={20} className="hover:scale-125 hover:text-red-800 duration-200 cursor-pointer" onClick={() => { deleteLog(acc._id) }} />
                </div>
              </div>
            })}
          </div>
          {menu ? <div className="bg-black/80 fixed w-full h-full z-100 top-0 left-0"></div> : ""}
          <div className={menu ? 'h-screen absolute w-full sm:w-[60vw] p-3 top-0 left-0 sm:left-[20%] duration-300' : "h-screen absolute w-full p-3 top-0 left-[-100%] sm:top-[-130%] sm:left-[0] duration-300"}>
            <form action="" className='flex flex-col gap-3 max-w-700px text-black bg-[#FFF1BD] h-max z-101 p-6 my-auto rounded-[30px]'>
              <div>
                <MdClose size={20} className="hover:scale-125 duration-200 cursor-pointer" onClick={() => { setMenu(false) }} />
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5">
                <label htmlFor="title">Title</label>
                <input type="text" value={log.title} onChange={onChange} name="title" id="title" className=' p-2 outline-none  rounded-md  sm:w-[60vw]' placeholder='Zomato Meal'/>
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5">
                <label htmlFor="amount">Amount</label>
                <input type="number" value={log.amount} onChange={onChange} name="amount" id="amount" className=' p-2 outline-none  rounded-md sm:w-[60vw]' placeholder='450'/>
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5">
                <label htmlFor="type">Type</label>
                <input type="text" value={log.type} onChange={onChange} name="type" id="type" className=' p-2 outline-none  rounded-md  sm:w-[60vw]' />
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5">
                <label htmlFor="date">Date</label>
                <input type="date" value={log.date} onChange={onChange} name="date" id="date" className=' p-2  rounded-md sm:w-[60vw]' />
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5">
                <label htmlFor="description">Description</label>
                <input type="text" value={log.description} onChange={onChange} name="description" id="description" className=' p-2  rounded-md sm:w-[60vw]' placeholder='Paneer, Naan, & Dal Fry'/>
              </div>
              <div className="mt-2 m-auto">
                <button type="submit" className="p-2 bg-[#FC7300] text-white rounded-[12px]" onClick={handleSubmit}>Add Expense</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expense