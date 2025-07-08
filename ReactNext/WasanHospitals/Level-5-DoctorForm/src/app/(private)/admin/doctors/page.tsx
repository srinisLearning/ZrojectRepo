import React from "react";
import { Button,Alert,message } from "antd";
import PageTitle from "@/components/page-title";
import Link from "next/link";

const DoctorPage = () => {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <PageTitle title="Doctors" />
          <Button type="primary">
            <Link href="/admin/doctors/new">Add Doctor</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
