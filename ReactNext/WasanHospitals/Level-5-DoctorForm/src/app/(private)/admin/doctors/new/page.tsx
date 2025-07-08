import PageTitle from '@/components/page-title'
import React from 'react'
import DoctorForm from '../_components/doctor-form'

const NewDoctorPage = () => {
  return (
    <>
    <PageTitle title="New Doctor" />
    <div className="p-4">
    
      <DoctorForm />
    </div>
    </>
  )
}

export default NewDoctorPage