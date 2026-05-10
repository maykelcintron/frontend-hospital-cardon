const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Opcional para seguridad
      nodeIntegration: true,
    },
  });

  // En desarrollo, carga el servidor de Vite
  const isDev = process.env.NODE_ENV === 'development';
  win.loadURL(
    isDev 
      ? 'http://localhost:5173' 
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});