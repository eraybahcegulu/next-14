'use client';
import { Button, Card, Form, FormInstance, Input } from 'antd';
import axios from "axios";
import { useEffect, useState } from 'react';
import { ArrowRightOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Index: React.FC = () => {

  const [titles, setTitles] = useState<any[]>([]);
  const [titleForm] = Form.useForm();

  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [isEditTitle, setIsEditTitle] = useState<boolean | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);

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
    setIsEditTitle(false);
  };

  const updateTitle = async (id: any) => {
    await axios.put(
      `http://localhost:3000/api/titles/update/${id}`,
      { name: updatedTitle } 
    );
    fetchTitles();
    setUpdatedTitle(null);
    setIsEditTitle(false);
  };

  useEffect(() => {
    fetchTitles();
    setIsEditTitle(false);
  }, []);

  const editTitle = async (id: any) => {
    setSelectedTitleId(id);
    setIsEditTitle(true);
    setUpdatedTitle(null);
    const titleToEdit = titles.find((title) => title._id === id);
    if (titleToEdit) {
      setUpdatedTitle(titleToEdit.name);
    }
  };

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
    <div className='border h-full min-h-[80vh] w-full p-6 flex flex-col items-center justify-center gap-10'>
      <div className='p-2 bg-slate-200'>
        <Form
          className="flex flex-col"
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
      </div>


      <Card className='overflow-y-auto' style={{ width: 300, height: 300, backgroundColor: 'wheat' }}>
        <ul className='flex flex-col gap-2 text-center'>

          {titles.map((title) => (
            <div key={title._id} className='flex flex-row justify-between gap-2'>

              <li className='p-2 bg-teal-600 text-white w-full' >
                <span>
                  {
                    isEditTitle && selectedTitleId === title._id
                      ?
                      <Input style={{ borderRadius: "0" }} size="small" 
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      defaultValue={ title.name } />
                      :
                      title.name
                  }
                </span>
              </li>

              <div className='flex flex-col items-center justify-center'>
                <span className='cursor-pointer'
                  onClick={() => deleteTitle(title._id)}
                > <CloseOutlined /> </span>
              </div>

              <div className='flex flex-col items-center justify-center'>

                {
                  isEditTitle
                  ?
                  (
                    selectedTitleId === title._id
                    ?
                    <span className='cursor-pointer text-blue-500'
                    onClick={() => updateTitle(title._id)}
                    > <CheckOutlined /></span>
                    :
                    <span className='text-gray-400'
                    > <EditOutlined /> </span>
                  )
                  :
                  <span className='cursor-pointer'
                  onClick={() => editTitle(title._id)}
                  > <EditOutlined /> </span>
                }
                
              </div>

              <div className='flex flex-col items-center justify-center'>

                <Link href={`/titles/${title._id}`}>
                  <span className='cursor-pointer'
                  > <ArrowRightOutlined /> </span>
                </Link>

              </div>

            </div>

          ))}
        </ul>
      </Card>
    </div>
  )
}

export default Index