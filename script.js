// === Supabase Konfiguration ===
const SUPABASE_URL = 'https://DEINE-URL.supabase.co';        // ← HIER deine Supabase-URL einfügen
const SUPABASE_ANON_KEY = 'DEIN-ANON-KEY';                   // ← HIER dein Anon-Key einfügen
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === HTML-Elemente ===
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// === Beim Laden prüfen, ob Benutzer schon eingeloggt ist ===
checkSession();

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    showApp();
  } else {
    showLogin();
  }
}

// === Login-Formular absenden ===
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
console.log('Login-Response:', error);

  if (error) {
    alert('Login fehlgeschlagen: ' + error.message);
  } else {
    showApp();
  }
});

// === Logout-Button ===
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

// === Sichtbarkeit umschalten ===
function showApp() {
  loginView.style.display = 'none';
  appView.style.display = 'block';
}

function showLogin() {
  loginView.style.display = 'block';
  appView.style.display = 'none';
}
// === Supabase Konfiguration ===
const SUPABASE_URL = 'https://DEINE-URL.supabase.co';        // ← HIER deine Supabase-URL einfügen
const SUPABASE_ANON_KEY = 'DEIN-ANON-KEY';                   // ← HIER dein Anon-Key einfügen
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === HTML-Elemente ===
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// === Beim Laden prüfen, ob Benutzer schon eingeloggt ist ===
checkSession();

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    showApp();
  } else {
    showLogin();
  }
}

// === Login-Formular absenden ===
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert('Login fehlgeschlagen: ' + error.message);
  } else {
    showApp();
  }
});

// === Logout-Button ===
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

// === Sichtbarkeit umschalten ===
function showApp() {
  loginView.style.display = 'none';
  appView.style.display = 'block';
}

function showLogin() {
  loginView.style.display = 'block';
  appView.style.display = 'none';
}
