import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se as informações detalhadas do pokémon são mostradas na tela',
  () => {
    test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon',
      () => {
        renderWithRouter(<App />);
        const moreDetailsLink = screen.getByRole('link', {
          name: /more details/i,
        });

        userEvent.click(moreDetailsLink);

        const detailsTitle = screen.getByRole('heading', {
          name: /pikachu details/i,
        });

        expect(detailsTitle).toBeInTheDocument();
      });

    test('Não deve existir o link de navegação para os detalhes do pokémon selecionado',
      () => {
        renderWithRouter(<App />);
        const moreDetailsLink = screen.getByRole('link', {
          name: /more details/i,
        });

        userEvent.click(moreDetailsLink);

        expect(moreDetailsLink).not.toBeInTheDocument();
      });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary',
      () => {
        renderWithRouter(<App />);
        const moreDetailsLink = screen.getByRole('link', {
          name: /more details/i,
        });

        userEvent.click(moreDetailsLink);

        const summaryTitle = screen.getByRole('heading', {
          name: /summary/i, level: 2,
        });
        expect(summaryTitle).toBeInTheDocument();
      });

    test('Deve contem um resumo do pokemon específico sendo visualizado',
      () => {
        renderWithRouter(<App />);
        const moreDetailsLink = screen.getByRole('link', {
          name: /more details/i,
        });

        userEvent.click(moreDetailsLink);

        const summaryPokemon = screen.getByText(/This intelligent Pokémon roasts/i);
        expect(summaryPokemon).toBeInTheDocument();
      });
  });

describe('Teste se existe uma seção com os mapas contendo as localizações do pokémon',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(moreDetailsLink).toBeInTheDocument();

      userEvent.click(moreDetailsLink);
    });

    test('Deve existir um heading com o texto "Game Locations of <name>"',
      () => {
        const locationsTitle = screen.getByRole('heading', {
          name: /Game Locations of Pikachu/i, level: 2,
        });
        expect(locationsTitle).toBeInTheDocument();
      });

    test('Todas as localizações do pokémon devem ser mostradas na seção de detalhes',
      () => {
        const locations = screen.getAllByRole('img', {
          name: /pikachu location/i,
        });
        expect(locations).toHaveLength(2);
      });

    test('Devem ser exibidos o nome da localização e uma imagem do mapa',
      () => {
        const locationImage = screen.getAllByRole('img', {
          name: /pikachu location/i,
        });
        locationImage.forEach((location) => {
          expect(location).toBeInTheDocument();
          expect(location.alt).toBe('Pikachu location');
        });
        const firstLocationName = screen.getByText(/Kanto Viridian Forest/i);
        expect(firstLocationName).toBeInTheDocument();
        const secondLocationName = screen.getByText(/Kanto Power Plant/i);
        expect(secondLocationName).toBeInTheDocument();
      });

    test('A imagem da localização deve ter um atributo src com a URL da localização',
      () => {
        const locations = screen.getAllByRole('img', {
          name: /pikachu location/i,
        });
        expect(locations[0].src).toContain('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
        expect(locations[1].src).toContain('https://pwo-wiki.info/images/5/5b/Pp.gif');
      });
  });

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    test('A página deve exibir um checkbox que permite favoritar o pokémon',
      () => {
        renderWithRouter(<App />);

        const linkDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        expect(linkDetails).toBeInTheDocument();
        userEvent.click(linkDetails);

        const favorite = screen.getByRole('checkbox');
        expect(favorite).toBeInTheDocument();
      });
    test('Clicar no checkbox duas vezes, deve favoritar e desfavoritar respectivamente',
      () => {
        renderWithRouter(<App />);

        const firstClickLinkDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        expect(firstClickLinkDetails).toBeInTheDocument();

        userEvent.click(firstClickLinkDetails);

        const firstClickFavorite = screen.getByRole('checkbox');

        userEvent.click(firstClickFavorite);

        const firstClickFavoriteList = screen.getByRole('link', {
          name: /favorite pokémons/i,
        });
        expect(firstClickFavoriteList).toBeInTheDocument();

        userEvent.click(firstClickFavoriteList);

        const namePokemonFavorited = screen.getByTestId('pokemon-name');
        expect(namePokemonFavorited).toBeInTheDocument();

        const homeLink = screen.getByRole('link', {
          name: /home/i,
        });
        expect(homeLink).toBeInTheDocument();

        userEvent.click(homeLink);

        const secondClickLinkDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        expect(secondClickLinkDetails).toBeInTheDocument();

        userEvent.click(secondClickLinkDetails);

        const secondClickFavorite = screen.getByRole('checkbox');
        expect(secondClickFavorite).toBeInTheDocument();
        userEvent.click(secondClickFavorite);

        const secondClickFavoriteList = screen.getByRole('link', {
          name: /favorite pokémons/i,
        });

        expect(secondClickFavoriteList).toBeInTheDocument();

        userEvent.click(secondClickFavoriteList);

        const notPokemonFavorited = screen.getByText(/no favorite pokemon found/i);
        expect(notPokemonFavorited).toBeInTheDocument();
      });
    test('O label do checkbox deve conter o texto Pokémon favoritado?',
      () => {
        renderWithRouter(<App />);

        const linkDetails = screen.getByRole('link', {
          name: /more details/i,
        });
        expect(linkDetails).toBeInTheDocument();
        userEvent.click(linkDetails);

        const labelCheckBox = screen.getByLabelText(/Pokémon favoritado?/i);
        expect(labelCheckBox).toBeInTheDocument();
      });
  });
