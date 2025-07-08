"use client";
import React, { useState } from "react";
import { specializations, workDays, workHours } from "@/constants";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useRouter } from "next/navigation";

const DoctorForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<any>(null);

  return (
    <div className="mt-5">
      <Form layout="vertical" className="grid grid-cols-4 gap-5">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please input the phone!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="specializations"
          label="Specializations"
          rules={[
            { required: true, message: "Please input the specialization!" },
          ]}
        >
          <Select options={specializations} mode="multiple" />
        </Form.Item>

        <Form.Item
          name="workDays"
          label="Work Days"
          rules={[{ required: true, message: "Please input the work days!" }]}
        >
          <Select options={workDays} mode="multiple" />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: "Please input the start time!" }]}
        >
          <Select options={workHours} />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: "Please input the end time!" }]}
        >
          <Select options={workHours} />
        </Form.Item>

        <Form.Item
          name="fee"
          label="Fee"
          rules={[{ required: true, message: "Please input the fee!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: "Please input the bio!" }]}
          className="col-span-4"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Doctor Profile Picture" className="flex gap-5">
          <Upload listType="picture-card">
            <div className="span text-xs">
              {profilePicture ? "Change" : "Upload"} Profile Picture
            </div>
          </Upload>
        </Form.Item>

        <div className="col-span-4 flex justify-end gap-5">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DoctorForm;
