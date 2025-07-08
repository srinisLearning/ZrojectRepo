'use client';
import React from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useRouter } from "next/navigation";
import { vehilcesCategories } from "@/constants";

interface IVehicleFormProps {
  type: "add" | "edit";
  vehicleData: any; // we will update this later
}

const VehicleForm = ({ type, vehicleData }: IVehicleFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values: any) => {
  }
  return (
    <>
      <Form layout="vertical" onFinish={onFinish} initialValues={vehicleData}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          <div className="col-span-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Select
              placeholder="Select Category"
              options={vehilcesCategories}
            />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please input the brand!" }]}
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please input the model!" }]}
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rentPerHour"
            label="Rent Per Hour"
            rules={[
              { required: true, message: "Please input the rent per hour!" },
            ]}
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input type="number" />
          </Form.Item>
          /*  <div className="col-span-4">
            <Upload
              listType="picture-card"
              beforeUpload={(file) => {
                 
              }}             
            >
              <span className="text-xs">Upload media</span>
            </Upload>
          </div> */

         {/*  <div className="col-span-4">
            <Upload
              listType="picture-card"
              beforeUpload={(file) => {
                setUploadedFiles([...uploadedFiles, file]);
                return false;
              }}
              fileList={selectedMediaFiles}
              onRemove={onFileRemove}
            >
              <span className="text-xs">Upload media</span>
            </Upload>
          </div> */}

          <div className="col-span-4 flex justify-end gap-5">
            <Button onClick={() => router.push("/admin/vehicles")}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default VehicleForm;
