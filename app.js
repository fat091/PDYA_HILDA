let currentUser = null;
let allFiles = [];
let activeAreaFilter = 'todos';
let activeTypeFilter = 'todos';
let currentSort = 'name';

const DB = {
  jpg:   { area:'Imagen', sub:'Fotografía', icon:'🖼️' },
  jpeg:  { area:'Imagen', sub:'Fotografía', icon:'🖼️' },
  png:   { area:'Imagen', sub:'Imagen PNG con transparencia', icon:'🖼️' },
  gif:   { area:'Imagen', sub:'Imagen Animada', icon:'🎞️' },
  webp:  { area:'Imagen', sub:'Imagen Web Optimizada', icon:'🖼️' },
  svg:   { area:'Imagen', sub:'Gráfico Vectorial', icon:'✏️' },
  bmp:   { area:'Imagen', sub:'Mapa de Bits', icon:'🖼️' },
  tiff:  { area:'Imagen', sub:'Imagen de Alta Calidad', icon:'🖼️' },
  tif:   { area:'Imagen', sub:'Imagen de Alta Calidad', icon:'🖼️' },
  ico:   { area:'Imagen', sub:'Ícono', icon:'🔘' },
  heic:  { area:'Imagen', sub:'Fotografía Apple', icon:'📱' },
  heif:  { area:'Imagen', sub:'Fotografía Apple', icon:'📱' },
  raw:   { area:'Imagen', sub:'Fotografía RAW', icon:'📷' },
  cr2:   { area:'Imagen', sub:'RAW Canon', icon:'📷' },
  nef:   { area:'Imagen', sub:'RAW Nikon', icon:'📷' },
  arw:   { area:'Imagen', sub:'RAW Sony', icon:'📷' },
  dng:   { area:'Imagen', sub:'RAW Digital Negativo', icon:'📷' },
  eps:   { area:'Imagen', sub:'PostScript Encapsulado', icon:'✏️' },

  pdf:   { area:'Documento', sub:'PDF Portable', icon:'📕' },
  doc:   { area:'Documento', sub:'Word (Legado)', icon:'📝' },
  docx:  { area:'Documento', sub:'Word Moderno', icon:'📝' },
  odt:   { area:'Documento', sub:'OpenDocument Texto', icon:'📝' },
  rtf:   { area:'Documento', sub:'Texto Enriquecido', icon:'📄' },
  txt:   { area:'Documento', sub:'Texto Plano', icon:'📃' },
  md:    { area:'Documento', sub:'Markdown', icon:'📋' },
  xlsx:  { area:'Documento', sub:'Excel Moderno', icon:'📊' },
  ods:   { area:'Documento', sub:'OpenDocument Hoja', icon:'📊' },
  ppt:   { area:'Documento', sub:'PowerPoint (Legado)', icon:'📽️' },
  pptx:  { area:'Documento', sub:'PowerPoint Moderno', icon:'📽️' },
  odp:   { area:'Documento', sub:'OpenDocument Presentación', icon:'📽️' },
  epub:  { area:'Documento', sub:'Libro Electrónico', icon:'📚' },
  mobi:  { area:'Documento', sub:'Libro Kindle', icon:'📚' },

  csv:   { area:'Datos', sub:'Valores Separados por Coma', icon:'📋' },
  json:  { area:'Datos', sub:'JSON Datos', icon:'📋' },
  xml:   { area:'Datos', sub:'XML Datos', icon:'📋' },
  yaml:  { area:'Datos', sub:'YAML Config', icon:'⚙️' },
  yml:   { area:'Datos', sub:'YAML Config', icon:'⚙️' },
  sql:   { area:'Datos', sub:'Base de Datos SQL', icon:'🗄️' },
  db:    { area:'Datos', sub:'Base de Datos', icon:'🗄️' },
  sqlite:{ area:'Datos', sub:'SQLite DB', icon:'🗄️' },
  xls:   { area:'Datos', sub:'Hoja de Cálculo Excel', icon:'📊' },

  mp3:   { area:'Audio', sub:'MP3 Comprimido', icon:'🎵' },
  wav:   { area:'Audio', sub:'Audio Sin Compresión', icon:'🎵' },
  flac:  { area:'Audio', sub:'Audio Sin Pérdida', icon:'🎵' },
  aac:   { area:'Audio', sub:'Audio Avanzado', icon:'🎵' },
  ogg:   { area:'Audio', sub:'Audio Libre', icon:'🎵' },
  m4a:   { area:'Audio', sub:'Audio iTunes', icon:'🎵' },
  wma:   { area:'Audio', sub:'Windows Media Audio', icon:'🎵' },
  aiff:  { area:'Audio', sub:'Audio Apple', icon:'🎵' },
  mid:   { area:'Audio', sub:'MIDI Musical', icon:'🎹' },
  midi:  { area:'Audio', sub:'MIDI Musical', icon:'🎹' },

  mp4:   { area:'Video', sub:'MPEG-4 Video', icon:'🎬' },
  mov:   { area:'Video', sub:'QuickTime Video', icon:'🎬' },
  avi:   { area:'Video', sub:'AVI Video', icon:'🎬' },
  mkv:   { area:'Video', sub:'Matroska Video', icon:'🎬' },
  webm:  { area:'Video', sub:'Video Web', icon:'🎬' },
  flv:   { area:'Video', sub:'Flash Video', icon:'🎬' },
  wmv:   { area:'Video', sub:'Windows Media Video', icon:'🎬' },
  m4v:   { area:'Video', sub:'Video iTunes', icon:'🎬' },
  '3gp': { area:'Video', sub:'Video Móvil', icon:'📱' },

  psd:   { area:'Diseño', sub:'Photoshop', icon:'🎨' },
  ai:    { area:'Diseño', sub:'Illustrator', icon:'✏️' },
  fig:   { area:'Diseño', sub:'Figma', icon:'🖌️' },
  xd:    { area:'Diseño', sub:'Adobe XD', icon:'🖌️' },
  sketch:{ area:'Diseño', sub:'Sketch App', icon:'🖌️' },
  indd:  { area:'Diseño', sub:'InDesign', icon:'📰' },
  idml:  { area:'Diseño', sub:'InDesign Markup', icon:'📰' },
  ae:    { area:'Diseño', sub:'After Effects', icon:'✨' },
  pr:    { area:'Diseño', sub:'Premiere Pro', icon:'🎬' },
  blend: { area:'Diseño', sub:'Blender 3D', icon:'🧊' },
  obj:   { area:'Diseño', sub:'Modelo 3D OBJ', icon:'🧊' },
  fbx:   { area:'Diseño', sub:'Modelo 3D FBX', icon:'🧊' },
  glb:   { area:'Diseño', sub:'Modelo 3D GLB', icon:'🧊' },
  stl:   { area:'Diseño', sub:'Impresión 3D STL', icon:'🔲' },

  js:    { area:'Código', sub:'JavaScript', icon:'⚡' },
  ts:    { area:'Código', sub:'TypeScript', icon:'⚡' },
  jsx:   { area:'Código', sub:'React JSX', icon:'⚛️' },
  tsx:   { area:'Código', sub:'React TSX', icon:'⚛️' },
  py:    { area:'Código', sub:'Python', icon:'🐍' },
  html:  { area:'Código', sub:'HTML Web', icon:'🌐' },
  htm:   { area:'Código', sub:'HTML Web', icon:'🌐' },
  css:   { area:'Código', sub:'CSS Estilos', icon:'🎨' },
  scss:  { area:'Código', sub:'SASS Estilos', icon:'🎨' },
  php:   { area:'Código', sub:'PHP Backend', icon:'🐘' },
  java:  { area:'Código', sub:'Java', icon:'☕' },
  kt:    { area:'Código', sub:'Kotlin', icon:'☕' },
  c:     { area:'Código', sub:'Lenguaje C', icon:'💻' },
  cpp:   { area:'Código', sub:'C++', icon:'💻' },
  cs:    { area:'Código', sub:'C# .NET', icon:'💻' },
  go:    { area:'Código', sub:'Go Lang', icon:'🐹' },
  rs:    { area:'Código', sub:'Rust', icon:'⚙️' },
  rb:    { area:'Código', sub:'Ruby', icon:'💎' },
  sh:    { area:'Código', sub:'Shell Script', icon:'🖥️' },
  bat:   { area:'Código', sub:'Batch Script', icon:'🖥️' },

  zip:   { area:'Comprimido', sub:'ZIP Comprimido', icon:'📦' },
  rar:   { area:'Comprimido', sub:'RAR Comprimido', icon:'📦' },
  '7z':  { area:'Comprimido', sub:'7-Zip Comprimido', icon:'📦' },
  tar:   { area:'Comprimido', sub:'TAR Bundle', icon:'📦' },
  gz:    { area:'Comprimido', sub:'GZip Comprimido', icon:'📦' },
  bz2:   { area:'Comprimido', sub:'BZip2 Comprimido', icon:'📦' },
  xz:    { area:'Comprimido', sub:'XZ Comprimido', icon:'📦' },

  exe:   { area:'Ejecutable', sub:'Ejecutable Windows', icon:'⚙️' },
  msi:   { area:'Ejecutable', sub:'Instalador Windows', icon:'📥' },
  dmg:   { area:'Ejecutable', sub:'Disco macOS', icon:'💿' },
  pkg:   { area:'Ejecutable', sub:'Paquete macOS', icon:'📦' },
  apk:   { area:'Ejecutable', sub:'App Android', icon:'📱' },
  ipa:   { area:'Ejecutable', sub:'App iOS', icon:'📱' },
  iso:   { area:'Ejecutable', sub:'Imagen de Disco', icon:'💿' },
  deb:   { area:'Ejecutable', sub:'Paquete Debian', icon:'🐧' },
  rpm:   { area:'Ejecutable', sub:'Paquete Red Hat', icon:'🐧' },

  ttf:   { area:'Fuente', sub:'TrueType Font', icon:'🔤' },
  otf:   { area:'Fuente', sub:'OpenType Font', icon:'🔤' },
  woff:  { area:'Fuente', sub:'Web Font WOFF', icon:'🔤' },
  woff2: { area:'Fuente', sub:'Web Font WOFF2', icon:'🔤' },
  eot:   { area:'Fuente', sub:'Fuente Embedded', icon:'🔤' }
};

