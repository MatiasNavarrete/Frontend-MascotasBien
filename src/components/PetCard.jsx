import '../styles/PetCard.css';
import React from 'react';

const PetCard = ({ mascota, onEliminar }) => { 

  const esPerdido = mascota.estadoBusqueda === 'BUSCANDO';

  let textoEstado = 'Desconocido';
  if (mascota.estadoBusqueda === 'BUSCANDO') {
    textoEstado = 'Buscando';
  } else if (mascota.estadoBusqueda === 'ENCONTRADA') {
    textoEstado = 'Encontrada';
  }

  return (
    <div className="pet-card">
      <div className="image-container">
      <img 
        src={
          mascota.image 
            ? (mascota.image.startsWith('data:') ? mascota.image : `data:image/png;base64,${mascota.image}`)
            : 'https://via.placeholder.com/150'
        } 
        alt={mascota.nombreMascota || 'Mascota'}
        className="pet-image" 
      />
        
        <span className={`status-badge ${esPerdido ? 'badge-alert' : 'badge-success'}`}>
          {textoEstado}
        </span>
      </div>

      <div className="pet-info">
        <h3 className="pet-name">{mascota.nombreMascota || mascota.name || 'Mascota sin nombre'}</h3>
        
        <p className="location">
          📍 <strong>Perdido en:</strong> {mascota.direccion || 'Ubicación no informada'}
        </p>
        
        <p className="owner-info">
          <strong>Dueño:</strong> {mascota.nombreDueno || 'No informado'}
        </p>

        <p className="breed-info">
          <strong>Raza:</strong> {mascota.razaMascota || 'No informada'} • <strong>Tipo:</strong> {mascota.tipoPropietario || 'No informado'}
        </p>
        
        <div className="button-group">
            <button className="btn-detail">Ver más información</button>
            <button 
              className="btn-encontrado" 
              onClick={() => onEliminar(mascota.propietarioId)}
            >
              🎉 ¡Ya se encontró!
            </button> 
        </div>
      </div>
    </div>
  );
};

export default PetCard;