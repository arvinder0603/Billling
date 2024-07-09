import Image from 'next/image'
import React from 'react'

const Card = ({title,subtitle,onclick,src}) => {
  return (
    <div className=' max-w-80 text-center  cursor-pointer flex justify-center items-center  flex-col outline outline-1 outline-gray-200 p-3 rounded-2xl  hover:shadow-xl bg-white' onClick={onclick}>

          <img width={50} height={50} src={src}></img>
          <h1 className=' text-2xl font-semibold  mt-2 '>{title}</h1>
          <h1 className=' text-gray-400 text-base font-medium  mt-2 '>{subtitle}</h1>
    </div>
  )
}

export default Card
