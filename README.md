# Recipe Calculator

PWA for calculating the cost of cake and pastry recipes.

> Developed with [opencode](https://opencode.ai) using the **minimax 2.7** model.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Vue 3 (Composition API) |
| Build tool | Vite |
| Styling | Tailwind CSS |
| PWA | vite-plugin-pwa |
| AI | opencode + minimax 2.7 |

## Features

- **Ingredient management**: Add ingredients with package quantity, unit and price
- **Cost calculation**: Automatically calculates recipe costs
- **Copy recipes**: Duplicate existing recipes to create variations
- **PWA**: Works offline, installable on mobile
- **Auto-update**: Detects new versions when returning to the app

## Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Usage

1. **Ingredients**: Go to "Ingredientes" and add your frequently used ingredients
2. **Recipes**: Create a recipe, select ingredients and specify quantities
3. **Cost**: Automatically calculated using simple ratio (rule of three)
4. **Copy**: Use the "Copiar" button to duplicate a recipe as a base

## PWA Installation

### iOS
Safari → Share → "Add to Home Screen"

### Android
Menu (⋮) → "Install app" or "Add to Home Screen"

---

Data is stored in the browser's `localStorage`.