import PageTitle from '@/components/page-title'
import React from 'react'
import PlanForm from '../_components/plan-form'

const AddPlan = () => {
  return (
    <>
    <PageTitle title="Add New Plan" />
    <PlanForm formType="add" initialValues={null} /> 
    </>
  )
}

export default AddPlan