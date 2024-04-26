import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col sm:flex-row gap-1 text-white w-full items-center justify-center h-[10vh] text-[10px] sm:text[16px]'>
        <p>Copyright &#169; 2023</p>
        <p>Made with <span style={{color: "red"}}>&hearts;</p>
    </div>
    </>
  )
}

export default Footer
