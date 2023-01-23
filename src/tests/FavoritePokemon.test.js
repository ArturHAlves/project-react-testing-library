import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('03 - Teste o componente <FavoritePokemon.js/>', () => {
  it('Deverá verificar se é exibida na tela a mensagem "No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos.', () => {
    renderWithRouter(<FavoritePokemon />);

    const textNoFavorites = screen.getByText(/No favorite Pokémon found/i);

    expect(textNoFavorites).toBeInTheDocument();
    expect(textNoFavorites).toHaveTextContent(/No favorite Pokémon found/i);
  });

  it('Deverá verificar se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    // Página home, verificar os elementos
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveTextContent(/more details/i);

    userEvent.click(linkMoreDetails);

    // Ver detalhes do pokémon
    const titlePokemonDetails = screen.getByRole('heading', { name: /Details/i, level: 2 });
    expect(titlePokemonDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveTextContent(/details/i);

    const checkboxFavorites = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(checkboxFavorites).toBeInTheDocument();
    expect(checkboxFavorites).not.toBeChecked();

    userEvent.click(checkboxFavorites);
    expect(checkboxFavorites).toBeChecked();

    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite/i });
    expect(linkFavoritePokemon).toBeInTheDocument();

    userEvent.click(linkFavoritePokemon);

    // Verificar se o pokémon marcado está na página de Pokémons favoritos
    const titleFavoritePokémon = screen.getByRole('heading', { name: /Favorite Pokémon/i });
    expect(titleFavoritePokémon).toBeInTheDocument();
    expect(titleFavoritePokémon).toHaveTextContent(/Favorite Pokémon/i);

    const marketFavorites = screen.getByAltText(/pikachu is marked/i);
    expect(marketFavorites).toBeInTheDocument();
  });
});
