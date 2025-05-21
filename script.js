// === Supabase Konfiguration ===
const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co';        
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI';                   

// Supabase Client initialisieren
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML-Elemente
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const infoForm = document.getElementById('info-form');

// Leaflet Karte
let mapInitialized = false;
let map;
let currentMarker = null;

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('Login-Response:', error);

    if (error) {
      alert('Login fehlgeschlagen: ' + error.message);
    } else {
      showApp();
    }
  });

  // Logout
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showLogin();
  });

  // Formular speichern
  infoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bundesland = document.getElementById('bundesland').value;
    const klassenstufe = document.getElementById('klassenstufe').value;
    const schulart = document.getElementById('schulart').value;
    const fach = document.getElementById('fach').value;
    const thema = document.getElementById('thema').value;
    const latitude = parseFloat(document.getElementById('latitude').value) || null;
    const longitude = parseFloat(document.getElementById('longitude').value) || null;
    const beschreibung = document.getElementById('beschreibung').value;

    const user = supabase.auth.user();
    if (!user) {
      alert('Bitte zuerst anmelden!');
      return;
    }

    if (!bundesland) {
      alert('Bitte Bundesland auswählen!');
      return;
    }

    if (!beschreibung.trim()) {
      alert('Bitte Beschreibung eingeben!');
      return;
    }

    const { data, error } = await supabase
      .from('content') // Tabellenname in Supabase, anpassen falls anders
      .insert([
        {
          user_id: user.id,
          bundesland,
          klassenstufe,
          schulart,
          fach,
          thema,
          latitude,
          longitude,
          beschreibung,
        }
      ]);

    if (error) {
      alert('Fehler beim Speichern: ' + error.message);
    } else {
      alert('Inhalt erfolgreich gespeichert!');
      infoForm.reset();

      // Marker & Koordinaten zurücksetzen
      if (currentMarker) {
        map.removeLayer(currentMarker);
        currentMarker = null;
      }
      document.getElementById('latitude').value = '';
      document.getElementById('longitude').value = '';
    }
  });
});

// Session check
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
    // Karte auf Deutschland zentrieren
    map = L.map('map').setView([51.1657, 10.4515], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Klick auf Karte, um Marker zu setzen
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;

      // Alten Marker entfernen, wenn vorhanden
      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      currentMarker = L.marker([lat, lng]).addTo(map);

      // Koordinaten in versteckte Inputs schreiben
      document.getElementById('latitude').value = lat.toFixed(6);
      document.getElementById('longitude').value = lng.toFixed(6);
    });

    mapInitialized = true;
  }
}

function showLogin() {
  loginView.style.display = 'block';
  appView.style.display = 'none';
}

