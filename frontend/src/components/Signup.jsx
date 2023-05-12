import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { RiAccountPinCircleFill } from 'react-icons/ri'
import IncomeContext from '../context/IncomeContext'

const Signup = () => {
  const [user, setUser] = useState({name:"", email: "", password: "" })
    const navigate = useNavigate()
    const context = useContext(IncomeContext)
    const { setToken } = context
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const signup = async (name, email, password) => {
        const response = await fetch(`https://expense-tracker-backend-vatv.onrender.com/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('auth-token', json.auth_token)
            navigate('/')
            setToken(true)

        } else {
            alert(json.error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(user.name, user.email, user.password)
        console.log("Successful")
    }
    return (
        <>
        <div className="w-max mx-auto h-screen">
        <h2 className='text-xl sm:text-2xl text-center text-yellow-500'>Create an Account!</h2>
        <form action="" className='mt-4 flex flex-col gap-3 w-[80vw] sm:w-[50vw] mx-auto bg-transparent h-max z-101 p-6 rounded-[30px] border border-gray-300'>
                <div className=''>
                    <RiAccountPinCircleFill size={70} className="mx-auto"/>
                </div>
                <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5 sm:justify-evenly">
                    <label htmlFor="title">Name</label>
                    <input type="email" value={user.name} onChange={onChange} name="name" id="name" className='p-2 outline-none  bg-[#F7A76C] rounded-md w-[100%] sm:w-[70%]' />
                </div>
                <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5 sm:justify-evenly">
                    <label htmlFor="title">Email</label>
                    <input type="email" value={user.email} onChange={onChange} name="email" id="email" className=' p-2 outline-none  bg-[#F7A76C] rounded-md w-[100%] sm:w-[70%]' />
                </div>
                <div className="flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-5 sm:justify-evenly">
                    <label htmlFor="paswsword">Password</label>
                    <input type="password" value={user.password} onChange={onChange} name="password" id="password" className=' p-2 outline-none bg-[#F7A76C] rounded-md w-[100%] sm:w-[70%]' />
                </div>

                <div className="mt-2 m-auto">
                    <button type="submit" className="p-2 bg-[#172774] rounded-md" onClick={handleSubmit}>Create Account</button>
                </div>
            </form>
            </div>
        </>
    )
}

export default Signup