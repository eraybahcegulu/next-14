'use client';

import { ConfigProvider } from 'antd';
import theme from './theme/themeConfig'

import Index from "./components/Index"

export default function Home() {

  return (
    <ConfigProvider theme={theme}>
      <div className='h-full w-full border border-red-700 p-4 lg:flex flex-col gap-4'>
        <div className='h-[10vh] min-h-[50px]w-full  border border-black flex items-center justify-center'>
          <span className='text-4xl font-bold text-center'>APP</span>
        </div>
        <div className='h-full w-full mt-4 lg:mt-0'>
          <Index />
        </div>

      </div>

    </ConfigProvider>
  )
}
