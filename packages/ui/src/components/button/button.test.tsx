import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from './button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('defaults to type button', () => {
    const { getByRole } = render(<Button>Save</Button>);

    expect(getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('fires click handlers when enabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Save</Button>);

    getByRole('button', { name: 'Save' }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('marks loading buttons busy and disabled', () => {
    const { getByRole } = render(<Button loading>Save</Button>);

    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
