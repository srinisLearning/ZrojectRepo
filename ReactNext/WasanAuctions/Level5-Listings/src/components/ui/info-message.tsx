import React from 'react'

function InfoMessage({ message }: { message: string }) {
  return (
    <div className='text-sm p-5 w-full bg-gray-200 border border-gray-400'>
        {message}
    </div>
  )
}

export default InfoMessage