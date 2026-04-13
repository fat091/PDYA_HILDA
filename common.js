function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function getSession() {
  const session = localStorage.getItem('fv_session') || sessionStorage.getItem('fv_session');
  return session ? JSON.parse(session) : null;
}

function clearSession() {
  localStorage.removeItem('fv_session');
  sessionStorage.removeItem('fv_session');
}

function requireSession(redirectTo = 'login.html') {
  try {
    const session = getSession();
    if (!session) {
      window.location.href = redirectTo;
      return null;
    }
    return session;
  } catch (error) {
    clearSession();
    window.location.href = redirectTo;
    return null;
  }
}