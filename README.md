# Recipe Calculator

PWA para calcular el coste de recetas de tartas. Desarrollada con Vue 3 + Vite + Tailwind CSS.

## Tecnologías

- **Frontend**: Vue 3 (Composition API) + Vite
- **Estilos**: Tailwind CSS
- **Modelo IA**: [opencode](https://opencode.ai) con modelo **minimax 2.7**
- **PWA**: Service Worker con vite-plugin-pwa

## Desarrollo

```bash
npm install
npm run dev
```

## Desplegar en GitHub Pages

1. Crea un repositorio llamado `recipe-calculator` en tu GitHub
2. Sube el código:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:tu-usuario/recipe-calculator.git
git branch -M main
git push -u origin main
```

3. Despliega:
```bash
npm run deploy
```

4. Activa GitHub Pages en el repositorio:
   - Settings → Pages → Source: `gh-pages` branch
   - O también con GitHub Actions si prefieres

## Uso

1. **Ingredientes**: Añade primero los ingredientes que usas habitualmente (nombre, cantidad del paquete, unidad y precio)
2. **Recetas**: Crea recetas seleccionando ingredientes del almacén e indicando la cantidad que usa cada uno
3. **Copiar**: Duplica recetas existentes como base para crear variantes
4. El coste se calcula automáticamente con la regla de 3

Los datos se guardan en `localStorage` del navegador.

## Instalación como PWA

La app funciona sin conexión. En dispositivos móviles:
- **iOS**: Safari → Compartir → Añadir a pantalla de inicio
- **Android**: Menú (⋮) → "Instalar aplicación" o "Añadir a pantalla de inicio"

Al tenerla instalada, los cambios se detectan automáticamente cuando vuelves a la app.