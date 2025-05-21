// === Supabase Konfiguration ===
const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co';        
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI';                   
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === HTML-Elemente ===
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Karte global speichern, damit nicht mehrfach initialisiert wird
let mapInitialized = false;
let map;

checkSession();

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    showApp();
  } else {
    showLogin();
  }
}

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

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

// === Sichtbarkeit umschalten + Leaflet-Karte initialisieren ===
function showApp() {
  loginView.style.display = 'none';
  appView.style.display = 'block';

  // Leaflet Karte nur einmal initialisieren
  if (!mapInitialized) {
    map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland Mitte

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker setzen bei Klick
    map.on('click', function(e) {
      L.marker(e.latlng).addTo(map);
    });

    mapInitialized = true;
  }
}

function showLogin() {
  loginView.style.display = 'block';
  appView.style.display = 'none';
}

