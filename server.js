import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

const staticOptions = {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.aac')) {
      res.setHeader('Content-Type', 'audio/aac');
    }
  }
};

// Serve static assets from project root and assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets'), staticOptions));
app.use('/game', express.static(path.join(__dirname, 'game'), staticOptions));
app.use(express.static(__dirname, staticOptions));

// Fallback subfolder routing for backwards compatibility
app.use(express.static(path.join(__dirname, 'assets/characters'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/buttons'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/ui'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/backgrounds'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/audio'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/fonts'), staticOptions));
app.use(express.static(path.join(__dirname, 'assets/misc'), staticOptions));

// Fallback to index.html for root or SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Beyond The Bell game server running at http://${host}:${port}`);
});
