import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the tournament heading', () => {
    render(<App />);
    expect(screen.getByText(/group stage draw/i)).toBeInTheDocument();
  });
});
