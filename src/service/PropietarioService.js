import axios from "axios";

const API_URL = "http://localhost:8082/api/v1/bff";

/**
 * Obtiene los datos combinados (Dueños + Mascotas) para el dashboard.
 * Este endpoint es el que orquesta el BFF usando Feign.
 */
export const obtenerTodosLosReportes = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data; // Recibe la lista de DashboardPetResponseDto
};


export const registrarPropietarioYPet = async (formData) => {
    const response = await axios.post(`${API_URL}/registro`, formData);
    return response.data;
};

/**
 * Elimina un reporte a través del identificador UUID.
 */
export const eliminarReporte = async (id) => {
    try {
        await axios.delete(`${API_URL}/propietario/${id}`);
    } catch (error) {
        console.error("Error al eliminar el reporte:", error);
        throw error; 
    }
};