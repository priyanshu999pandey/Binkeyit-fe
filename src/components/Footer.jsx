import React from 'react'
import { SiFacebook } from "react-icons/si";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
  <footer className='border-t h-[10vh] border-gray-400 bg-slate-100 '>
    <div className=' container mx-auto p-4 lg:flex flex-row justify-between items-center  '>
        <p className='text-center'> © All right reserverd 2025</p>
        <div className='flex flex-row justify-center gap-4 lg:text-2xl'>
            <a href=''>
               <SiFacebook className='hover:text-gray-300' />
            </a>
            <a href=''>
               <FaSquareInstagram  className='hover:text-gray-300'  ></FaSquareInstagram>
            </a>
            <a href=''>
              <FaLinkedin  className='hover:text-gray-300' ></FaLinkedin>
            </a>
        </div>
    </div>

  </footer>
  )
}

export default Footer