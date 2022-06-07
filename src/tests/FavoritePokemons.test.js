import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testando a página Favorite Pokemon', () => {
  test('A mensagem "No favorite pokemon found" caso não haja pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(notFavorites).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);

    const pokemonsFavorites = screen.getByTestId('pokemon-name');
    expect(pokemonsFavorites).toBeInTheDocument();
  });
});
