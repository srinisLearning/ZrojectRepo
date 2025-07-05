import Image from "next/image";
import '@ant-design/v5-patch-for-react-19';
import {Button,Input} from 'antd'
 

export default function Home() {
  return (
  <>
  <h3 className='text-center text-3xl text-[#65ad1d]'>Wasan Doctor</h3>
  <Button type='primary' className="hover:bg-red-500 p-3 m-3 text-white">Primary</Button>
  <Button   className="colorTextSecondary p-3 m-3 text-white ">Default</Button>
  <Input placeholder="Basic usage" className='m-3' />
  </>
  );
}
