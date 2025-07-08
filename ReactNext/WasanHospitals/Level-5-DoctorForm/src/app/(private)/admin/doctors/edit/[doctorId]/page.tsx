import PageTitle from '@/components/page-title'
import React from 'react'
import DoctorForm from '../../_components/doctor-form'

const EditDoctorPage = ({params}:{params:{doctorId:string}}) => {
  return (
   <>
   <PageTitle title="Edit Doctor" />
   <div className="p-4">
     <h1 className="text-2xl font-bold mb-4">Edit Doctor {params.doctorId}</h1>
     <DoctorForm />
     {/* Add your form or edit components here */}
   </div>
   
   </>
  )
}

export default EditDoctorPage