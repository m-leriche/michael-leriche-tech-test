import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('../helpers/validateCorporationNumber', () => ({
  validateCorporationNumber: vi.fn((num: string) => {
    if (num === '123456789') return Promise.resolve(null);
    return Promise.resolve('Invalid Corporation Number');
  }),
}));

describe('Form', () => {
  it('renders all input fields and the submit button', () => {
    render(<Form />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are missing', async () => {
    render(<Form />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Invalid Canadian phone number/i)
      ).toBeInTheDocument();
    });
  });

  it('displays success message and image on valid submission', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+11234567890' },
    });
    fireEvent.change(screen.getByLabelText(/Corporation Number/i), {
      target: { value: '123456789' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Form submitted successfully!/i)
      ).toBeInTheDocument();
      expect(screen.getByAltText(/Banner/i)).toBeInTheDocument();
    });
  });
});
