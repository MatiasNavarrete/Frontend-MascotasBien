import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { obtenerTodosLosReportes, registrarPropietarioYPet, eliminarReporte } from './PropietarioService';

vi.mock('axios');

describe('PropietarioService', () => {
  const API_URL = "http://localhost:8082/api/v1/bff";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('obtenerTodosLosReportes debería hacer un GET al endpoint de dashboard', async () => {
    const mockResponse = { data: [{ propietarioId: '1', nombreMascota: 'Rex' }] };
    axios.get.mockResolvedValueOnce(mockResponse);

    const resultado = await obtenerTodosLosReportes();

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/dashboard`);
    expect(resultado).toEqual(mockResponse.data);
  });

  it('registrarPropietarioYPet debería hacer un POST con el payload correcto', async () => {
    const mockFormData = { name: 'Fade', mascotaNombre: 'Firulais' };
    const mockResponse = { data: { id: '123', status: 'OK' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const resultado = await registrarPropietarioYPet(mockFormData);

    expect(axios.post).toHaveBeenCalledWith(`${API_URL}/registro`, mockFormData);
    expect(resultado).toEqual(mockResponse.data);
  });

  it('eliminarReporte debería hacer un DELETE con el ID correcto', async () => {
    axios.delete.mockResolvedValueOnce({}); // El delete no suele retornar data

    await eliminarReporte('prop-123');

    expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/propietario/prop-123`);
  });

  it('eliminarReporte debería lanzar un error si Axios falla', async () => {
    const errorMock = new Error('Network Error');
    axios.delete.mockRejectedValueOnce(errorMock);

    await expect(eliminarReporte('prop-123')).rejects.toThrow('Network Error');
  });
});