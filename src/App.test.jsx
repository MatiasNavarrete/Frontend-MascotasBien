import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as PropietarioService from './service/PropietarioService';

vi.mock('./service/PropietarioService');

describe('Navegación de la Aplicación (App y NavBar)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    PropietarioService.obtenerTodosLosReportes.mockResolvedValue([]);
  });

  it('debería renderizar el NavBar y la vista Home por defecto', async () => {
    render(<App />);

    expect(screen.getByText('🐾 Mascotas Bien')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Reportar Mascota')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('🐾 Comunidad Mascotas Bien')).toBeInTheDocument();
    });
  });

  it('debería navegar a la vista de Reportar al hacer clic en el enlace', async () => {
    render(<App />);

    const btnReportar = screen.getByText('Reportar Mascota');
    fireEvent.click(btnReportar);

    await waitFor(() => {
      expect(screen.getByText('📢 Registro de Reporte Dinámico')).toBeInTheDocument();
    });
  });

  it('debería volver a Inicio al hacer clic en el logo principal', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Reportar Mascota'));
    await waitFor(() => {
      expect(screen.getByText('📢 Registro de Reporte Dinámico')).toBeInTheDocument();
    });

    const logo = screen.getByText('🐾 Mascotas Bien');
    fireEvent.click(logo);

    await waitFor(() => {
      expect(screen.getByText('🐾 Comunidad Mascotas Bien')).toBeInTheDocument();
    });
  });
});