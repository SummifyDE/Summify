import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://deine-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'dein-anon-public-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    console.log('User:', data.user);
  }
});