function initSession() {
  const session = requireSession('login.html');
  if (!session) return;

  currentUser = session;
  const name = currentUser.name || currentUser.email;

  document.getElementById('userName').textContent = name;
  document.getElementById('avatarInitial').textContent = name.charAt(0).toUpperCase();
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}

function classify(filename) {
  const ext = filename.split('.').pop().toLowerCase().trim();
  return DB[ext] || { area: 'Otro', sub: `Archivo .${ext || 'desconocido'}`, icon: '📎' };
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.remove('dragover');
  handleFiles(event.dataTransfer.files);
}

function handleFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const files = Array.from(fileList);
  processFiles(files);
}

function processFiles(files) {
  const wrap = document.getElementById('progressWrap');
  wrap.classList.add('visible');

  let done = 0;
  const total = files.length;

  files.forEach((file, i) => {
    setTimeout(() => {
      const cls = classify(file.name);
      const existing = allFiles.find(f => f.name === file.name && f.size === file.size);

      if (!existing) {
        allFiles.push({
          id: Date.now() + i,
          name: file.name,
          ext: file.name.split('.').pop().toLowerCase(),
          size: file.size,
          type: file.type || 'application/octet-stream',
          lastModified: file.lastModified,
          area: cls.area,
          sub: cls.sub,
          icon: cls.icon
        });
      }

      done++;
      const pct = Math.round((done / total) * 100);

      document.getElementById('progressFill').style.width = pct + '%';
      document.getElementById('progressPct').textContent = pct + '%';
      document.getElementById('progressText').textContent = `Analizando: ${file.name}`;

      if (done === total) {
        setTimeout(() => {
          wrap.classList.remove('visible');
          document.getElementById('progressFill').style.width = '0%';
          showToast(`✓ ${total} archivo${total > 1 ? 's' : ''} clasificado${total > 1 ? 's' : ''}`, 'success');
          renderAll();
        }, 500);
      }
    }, i * 80);
  });
}

