import LogoutButton from '@/components/ui/functional/logout-button'
import { IUser } from '@/interfaces'
import { getLoggedInUser } from '@/server-actions/users'
import React from 'react'

const UserDashboardPage = async() => {
  const response =await getLoggedInUser()
  if(!response.success){
    return <div>Error: {response.message}</div>
  }
  const user:IUser = response.data!;
  
  return (
    <>
    <div>User Dashboard Page</div>
    <div className='flex flex-col gap-5 p-5'>
      <h2>ID: {user.id}</h2>
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>


    </div>
    <LogoutButton />
    </>
  )
}

export default UserDashboardPage