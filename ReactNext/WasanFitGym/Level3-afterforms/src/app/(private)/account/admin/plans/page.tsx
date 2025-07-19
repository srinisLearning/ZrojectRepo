import PageTitle from '@/components/page-title'
import React from 'react'
import{ Button } from '@/components/ui/button'
import Link from 'next/link'

const PlansPage = () => {
  return (
   <>
     <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Plans" />
        <Button>
          <Link href="/account/admin/plans/add">Add Plan</Link>
        </Button>
      </div>
 
    </div>
   </>
  )
}

export default PlansPage