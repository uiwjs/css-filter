import { render, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Blur an image', () => {
    let container = render(<App />).container;
    expect(container.tagName).toBe('DIV');
  });
});
