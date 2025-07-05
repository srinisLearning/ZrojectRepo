import PageTitle from '@/components/page-title'
import { getAllUsers } from '@/server-actions/user'
import { Alert } from 'antd'
import React from 'react'
import { IUser } from '@/interfaces'
import UsersTable from './_components/users-table'

const UsersPage = async () => {
    const {success, data} = await getAllUsers()
    if (!success) {
        return(
            <Alert message="Failed to Fetch Users. Pls try again later"  showIcon />
        )
    }
    const users:IUser[] = data
    console.log(users)
  return (
    <>
     <PageTitle title="Users / Staff" />
     <UsersTable users ={users} />
     </>
  )
}

export default UsersPage