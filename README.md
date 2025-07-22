# Dice Generator

A web browser app for designing 3D printable dice models. Inspired by other similar apps and attempts to cover their issues.

- **Convenient controls.** Double-click on a single die or its face to focus on the model and quickly find its settings.
- **Immediate changes.** Change any die settings and see the result immediately. Works with enabled rendering, too.
- **Fast.** Attempts to be fast thanks to incremental updates and [manifold](https://github.com/elalish/manifold) library.
- **SVG support.** Supports font and SVG parsing and tries to fix any self intersections thanks to [Clipper2](https://github.com/AngusJohnson/Clipper2) library.

## Running locally

```bash
pnpm install
```

```bash
pnpm run dev
```

## Dependencies

Dice Generator is possible thanks to these awesome libraries:

- **CAD:** [manifold](https://github.com/elalish/manifold), [Clipper2](https://github.com/AngusJohnson/Clipper2), [JSCAD](https://github.com/jscad/OpenJSCAD.org)
- **3D rendering:** [three.js](https://github.com/mrdoob/three.js), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **UI:** [React](https://github.com/facebook/react), [Mantine](https://github.com/mantinedev/mantine)
- **Other dev tools:** [Vite](https://github.com/vitejs/vite), [@antfu/eslint-config](https://github.com/antfu/eslint-config)
