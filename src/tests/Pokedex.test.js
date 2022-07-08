import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const pokemonTypeButton = 'pokemon-type-button';
  const pokemonType = 'pokemon-type';
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      const pokedexEl = screen.getByRole('heading', {
        name: /encountered pokémons/i, level: 2,
      });
      expect(pokedexEl).toBeInTheDocument();
    });
  test('O próximo pokémon da lista aparece quando o botão "Próximo pokémon" é clicado',
    () => {
      const nextPokemonButton = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(nextPokemonButton).toBeInTheDocument();

      userEvent.click(nextPokemonButton);

      const nextPokemonCard = screen.getByTestId('pokemon-name');
      expect(nextPokemonCard).toHaveTextContent('Charmander');

      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);

      const firstPokemonCard = screen.getByTestId('pokemon-name');
      expect(firstPokemonCard).toHaveTextContent('Pikachu');
    });

  test('Teste se é mostrado apenas um pokémon por vez',
    () => {
      const pokemonCard = screen.getAllByRole('link', {
        name: /more details/i,
      });
      expect(pokemonCard).toHaveLength(1);
    });
  test('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição',
    () => {
      const filters = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];

      const filterButtons = screen.getAllByTestId(pokemonTypeButton);

      filters.forEach((filter, index) => {
        expect(filterButtons[index]).toBeInTheDocument();
        expect(filterButtons[index]).toHaveTextContent(filter);
        const buttonQuantity = filterButtons
          .filter((button) => button.innerHTML === filter);
        expect(buttonQuantity).toHaveLength(1);
      });

      const SEVEN = 7;

      expect(filterButtons).toHaveLength(SEVEN);
    });
  test('Ao selecionar um botão de filtro, deve aparecer somente pokemons daquele tipo',
    () => {
      const filterButtonBug = screen.getByRole('button', {
        name: /bug/i,
      });

      expect(filterButtonBug).toBeInTheDocument();

      userEvent.click(filterButtonBug);

      const typePokemon = screen.getByTestId(pokemonType);

      expect(typePokemon).toBeInTheDocument();
      expect(typePokemon).toHaveTextContent('Bug');

      const nextPokemonButton = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(nextPokemonButton).toBeInTheDocument();
      expect(nextPokemonButton.disabled).toEqual(true);
    });
  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic',
    () => {
      const filters = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];

      const filterButtons = screen.getAllByTestId(pokemonTypeButton);

      filters.forEach((filter, index) => {
        expect(filterButtons[index]).toHaveTextContent(filter);
      });
    });
  test('O botão All precisa estar sempre visível',
    () => {
      const filterButtonAll = screen.getByRole('button', {
        name: /all/i,
      });

      const filterButtons = screen.getAllByTestId(pokemonTypeButton);

      filterButtons.forEach((filterButton) => {
        userEvent.click(filterButton);
        expect(filterButtonAll).toBeInTheDocument();
      });
    });
  test('Teste se a Pokédex contém um botão para resetar o filtro com o texto "All"',
    () => {
      const filterButtonAll = screen.getByRole('button', {
        name: /all/i,
      });
      expect(filterButtonAll).toBeInTheDocument();
      expect(filterButtonAll).toHaveTextContent('All');
    });
  test('Os pokémons devem aparecer normalmente quando o botão All for clicado',
    () => {
      const filterButtonAll = screen.getByRole('button', {
        name: /all/i,
      });
      const nextPokemonButton = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(filterButtonAll).toBeInTheDocument();

      userEvent.click(filterButtonAll);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);

      const typePokemon = screen.getByTestId(pokemonType);
      expect(typePokemon).toHaveTextContent(/poison/i);
    });
  test('Ao carregar a página, o filtro selecionado deverá ser All.',
    () => {
      const nextPokemonButton = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(nextPokemonButton).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);
      userEvent.click(nextPokemonButton);

      const typePokemon = screen.getByTestId(pokemonType);
      expect(typePokemon).toHaveTextContent(/poison/i);
    });
});
