import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('01- Testes do Componente "App.js"', () => {
  it('Deverá verificar se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkElHome = screen.getByRole('link', { name: /Home/i });
    expect(linkElHome).toBeInTheDocument();

    const linkElAbout = screen.getByRole('link', { name: /About/i });
    expect(linkElAbout).toBeInTheDocument();

    const linkElFavorites = screen.getByRole('link', { name: /favorite Pokémon/i });
    expect(linkElFavorites).toBeInTheDocument();
  });

  it('Deverá verificar se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link "Home" na barra de navegação ', () => {
    renderWithRouter(<App />);

    const linkElHome = screen.getByRole('link', { name: /Home/i });
    expect(linkElHome).toBeInTheDocument();

    userEvent.click(linkElHome);

    const titlePokedex = screen.getByRole('heading', { name: /Pokédex/i });

    expect(titlePokedex).toHaveTextContent(/Pokédex/i);
    expect(titlePokedex).toBeInTheDocument();
  });

  it('Deverá verificar se a aplicação é redirecionado para a página de "About", na Url "/about" ao clicar no link "About" da barra de navegação ', () => {
    renderWithRouter(<App />);

    const linkElAbout = screen.getByRole('link', { name: /About/i });
    const textEl = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });

    expect(linkElAbout).toBeInTheDocument();
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent(/Encountered/i);

    userEvent.click(linkElAbout);

    expect(textEl).not.toBeInTheDocument();
  });

  it('Deverá verificar se a aplicação é redirecionada para a página de "Pokémon Favorites", na URL "/favorites", ao clicar no link "Favorite Pokémon" da barra de navegação', () => {
    renderWithRouter(<App />);

    const linkElFavorites = screen.getByRole('link', { name: /Favorite Pokémon/i });
    const textEl = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });

    expect(linkElFavorites).toBeInTheDocument();
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent(/Encountered/i);

    userEvent.click(linkElFavorites);

    expect(textEl).not.toBeInTheDocument();
  });

  it('Deverá verificar se a aplicação é redirecionada para a página "Not Found" ao entrar em uma URL desconhecida ', () => {
    const { history } = renderWithRouter(<App />);
    const textEl = screen.getByRole('heading', { name: /Encountered Pokémon/i });

    act(() => {
      history.push('/hdfidd');
    });
    screen.logTestingPlaygroundURL();

    expect(textEl).not.toBeInTheDocument();
  });
});
