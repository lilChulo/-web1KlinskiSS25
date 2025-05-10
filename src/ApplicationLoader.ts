import { ApplicationManager } from './ApplicationManager';

document.addEventListener('DOMContentLoaded', () => {
  console.log('ApplicationLoader: DOMContentLoaded');
  try {
    
    const appManager = new ApplicationManager();
    console.log('ApplicationLoader: ApplicationManager instanziert');
    appManager.start();
    console.log('ApplicationLoader: ApplicationManager.start aufgerufen');
  } catch (error) {
    console.error('ApplicationLoader: Fehler beim Starten', error);
  }
});