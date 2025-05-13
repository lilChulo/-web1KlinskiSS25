import { User } from '@domain/User';  
import { LandingPagePOM } from '@pages/LandingPagePOM';  
import { StartPagePOM } from '@pages/StartPagePOM';  
import { ImpressumPagePOM } from '@pages/ImpressumPagePOM';  
import { UserManagementPOM } from '@pages/UserManagementPOM';  


export class ApplicationManager {
  
  private users: User[] = [];  // Liste aller Benutzer
  private currentUser: User | null = null;  // Der aktuell eingeloggte Benutzer
  
  private landingPagePOM: LandingPagePOM;
  private startPagePOM: StartPagePOM;
  private impressumPagePOM: ImpressumPagePOM;
  private userManagementPOM: UserManagementPOM;

  constructor() {
    console.log('ApplicationManager: Instanziert');
    
    this.users.push(new User('admin', '123', 'Manfred', 'Mustermann'));  // Standardbenutzer 'admin' hinzufügen
    
    this.landingPagePOM = new LandingPagePOM(this);
    this.startPagePOM = new StartPagePOM(this);
    this.impressumPagePOM = new ImpressumPagePOM(this);
    this.userManagementPOM = new UserManagementPOM(this);
  }

  
  // Startet die Landingpage
  public start(): void {
    this.landingPagePOM.showPage();
  }

  
  // Registrierung eines neuen Benutzers
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

  
  // Benutzeranmeldung
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

  
  // Abmeldung des aktuellen Benutzers
  public logout(): void {
    this.currentUser = null;
    this.landingPagePOM.showPage();
    this.showToast('Logout erfolgreich.', true);
  }

  
  // Anzeige einer Toast-Nachricht
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

  
  // Getter für den aktuellen Benutzer
  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  
  // Anzahl der registrierten Benutzer
  public getUserCount(): number {
    return this.users.length;
  }

  
  // Getter für LandingPage POM
  public getLandingPagePOM(): LandingPagePOM {
    return this.landingPagePOM;
  }

  
  // Getter für StartPage POM
  public getStartPagePOM(): StartPagePOM {
    return this.startPagePOM;
  }

  
  // Getter für ImpressumPage POM
  public getImpressumPagePOM(): ImpressumPagePOM {
    return this.impressumPagePOM;
  }

  
  // Getter für UserManagementPage POM
  public getUserManagementPOM(): UserManagementPOM {
    return this.userManagementPOM;
  }

  
  // LandingPage anzeigen
  public showLandingPage(): void {
    this.landingPagePOM.showPage();
  }

  
  // StartPage anzeigen
  public showStartPage(): void {
    this.startPagePOM.showPage();
  }

  
  // ImpressumPage anzeigen
  public showImpressumPage(): void {
    this.impressumPagePOM.showPage();
  }

  
  // UserManagementPage anzeigen
  public showUserManagementPage(): void {
    this.userManagementPOM.showPage();
  }
}
