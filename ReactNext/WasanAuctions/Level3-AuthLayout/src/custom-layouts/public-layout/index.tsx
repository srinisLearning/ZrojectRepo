import React from 'react'

const PublicLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <div>Public Layout</div>
    {children}
    </>
  )
}

export default PublicLayout