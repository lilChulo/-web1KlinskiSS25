import { User } from '@domain/User';
import { LandingPagePOM } from '@pages/LandingPagePOM';
import { StartPagePOM } from '@pages/StartPagePOM';
import { ImpressumPagePOM } from '@pages/ImpressumPagePOM';

export class ApplicationManager {
  private users: User[] = [];
  private currentUser: User | null = null;
  private landingPagePOM: LandingPagePOM;
  private startPagePOM: StartPagePOM;
  private impressumPagePOM: ImpressumPagePOM;

  constructor() {
    console.log('ApplicationManager: Instanziert');
    // Standard-User "admin" anlegen
    this.users.push(new User('admin', '123', 'Manfred', 'Mustermann'));
    this.landingPagePOM = new LandingPagePOM(this);
    this.startPagePOM = new StartPagePOM(this);
    this.impressumPagePOM = new ImpressumPagePOM(this);
  }

  public start(): void {
    this.landingPagePOM.showPage();
  }

  public registerUser(userId: string, password: string, firstName: string, lastName: string): boolean {
    if (!userId || !password) {
      this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
      return false;
    }
    if (this.users.find(u => u.userId === userId)) {
      this.showToast('User-ID existiert bereits.', false);
      return false;
    }
    this.users.push(new User(userId, password, firstName, lastName));
    this.showToast('Registrierung erfolgreich.', true);
    return true;
  }

  public login(userId: string, password: string): boolean {
    if (!userId || !password) {
      this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
      return false;
    }
    const user = this.users.find(u => u.userId === userId && u.password === password);
    if (user) {
      this.currentUser = user;
      this.showToast('Login erfolgreich.', true);
      this.startPagePOM.showPage();
      return true;
    }
    this.showToast('Login fehlerhaft.', false);
    return false;
  }

  public logout(): void {
    this.currentUser = null;
    this.landingPagePOM.showPage();
  }

  public showToast(message: string, success: boolean): void {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.className = `toast ${success ? 'success' : 'error'}`;
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getUserCount(): number {
    return this.users.length;
  }

  public getLandingPagePOM(): LandingPagePOM {
    return this.landingPagePOM;
  }

  public getStartPagePOM(): StartPagePOM {
    return this.startPagePOM;
  }

  public getImpressumPagePOM(): ImpressumPagePOM {
    return this.impressumPagePOM;
  }
}