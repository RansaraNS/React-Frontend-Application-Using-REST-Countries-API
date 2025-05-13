import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';

const mockCountry = {
  name: { common: 'Sri Lanka' },
  flags: { png: 'https://flagcdn.com/w320/lk.png' },
  population: 22000000,
  region: 'Asia',
  capital: ['Sri Jayawardenepura Kotte'],
  cca3: 'LKA',
};

test('renders country card with details', () => {
  render(<CountryCard country={mockCountry} onClick={() => {}} />);

  expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
  expect(screen.getByText(/Asia/)).toBeInTheDocument();
  expect(screen.getByText(/Sri Jayawardenepura/)).toBeInTheDocument();
});