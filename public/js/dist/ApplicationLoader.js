var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApplicationManager } from './ApplicationManager.js';
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ApplicationLoader: DOMContentLoaded');
    try {
        const appManager = new ApplicationManager();
        console.log('ApplicationLoader: ApplicationManager instanziert');
        yield appManager.start();
        console.log('ApplicationLoader: ApplicationManager.start aufgerufen');
    }
    catch (error) {
        console.error('ApplicationLoader: Fehler beim Starten', error);
    }
}));
