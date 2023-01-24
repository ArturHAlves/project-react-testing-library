import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente "PokemonDetails"', () => {
  describe('Teste se as informações detalhadas do Pokémon selecionado são mostrados na tela', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('A página deverá conter um texto "<name> Details"', () => {
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      // Clicando no More Details
      userEvent.click(linkDetails);

      const titleDetails = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
      expect(titleDetails).toBeInTheDocument();
      expect(titleDetails).toHaveTextContent('Pikachu Details');
    });

    it('Não deve exisitir o link de navegação para os detalhes do Pokémon', () => {
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      expect(linkDetails).toBeInTheDocument();

      // Clicando no More Details
      userEvent.click(linkDetails);

      expect(linkDetails).not.toBeInTheDocument();
    });

    it('A seção de detalhes deve conter um heading "H2" com o texto "Summary"', () => {
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      // Clicando no More Details
      userEvent.click(linkDetails);

      const textSummary = screen.getByRole('heading', { name: /summary/i, level: 2 });
      expect(textSummary).toBeInTheDocument();
      expect(textSummary).toHaveTextContent('Summary');
    });

    it('A seção de detalhes deverá conter um parágrafo com o resumo do Pokémon especifico sendo visualizado', () => {
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      // Clicando no More Details
      userEvent.click(linkDetails);

      const resumePokemon = /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i;
      const paragraph = screen.getByText(resumePokemon);

      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(resumePokemon);
    });
  });

  describe('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(linkDetails);
    });

    it('Na seção de detalhes deverá existir um heading "h2" com o texto "Game Location of <name>', () => {
      const titleLocation = screen.getByRole('heading', { name: /Game locations of Pikachu/i });
      expect(titleLocation).toBeInTheDocument();
      expect(titleLocation).toHaveTextContent('Game Locations of Pikachu');
    });

    it('Devem ser exibidos o nome da localização na seção de detalhes', () => {
      const paragraphLocationOne = screen.getByText(/Kanto Viridian Forest/i);
      expect(paragraphLocationOne).toBeInTheDocument();
      expect(paragraphLocationOne).toHaveTextContent('Kanto Viridian Forest');

      const paragraphLocationTwo = screen.getByText(/Kanto Power Plant/i);
      expect(paragraphLocationTwo).toBeInTheDocument();
      expect(paragraphLocationTwo).toHaveTextContent('Kanto Power Plant');
    });

    it('A imagem da localização deve ter um atributo src com a URL da localização e também deve ter o atributo "alt" com o texto "<name> location', () => {
      const locationUrlOne = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
      const imgLocation = screen.getAllByAltText(/pikachu location/i);
      expect(imgLocation[0]).toBeInTheDocument();
      expect(imgLocation[0].src).toContain(locationUrlOne);

      const locationUrlTwo = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';
      expect(imgLocation[1]).toBeInTheDocument();
      expect(imgLocation[1].src).toContain(locationUrlTwo);
    });
    describe('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
      it('O label do checkbox deve conter o texto Pokémon Favoritado', () => {
        const titleFavorite = screen.getByLabelText(/Pokémon favoritado/i);
        expect(titleFavorite).toBeInTheDocument();
      });

      it('A página deve existir um checkbox que permite favoritar o Pokémon e cliques alternados no checkbox devem adicionar e remover o Pokemon da lista', () => {
        const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado/i);
        expect(favoriteCheckbox).toBeInTheDocument();
        expect(favoriteCheckbox).not.toBeChecked();

        // Vai favoritar o pokémon
        userEvent.click(favoriteCheckbox);
        expect(favoriteCheckbox).toBeChecked();

        // Vai desfavoritar o pokémon
        userEvent.click(favoriteCheckbox);
        expect(favoriteCheckbox).not.toBeChecked();
      });
    });
  });
});
