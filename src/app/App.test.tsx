import { render, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Blur an image', () => {
    let container: HTMLDivElement | null = null;
    act(() => {
      container = render(<App />).container as HTMLDivElement;
    });
    expect((container as unknown as HTMLDivElement).textContent).toBe('Blur an imageimg {  filter: blur(75px);}');
  });
});
