import PageTitle from '@/components/page-title'
import React from 'react'
import VehicleForm from '../_components/vehicle-form'

const AddVehiclePage = () => {
  return (
      <div>
        <PageTitle title="Add Vehicles" />
         <VehicleForm 
       type='add'
        vehicleData={null}
      />
         
      </div>
  )
}

export default AddVehiclePage