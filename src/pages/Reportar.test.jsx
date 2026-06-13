import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Reportar from './Reportar';
import * as PropietarioService from '../service/PropietarioService';

vi.mock('../service/PropietarioService');

describe('Componente Reportar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn(); 
  });

  it('debería renderizar todos los campos del formulario', () => {
    render(<Reportar />);
    
    expect(screen.getByPlaceholderText(/Primer Nombre y primer apellido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre de la Mascota/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrar Reporte/i })).toBeInTheDocument();
  });

  it('debería llenar los datos, procesar la imagen y enviar el formulario exitosamente', async () => {
    PropietarioService.registrarPropietarioYPet.mockResolvedValueOnce({});

    const { container } = render(<Reportar />);

    fireEvent.change(screen.getByPlaceholderText(/Primer Nombre/i), { target: { value: 'Fade' } });
    fireEvent.change(screen.getByPlaceholderText(/Tu Correo/i), { target: { value: 'fade@informatica.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Tu Teléfono/i), { target: { value: '+56999999999' } });
    fireEvent.change(screen.getByPlaceholderText(/Dirección/i), { target: { value: 'Universidad' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de la Mascota/i), { target: { value: 'Rex' } });

    const fileInput = container.querySelector('input[type="file"]');
    const mockFile = new File(['(⌐□_□)'], 'rex.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(PropietarioService.registrarPropietarioYPet).toHaveBeenCalledTimes(1);
    });

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('¡Éxito! Registro completado para Rex'));
  });

  it('debería mostrar alerta de error si falla la comunicación con el backend', async () => {
    PropietarioService.registrarPropietarioYPet.mockRejectedValueOnce(new Error('Error de validación'));

    const { container } = render(<Reportar />);

    fireEvent.change(screen.getByPlaceholderText(/Primer Nombre/i), { target: { value: 'Fade' } });
    fireEvent.change(screen.getByPlaceholderText(/Tu Correo/i), { target: { value: 'fade@informatica.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Tu Teléfono/i), { target: { value: '+56999999999' } });
    fireEvent.change(screen.getByPlaceholderText(/Dirección/i), { target: { value: 'Universidad' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre de la Mascota/i), { target: { value: 'Michi' } });
    
    const fileInput = container.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [new File([''], 'test.png')] } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Error al registrar'));
    });
  });
});