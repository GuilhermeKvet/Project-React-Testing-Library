import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testando a página notFound', () => {
  test('Teste se contém o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i });
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
