import { LandingPagePOM } from './pages/LandingPagePOM';
import { StartPagePOM } from './pages/StartPagePOM';
import { ImpressumPagePOM } from './pages/ImpressumPagePOM';
import { UserManagementPOM } from './pages/UserManagementPOM';
import { User } from '@domain/User';

export class ApplicationManager {
  private currentUser: User | null = null;
  private usersCache: User[] = [];

  private landingPagePOM: LandingPagePOM;
  private startPagePOM: StartPagePOM;
  private impressumPagePOM: ImpressumPagePOM;
  private userManagementPOM: UserManagementPOM;

  constructor() {
    console.log('ApplicationManager: Instanziert');

    this.landingPagePOM = new LandingPagePOM(this);
    this.startPagePOM = new StartPagePOM(this);
    this.impressumPagePOM = new ImpressumPagePOM(this);
    this.userManagementPOM = new UserManagementPOM(this);
  }

  public async start(): Promise<void> {
    await this.ensureDefaultAdminUserExists();
    await this.refreshUsersCache();  // User Cache initial befüllen
    this.landingPagePOM.showPage();
  }

  private async ensureDefaultAdminUserExists(): Promise<void> {
    try {
      const response = await fetch('/api/users/admin');
      if (response.status === 404) {
        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'admin',
            password: '123',
            firstName: 'Manfred',
            lastName: 'Mustermann',
          }),
        });

        if (!createResponse.ok) {
          console.warn('Standard-Admin konnte nicht angelegt werden.');
        } else {
          console.log('Standard-Admin wurde automatisch angelegt.');
        }
      } else if (response.ok) {
        console.log('Standard-Admin existiert bereits.');
      } else {
        console.warn('Fehler beim Überprüfen des Admin-Users.');
      }
    } catch (error) {
      console.error('Fehler beim Anlegen des Admin-Users:', error);
    }
  }

  public async login(userId: string, password: string): Promise<boolean> {
    if (!userId || !password) {
      this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
      return false;
    }

    try {
      const basicAuth = btoa(`${userId}:${password}`);

      const response = await fetch('/api/login', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
        },
      });

      if (response.ok) {
        this.currentUser = await response.json();
        await this.refreshUsersCache();
        // Toast und Seitenwechsel NICHT hier, sondern im LandingPagePOM
        return true;
      } else {
        // Toast NICHT hier, sondern im LandingPagePOM
        return false;
      }
    } catch (error) {
      console.error('Login-Fehler:', error);
      // Toast NICHT hier, sondern im LandingPagePOM
      return false;
    }
  }

  public logout(): void {
    this.currentUser = null;
    this.landingPagePOM.showPage();
    this.showToast('Logout erfolgreich.', true);
  }

  public async registerUser(userId: string, password: string, firstName: string, lastName: string): Promise<boolean> {
    if (!userId || !password) {
      this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
      return false;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password, firstName, lastName }),
      });

      if (response.ok) {
        this.showToast('Registrierung erfolgreich.', true);
        await this.refreshUsersCache();
        return true;
      } else {
        const errorData = await response.json();
        this.showToast(errorData.message || 'Registrierung fehlgeschlagen.', false);
        return false;
      }
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      this.showToast('Fehler bei der Registrierung.', false);
      return false;
    }
  }

  public async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const users: User[] = await response.json();
        return users;
      } else {
        this.showToast('Fehler beim Laden der Nutzer.', false);
        return [];
      }
    } catch (error) {
      console.error('Fehler beim Laden der Nutzer:', error);
      this.showToast('Fehler beim Laden der Nutzer.', false);
      return [];
    }
  }

  public async refreshUsersCache(): Promise<void> {
    this.usersCache = await this.fetchUsers();
  }

  public getUserCount(): number {
    return this.usersCache.length;
  }

  public showToast(message: string, success: boolean): void {
    const toast = document.getElementById('toast');

    if (!toast) {
      console.error('ApplicationManager: Toast-Element nicht gefunden');
      return;
    }

    toast.textContent = message;
    toast.className = `toast ${success ? 'success' : 'error'}`;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
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

  public getUserManagementPOM(): UserManagementPOM {
    return this.userManagementPOM;
  }

  public showLandingPage(): void {
    this.landingPagePOM.showPage();
  }

  public showStartPage(): void {
    this.startPagePOM.showPage();
  }

  public showImpressumPage(): void {
    this.impressumPagePOM.showPage();
  }

  public async showUserManagementPage(): Promise<void> {
    await this.userManagementPOM.showPage();
  }
}
