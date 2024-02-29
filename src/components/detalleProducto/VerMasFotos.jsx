import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";

const VerMasFotos = ({ srcImagen, nombreBici, onClose }) => {
    const ciclas = [
        {
            nombreBici: 'Haibike Bicicleta Eléctrica Adventr FS 9',
            imgBici: 'https://i.imgur.com/OFuVyJt.png'
        },
        {
            nombreBici: 'Haibike Bicicleta Eléctrica Adventr FS 9',
            imgBici: 'https://i.imgur.com/OFuVyJt.png'
        },
        {
            nombreBici: 'Haibike Bicicleta Eléctrica Adventr FS 9',
            imgBici: 'https://i.imgur.com/OFuVyJt.png'
        }
    ];

    const [fotos, setFotos] = useState(0);
    const [cantFotos, setCantFotos] = useState(ciclas.slice(0, 3));

    const proxFoto = () => {
        const proximagen = fotos === ciclas.length - 1 ? 0 : fotos + 1;
        setFotos(proximagen);
        setCantFotos(ciclas.slice(proximagen, proximagen + 3));
    };

    const fotoAnterior = () => {
        const imagAnt = fotos === 0 ? ciclas.length - 1 : fotos - 1;
        setFotos(imagAnt);
        setCantFotos(ciclas.slice(imagAnt, imagAnt + 3));
    };

    return (
        <>
           
                <button onClick={onClose} className='button button-detalle'>
                    <IoIosArrowBack /> Volver Atras
                </button>
                <h3 className='titulos'>{ciclas[0].nombreBici}</h3>
                <div className="carrusel-container">
                    <button className="carrusel-button" onClick={fotoAnterior}>{'<'}</button>

                    {/* creo que asi voy a renderizar solo 1 en celulares*/}
                    {window.innerWidth < 768 ? (
                        <div className='card-carrusel'>
                            <img
                                className="carrusel-image"
                                src={cantFotos[0].imgBici}
                                alt={cantFotos[0].nombreBici}
                            />
                        </div>
                    ) : (
                        cantFotos.map((cicla, index) => (
                            <div className='card-carrusel'>
                                <img
                                    key={index}
                                    className="carrusel-image"
                                    src={cicla.imgBici}
                                    alt={cicla.nombreBici}
                                />

                            </div>

                        ))
                    )}

                    <button className="carrusel-button" onClick={proxFoto}>{'>'}</button>
                </div>
            </>
            );
}

            export default VerMasFotos;