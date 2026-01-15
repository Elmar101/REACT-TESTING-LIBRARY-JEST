### Jest + TypeScript
1) install
``` 
1. bun add -d jest ts-jest @types/jest ts-node jest-environment-jsdom 
2. bun add -d @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

2) tsconfig.json konfiqurasiyası
```
{
  "compilerOptions": {
  "target": "ES2020",
  "module": "ESNext",
  "jsx": "react-jsx",
  "esModuleInterop": true,
  "strict": true,
  "moduleResolution": "node",
  "skipLibCheck": true
  }
}
```

3) jest.config.ts 
```
  export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
```

4) src/setupTests.ts (yoxdursa el ile yarat) ve daxiline ``` import '@testing-library/jest-dom' ``` elave et

### Nümunə component 
=> Counter.tsx
```
import { useState } from 'react';


export default function Counter() {
  const [count, setCount] = useState(0);


  return (
  <div>
  <p data-testid="count">Say: {count}</p>
  <button onClick={() => setCount(count + 1)}>Artır</button>
  </div>
  );
}
```

=> Counter.test.tsx
```
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';


test('counter starts with 0', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  });


  test('increments counter on click', async () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});
```
