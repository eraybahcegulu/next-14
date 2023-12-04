'use client';

import { ConfigProvider} from 'antd';
import theme from './theme/themeConfig'

import Index from "./components/Index"

export default function Home() {

  return (
    <ConfigProvider theme={theme}>
      <Index/>
    </ConfigProvider>
  )
}
