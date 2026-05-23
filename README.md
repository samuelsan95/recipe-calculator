# Recipe Calculator

PWA para calcular el coste de recetas de tartas.

> Desarrollada con [opencode](https://opencode.ai) usando el modelo **minimax 2.7**.

## Stack tecnológico

| Categoría | Tecnología |
|----------|------------|
| Framework | Vue 3 (Composition API) |
| Build tool | Vite |
| Estilos | Tailwind CSS |
| PWA | vite-plugin-pwa |
| IA | opencode + minimax 2.7 |

## Funcionalidades

- **Gestión de ingredientes**: Añade ingredientes con cantidad de paquete, unidad y precio
- **Cálculo de costes**: Calcula automáticamente el coste de cada receta
- **Copiar recetas**: Duplica recetas existentes para crear variantes
- **PWA**: Funciona sin conexión, instalable en móvil
- **Auto-update**: Detecta nuevas versiones cuando vuelves a la app

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue en GitHub Pages

```bash
npm run deploy
```

## Uso

1. **Ingredientes**: Ve a "Ingredientes" y añade los que usas habitualmente
2. **Recetas**: Crea una receta, selecciona ingredientes e indica las cantidades
3. **Coste**: Se calcula automáticamente con la regla de 3 simple
4. **Copiar**: Usa el botón "Copiar" para duplicar una receta como base

## Instalación PWA

### iOS
Safari → Compartir → "Añadir a pantalla de inicio"

### Android
Menú (⋮) → "Instalar aplicación" o "Añadir a pantalla de inicio"

---

Los datos se guardan en `localStorage` del navegador.