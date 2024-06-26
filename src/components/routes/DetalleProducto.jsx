import React, { useContext, useState, useEffect } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { ContextGlobal, urlBackend } from '../utils/global.context';
import './DetalleProducto.css'
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom';

const pad = (number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};

const DetalleProducto = () => {

  const { id } = useParams();

  const [datosProducto, setDatosProducto] = useState(null);

  const [errorConsumeService, setErrorConsumeService] = useState('');

  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [showRange, setShowRange] = useState(false);

  const[fechasReservadas, setFechasReservadas] = useState([]);

  const navigate = useNavigate();

  //logica para que al apretar una miniatura se pase a grande
  const [imagenPrincipal, setImagenPrincipal] = useState('');
  const handleClickMiniatura = (urlImg) => {
    setImagenPrincipal(urlImg);
  };
  //esto busca la primer imagen que se renderizara al entrar
  useEffect(() => {
    if (datosProducto && datosProducto.imagenes && datosProducto.imagenes.length > 0) {
      setImagenPrincipal(datosProducto.imagenes[0].urlImg);
    }
  }, [datosProducto]);


  //esto para la "fullScreen" de la imagen , no se si funcionara con todo 
  const handleFullScreen = () => {
    const element = document.querySelector('.imagen-Detalle-Producto');

    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };
  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const traerProducto = async () => {
      const endPoint = 'productos/buscarPorId/' + id;
      const url = urlBackend + endPoint;

      try {
        const response = await axios.get(url);
        setDatosProducto(response.data);
        setFechasReservadas(response.data.reservas.map((element) => new Date(element + 'T00:00:00.000')
        ));
      } catch (error) {
        setErrorConsumeService(error.response.data.message);
      }
    }

    traerProducto();
  }, []);

  const tileDisabledCalendario = ({ date }) => {
    return (
      esFechaRestringida(fechasReservadas, date)
    );
  };

  const tileContentCalendario = ({ date, view }) => {
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0);
    fechaActual.setMilliseconds(0);
    let returnX = false;
    switch (view) {
      case 'month':
        if (esFechaRestringida(fechasReservadas, date) || date < fechaActual) {
          returnX = true;
        }
        break;
      case 'year':
        if (date < fechaActual && (date.getMonth() < fechaActual.getMonth())) {
          returnX = true;
        }
        break;
    }

    if (returnX) {
      return <span>X</span>
    }

  }

  const rangoHandle = (value, event) => {
    const [desde, hasta] = value;
    if (esRangoConFechaRestringida(fechasReservadas, desde, hasta)) {
      setShowRange(false);
      setFechaDesde(null);
      setFechaHasta(null);
    } else {
      setShowRange(true);
      setFechaDesde(desde);
      setFechaHasta(hasta);
    }
  };

  const esFechaRestringida = (fechasRestringidas, valFecha) => {
    return fechasRestringidas.some((fechaRestringida) => (
      fechaRestringida.getFullYear() === valFecha.getFullYear() &&
      fechaRestringida.getMonth() === valFecha.getMonth() &&
      fechaRestringida.getDate() === valFecha.getDate()
    ));
  };

  const esRangoConFechaRestringida = (fechasRestringidas, fechaIni, fechaFin) => {
    return fechasRestringidas.some((fechaRestringida) => (
      fechaRestringida >= fechaIni && fechaRestringida <= fechaFin
    ));
  };

  const goToConfirmarReserva = () =>{
    if(fechaDesde === null || fechaHasta === null){
      alert('Debe seleccionar un rango de fechas')
    }else{
      const fecha1 = fechaDesde.getFullYear() + '-' +
            pad(fechaDesde.getMonth() + 1) + '-' +
            pad(fechaDesde.getDate());

      const fecha2 = fechaHasta.getFullYear() + '-' +
            pad(fechaHasta.getMonth() + 1) + '-' +
            pad(fechaHasta.getDate());

      
      const url = '/reservas/confirmar?id=' + id + 
                  '&fecha1=' + encodeURIComponent(fecha1) + 
                  '&fecha2=' + encodeURIComponent(fecha2);
      
      navigate(url);
    }
  }

  return (

    <>
      <div className='container-middle'>
      {datosProducto ?
        <div className="detalle-producto-overlay">

          <article className="detalle-producto-card">
            <div className='detalle-izquierda-card'>

              <div className='barra-titulo'>
                <Link to='/'>
                  <button className='button-detalle'>
                    {<IoIosArrowBack />}</button>
                </Link>

                <span className='titulo-nombre-bici centradorTitulo'>
                  {datosProducto.nombre}
                </span>

              </div>
              <div className='fotos-detalle'>

                <img className='imagen-Detalle-Producto' src={imagenPrincipal} alt="" onClick={() => handleFullScreen()} />

                <div className="miniaturas">
                  {datosProducto.imagenes.map((imagen, index) => {
                    if (index !== 0 && index <= 4) {
                      return (
                        <img
                          key={index}
                          className='miniatura'
                          src={imagen.urlImg}
                          alt=""
                          onClick={() => handleClickMiniatura(imagen.urlImg)}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>

            </div>

            <div className='detalle-derecha-card'>
              <div className='detalle-descripcion-producto'>
                <h2 className='titulo'>Descripción del producto</h2>
                <p>{datosProducto.descripcion}</p>
                <p>asd</p>
              </div>

              <div>
                <h2 className="titulo-426">Características</h2>
                <h2 className='oculto titulo'>Características</h2>
                <div className="caracteristicas-container">
                  <div className='iconos-caracteristicas'>
                    {datosProducto.caracteristicas.map(caracteristica => (
                      <div className='container-big-item' key={caracteristica.id} title={caracteristica.nombre}>
                        <div className="caracteristica-item">
                          <img src={caracteristica.icono} alt="Icono" className="caracteristica-icon" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className='titulo'>Calendario</h2>
                <div className='container-calendar-button'>
                  <div className='buscador-seccion-calendario calendario-activo'
                    id='buscador-seccion-calendario'>
                    <Calendar showDoubleView={true} locale='es'
                      showNeighboringMonth={false}
                      selectRange={true} returnValue='range'
                      minDate={new Date()}
                      onChange={rangoHandle}
                      tileDisabled={tileDisabledCalendario}
                      tileContent={tileContentCalendario}
                      value={showRange ? [fechaDesde, fechaHasta] : null}
                    />
                  </div>
                  <div>
                    <p className='pButton-Reserva'>!Aprovecha nuestros descuentos de temporada!</p>
                    <button className='button-reserva' onClick={goToConfirmarReserva}>
                      Iniciar Reserva
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </article>
        </div>
        : <div>
          <span><b>Sin detalle</b></span>
          <hr />
          <span>{errorConsumeService}</span>
        </div>
      }

      {/* esto es para que  el botón de "Atrás" pero solo si la imagen está en pantalla completa*/}
      {document.fullscreenElement && (
        <button onClick={handleExitFullScreen}>Atrás</button>
      )}
      </div>
    </>
  )
}

export default DetalleProducto