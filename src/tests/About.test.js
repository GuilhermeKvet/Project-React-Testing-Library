import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testando componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
    const infoPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
    const moreInfoPokedex = screen.getByText(/One can filter Pokémons by type/i);
    expect(moreInfoPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
    const moreInfoPokedex = screen.getByText(/One can filter Pokémons by type/i);
    expect(moreInfoPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem da Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img', { name: /Pokédex/i });
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
