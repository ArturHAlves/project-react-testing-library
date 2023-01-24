import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('06- Teste o componente "Pokemon"', () => {
  describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('O nome correto do Pokémon deverá ser mostrado na tela', () => {
      const pokemonName = screen.getByTestId('pokemon-name');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(/Pikachu/i);
    });

    it('O tipo correto do Pokémon deverá ser mostrado na tela', () => {
      const typePokemon = screen.getByTestId('pokemon-type');

      expect(typePokemon).toBeInTheDocument();
      expect(typePokemon).toHaveTextContent(/Electric/i);
    });

    it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida', () => {
      const weightPokemon = screen.getByTestId('pokemon-weight');

      expect(weightPokemon).toBeInTheDocument();
      expect(weightPokemon).toHaveTextContent(/average weight: 6\.0 kg/i);
    });

    it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.', () => {
      const linkImage = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
      const imgEl = screen.getByAltText(/Pikachu sprite/i);
      expect(imgEl).toBeInTheDocument();
      expect(imgEl.src).toContain(linkImage);
    });
  });

  it('Deverá verificar se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);

    const url = '/pokemon/25';
    const linkEl = screen.getByRole('link', { name: /More details/i });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute('href', url);
  });

  it('Deverá verificar se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    renderWithRouter(<App />);

    const linkEl = screen.getByRole('link', { name: /More details/i });
    expect(linkEl).toBeInTheDocument();

    // Vai clicar no link More details
    userEvent.click(linkEl);

    const titleDetails = screen.getByRole('heading', { name: /Pikachu details/i, level: 2 });
    expect(titleDetails).toBeInTheDocument();
    expect(titleDetails).toHaveTextContent(/pikachu details/i);
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/23');
    });

    const pokemon = screen.getByRole('heading', { name: /Ekans Details/i, level: 2 });
    expect(pokemon).toBeInTheDocument();
    expect(pokemon).toHaveTextContent(/Ekans details/i);
  });

  describe('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    it('O ícone deverá ser uma imagem com o atributo src conténdo o caminho "/star-icon.svg" e a imagem deve ter o atributo "alt" igual a "<Pokemon> is marked as favorite" ', () => {
      renderWithRouter(<App />);

      const url = '/pokemon/25';
      const linkEl = screen.getByRole('link', { name: /More details/i });

      expect(linkEl).toBeInTheDocument();
      expect(linkEl).toHaveAttribute('href', url);

      // Vai clicar no link More details
      userEvent.click(linkEl);

      const pokemon = screen.getByRole('heading', { name: /pikachu Details/i, level: 2 });
      expect(pokemon).toBeInTheDocument();
      expect(pokemon).toHaveTextContent(/pikachu details/i);

      const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado/i);
      expect(favoriteCheckbox).toBeInTheDocument();

      // Vai clicar no checkbox
      userEvent.click(favoriteCheckbox);

      const linkUrl = 'http://localhost/star-icon.svg';
      const imageFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
      expect(imageFavorite).toBeInTheDocument();
      expect(imageFavorite.src).toContain(linkUrl);
    });
  });
});
