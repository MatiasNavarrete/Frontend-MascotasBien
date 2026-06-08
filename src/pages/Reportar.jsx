import React, { useState } from 'react';
import { registrarPropietarioYPet } from '../service/PropietarioService';
import '../styles/Reportar.css';

const Reportar = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '+569',
    address: '', 
    tipoPropietario: 'NATURAL',
    estadoCuenta: 'ACTIVO',
    estadoBusqueda: 'BUSCANDO',
    mascotaNombre: '', 
  });

  const [imageFile, setImageFile] = useState(null);

  // Función para convertir archivo a Base64 (Para enviar como JSON)
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64Image = "";
      if (imageFile) {
        base64Image = await toBase64(imageFile);
      }

      
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        tipoPropietario: formData.tipoPropietario,
        estadoCuenta: formData.estadoCuenta,
        estadoBusqueda: formData.estadoBusqueda,
        nameMascota: formData.mascotaNombre, 
        image: base64Image 
      };

      await registrarPropietarioYPet(payload);
      alert(`¡Éxito! Registro completado para ${formData.mascotaNombre}`);
      
    } catch (err) {
      console.error("Error en el registro:", err);
      alert("Error al registrar. Asegúrate de completar todos los campos correctamente o no haber registrado a una mascota ya registrada.");
    }
  };

  return (
    <div className="reportar-container">
      <h2>📢 Registro de Reporte Dinámico</h2>
      <form onSubmit={handleSubmit} className="reportar-form">
        <input type="text" placeholder="Primer Nombre y primer apellido" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Tu Correo electrónico" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="text" placeholder="Tu Teléfono" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
        
        <label>Tipo de Usuario:</label>
        <select value={formData.tipoPropietario} onChange={(e) => setFormData({...formData, tipoPropietario: e.target.value})}>
          <option value="NATURAL">Persona Natural</option>
          <option value="JURIDICO">Empresa</option>
          <option value="FUNDACION">Fundación</option>
        </select>

        <hr />
        <input type="text" placeholder="Nombre de la Mascota" value={formData.mascotaNombre} onChange={(e) => setFormData({...formData, mascotaNombre: e.target.value})} required />
        
        <label>Estado de la Mascota:</label>
        <select value={formData.estadoBusqueda} onChange={(e) => setFormData({...formData, estadoBusqueda: e.target.value})}>
          <option value="BUSCANDO">En búsqueda</option>
          <option value="ENCONTRADA">Ya la encontré</option>
        </select>

        <input type="text" placeholder="Dirección/Ubicación en donde se perdió la mascota" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
        
        <label className="label-file">Foto de la mascota:</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
        
        <button type="submit" className="btn-enviar">Registrar Reporte</button>
      </form>
    </div>
  );
};

export default Reportar;