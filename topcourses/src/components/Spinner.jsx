import React from 'react'
import './Spinner.css'

export default function Spinner() {
  return (
    <div className='flex flex-center items-center space-y-2'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  )
}
