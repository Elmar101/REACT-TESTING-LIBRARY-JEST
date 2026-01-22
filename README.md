### Jest + TypeScript (jest ile chalisdirmaq)
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

---------------------------------------------------------------------------
### vitest ile
```
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
npm i @reduxjs/toolkit react-redux
```

### vite.config.ts 
```
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
});
```

### tsconfig.ts
```
{
  "files": [],
  "compilerOptions": {
   "baseUrl": ".",
   "paths": {
     "@/*": ["src/*"]
   },
   "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "types": ["vitest/globals"],
  },
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### package.json
```
"scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest",
    "vitest": "vitest",
    "vitest:run": "vitest run",
    "vitest:ui": "vitest --ui"
  },
  ```

### mock istifade edirikse => src/setupTest.ts faylinin ichini deyisirik
```
import '@testing-library/jest-dom';
import { server } from "@/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### eger "Cannot find module '@/mocks/server' or its corresponding type declarations." bele error varsa 
tsconfig.app.json (əgər mövcuddursa)
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
``` 
=> yuxaridaki kodu elave edirik


### tsconfig.ts
```
{
  "files": [],
  "compilerOptions": {
   "baseUrl": ".",
   "paths": {
     "@/*": ["src/*"]
   },
   "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "types": ["vitest/globals"],
  },
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### jest.config.ts fayli yoxdursa yarat ve asaqidaki kodu elave et
```
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;
```
  
