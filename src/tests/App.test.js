import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        // console.log(link.innerHTML);
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(link.innerHTML);
      });
    });
  test('Teste se ao clicar no link Home, a pagína é redirecionada ao URL /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Ao clicar no link About, a página deve ser redirecionada a URL /about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Ao clicar no link Pokémon Favoritados, a URL deve ser /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Ao clicar no link Pokémon Favoritados, a URL deve ser /favorites', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notFound');

    const notFoundTitle = screen.getByRole('heading', { name: /pokédex/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
