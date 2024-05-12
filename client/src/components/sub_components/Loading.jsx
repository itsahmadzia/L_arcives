import React from 'react'

import { hourglass } from 'ldrs'

hourglass.register()
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <l-hourglass
            size="50"
            bg-opacity="0.1"
            speed="1.75" 
            color="green" 
        ></l-hourglass>
    </div>
  )
}
