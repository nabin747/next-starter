import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByText('Deploy')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Button variant="secondary">CTA</Button>);
    const button = screen.getByText('CTA');
    expect(button.className).toMatch(/bg-(indigo|cyan)/);
  });
});
