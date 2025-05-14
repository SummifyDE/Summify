// Supabase Konfiguration – Ersetze durch deine eigenen Keys
const supabase = supabase.createClient(
  'https://lyioruosnltgowlxluon.supabase.co',  // Deine Supabase-URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI'                       // Dein Anon Key
);

// Elemente referenzieren
const form = document.getElementById('school-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Karte vorbereiten
const map = L.map('map').setView([51.1657, 10.4515], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

let marker = L.marker([51.1657, 10.4515], { draggable: true }).addTo(map);

// Login überprüfen bei Seitenaufruf
checkAuth();

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    showApp();
  } else {
    showLogin();
  }
}

// Formular speichern
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = (await supabase.auth.getUser()).data.user;

  const bundesland = document.getElementById('bundesland').value;
  const ort = document.getElementById('ort').value;
  const schule = document.getElementById('schule').value;
  const fach = document.getElementById('fach').value;
  const klasse = document.getElementById('klasse').value;
  const lat = marker.getLatLng().lat;
  const lng = marker.getLatLng().lng;

  const { data, error } = await supabase
    .from('schools')
    .insert([{
      user_id: user.id,
      bundesland,
      ort,
      schule,
      fach,
      klasse,
      lat,
      lng
    }]);

  if (error) {
    alert('Fehler beim Speichern: ' + error.message);
  } else {
    alert('Erfolgreich gespeichert!');
    form.reset();
  }
});
