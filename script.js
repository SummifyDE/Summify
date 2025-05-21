// === Supabase Konfiguration ===
const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co';        
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI';                   

// WICHTIG: so initialisieren!
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML-Elemente
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Leaflet Karte initialisieren
let mapInitialized = false;
let map;

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Login-Response:', error);

    if (error) {
      alert('Login fehlgeschlagen: ' + error.message);
    } else {
      showApp();
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showLogin();
  });
});

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data && data.session) {
    showApp();
  } else {
    showLogin();
  }
}

function showApp() {
  loginView.style.display = 'none';
  appView.style.display = 'block';

  if (!mapInitialized) {
    map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland Mitte

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', e => {
      L.marker(e.latlng).addTo(map);
    });

    mapInitialized = true;
  }
}

function showLogin() {
  loginView.style.display = 'block';
  appView.style.display = 'none';
}