function getFiltered() {
  let files = [...allFiles];

  if (activeAreaFilter !== 'todos') {
    files = files.filter(f => f.area === activeAreaFilter);
  }

  if (activeTypeFilter !== 'todos') {
    const map = {
      imagen: 'Imagen',
      documento: 'Documento',
      audio: 'Audio',
      video: 'Video',
      datos: 'Datos',
      otro: 'Otro'
    };

    if (map[activeTypeFilter]) {
      files = files.filter(f => f.area === map[activeTypeFilter]);
    }
  }

  files.sort((a, b) => {
    if (currentSort === 'name') return a.name.localeCompare(b.name);
    if (currentSort === 'name-desc') return b.name.localeCompare(a.name);
    if (currentSort === 'size') return a.size - b.size;
    if (currentSort === 'size-desc') return b.size - a.size;
    if (currentSort === 'type') return a.area.localeCompare(b.area);
    return 0;
  });

  return files;
}

function renderAll() {
  const files = getFiltered();
  updateStats();
  updateBadges();

  const grid = document.getElementById('filesGrid');
  const empty = document.getElementById('emptyState');
  const filterBar = document.getElementById('filterBar');

  if (allFiles.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    filterBar.style.display = 'none';
    document.querySelector('#emptyState .files-empty-text').textContent = 'Aún no has subido ningún archivo';
    return;
  }

  filterBar.style.display = 'flex';

  if (files.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    document.querySelector('#emptyState .files-empty-text').textContent = 'Sin archivos en esta categoría';
    return;
  }

  empty.style.display = 'none';
  grid.style.display = 'grid';
  grid.innerHTML = '';

  files.forEach((file, i) => {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.style.animationDelay = `${i * 30}ms`;

    const normalizedArea = file.area.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    card.innerHTML = `
      <button class="file-card-delete" onclick="deleteFile(${file.id}, event)" title="Eliminar">✕</button>
      <div class="file-card-ext ext-${file.ext}">${file.ext.toUpperCase()}</div>
      <span class="file-card-area area-${normalizedArea}">${file.area}</span>
      <div class="file-card-name" title="${file.name}">${file.name}</div>
      <div class="file-card-sub">${file.sub}</div>
      <div class="file-card-meta">
        <span>${formatSize(file.size)}</span>
        <span>${file.icon}</span>
      </div>
    `;

    card.addEventListener('click', e => {
      if (!e.target.classList.contains('file-card-delete')) {
        openModal(file);
      }
    });

    grid.appendChild(card);
  });
}

