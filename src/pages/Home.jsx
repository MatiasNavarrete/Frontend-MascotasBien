import React, { useEffect, useState } from 'react';
import { obtenerTodosLosReportes, eliminarReporte } from '../service/PropietarioService';
import '../styles/Home.css';

const Home = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const data = await obtenerTodosLosReportes();
      setReportes(data);
    } catch (error) { 
      console.error("Error cargando datos:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Confirmas que la mascota ya apareció?")) {
      try {
        await eliminarReporte(id);
        // Ojo: En tu DTO se llama propietarioId
        setReportes(reportes.filter(r => r.propietarioId !== id));
      } catch (error) { 
        alert("No se pudo eliminar el reporte."); 
      }
    }
  };

  return (
    <div className="home-container">
      <h1>🐾 Comunidad Mascotas Bien</h1>

      {loading ? <p>Cargando reportes...</p> : (
        <div className="reportes-grid">
          {reportes.map((reporte) => (
            <div key={reporte.propietarioId} className="mascota-card">
              
              <div className="card-image-container" style={{ backgroundColor: '#f0f0f0', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {reporte.image ? (
                  <img 
                    src={reporte.image} 
                    alt="Mascota"
                    className="mascota-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<span style="font-size: 60px;">🐶</span>';
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '60px' }}>🐶</span>
                )}
              </div>

              <div className="card-body">
                {/* Mapeo de estilos para el badge */}
                <span className={`badge ${reporte.estadoBusqueda === 'BUSCANDO' ? 'BUSCANDO' : 'ENCONTRADA'}`}>
                  {reporte.estadoBusqueda}
                </span>

                {/* --- CAMBIO AQUÍ: Nombres exactos del DTO de Java --- */}
                <h3>{reporte.nombreMascota || "Mascota sin nombre"}</h3>
                <p>📍 <strong>Visto en:</strong> {reporte.direccion || "No informada"}</p>
                
                <div className="contacto-info">
                   <p><strong>Dueño:</strong> {reporte.nombreDueno}</p>
                   <p><strong>Raza:</strong> {reporte.razaMascota}</p>
                   
                   <div className="botones-contacto">
                      <a href={`tel:${reporte.telefono}`} className="btn-contacto call">
                        📞 {reporte.telefono || "Llamar"}
                      </a>
                   </div>
                </div>

                <button className="btn-encontrado" onClick={() => handleEliminar(reporte.propietarioId)}>
                  🎉 ¡Ya se encontró!
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;