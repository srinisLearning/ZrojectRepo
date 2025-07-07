import React from 'react'
import { ConfigProvider } from 'antd'

const AntdThemeProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <ConfigProvider
    theme={{
        token: {
          colorPrimary: "#76CD26",
          colorTextSecondary:"#00ff00",
          borderRadius: 2,
          controlOutline: "none",
        },
        components: {
          Button: {
            controlHeight: 45,
            defaultBorderColor: "#65ad1d",
          },
          Select: {
            controlHeight: 60,
          },
          Input: {
            controlHeight: 45,
          },
        },
      }}
    
    
    > 
    {children}
    </ConfigProvider>
    </>
  )
}

export default AntdThemeProvider