import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'

const Hero = () => {
  return (
    
    <div className='max-w-[1640px] mx-auto p-4'>
        <div className='max-h-[500px] relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>La <span className='text-orange-500'> Mejor</span></h1>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-orange-500'>Comida</span> A la mano</h1>
            </div>
            <div>
              <img className='w-full max-h-[500px] object-cover' src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="/" />
              <Routes>
              <Route path='/shoppingCart' element={<ShoppingCart/>}></Route>
              </Routes>
            </div>
        </div>
    </div>
  )
}

export default Hero