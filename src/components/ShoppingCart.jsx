import React from 'react';
import { useState, useRef } from 'react';
import { BsFillCartFill } from 'react-icons/bs';

const ShoppingCart = ({addToCart, cartItems=[], setCartItems}) => {

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const refCliente = useRef(null);
  const refTelefono = useRef(null);

  const handleClearInput = () => {
    refCliente.current.value = '';
    refTelefono.current.value = '';
  };

  const handleNameChange = (event) => {
      setCustomerName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
  };

  const removeFromCart = (item) => {
    const existingItem = cartItems.findIndex((cartItem) => { return cartItem.name === item.name});
    if (existingItem !== -1) {
        cartItems[existingItem].quantity -= 1;
        if(cartItems[existingItem].quantity === 0){
            cartItems.splice(existingItem, 1);
            console.log("El objeto fue removido del array.");
        }
        setCartItems([...cartItems]);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.value*item.quantity, 0);
  };

  const realizarCompra = () => {
    if (!customerName || !phoneNumber) {
        setError('Por favor ingresa todos los datos');
        return;
      }

    const datosPedido = {
      comidas: cartItems,
      cliente: {nombre: customerName, telefono: phoneNumber},
      valorTotal: calculateTotal(),
    };
  
    fetch('http://localhost:4000/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPedido),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
        console.log('Respuesta del backend:', data);
        alert('Compra realizada con éxito');
        setCartItems([]);
        setCustomerName('');
        setPhoneNumber('');
        handleClearInput();
      })
      .catch((error) => {
        // Manejar el error en caso de que ocurra
        console.error('Error al realizar la compra:', error);
        alert('Error al realizar la compra');
      });
  };


  return (
<div className="container mx-auto mt-8">
  <h2 className="text-3xl font-bold mb-4 text-center">Carrito de compras</h2>
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <p>{error}</p>
      <span className="absolute top-0 right-0 mt-1 mr-2">
        <svg
          className="fill-current h-4 w-4 text-red-500 cursor-pointer"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.64 3.64a.5.5 0 0 1-.707.708L10 10.707l-3.64 3.64a.5.5 0 0 1-.708-.708L9.293 10 5.652 6.36a.5.5 0 0 1 .708-.708L10 9.293l3.64-3.64a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </span>
    </div>
  )}
  {cartItems.length === 0 ? (
    <p className="text-center">No hay items en el carrito</p>
  ) : (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nombre del cliente:</h2>
          <input
            ref={refCliente}  
            type="text"
            placeholder="cliente"
            value={customerName}
            onChange={handleNameChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Número de teléfono:</h2>
          <input
            ref={refTelefono}
            type="text"
            placeholder="telefono"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 mt-4">
        {cartItems.map((item, index) => (
          <li key={index} className="bg-white p-4 shadow rounded">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name} x {item.quantity}
                </h3>
                <p className="text-gray-600">${item.price} -- {item.value}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => addToCart(item)}
                className="bg-orange-200 text-gray-900 px-4 py-2 rounded-md mr-2 hover:bg-orange-300"
              >
                Agregar
              </button>
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h4 className="text-2xl font-bold text-center mb-2">Total:</h4>
        <p className="text-3xl font-bold text-center text-gray-900">
          ${calculateTotal()}
        </p>
        <button
          onClick={() => realizarCompra()}
          className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md mt-4 mx-auto"
        >
        <BsFillCartFill size={20} className='mr-2'/>
          Realizar compra
        </button>
      </div>
    </>
  )}
</div>
  );
};

export default ShoppingCart;
