// landingPageExtras.ts

/**
 * Fügt im Top-Menü einen Button hinzu, der einen einfachen Dialog öffnet.
 * Der Button wird in das vorhandene Element mit ID 'TopMenu' eingefügt.
 */
export function addDialogButton(topMenuId: string, buttonId: string, dialogMessage: string): void {
  const topMenu = document.getElementById(topMenuId);
  if (!topMenu) return;

  // Button erstellen
  const btn = document.createElement('button');
  btn.id = buttonId;
  btn.className = 'btn btn-info ms-2'; // z.B. Bootstrap-Klasse + margin-left
  btn.textContent = 'Info Dialog';

  // Event: Dialog anzeigen
  btn.addEventListener('click', () => {
    alert(dialogMessage);
  });

  // Button an TopMenu anhängen
  topMenu.appendChild(btn);
}

/**
 * Zählt, wie oft sich ein User mit falschen Credentials eingeloggt hat.
 * Die Funktion liefert eine Closure zurück, die aufgerufen wird, wenn ein Login fehlschlägt,
 * und gibt die aktuelle Anzahl der Fehlversuche zurück.
 */
export function createFailedLoginCounter() {
  let failedCount = 0;

  return function registerFailedLoginAttempt(): number {
    failedCount++;
    return failedCount;
  };
}

/**
 * Fügt ein Textfeld (readonly) im Top-Menü hinzu, um die Anzahl der erfolgreichen Logins anzuzeigen.
 * Die Anzahl kann per updateLoginCount-Funktion aktualisiert werden.
 */
export function addLoginCountDisplay(topMenuId: string, displayId: string): (count: number) => void {
  const topMenu = document.getElementById(topMenuId);
  if (!topMenu) return () => {};

  const display = document.createElement('input');
  display.id = displayId;
  display.type = 'text';
  display.readOnly = true;
  display.value = 'Login Count: 0';
  display.className = 'form-control ms-2'; // Styling

  topMenu.appendChild(display);

  // Rückgabe: Funktion zum Update der Anzeige
  return function updateLoginCount(count: number): void {
    display.value = `Login Count: ${count}`;
  };
}

/**
 * Zeigt einen einfachen modalen Dialog mit einem gegebenen Titel und Nachricht an.
 * (Kann in Zukunft ausgebaut werden, hier nur alert als Platzhalter)
 */
export function showModalDialog(title: string, message: string): void {
  alert(`${title}\n\n${message}`);
}

/**
 * Fügt einen Link zum Datenschutz im Top-Menü hinzu.
 * Klick auf den Link löst eine Callback-Funktion aus (z.B. Anzeige der Datenschutz-Seite).
 */
export function addPrivacyLink(topMenuId: string, linkId: string, onClickCallback: () => void): void {
  const topMenu = document.getElementById(topMenuId);
  if (!topMenu) return;

  const link = document.createElement('a');
  link.href = '#';
  link.id = linkId;
  link.textContent = 'Datenschutz';
  link.className = 'nav-link ms-3'; // Styling und Abstand

  link.addEventListener('click', (e) => {
    e.preventDefault();
    onClickCallback();
  });

  // Falls TopMenu hat ein ul.navbar-nav, Link dort einfügen, sonst einfach anhängen
  const navUl = topMenu.querySelector('ul.navbar-nav');
  if (navUl) {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.appendChild(link);
    navUl.appendChild(li);
  } else {
    topMenu.appendChild(link);
  }
}
