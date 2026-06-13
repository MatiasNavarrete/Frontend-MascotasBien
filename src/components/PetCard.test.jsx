import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PetCard from './PetCard';

describe('Componente PetCard', () => {
  const mockMascotaPerdida = {
    propietarioId: 'prop-123',
    nombreMascota: 'Firulais',
    estadoBusqueda: 'BUSCANDO',
    image: '',
    direccion: 'Avenida Siempreviva 742',
    nombreDueno: 'Homero',
    razaMascota: 'Kiltro',
    tipoPropietario: 'NATURAL'
  };

  it('debería renderizar la información principal de la mascota', () => {
    render(<PetCard mascota={mockMascotaPerdida} onEliminar={() => {}} />);

    expect(screen.getByText('Firulais')).toBeInTheDocument();
    expect(screen.getByText(/Avenida Siempreviva 742/i)).toBeInTheDocument();
    expect(screen.getByText(/Homero/i)).toBeInTheDocument();
    
    expect(screen.getByText('Buscando')).toBeInTheDocument();
  });

  it('debería cambiar el texto del badge si la mascota fue encontrada', () => {
    const mascotaEncontrada = { ...mockMascotaPerdida, estadoBusqueda: 'ENCONTRADA' };
    
    render(<PetCard mascota={mascotaEncontrada} onEliminar={() => {}} />);

    expect(screen.getByText('Encontrada')).toBeInTheDocument();
  });

  it('debería llamar a la función onEliminar con el ID correcto al hacer clic', () => {
    const mockOnEliminar = vi.fn(); 
    
    render(<PetCard mascota={mockMascotaPerdida} onEliminar={mockOnEliminar} />);

    const botonEncontrado = screen.getByText('🎉 ¡Ya se encontró!');
    fireEvent.click(botonEncontrado);

    expect(mockOnEliminar).toHaveBeenCalledTimes(1);
    expect(mockOnEliminar).toHaveBeenCalledWith('prop-123');
  });
});