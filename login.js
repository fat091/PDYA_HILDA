function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((button, index) => {
    button.classList.toggle(
      'active',
      (tab === 'login' && index === 0) || (tab === 'register' && index === 1)
    );
  });

  document.querySelectorAll('.form-panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(tab === 'login' ? 'loginPanel' : 'registerPanel').classList.add('active');
}

function validateEmail(inputId, msgId) {
  const value = document.getElementById(inputId).value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = regex.test(value);

  setField(
    inputId,
    msgId,
    ok ? '' : value ? '✗ Correo no válido' : '',
    ok && value ? 'success' : value ? 'error' : ''
  );

  return ok;
}

function validateName(inputId, msgId) {
  const value = document.getElementById(inputId).value.trim();
  const ok = value.length >= 2;

  setField(
    inputId,
    msgId,
    ok ? '✓' : value ? '✗ Mínimo 2 caracteres' : '',
    ok ? 'success' : value ? 'error' : ''
  );

  return ok;
}

function validateLoginPwd() {
  const value = document.getElementById('loginPassword').value;
  const ok = value.length >= 6;

  setField(
    'loginPassword',
    'loginPwdMsg',
    ok ? '' : value ? '✗ Contraseña muy corta' : '',
    ok && value ? 'success' : value ? 'error' : ''
  );

  return ok;
}

function validateConfirm() {
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;
  const ok = password === confirm && confirm.length > 0;

  setField(
    'regConfirm',
    'regConfirmMsg',
    ok ? '✓ Contraseñas coinciden' : confirm ? '✗ Las contraseñas no coinciden' : '',
    ok ? 'success' : confirm ? 'error' : ''
  );

  return ok;
}

function setField(inputId, msgId, msg, state) {
  const input = document.getElementById(inputId);
  const msgEl = document.getElementById(msgId);

  input.classList.remove('error', 'success');
  if (state) input.classList.add(state);

  msgEl.textContent = msg;
  msgEl.className = `field-msg ${state}`;
}

function checkStrength() {
  const password = document.getElementById('regPassword').value;
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ['', '#e63946', '#e9a43a', '#f0c040', '#2a9d5c'];
  const labels = ['', 'Muy débil', 'Débil', 'Buena', 'Fuerte'];

  for (let i = 1; i <= 4; i++) {
    document.getElementById(`bar${i}`).style.background =
      i <= score ? colors[score] : 'rgba(10,10,10,0.1)';
  }

  const strengthLabel = document.getElementById('strengthLabel');
  strengthLabel.textContent = password ? labels[score] : 'Ingresa tu contraseña';
  strengthLabel.style.color = password ? colors[score] : 'var(--muted)';

  const ok = score >= 2;

  setField(
    'regPassword',
    'regPwdMsg',
    ok ? '' : password ? '✗ La contraseña es muy débil' : '',
    ok && password ? 'success' : password ? 'error' : ''
  );

  return ok;
}

function handleLogin() {
  const emailOk = validateEmail('loginEmail', 'loginEmailMsg');
  const pwdOk = validateLoginPwd();

  if (!emailOk || !pwdOk) {
    showToast('Corrige los campos marcados', 'error');
    return;
  }

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('fv_users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    showToast('Credenciales incorrectas', 'error');
    return;
  }

  const btn = document.getElementById('loginBtn');
  btn.textContent = 'Verificando…';
  btn.classList.add('loading');

  const remember = document.getElementById('rememberMe').checked;
  const session = { email: user.email, name: user.name, ts: Date.now() };

  if (remember) {
    localStorage.setItem('fv_session', JSON.stringify(session));
  } else {
    sessionStorage.setItem('fv_session', JSON.stringify(session));
  }

  setTimeout(() => {
    window.location.href = 'app.html';
  }, 900);
}

function handleRegister() {
  const fnOk = validateName('regFirstName', 'regFirstMsg');
  const lnOk = validateName('regLastName', 'regLastMsg');
  const emOk = validateEmail('regEmail', 'regEmailMsg');
  const pwOk = checkStrength();
  const cfOk = validateConfirm();
  const terms = document.getElementById('acceptTerms').checked;

  if (!fnOk || !lnOk || !emOk || !pwOk || !cfOk) {
    showToast('Completa todos los campos correctamente', 'error');
    return;
  }

  if (!terms) {
    showToast('Debes aceptar los términos de servicio', 'error');
    return;
  }

  const email = document.getElementById('regEmail').value.trim();
  const users = JSON.parse(localStorage.getItem('fv_users') || '[]');

  if (users.find(u => u.email === email)) {
    showToast('Este correo ya está registrado', 'error');
    return;
  }

  const newUser = {
    name: `${document.getElementById('regFirstName').value.trim()} ${document.getElementById('regLastName').value.trim()}`,
    email,
    password: btoa(document.getElementById('regPassword').value),
    created: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('fv_users', JSON.stringify(users));

  const btn = document.getElementById('registerBtn');
  btn.textContent = 'Creando cuenta…';
  btn.classList.add('loading');

  showToast('¡Cuenta creada! Iniciando sesión…', 'success');
  sessionStorage.setItem(
    'fv_session',
    JSON.stringify({ email: newUser.email, name: newUser.name, ts: Date.now() })
  );

  setTimeout(() => {
    window.location.href = 'app.html';
  }, 1200);
}

window.addEventListener('DOMContentLoaded', () => {
  const session = localStorage.getItem('fv_session') || sessionStorage.getItem('fv_session');
  if (session) {
    window.location.href = 'app.html';
  }
});