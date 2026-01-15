import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p data-testid="count">Say: {count}</p>
      <button onClick={() => setCount(count + 1)}>Artır</button>
    </div>
  );
};

export default Counter;


import { render, screen, fireEvent } from '@testing-library/react';

describe('Counter component', () => {
  test('ilk renderdə 0 göstərir', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('button kliklənəndə say artır', () => {
    render(<Counter />);
    const button = screen.getByText('Artır');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });
});
