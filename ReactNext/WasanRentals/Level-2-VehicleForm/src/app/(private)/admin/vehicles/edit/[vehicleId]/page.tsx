import PageTitle from '@/components/page-title'
import React from 'react'
import VehicleForm from '../../_components/vehicle-form'

const EditVehiclePage = () => {
  return (
     <div className="flex justify-between items-center">
        <PageTitle title="Edit Vehicles" />
        <VehicleForm type="edit" vehicleData={null} />
         
      </div>
  )
}

export default EditVehiclePage