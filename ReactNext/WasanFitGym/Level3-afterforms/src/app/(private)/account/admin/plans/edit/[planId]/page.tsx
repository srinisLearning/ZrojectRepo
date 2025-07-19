import PageTitle from '@/components/page-title'
import React from 'react'
import PlanForm from '../../_components/plan-form'

const EditPlan = () => {
  let initialValues = {} // Replace with actual initial values if needed
  return (
     <>
     <PageTitle title="Edit Plan" />
     <PlanForm formType="edit" initialValues={initialValues}  />
     </>
  )
}

export default EditPlan