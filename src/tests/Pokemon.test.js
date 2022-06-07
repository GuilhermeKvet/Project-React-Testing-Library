import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
      const pokemonImage = screen.getByAltText(/pikachu sprite/i);

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(/electric/i);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    });
  test('Teste se tem um link "More details" e se o link em a url /pokemon/id',
    () => {
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(moreDetailsLink).toBeInTheDocument();
      expect(moreDetailsLink.href).toContain('/pokemons/25');
    });
  test('Teste se ao clicar no link de "More details", é redirecionado a página correta',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });

      userEvent.click(moreDetailsLink);

      const detailsTitle = screen.getByRole('heading', {
        name: /pikachu details/i,
      });

      expect(detailsTitle).toHaveTextContent(/pikachu details/i);
    });
  test('Teste se a url da página é /pokemons/<id>',
    () => {
      const { history } = renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });

      userEvent.click(moreDetailsLink);

      const { pathname } = history.location;

      expect(pathname).toBe('/pokemons/25');
    });
  test('Teste se existe um ícone de estrela nos pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });

      userEvent.click(moreDetailsLink);

      const favorite = screen.getByRole('checkbox');
      expect(favorite).toBeInTheDocument();

      userEvent.click(favorite);

      const starImage = screen.getByAltText(/Pikachu is marked as favorite/i);
      expect(starImage).toBeInTheDocument();
      expect(starImage.alt).toBe('Pikachu is marked as favorite');
      expect(starImage.src).toContain('/star-icon.svg');
    });
});
