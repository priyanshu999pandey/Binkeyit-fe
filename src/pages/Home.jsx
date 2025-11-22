import React, { useEffect } from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"

const Home = () => {

  return (
   <section className='p-4 bg-white'>
       <div>
           <div className={`min-h-48 w-full bg-white container mx-auto ${!banner && !bannerMobile?"animate-pulse":"animate-none" }`}>
            <img src={banner} className='hidden lg:block md:block object-fill '  />
            <img src={bannerMobile} className=' lg:hidden md:hidden object-cover ' />
           </div>
       </div>
   </section>
  )
}

export default Home