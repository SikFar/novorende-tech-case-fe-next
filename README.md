## Novorender Frontend Task, proving ground

Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Notes:

1. Did not write any test as the code is very simple and straightforward. I imagine the Novorender API being used
   already has test coverage.

### Potential:

1. After the setting a camera position and using the saved positions to move the camera, there is glitch on the condo
   when zooming in and out manually. This is not a consistent scenario.
2. No error handling for the API calls.
3. No loading state for the API calls.