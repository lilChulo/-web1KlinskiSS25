interface User {
    id: string;
    password: string;
}
    export class ApplicationManager {
    private static instance: ApplicationManager;
    
    private users: Map<string, string>; // Map<userId, password> 
    private loggedInUser: string | null;

    private constructor() {

    this.users = new Map();
    this.loggedInUser = null;

    // Admin-User anlegen
    this.addUser ("admin", "admin");
    }

    public static getInstance(): ApplicationManager {
    if (!ApplicationManager.instance) {
    ApplicationManager.instance = new ApplicationManager(); 
}

    return ApplicationManager.instance;
}
    public addUser(userId: string, password: string): boolean {

    
    if (!userId || !password || this.users.has(userId)) {
        return false;
}
this.users.set (userId, password);
return true;
    }


public login(userId: string, password: string): boolean {
if (!userId || !password) return false;
const storedPassword = this.users.get (userId);

if (storedPassword && storedPassword === password) {
    this.loggedInUser = userId;
return true;
}
return false;
}
public logout(): void {
this. loggedInUser = null;
}

public isLoggedIn(): boolean {


return this.loggedInUser !== null;
}

public getLoggedInUser(): string | null {
return this.loggedInUser;
}

public getAllUsers(): User[] {
return Array.from(this.users.entries()).map(([id, password]) => ({ id, password }));
}
}