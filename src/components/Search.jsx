import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import useMobile from '../hooks/useMobile';
const Search = () => {
    const navigate = useNavigate();
    const [isMobile] = useMobile();

    const redirectToSearchPage = ()=>{
        navigate("/search")
    }
    const location = useLocation();
    // console.log("location=>",location)

    const [isSearchPage,setIsSearchPage] = useState();

    useEffect(()=>{
        const isSearchPage = location.pathname === "/search"
        setIsSearchPage(isSearchPage);
    },[location])

    // console.log(isSearchPage)


  return (
    <div className=' min-w-[300px] lg:min-w-[420px]  border-gray-200 rounded-lg text-gray-400 flex  items-center gap-2 px-4 py-2 h-10  focus-within:border-yellow-500 border-2' onClick={redirectToSearchPage}>
        <button className='focus-within:text-yellow-500'>
            {
                (isSearchPage && isMobile) ? (<Link to={"/"} ><IoArrowBackCircle className='w-7 h-7' onClick={(e) => e.stopPropagation()}  ></IoArrowBackCircle></Link>):(<FiSearch className='w-7 h-7'></FiSearch>)
            }
        </button>
       <div className='w-full h-full flex justify-center items-center'>
        {
            !isSearchPage?(
                //not search page
                 <div className='w-full h-full  flex  items-center '>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "egg"',
                                1000,
                                'Search "banana"',
                                1000,
                                'Search "cake"',
                                1000,
                                'Search "oranges"',
                                1000,
                                'Search "choclates"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "paneer"',
                                1000
                                
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            />
                      </div>

            ):(
                //in searcg page
                <div className='w-full h-full  flex items-center '>
                   <input
                     type='text'
                     placeholder='search like atta or milk...'
                     autoFocus
                     className='w-full h-full outline-none'
                    //  onFocus={}
                    />
               </div>
            )
        }
       </div>
    </div>
  )
}

export default Search