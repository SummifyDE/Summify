// === Supabase Konfiguration ===Add commentMore actions
const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co';        
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI'; // gekürzt

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

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
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

 infoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bundesland = document.getElementById('bundesland').value;
  const ort = document.getElementById('ort').value;
  const schule = document.getElementById('schule').value;
  const fach = document.getElementById('fach').value;
  const klasse = document.getElementById('klasse').value;
  const latitude = parseFloat(document.getElementById('latitude').value) || null;
  const longitude = parseFloat(document.getElementById('longitude').value) || null;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    alert('Bitte zuerst anmelden!');
    return;
  }

  if (!bundesland) {
    alert('Bitte Bundesland auswählen!');
    return;
  }

  if (!schule.trim()) {
    alert('Bitte Schulname eingeben!');
    return;
  }

  let fileUrl = null;

  if (file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${user.id}.${fileExt}`;
    const { data, error: uploadError } = await supabase
      .storage
      .from('uploads') // Bucket-Name anpassen
      .upload(fileName, file);

    if (uploadError) {
      alert('Datei konnte nicht hochgeladen werden: ' + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('uploads')
      .getPublicUrl(fileName);

    fileUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabase
    .from('schools')
    .insert([{
      user_id: user.id,
      bundesland,
      ort,
      schule,
      fach,
      klasse,
      latitude,
      longitude,
      file_url: fileUrl
    }]);

  if (error) {
    alert('Fehler beim Speichern: ' + error.message);
  } else {
    alert('Schule erfolgreich gespeichert!');
    infoForm.reset();

    if (currentMarker) {
      map.removeLayer(currentMarker);
      currentMarker = null;
    }

    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
  }
});
