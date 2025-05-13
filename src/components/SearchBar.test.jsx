import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders search input and calls onSearchChange', () => {
  const mockSearchChange = jest.fn();

  render(<SearchBar searchTerm="" onSearchChange={mockSearchChange} />);

  const input = screen.getByPlaceholderText(/search for a country/i);
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'France' } });

  expect(mockSearchChange).toHaveBeenCalledWith('France');
});