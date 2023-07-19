import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Inspiration Board heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Inspiration Board/i });
  expect(headingElement).toBeInTheDocument();
});