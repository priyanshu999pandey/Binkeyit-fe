import React, { useState } from 'react'
import DisplayCartItems from '../components/DisplayCartItems'

const ViewCart = () => {
    const [openCartDialoug,setOpenCartDialoug] = useState(true)
  return (
    <div className=''>
           
        <DisplayCartItems close={setOpenCartDialoug}  />
    
    </div>
  )
}

export default ViewCart