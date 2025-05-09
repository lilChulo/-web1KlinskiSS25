import { ApplicationManager } from './ApplicationManager';
import { LandingPagePom } from './pages/LandingPagePOM';
 export class ApplicationLoader {
     private appManager: ApplicationManager;
    private landingPage: LandingPagePom;

     constructor() {

    this.appManager = ApplicationManager.getInstance();
this.landingPage = new LandingPagePom(this.appManager);
     }
         public static start(): void {
            new ApplicationLoader();
         }
         }