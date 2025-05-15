// __tests__/FormField.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('FormField', () => {
  const baseProps = {
    id: 'test-input',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
  };

  it('renders the label and input correctly', () => {
    render(<FormField {...baseProps} />);

    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the placeholder when provided', () => {
    render(<FormField {...baseProps} placeholder="Enter something..." />);
    expect(
      screen.getByPlaceholderText('Enter something...')
    ).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<FormField {...baseProps} />);
    const input = screen.getByLabelText(/Test Label/i);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('displays error text when error is provided', () => {
    render(<FormField {...baseProps} error="Required field" />);
    expect(screen.getByText(/Required field/i)).toBeInTheDocument();
  });

  it('respects custom input type and inputMode', () => {
    render(
      <FormField
        {...baseProps}
        type="tel"
        inputMode="numeric"
        placeholder="Phone"
      />
    );
    const input = screen.getByPlaceholderText('Phone');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('inputmode', 'numeric');
  });
});
