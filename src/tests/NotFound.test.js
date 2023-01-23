import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('04- Testar o componente "NotFound"', () => {
  it('Deverá verificar se a página contém um heading "h2" com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const titleNotFound = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(titleNotFound).toBeInTheDocument();
    expect(titleNotFound).toHaveTextContent(/page requested not found/i);
  });
  it('Deverá verificar se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgEl = screen.getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toContain(linkImage);
    expect(imgEl).toHaveAttribute('src', linkImage);
  });
});
