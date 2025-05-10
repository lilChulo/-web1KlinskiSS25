import { ApplicationManager } from '../ApplicationManager';

export abstract class AbstractPOM {
  protected appManager: ApplicationManager;

  constructor(appManager: ApplicationManager) {
    this.appManager = appManager;
  }

  abstract showPage(): void;
}