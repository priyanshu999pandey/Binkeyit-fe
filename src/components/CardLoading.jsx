import React from 'react'

const CardLoading = () => {
  return (
    <div className='border border-blue-100 p-2 grid gap-1 max-w-52 animate-pulse'>
        <div className='min-h-20 bg-blue-100'></div>
        <div className='p-2 bg-blue-100 rounded w-20'></div>
        <div className='p-3 bg-blue-100 rounded'></div>
        <div className='p-3 bg-blue-100 rounded w-14'></div>

        <div className='grid grid-cols-2 gap-3'>
           <div className='p-2 bg-blue-100 rounded w-20'></div>
           <div className='p-2 bg-blue-100 rounded w-20'></div>
        </div>

    </div>
  )
}

export default CardLoading