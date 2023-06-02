import React from 'react'
import { useState, useEffect } from 'react';

const Orders = () => {

const [data, setData] = useState([]);

const getData = async() => {
    try {
        const response = await fetch('http://localhost:4000/pedidos');
        const data = await response.json();
        setData(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    getData();
  }, []);


  return (
    <div>
  <h1 className="text-4xl text-center pt-4 font-bold text-orange-600">
    Órdenes
  </h1>
  {data.length === 0 ? (
    <p className="text-center">No hay items en el carrito</p>
  ) : (
    <div className="max-w-4xl mx-auto p-4">
      {data.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <p className="text-2xl font-bold mb-2">Orden {index + 1}</p>
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <p className="text-lg font-semibold mb-2">Cliente:</p>
            <p className="ml-4">Nombre: {item.cliente.nombre}</p>
            <p className="ml-4">Teléfono: {item.cliente.telefono}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <p className="text-lg font-semibold mb-2">Comidas:</p>
            {item.comidas.map((comida, i) => (
              <div key={i} className="mt-4 flex items-center">
                <img
                  src={comida.image}
                  alt={comida.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{comida.name}</p>
                  <p className="text-gray-600">Categoría: {comida.category}</p>
                  <p>Cantidad: {comida.quantity}</p>
                  <p>Valor: {comida.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <p className="text-lg font-semibold mb-2">Resumen:</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg">Valor total:</p>
              <p className="text-3xl font-bold text-orange-600">${item.valorTotal}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  )
}

export default Orders;