function updateStats() {
  document.getElementById('statTotal').textContent = allFiles.length;

  const areas = new Set(allFiles.map(f => f.area));
  document.getElementById('statAreas').textContent = areas.size;

  const totalBytes = allFiles.reduce((sum, file) => sum + file.size, 0);
  document.getElementById('statSize').textContent = formatSize(totalBytes);

  const types = new Set(allFiles.map(f => f.ext));
  document.getElementById('statTypes').textContent = types.size;
}

function updateBadges() {
  const counts = { todos: allFiles.length };

  allFiles.forEach(file => {
    counts[file.area] = (counts[file.area] || 0) + 1;
  });

  [
    'todos', 'Imagen', 'Documento', 'Audio', 'Video',
    'Datos', 'Diseño', 'Código', 'Comprimido',
    'Ejecutable', 'Fuente', 'Otro'
  ].forEach(area => {
    const el = document.getElementById(`badge-${area}`);
    if (el) el.textContent = counts[area] || 0;
  });
}

function filterByArea(area, btn) {
  activeAreaFilter = area;

  document.querySelectorAll('.sidebar-item').forEach(button => button.classList.remove('active'));
  btn.classList.add('active');

  const titles = {
    todos: 'Todos los Archivos',
    Imagen: 'Imágenes',
    Documento: 'Documentos',
    Audio: 'Audio',
    Video: 'Video',
    Datos: 'Datos',
    Diseño: 'Diseño',
    Código: 'Código',
    Comprimido: 'Comprimidos',
    Ejecutable: 'Ejecutables',
    Fuente: 'Fuentes Tipográficas',
    Otro: 'Otros Archivos'
  };

  document.getElementById('mainTitle').textContent = titles[area] || area;
  renderAll();
}

function filterByType(type, btn) {
  activeTypeFilter = type;

  document.querySelectorAll('.filter-btn').forEach(button => button.classList.remove('active'));
  btn.classList.add('active');

  renderAll();
}

function sortFiles(value) {
  currentSort = value;
  renderAll();
}

function clearAll() {
  if (!confirm('¿Eliminar todos los archivos de la vista?')) return;

  allFiles = [];
  activeAreaFilter = 'todos';
  activeTypeFilter = 'todos';
  renderAll();
  showToast('Lista limpiada', 'success');
}

function deleteFile(id, event) {
  event.stopPropagation();
  allFiles = allFiles.filter(file => file.id !== id);
  renderAll();
  showToast('Archivo eliminado');
}

function openModal(file) {
  document.getElementById('mExt').textContent = file.ext.toUpperCase();
  document.getElementById('mExt').className = `modal-ext ext-${file.ext}`;
  document.getElementById('mName').textContent = file.name;

  const rows = [
    ['Área', file.area],
    ['Sub-área', file.sub],
    ['Extensión', `.${file.ext}`],
    ['Tamaño', formatSize(file.size)],
    ['Tipo MIME', file.type],
    ['Ícono', file.icon],
    ['Modificado', file.lastModified ? new Date(file.lastModified).toLocaleString('es-MX') : '—']
  ];

  document.getElementById('mRows').innerHTML = rows.map(
    ([key, value]) =>
      `<div class="modal-row"><span class="modal-key">${key}</span><span class="modal-val">${value}</span></div>`
  ).join('');

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

window.addEventListener('DOMContentLoaded', () => {
  initSession();
  renderAll();
});