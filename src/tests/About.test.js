import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('02 - Teste o componente "About"', () => {
  it('Deverá verifica se a página contém as informações sobre a Pokèdex', () => {
    renderWithRouter(<About />);

    const infoPokedex = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i,
    );

    expect(infoPokedex).toBeInTheDocument();
    expect(infoPokedex).toHaveTextContent(/this application/i);
  });

  it('Deverá verificar se a página contém um "heading h2" com o texto "About Pokédex" ', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/About Pokédex/i);
  });

  it('Deverá verificar se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoTextOne = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i,
    );

    expect(infoTextOne).toBeInTheDocument();
    expect(infoTextOne).toHaveTextContent(
      /This application simulates a Pokédex/i,
    );

    const infoTextTwo = screen.getByText(
      /One can filter Pokémon by type, and see more details for each one of them/i,
    );

    expect(infoTextTwo).toBeInTheDocument();
    expect(infoTextTwo).toHaveTextContent(/one can filter pokémon by type/i);
  });

  it('Deverá verificar se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const srcLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgEl = screen.getByAltText(/Pokédex/i);

    expect(imgEl.src).toContain(srcLink);
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', srcLink);
  });
});
