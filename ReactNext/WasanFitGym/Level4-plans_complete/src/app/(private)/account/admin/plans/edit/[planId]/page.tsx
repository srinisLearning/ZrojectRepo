
import React from "react";
import PlanForm from "../../_components/plan-form";
import PageTitle from "@/components/page-title";
import { getPlanById } from "@/server-actions/plans";


interface EditPlanPageProps {
  params : Promise<{planId: string}>
}

async function EditPlanPage({ params }: EditPlanPageProps) {
  const {planId} = await params;
  const response = await getPlanById(planId);

  if(!response.success) {
    return <div>Plan not found</div>
  }

  let initialValues = response.data;
  return (
    <div>
      <PageTitle title="Edit Plan" />
      <PlanForm formType="edit" initialValues={initialValues} />
    </div>
  );
}

export default EditPlanPage;