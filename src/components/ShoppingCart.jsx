import React from 'react';

const ShoppingCart = ({addToCart, cartItems=[], setCartItems}) => {
    console.log('CartItems', cartItems)

  // Función para eliminar un item del carrito
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return null; // Eliminar el producto del carrito
        }
      }
      return item;
    });
  
    setCartItems(updatedCartItems.filter((item) => item !== null));
  };

  // Calcular el total de los items en el carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.value*item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-4">
          {cartItems.map((item, index) => (
  <li key={`${item.id}-${item.name}-${index}`} className="bg-white p-4 shadow rounded">
    <h3 className="text-lg font-semibold">
      {item.name} <span className="text-sm">({item.quantity})</span>
    </h3>
    <p className="text-gray-600">${item.price} -- {item.value}</p>
    <button 
      onClick={() => addToCart(item)} 
      className="mb-2 ml-2 bg-orange-200 text-gray-900 px-2 py-1 pb-2 rounded-md"
    >
      Agregar
    </button>
    <button
      onClick={() => removeFromCart(item.id)}
      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
    >
      Eliminar
    </button>
  </li>
))}

          </ul>
          <div className="mt-4">
            <h4 className="text-xl font-bold">Total: ${calculateTotal()}</h4>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Realizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
