import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('05- Teste o componente "Pokedex"', () => {
  it('Deverá verificar se a página contém um heading "h2" com o texto "Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titlePokédex = screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });

    expect(titlePokédex).toBeInTheDocument();
    expect(titlePokédex).toHaveTextContent(/Encountered Pokémon/i);
  });

  it('Deverá verificar se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    const pokemons = ['Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];

    renderWithRouter(<App />);

    // Botão próximo
    const btnNextEl = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextEl).toBeInTheDocument();
    expect(btnNextEl).toHaveTextContent(/Próximo/i);

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(btnNextEl);
    });

    // Verificar se está passando um por um
    const pokemonOne = screen.getByText(pokemons[0]);
    expect(pokemonOne).toBeInTheDocument();

    userEvent.click(btnNextEl);

    const pokemonTwo = screen.getByText(pokemons[1]);
    expect(pokemonTwo).toBeInTheDocument();
  });

  it('Verificar se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).toHaveTextContent(/All/i);

    const btnType = screen.getAllByTestId('pokemon-type-button');

    btnType.forEach((type) => {
      expect(type).toBeInTheDocument();
    });
  });

  it('Deverá verificar se a Pokédex contém um botão pra resetar o filtro', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    const btnFilter = screen.getByRole('button', { name: /Bug/i });
    expect(btnFilter).toBeInTheDocument();

    // Vai Clicar no botão de filtrar para Bug
    userEvent.click(btnFilter);

    expect(pokemonName).not.toHaveTextContent(/pikachu/i);
    expect(pokemonName).toHaveTextContent(/caterpie/i);

    const btnReset = screen.getByRole('button', { name: /all/i });
    expect(btnReset).toBeInTheDocument();
    expect(btnReset).toHaveTextContent(/all/i);

    // Vai clicar no botão de resetar(all), voltando para o Pokemon Pikachu
    userEvent.click(btnReset);

    expect(pokemonName).not.toHaveTextContent(/caterpie/i);
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
});
