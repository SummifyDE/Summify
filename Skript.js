// Supabase Konfiguration
const supabase = supabase.createClient(
  'https://lyioruosnltgowlxluon.supabase.co', // Ersetze mit deiner Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI' // Ersetze mit deinem API Key
);

// Formular Eintrag speichern
document.getElementById('school-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const bundesland = document.getElementById('bundesland').value;
  const ort = document.getElementById('ort').value;
  const schule = document.getElementById('schule').value;
  const fach = document.getElementById('fach').value;
  const klasse = document.getElementById('klasse').value;

  const { data, error } = await supabase
    .from('schools')
    .insert([{ bundesland, ort, schule, fach, klasse, lat: marker.getLatLng().lat, lng: marker.getLatLng().lng }]);

  if (error) {
    alert('Fehler beim Speichern: ' + error.message);
  } else {
    alert('Erfolgreich gespeichert!');
  }
});

// Leaflet Karte
const map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland Mitte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

let marker = L.marker([51.1657, 10.4515], { draggable: true }).addTo(map);
