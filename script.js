


const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

 if (error) {
  message.textContent = 'Fehler: ' + error.message;
  message.style.color = 'red';
} else {
  message.textContent = 'Erfolgreich eingeloggt!';
  message.style.color = 'green';

  // Weiterleitung nach Login
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

});
