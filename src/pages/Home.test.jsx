import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './Home';
import * as PropietarioService from '../service/PropietarioService';

vi.mock('../service/PropietarioService');

describe('Componente Home', () => {
  const mockReportes = [
    {
      propietarioId: 'prop-1',
      nombreMascota: 'Boby',
      estadoBusqueda: 'BUSCANDO',
      direccion: 'Parque Central',
      nombreDueno: 'Matias',
      razaMascota: 'Poodle',
      telefono: '+56911111111',
      image: null
    },
    {
      propietarioId: 'prop-2',
      nombreMascota: 'Michi',
      estadoBusqueda: 'ENCONTRADA',
      direccion: 'Techo del vecino',
      nombreDueno: 'Camilo',
      razaMascota: 'Angora',
      telefono: '+56922222222',
      image: null
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
   
    window.confirm = vi.fn(() => true);
  });

  it('debería mostrar estado de carga inicial y luego renderizar las tarjetas', async () => {
    PropietarioService.obtenerTodosLosReportes.mockResolvedValueOnce(mockReportes);

    render(<Home />);

    expect(screen.getByText('Cargando reportes...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Boby')).toBeInTheDocument();
    });

    expect(screen.getByText('Michi')).toBeInTheDocument();
    
    expect(PropietarioService.obtenerTodosLosReportes).toHaveBeenCalledTimes(1);
  });

  it('debería confirmar eliminación, llamar al servicio y quitar la tarjeta de la vista', async () => {
    PropietarioService.obtenerTodosLosReportes.mockResolvedValueOnce([mockReportes[0]]); 
    PropietarioService.eliminarReporte.mockResolvedValueOnce({}); 

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Boby')).toBeInTheDocument();
    });

    const btnEliminar = screen.getByRole('button', { name: /¡Ya se encontró!/i });
    fireEvent.click(btnEliminar);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    
    expect(PropietarioService.eliminarReporte).toHaveBeenCalledWith('prop-1');

    await waitFor(() => {
      expect(screen.queryByText('Boby')).not.toBeInTheDocument();
    });
  });
});