import { LandingPagePOM } from './pages/LandingPagePOM';
import { StartPagePOM } from './pages/StartPagePOM';
import { ImpressumPagePOM } from './pages/ImpressumPagePOM';
import { UserManagementPOM } from './pages/UserManagementPOM';
import { User } from '@domain/User';

// Zentrale Verwaltung der App (UI-Logik & Nutzersteuerung)
export class ApplicationManager {
  private currentUser: User | null = null;
  private usersCache: User[] = [];

  private landingPagePOM: LandingPagePOM;
  private startPagePOM: StartPagePOM;
  private impressumPagePOM: ImpressumPagePOM;
  private userManagementPOM: UserManagementPOM;

  constructor() {
    console.log('ApplicationManager: initialisiert');

    // Seiten-Objekte erzeugen
    this.landingPagePOM = new LandingPagePOM(this);
    this.startPagePOM = new StartPagePOM(this);
    this.impressumPagePOM = new ImpressumPagePOM(this);
    this.userManagementPOM = new UserManagementPOM(this);
  }

  // Einstiegspunkt
  public async start(): Promise<void> {
    await this.ensureDefaultAdminUserExists();
    await this.refreshUsersCache();
    await this.landingPagePOM.showPage();
  }

  // Prüft, ob ein Admin existiert – sonst wird einer erstellt
  private async ensureDefaultAdminUserExists(): Promise<void> {
    try {
      const response = await fetch('/api/users/admin');

      if (response.status === 404) {
        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

  // Login-Funktion mit Basic Auth
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
          Authorization: `Basic ${basicAuth}`,
        },
      });

      if (response.ok) {
        this.currentUser = await response.json();
        await this.refreshUsersCache();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login-Fehler:', error);
      return false;
    }
  }

  // Logout: User wird entfernt und zur Startseite navigiert
  public logout(): void {
    this.currentUser = null;
    this.landingPagePOM.showPage();
    this.showToast('Logout erfolgreich.', true);
  }

  // Registrierung eines neuen Users
  public async registerUser(
    userId: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<boolean> {
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

  // Aktualisiert einen bestehenden Nutzer
  public async updateUser(user: User): Promise<boolean> {
    try {
      const response = await fetch(`/api/users/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        this.showToast('Benutzer erfolgreich aktualisiert.', true);
        await this.refreshUsersCache();
        return true;
      } else {
        const errorData = await response.json();
        this.showToast(errorData.message || 'Aktualisierung fehlgeschlagen.', false);
        return false;
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Benutzers:', error);
      this.showToast('Fehler beim Aktualisieren des Benutzers.', false);
      return false;
    }
  }

  // Löscht einen Nutzer
  public async deleteUser(userId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.showToast('Benutzer erfolgreich gelöscht.', true);
        await this.refreshUsersCache();
        return true;
      } else {
        const errorData = await response.json();
        this.showToast(errorData.message || 'Löschen fehlgeschlagen.', false);
        return false;
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Benutzers:', error);
      this.showToast('Fehler beim Löschen des Benutzers.', false);
      return false;
    }
  }

  // Alle Nutzer von der API laden
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

  // Aktualisiert lokalen Cache
  public async refreshUsersCache(): Promise<void> {
    this.usersCache = await this.fetchUsers();
  }

  // Anzahl der geladenen Nutzer (aus dem Cache)
  public getUserCount(): number {
    return this.usersCache.length;
  }

  // Zeigt eine Benachrichtigung an (Toast)
  public showToast(message: string, success: boolean): void {
    const toast = document.getElementById('toast');

    if (!toast) {
      console.error('Toast-Element nicht gefunden');
      return;
    }

    toast.textContent = message;
    toast.className = `toast ${success ? 'success' : 'error'}`;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  // Getter-Methoden für aktuelle Daten und Seiten
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

  // Navigationsmethoden für Seiten
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
