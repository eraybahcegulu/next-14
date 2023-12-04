'use client';
import { Button, Card, Form, Input } from 'antd';
import axios from "axios";
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const Index: React.FC = () => {

  const [titles, setTitles] = useState<any[]>([]);
  const [titleForm] = Form.useForm();

  const fetchTitles = async () => {
    try {

      const res = await axios.get("http://localhost:3000/api/titles/get");
      setTitles(res.data.titles);
    } catch (error) {
      console.error("Error loading titles: ", error);
    }
  };

  const deleteTitle = async (id: any) => {
    await axios.delete(
      `http://localhost:3000/api/titles/delete/${id}`
    );
    fetchTitles();
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  const onFinish = async (values: any) => {

    await axios.post(
      "http://localhost:3000/api/titles/create",
      values
    );
    fetchTitles();
    titleForm.resetFields();
  };

  type FieldType = {
    name?: string;
  };

  return (
    <div className='border border-black h-full w-full p-6 flex flex-col lg:flex-row justify-between gap-10'>
      <div className='border border-black h-full min-h-[78vh] w-full flex flex-col gap-2 items-center justify-center p-4' >

        <Form
          className="mt-4 flex flex-col"
          layout="vertical"
          onFinish={onFinish}
          form={titleForm}
        >
          <Form.Item<FieldType>
            name="name"
            label="Title"
            rules={[{ required: true, message: "Title required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              style={{ borderRadius: "0" }}
              type="primary"
              htmlType="submit"
              size="large"
            >
              <strong> ADD </strong>
            </Button>
          </Form.Item>
        </Form>

        <Card className='overflow-y-auto' style={{ width: 300, height: 300 }}>
          <ul className='flex flex-col gap-2 text-center'>

            {titles.map((title) => (
              <div key={title._id} className='flex flex-row justify-between gap-2'>
                <li className='p-2 bg-teal-600 text-white w-full' >
                  <span>{title.name.toUpperCase()}</span>
                </li>
                <div className='flex flex-col items-center justify-center'>
                  <span className='cursor-pointer'
                    onClick={() => deleteTitle(title._id)}
                  > <CloseOutlined /> </span>
                </div>

              </div>

            ))}
          </ul>
        </Card>
      </div>


      <div className='border border-black h-full min-h-[78vh] w-full flex flex-col gap-2 items-center justify-center p-4'>
        <Card className='overflow-y-auto' style={{ width: 300, height: 300 }}>
          <ul className='flex flex-col gap-2 text-center'>
            <li className='p-2 bg-teal-600 text-white'> a </li>

          </ul>
        </Card>

      </div>
    </div>
  )
}

export default Index
