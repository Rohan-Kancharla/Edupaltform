## Interactive Waves Module (Class 10)

This React + TypeScript app implements an interactive module to teach the basics of waves for Class 10 learners using simulations, simple controls, and quick checks.

### How to run locally

```
npm install
npm run dev
```

Open the shown local URL. For a production build:

```
npm run build
npm run preview
```

### Features and learning flow

- Learn section: concise concept summary and notation.
- Simulation: canvas-based rendering of y(x,t) = A sin(2π(x/λ − f t) + φ) with controls for amplitude, frequency, phase, and wave speed. Crest markers every λ reinforce wavelength.
- Key ideas: short bullet summary linking parameters to effects (e.g., λ = v/f).
- Quick Check: 3 auto-graded items with explanations; instant feedback per selection and a score on submit.

### Tech and requirements mapping

- React + TypeScript, built with Vite.
- Interactive animations: requestAnimationFrame on a 2D canvas.
- Class 10 appropriate: avoids calculus, uses clean visuals, direct relationships.
- Code quality: small, typed, componentized (`src/components/WavesModule.tsx`).

### Deploy

- Any static host works (Netlify, Vercel, GitHub Pages). Build output is in `dist/`.

### Notes

- Wave speed units are presented in px/s for simplicity on screen; the same relationships hold in SI (m/s).
