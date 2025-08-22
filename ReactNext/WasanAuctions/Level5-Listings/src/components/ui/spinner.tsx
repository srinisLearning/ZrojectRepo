import React from 'react'

function Spinner() {
  return (
    <div className='mt-20 flex items-center justify-center'> 
        <div className='h-10 w-10 border-8 border-primary border-t-gray-200 animate-spin rounded-full'></div>
    </div>
  )
}

export default Spinner