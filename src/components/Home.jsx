import React, { useState } from 'react'
import Buscador from './formBuscador/Buscador'
import CardBicicleta from './cardCiclasHome/CardBicicleta'
import DetalleProducto from './detalleProducto/DetalleProducto'
import Categorias from './categorias/Categorias'
import Header from './header/Header'
import Footer from './Footer/Footer'
import ProductoManejador from './componentsCm/button/ProductoManejador'

const Home = () => {


  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarDetalleProducto, setMostrarDetalleProducto] = useState(false);

  const handleProductoSeleccionado = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarDetalleProducto(true)
  };
  const handleCerrarDetalle = () => {
    console.log("Cerrando detalle...");
    setMostrarDetalleProducto(false);
  };




  return (
    <><div id="top" ></div>
      <Header />
      <Buscador />
      <Categorias />
      <CardBicicleta onProductoSeleccionado={handleProductoSeleccionado} />

      {mostrarDetalleProducto && (
        <DetalleProducto
          srcImagen={productoSeleccionado.imgBici}
          nombreBici={productoSeleccionado.nombreBici}
          onClose={handleCerrarDetalle}
        />)}
        
      <Footer />
    </>
  )
}

export default Home