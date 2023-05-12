import React, { useState, useContext } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdClose } from 'react-icons/md';
import { Link } from "react-router-dom";
import { AiOutlineStock } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { FcAbout } from 'react-icons/fc'
import { MdAttachMoney, MdOutlineMoneyOffCsred } from 'react-icons/md'
import IncomeContext from '../context/IncomeContext'

const Navbar = () => {
    const context = useContext(IncomeContext)
    const { token, setToken } = context

    const handleSignOut = () =>{
        localStorage.removeItem('auth-token')
        setToken(false)
    }

    const [nav, setNav] = useState(false)
    return (
        <>
            <div className="p-5 h-max w-full">
                <div className="flex flex-row justify-between items-center max-w-[1440px] mx-auto h-max">
                
                    <h1 className='text-[#FA7D09] text-[25px]'>Expense Tracker</h1>

                    <div className=" text-[#FA7D09] font-bold hidden sm:flex sm:flex-row gap-5">
                        {!token && <button className='hover:text-[#FF4301] duration-300 relative'><Link to="/signin">Sign In</Link></button>}
                        {token && <button className='hover:text-[#FF4301] duration-300 relative' onClick={()=>{handleSignOut()}}><Link to="/">Sign Out</Link></button>}
                        {!token && <button className='hover:text-[#FF4301] duration-300 relative'><Link to="/signup">Create Account</Link></button>}
                    </div>

                    <div className='sm:hidden text-orange-500'>
                        <RxHamburgerMenu size={25} onClick={() => { setNav(true) }} />
                    </div>
                </div>

                {/* Overlay  */}
                {nav ? <div className="bg-black/80 fixed w-full h-screen z-100 top-0 left-0"></div> : ""}
                <div className={nav ? 'w-[70%] bg-white fixed right-0 top-0 z-1001 h-screen p-5 duration-300' : "w-[70%] bg-white fixed right-[-100%] top-0 z-6 h-screen p-5 duration-300"} style={{zIndex: '100'}}>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-orange-500 font-bold'>Expense Tracker</h1>
                        <MdClose size={25} onClick={() => { setNav(false) }} className="rotate-180:hover duration-100" />
                    </div>
                    <div className='flex flex-col mt-10 gap-5'>
                        <Link to="/" onClick={() => { setNav(false) }}><FcAbout size={20} className="inline mr-3" />Quick Guide</Link>
                        <Link to="/dashboard" onClick={() => { setNav(false) }}><RxDashboard size={20} className="inline mr-3" />Dashboard</Link>
                        <Link to="/transactions" onClick={() => { setNav(false) }}><AiOutlineStock size={20} className="inline mr-3" />View Transactions</Link>
                        <Link to="/income" onClick={() => { setNav(false) }}><MdAttachMoney size={20} className="inline mr-3" />Income</Link>
                        <Link to="/expense" onClick={() => { setNav(false) }}><MdOutlineMoneyOffCsred size={20} className="inline mr-3" />Expense</Link>
                        {!token && <Link to="/signin" onClick={() => { setNav(false) }} className="text-orange-500">Sign In</Link>}
                        {token && <Link to="/" className='text-orange-500 duration-300 relative' onClick={()=>{handleSignOut()}}>Sign Out</Link>}
                        {!token && <Link to="/signup" onClick={() => { setNav(false) }} className="text-orange-500">Create Account</Link>}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Navbar