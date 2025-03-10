

import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';


const Cart = () => {
  const [isClient,setIsClient] = useState(false)
  useEffect(()=>{
    setIsClient(true)
  } , [])
  if(!isClient){
    return null
  }
  return (
    <a href={"/cart"} className='flex items-center  text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none duration-300 ease-in-out transition-all cursor-pointer'>
        <ShoppingBag />
        <div className='flex flex-col'>
            <p className='text-xs '>
                <span className='font-semibold'>0</span> items
            </p>
            <p className='font-semibold'>Cart</p>
        </div>
    </a>
  )
}

export default Cart