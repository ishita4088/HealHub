import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT US</p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>12A, Sector 45, Near City Mall,<br /> Dwarka, New Delhi - 110075 <br/>India</p>
          <p className='text-gray-500'>Mobile: +91 9711343508 <br /> Email: healhub76@gmail.com </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
