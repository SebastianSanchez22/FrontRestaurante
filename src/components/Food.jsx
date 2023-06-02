import React , { useState } from 'react'
import ShoppingCart from './ShoppingCart';
import { useEffect } from 'react';

const Food = () => {

const [data, setData] = useState([]);
const [foods, setFoods] = useState([]);
const [cartItems, setCartItems] = useState([]);
const addToCartMessage = 'Añadir al carrito'

const getData = async() => {
  try {
    const response = await fetch('http://localhost:4000/comidas');
    const data = await response.json();
    console.log('DATA: ', data)
    setData(data);
    setFoods(data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getData();
}, []);

const addToCart = (item) => {
  const existingItem = cartItems.findIndex((cartItem) => { return cartItem.name === item.name});
  if (existingItem!=-1) {
    cartItems[existingItem].quantity += 1;
    setCartItems([...cartItems]);
  } else {
    const newItem = { ...item, quantity: 1 };
    setCartItems([...cartItems, newItem]);
  }
};

//   Filtrar por tipo
const filterType = (category) => {
  setFoods(
    data.filter((item) => {
      return item.category === category;
    })
  );
};

//   Filtrar por precio
const filterPrice = (price) => {
  setFoods(
    data.filter((item) => {
      return item.price === price;
    })
  );
};

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <ShoppingCart addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems}/>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Items mejor puntuados
      </h1>
      {/* Filtrar fila */}
      <div className='flex flex-col lg:flex-row justify-between'>
        {/* Filtrar tipo */}
        <div>
          <p className='font-bold text-gray-700'>Tipo de filtro</p>
          <div className='flex justfiy-between flex-wrap'>
            <button
              onClick={() => setFoods(data)}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Todos
            </button>
            <button
              onClick={() => filterType('burger')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Hamburguesa
            </button>
            <button
              onClick={() => filterType('pizza')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Pizza
            </button>
            <button
              onClick={() => filterType('salad')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Ensalada / Comida saludable
            </button>
            <button
              onClick={() => filterType('chicken')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Pollo
            </button>
          </div>
        </div>

        {/* Filtrar precio */}
        <div>
          <p className='font-bold text-gray-700'>Filtrar por precio</p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button
              onClick={() => filterPrice('$')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              $
            </button>
            <button
              onClick={() => filterPrice('$$')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              $$
            </button>
            <button
              onClick={() => filterPrice('$$$')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              $$$
            </button>
            <button
              onClick={() => filterPrice('$$$$')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              $$$$
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar precio */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {foods.map((item, index) => (
          <div
            key={index}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold text-lg'>{item.name}</p>
              <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {item.price}
                </span>
              </p>
            </div>
            <div className='flex justify-between px-2'>
              <button onClick={() => addToCart(item)} className='mb-2 ml-2 bg-orange-200 text-gray-900 px-2 py-1 pb-2  rounded-md'>
                {addToCartMessage}
              </button>
              <span className='mb-2 mr-2 text-gray-900 text-lg font-bold px-2 py-1 pb-2 rounded-full self-end'>
                {item.value}
              </span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food
