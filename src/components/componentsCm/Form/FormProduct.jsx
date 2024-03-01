import React, { useState } from 'react';
/*import ImageUploader from 'react-images-upload';*/
import './formProduct.css';
import axios from "axios";
import CardBicicleta from '../../cardCiclasHome/CardBicicleta';

const FormProduct = ({ onSubmit }) => {



  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [urlImagen, setUrlmagenes] = useState("");
  const [tituloImagen, setTituloImagen] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const[nombreCard,setNombreCard] = useState([])

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleUrlImagenChange = (event) => {
    setUrlmagenes(event.target.value)
  }
  const handleTituloImagenChange = (event) => {
    setTituloImagen(event.target.value)
  }

  const handleAgregarImagen = () => {
    if (urlImagen !== "" && tituloImagen !== "") {
      const nuevaImagen = { titulo: tituloImagen, urlImg: urlImagen };
      setImagenes([...imagenes, nuevaImagen]);
    } else {
      alert("Por favor, ingrese tanto la URL como el título de la imagen.");
    }
  };

  /*const handleImagenesChange = (event) => {
    const urlImagen = Array.from(event.target.urlImagen);
    setImagenes(urlImagen);
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    crearProducto();
  };

  const crearProducto = async () => {
    const nuevoProducto = {
      nombre: nombre,
      descripcion: descripcion,
      imagenes: imagenes,
      /*
      imagenes: imagenes.map((imagen) => ({
        urlImagen: URL.createObjectURL(imagen),
      })),*/
      categoriaId: categoria,
    };
    console.log(nuevoProducto)

    try {
      const response = await axios.post(
        "http://localhost:8080/productos/registrar",
        nuevoProducto
      );
      console.log("Producto guardado:", response.data);
      const productoCreado = JSON.stringify(response.data)
      alert("PRODUCTO CREADO CORRECTAMENTE" + productoCreado)

      setNombreCard({nombre})

      setNombre("");
      setCategoria("");
      setDescripcion("");
      setImagenes([]);
      setUrlmagenes(""); 
      setTituloImagen("");

  

    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("ERROR AL CREAR PRODUCTO"+ error)
    }
  };

  return (

    <div>

      <form className="product-form" onSubmit={handleSubmit}>

        <h1>Agregar nuevos productos</h1>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            placeholder='ingrese nombre'
            value={nombre}
            onChange={handleNombreChange}
          />
        </div>
        <div className="form-group">
          <label>Descripcion:</label>
          <input
            type="text"
            name="descripcion"
            placeholder='Descripcion de producto'
            value={descripcion}
            onChange={handleDescripcionChange}
          />
        </div>
        <div className="form-group">
          <label>Titulo Imagen:</label>
          <input
            type="text"
            name="Titulo Imagen"
            placeholder='Titulo Imagen'
            value={tituloImagen}
            onChange={handleTituloImagenChange}
          />
        </div>
        <div className="form-group">
          <label>Url Imagen:</label>
          <input
            type="text"
            name="Url imagen"
            placeholder='Url imagen'
            value={urlImagen}
            onChange={handleUrlImagenChange}
          />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            placeholder='Categoria N°'
            value={categoria}
            onChange={handleCategoriaChange}
          />
        </div>



        {/*  <div className="form-group">
        <label>Subir imágenes:</label>
        <ImageUploader
          withIcon={true}
           buttonText="Seleccionar imágenes"
          onChange={handleImageUpload}
          imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
          maxFileSize={5242880} // 5MB
        />
      </div>*/}

        <button type="submit" onClick={handleAgregarImagen}>
          <img src="./img/save.png" alt="Imagen del botón" className='saveButton' />
          Guardar Producto
        </button>
      </form>
    </div>
  
  );
};

export default FormProduct;
