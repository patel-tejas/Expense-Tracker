import React from 'react'
import { Link } from "react-router-dom";
import {
    Route,
    Routes,
} from "react-router-dom";
import Dashboard from './Dashboard';
import Expense from './Expense';
import Income from './Income';
import SignIn from './SignIn';
import Signup from './Signup';
import { AiOutlineStock } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { MdAttachMoney, MdOutlineMoneyOffCsred } from 'react-icons/md'

import Transactions from './Transactions';
import GettingStarted from './GettingStarted';

const Container = () => {
    return (
        <>
            <div className='flex flex-row h-full w-[97%] gap-3 mx-auto'>
                <div className='hidden sm:flex sm:flex-col bg-[#060930] sm:p-3 sm:text-white sm:w-[20vw] md:w-[20vw] rounded-[20px] h-[50vh]  justify-around items-start'>
                    <Link to="/" className='hover:text-[#FA7D09] duration-300'><MdOutlineMoneyOffCsred size={20} className="inline mr-3" />Quick Guide</Link>
                    <Link to="/dashboard" className='hover:text-[#FA7D09] duration-300 flex items-center justify-center'><RxDashboard size={20} className="inline mr-3" />Dashboard</Link>
                    <Link to="/transactions" className='hover:text-[#FA7D09] duration-300'> <AiOutlineStock size={20} className="inline mr-3" />View Transactions</Link>
                    <Link to="/income" className='hover:text-[#FA7D09] duration-300'><MdAttachMoney size={20} className="inline mr-3" />Income</Link>
                    <Link to="/expense" className='hover:text-[#FA7D09] duration-300'><MdOutlineMoneyOffCsred size={20} className="inline mr-3" />Expense</Link>
                </div>

                <div className='w-full sm:w-[80vw] rounded-[20px] min-h-screen text-white p-5'>
                    <Routes>
                        <Route exact path="/" element={<GettingStarted />}> </Route>
                        <Route exact path="/dashboard" element={<Dashboard />}> </Route>
                        <Route exact path="/transactions" element={<Transactions />}> </Route>
                        <Route exact path="/income" element={<Income />}> </Route>
                        <Route exact path="/expense" element={<Expense />}> </Route>
                        <Route exact path="/signin" element={<SignIn />}> </Route>
                        <Route exact path="/signup" element={<Signup />}> </Route>
                    </Routes>

                </div>

            </div>
        </>
    )
}

export default Container