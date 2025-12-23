'use client'

import React from 'react'
import tobi from '../assets/tobi.png'

const AvatarAgent = () => {
  return (
    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary shrink-0 border border-primary/20">
        <img src={tobi.src} alt="Tobi" className="h-5 w-5" />
    </span>
  )
}

export default AvatarAgent
