// next.config.mjs
export default {
    output: 'export',
    distDir: 'dist',
    basePath: '/clip-board', // Chemin vers le dépôt
    assetPrefix: '/clip-board/', // Préfixe pour charger les assets
    trailingSlash: true, // Ajoute un slash à la fin des URL
};
