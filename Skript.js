const SUPABASE_URL = 'https://lyioruosnltgowlxluon.supabase.co'; // DEINE Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aW9ydW9zbmx0Z293bHhsdW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjQ0NjEsImV4cCI6MjA2MjgwMDQ2MX0.rC-3plAsVFX91nbxeDFVDUFYSzwCtBBkqoNBDVL5amI';               // DEIN anon key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    const messageEl = document.getElementById('message');
    if (error) {
        messageEl.textContent = error.message;
    } else {
        messageEl.style.color = 'green';
        messageEl.textContent = 'Erfolgreich eingeloggt!';
        console.log('Login erfolgreich:', data);
    }
});
