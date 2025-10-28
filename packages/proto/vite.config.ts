import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'public');

export default defineConfig({
  appType: 'mpa',
  root,                
  publicDir: root,     // no extra public dir
  server: { port: 3000 },
  preview: { port: 4173 },
  resolve: {
    alias: {
      // keeps <script type="module" src="/src/main.ts">
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),  // write dist next to /public
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:        resolve(root, 'index.html'),
        players:      resolve(root, 'players.html'),
        teams:        resolve(root, 'teams.html'),
        games:        resolve(root, 'games.html'),
        schedule:     resolve(root, 'schedule.html'),
        playerLeBron: resolve(root, 'player-lebron.html'),
        game1:        resolve(root, 'game-1.html'),
        teamLakers:   resolve(root, 'team-lakers.html'),
      },
    },
  },
});
