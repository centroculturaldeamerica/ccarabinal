/* ============================================================
   Horario Diversificado 2026 — Centro Cultural de América
   horario.js  (v3 — validaciones docente + cursos por grado)
   ============================================================ */

// ─── GRADOS ───────────────────────────────────────────────────────────

const GRADOS = [
  'PRIMERO BÁSICO',
  'SEGUNDO BÁSICO',
  'TERCERO BÁSICO',
  'CUARTO BACH',
  'QUINTO BACH',
  'CUARTO PC',
  'QUINTO PC',
  'SEXTO PC'
];

const GRADOS_DISPLAY = {
  'PRIMERO BÁSICO': '1ro. Básico',
  'SEGUNDO BÁSICO': '2do. Básico',
  'TERCERO BÁSICO': '3ro. Básico',
  'CUARTO BACH': '4to. Bach',
  'QUINTO BACH': '5to. Bach',
  'CUARTO PC': '4to. PC',
  'QUINTO PC': '5to. PC',
  'SEXTO PC': '6to. PC'
};

// ─── DOCENTES — cursos por grado ──────────────────────────────────────

const DOCENTES = {
  'Marvin Moisés López Juárez': {
    'PRIMERO BÁSICO': ['Matemáticas', 'Matemática Complementaria', 'Contabilidad'],
    'SEGUNDO BÁSICO': ['Matemáticas', 'Matemática Complementaria', 'Contabilidad'],
    'TERCERO BÁSICO': ['Matemáticas', 'Ciencias Naturales', 'Contabilidad'],
    'QUINTO BACH': ['Biología'],
    'CUARTO PC': ['Matemática Comercial'],
    'QUINTO PC': ['Cálculo Mercantil y Financiero'],
    'SEXTO PC': ['Contabilidad Bancaria', 'Contabilidad Gubernamental Integrada', 'Práctica Supervisadas', 'Auditoría']
  },
  'María Lucrecia Burrero Xitimul': {
    'PRIMERO BÁSICO': ['Culturas e Idiomas Mayas, Garífuna o Xinka', 'Emprendimiento para la Productividad'],
    'SEGUNDO BÁSICO': ['Culturas e Idiomas Mayas, Garífuna o Xinka', 'Emprendimiento para la Productividad'],
    'TERCERO BÁSICO': ['Culturas e Idiomas Mayas, Garífuna o Xinka', 'Emprendimiento para la Productividad'],
    'CUARTO PC': ['Redacción y Correspondencia Mercantil'],
    'QUINTO PC': ['Catalogación y Archivo']
  },
  'María Angélica Piox Cuxum': {
    'PRIMERO BÁSICO': ['Comunicación y Lenguaje, Idioma Español', 'LectoEscritura', 'Educación Artística (Teatro - Danza)'],
    'SEGUNDO BÁSICO': ['Comunicación y Lenguaje, Idioma Español', 'LectoEscritura', 'Educación Artística (Teatro - Danza)'],
    'TERCERO BÁSICO': ['Comunicación y Lenguaje, Idioma Español', 'LectoEscritura', 'Educación Artística (Teatro - Danza)'],
    'CUARTO BACH': ['Lengua y Literatura 4', 'Lecto Escritura'],
    'QUINTO BACH': ['Lecto Escritura', 'Lengua y Literatura 5'],
    'CUARTO PC': ['Ortografía y Caligrafía']
  },
  'Fidel Oswaldo López': {
    'PRIMERO BÁSICO': ['Comunicación y Lenguaje, Idioma Extranjero'],
    'SEGUNDO BÁSICO': ['Comunicación y Lenguaje, Idioma Extranjero'],
    'TERCERO BÁSICO': ['Comunicación y Lenguaje, Idioma Extranjero'],
    'CUARTO BACH': ['Comunicación y Lenguaje L3 (Inglés Técnico) 4'],
    'QUINTO BACH': ['Comunicación y Lenguaje L3 (Inglés Técnico) 5'],
    'CUARTO PC': ['Inglés Comercial I'],
    'QUINTO PC': ['Inglés Comercial II']
  },
  'Adrián Alex Fernando Alvarado Vargas': {
    'PRIMERO BÁSICO': ['Ciencias Sociales, Formación Ciudadana e Interculturalidad'],
    'SEGUNDO BÁSICO': ['Ciencias Sociales, Formación Ciudadana e Interculturalidad'],
    'TERCERO BÁSICO': ['Ciencias Sociales, Formación Ciudadana e Interculturalidad'],
    'CUARTO BACH': ['Filosofía'],
    'CUARTO PC': ['Introducción a la Economía'],
    'QUINTO PC': ['Finanzas Públicas', 'Geografía Económica'],
    'SEXTO PC': ['Organización de Empresas']
  },
  'Obdulio Arnoldo Ampérez Mendoza': {
    'PRIMERO BÁSICO': ['Educación Artística (Artes Visuales)'],
    'SEGUNDO BÁSICO': ['Educación Artística (Artes Visuales)'],
    'TERCERO BÁSICO': ['Educación Artística (Artes Visuales)']
  },
  'María del Carmen Sánchez Ismalej': {
    'PRIMERO BÁSICO': ['Tecnologías del Aprendizaje y la Comunicación', 'Ciencias Naturales'],
    'SEGUNDO BÁSICO': ['Tecnologías del Aprendizaje y la Comunicación', 'Ciencias Naturales'],
    'TERCERO BÁSICO': ['Tecnologías del Aprendizaje y la Comunicación']
  },
  'Hamilton Damián Girón Ismalej': {
    'PRIMERO BÁSICO': ['Educación Física'],
    'SEGUNDO BÁSICO': ['Educación Física'],
    'TERCERO BÁSICO': ['Educación Física'],
    'CUARTO BACH': ['Educación Física']
  },
  'Fabio Misael Raxcacó Xitumul': {
    'TERCERO BÁSICO': ['Matemática Complementaria'],
    'CUARTO BACH': ['Matemáticas 4'],
    'QUINTO BACH': ['Matemáticas 5']
  },
  'Leonel Antonio Mollinedo Jerónimo': {
    'CUARTO BACH': ['Tecnologías de la Información y la Comunicación 4'],
    'QUINTO BACH': ['Tecnologías de la Información y la Comunicación 5'],
    'CUARTO PC': ['Contabilidad de Sociedades', 'Computación I'],
    'QUINTO PC': ['Contabilidad de Costos', 'Computación II'],
    'SEXTO PC': ['Computación III']
  },
  'Gerardo José Balduvio Morales Raxcacó': {
    'CUARTO BACH': ['Física'],
    'QUINTO BACH': ['Estadística Descriptiva', 'Química'],
    'SEXTO PC': ['Estadística Comercial']
  },
  'Blanca Leticia Hernandez Cortez': {
    'CUARTO BACH': ['Ciencias Sociales y Formación Ciudadana 4', 'Psicología', 'Elaboración y Gestión de Proyectos'],
    'QUINTO BACH': ['Ciencias Sociales y Formación Ciudadana 5', 'Expresión Artística'],
    'CUARTO PC': ['Administración y Organización de Oficina']
  },
  'Paula Mercedes Sánchez Ismalej': {
    'QUINTO BACH': ['Seminario'],
    'QUINTO PC': ['Mecanografía'],
    'SEXTO PC': ['Seminario sobre Problemas Socio Económicos de Guatemala']
  },
  'Jarvyn Oswaldo Juárez López': {
    'CUARTO PC': ['Fundamentos de Derecho'],
    'QUINTO PC': ['Legislación Fiscal y Aduanal'],
    'SEXTO PC': ['Ética Profesional y Relaciones Humanas', 'Derecho Mercantil y Nociones de Derecho Laboral']
  }
};

// ─── DÍAS ─────────────────────────────────────────────────────────────

const DIAS = ['L', 'M', 'X', 'J', 'V'];
const DIAS_NOMBRES = { L: 'Lunes', M: 'Martes', X: 'Miércoles', J: 'Jueves', V: 'Viernes' };

// ─── SLOTS 07:00–18:00 cada 30 min ───────────────────────────────────

const SLOTS = (() => {
  const arr = [];
  let h = 7, m = 0;
  while (h < 18) {
    const ini = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    m += 30;
    if (m >= 60) { h++; m = 0; }
    const fin = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    arr.push({ id: ini.replace(':', ''), inicio: ini, fin });
  }
  return arr;
})();

function slotIdx(id) { return SLOTS.findIndex(s => s.id === id); }

// ─── COLORES ──────────────────────────────────────────────────────────

const COLORES = [
  { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', nombre: 'Azul' },
  { bg: '#dcfce7', text: '#15803d', border: '#86efac', nombre: 'Verde' },
  { bg: '#fef3c7', text: '#92400e', border: '#fcd34d', nombre: 'Dorado' },
  { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd', nombre: 'Morado' },
  { bg: '#ffedd5', text: '#9a3412', border: '#fdba74', nombre: 'Naranja' },
  { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4', nombre: 'Rosa' },
  { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7', nombre: 'Menta' },
  { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5', nombre: 'Rojo' },
  { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc', nombre: 'Celeste' },
  { bg: '#fdf4ff', text: '#86198f', border: '#e879f9', nombre: 'Fucsia' },
  { bg: '#fff7ed', text: '#9a3412', border: '#fb923c', nombre: 'Durazno' },
  { bg: '#f0fdf4', text: '#166534', border: '#4ade80', nombre: 'Lima' },
  { bg: '#fefce8', text: '#854d0e', border: '#facc15', nombre: 'Amarillo' },
  { bg: '#fdf2f8', text: '#9d174d', border: '#f0abfc', nombre: 'Lila' },
  { bg: '#ecfeff', text: '#155e75', border: '#67e8f9', nombre: 'Turquesa' },
  { bg: '#fff1f2', text: '#9f1239', border: '#fda4af', nombre: 'Coral' }
];

// ─── ESTADO ───────────────────────────────────────────────────────────

let clases = JSON.parse(localStorage.getItem('horario_clases_v3') || '[]');
let colorSel = 0;
let viewDay = 'ALL';
let deleteId = null;
let dragId = null;
let toastTimer;

// ─── POBLAR SELECTS ───────────────────────────────────────────────────

function poblarHoraInicio() {
  const sel = document.getElementById('inp-inicio');
  sel.innerHTML = '<option value="">— Seleccionar —</option>';
  SLOTS.forEach(s => {
    const o = document.createElement('option');
    o.value = s.id; o.textContent = s.inicio;
    sel.appendChild(o);
  });
}

function poblarHoraFin() {
  const ini = document.getElementById('inp-inicio').value;
  const sel = document.getElementById('inp-fin');
  sel.innerHTML = '<option value="">— Seleccionar —</option>';
  if (!ini) return;
  SLOTS.slice(slotIdx(ini) + 1).forEach(s => {
    const o = document.createElement('option');
    o.value = s.id; o.textContent = s.inicio;
    sel.appendChild(o);
  });
}

function poblarDocentes() {
  const grado = document.getElementById('inp-grado').value;
  const selDoc = document.getElementById('inp-docente');
  selDoc.innerHTML = '<option value="">— Seleccionar —</option>';
  selDoc.disabled = !grado;

  // Resetear curso
  const selCurso = document.getElementById('inp-curso');
  selCurso.innerHTML = '<option value="">— Seleccionar —</option>';
  selCurso.disabled = true;

  if (!grado) return;

  Object.keys(DOCENTES)
    .filter(d => DOCENTES[d][grado])
    .sort()
    .forEach(d => {
      const o = document.createElement('option');
      o.value = d; o.textContent = d;
      selDoc.appendChild(o);
    });
}

function poblarCursos() {
  const grado = document.getElementById('inp-grado').value;
  const docente = document.getElementById('inp-docente').value;
  const sel = document.getElementById('inp-curso');
  sel.innerHTML = '<option value="">— Seleccionar —</option>';
  sel.disabled = !grado || !docente;
  if (!grado || !docente) return;

  (DOCENTES[docente]?.[grado] || []).slice().sort().forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
}

// ─── COLOR CHIPS ──────────────────────────────────────────────────────

function renderColorChips() {
  document.getElementById('color-row').innerHTML = COLORES.map((c, i) => `
    <div class="color-chip ${i === colorSel ? 'active' : ''}"
         style="background:${c.bg};border-color:${i === colorSel ? c.border : 'transparent'}"
         title="${c.nombre}" onclick="selectColor(${i})"></div>`).join('');
}

function selectColor(i) { colorSel = i; renderColorChips(); }

// ─── VALIDACIONES ─────────────────────────────────────────────────────

// Conflicto de celda: mismo grado + día + solapamiento
function conflictoCelda(grado, dia, ini, fin, ignorarId) {
  const a = slotIdx(ini), b = slotIdx(fin);
  return clases.find(c => {
    if (c.id === ignorarId || c.grado !== grado || c.dia !== dia) return false;
    return a < slotIdx(c.fin) && b > slotIdx(c.inicio);
  });
}

// Conflicto de docente: mismo docente + día + solapamiento (cualquier grado)
function conflictoDocente(docente, dia, ini, fin, ignorarId) {
  const a = slotIdx(ini), b = slotIdx(fin);
  return clases.find(c => {
    if (c.id === ignorarId || c.docente !== docente || c.dia !== dia) return false;
    return a < slotIdx(c.fin) && b > slotIdx(c.inicio);
  });
}

// ─── AGREGAR CLASE ────────────────────────────────────────────────────

function agregarClase() {
  const grado = document.getElementById('inp-grado').value;
  const docente = document.getElementById('inp-docente').value;
  const curso = document.getElementById('inp-curso').value;
  const dia = document.getElementById('inp-dia').value;
  const inicio = document.getElementById('inp-inicio').value;
  const fin = document.getElementById('inp-fin').value;

  if (!grado) { toast('Selecciona el grado', 'error'); return; }
  if (!docente) { toast('Selecciona el docente', 'error'); return; }
  if (!curso) { toast('Selecciona el curso', 'error'); return; }
  if (!dia) { toast('Selecciona el día', 'error'); return; }
  if (!inicio) { toast('Selecciona la hora de inicio', 'error'); return; }
  if (!fin) { toast('Selecciona la hora de fin', 'error'); return; }

  // Validar celda
  const cc = conflictoCelda(grado, dia, inicio, fin, null);
  if (cc) {
    toast(`"${cc.curso}" ya ocupa ese horario en ${GRADOS_DISPLAY[grado]}`, 'error');
    return;
  }

  // Validar docente
  const cd = conflictoDocente(docente, dia, inicio, fin, null);
  if (cd) {
    const si = SLOTS.find(s => s.id === cd.inicio);
    const sf = SLOTS.find(s => s.id === cd.fin);
    toast(`${docente.split(' ')[0]} ya tiene "${cd.curso}" ese día (${si?.inicio}–${sf?.inicio})`, 'error');
    return;
  }

  clases.push({ id: Date.now(), grado, docente, curso, dia, inicio, fin, color: colorSel });
  guardar(); renderTabla(); renderLista(); renderStats();
  toast(`"${curso}" agregado ✓`, 'success');
  limpiarForm();
}

function limpiarForm() {
  ['inp-grado', 'inp-docente', 'inp-curso', 'inp-dia', 'inp-inicio', 'inp-fin']
    .forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('inp-docente').disabled = true;
  document.getElementById('inp-curso').disabled = true;
  poblarHoraFin();
}

// ─── ELIMINAR ─────────────────────────────────────────────────────────

function confirmDelete(id) {
  const c = clases.find(x => x.id === id);
  if (!c) return;
  deleteId = id;
  const si = SLOTS.find(s => s.id === c.inicio);
  const sf = SLOTS.find(s => s.id === c.fin);
  document.getElementById('modal-desc').textContent =
    `"${c.curso}" — ${DIAS_NOMBRES[c.dia]}, ${si?.inicio} a ${sf?.inicio}, ${GRADOS_DISPLAY[c.grado]}`;
  document.getElementById('modal-bg').classList.add('open');
  document.getElementById('modal-confirm').onclick = doDelete;
}

function doDelete() {
  clases = clases.filter(c => c.id !== deleteId);
  guardar(); renderTabla(); renderLista(); renderStats();
  closeModal(); toast('Clase eliminada');
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  deleteId = null;
}

// ─── RENDER TABLA ─────────────────────────────────────────────────────

function renderTabla() {
  const dias = viewDay === 'ALL' ? DIAS : [viewDay];
  let html = '';

  dias.forEach(dia => {
    html += `
      <div>
        ${viewDay === 'ALL' ? `<div class="day-header">${DIAS_NOMBRES[dia]}</div>` : ''}
        <table>
          <thead><tr>
            <th>Hora</th>
            ${GRADOS.map(g => `<th>${GRADOS_DISPLAY[g]}</th>`).join('')}
          </tr></thead>
          <tbody>
            ${SLOTS.map(slot => `
              <tr>
                <td class="hora-cell">
                  <b>${slot.inicio}</b>
                  <span class="hora-range">${slot.fin}</span>
                </td>
                ${GRADOS.map(g => {
      const clase = clases.find(c => c.dia === dia && c.grado === g && c.inicio === slot.id);
      const cubierta = !clase && clases.some(c => {
        if (c.dia !== dia || c.grado !== g) return false;
        const ci = slotIdx(c.inicio), cf = slotIdx(c.fin), si = slotIdx(slot.id);
        return si > ci && si < cf;
      });
      if (cubierta) return '';

      const rowspan = clase ? Math.max(1, slotIdx(clase.fin) - slotIdx(clase.inicio)) : 1;
      const col = clase ? COLORES[clase.color] : null;
      const si = clase ? SLOTS.find(s => s.id === clase.inicio) : null;
      const sf = clase ? SLOTS.find(s => s.id === clase.fin) : null;
      const nombreCorto = clase ? clase.docente.split(' ').slice(0, 2).join(' ') : '';

      return `<td class="class-cell" rowspan="${rowspan}"
                      data-slot="${slot.id}" data-grado="${g}"
                      onclick="celdaClick('${slot.id}','${g}','${dia}')"
                      ondragover="dragOver(event)"
                      ondrop="drop(event,'${slot.id}','${g}','${dia}')">
                    ${clase ? `
                      <div class="class-block"
                           style="background:${col.bg};color:${col.text};border:1px solid ${col.border}"
                           draggable="true" ondragstart="dragStart(event,${clase.id})"
                           title="${clase.docente}">
                        <div class="block-name">${clase.curso}</div>
                        <div class="block-grado">${nombreCorto} · ${si?.inicio}–${sf?.inicio}</div>
                        <button class="block-del" onclick="event.stopPropagation();confirmDelete(${clase.id})">✕</button>
                      </div>` : ''}
                  </td>`;
    }).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  });

  document.getElementById('table-wrap').innerHTML = html;
}

// ─── RENDER LISTA ─────────────────────────────────────────────────────

function renderLista() {
  const lista = document.getElementById('clases-lista');
  if (!clases.length) {
    lista.innerHTML = `<div class="empty-state"><span class="icon">📅</span>Aún no hay clases.<br>Agrega tu primera clase arriba.</div>`;
    return;
  }
  lista.innerHTML = clases.map(c => {
    const col = COLORES[c.color];
    const si = SLOTS.find(s => s.id === c.inicio);
    const sf = SLOTS.find(s => s.id === c.fin);
    return `
      <div class="clase-item" style="border-left-color:${col.border}">
        <div class="clase-dot" style="background:${col.border}"></div>
        <div class="clase-info">
          <div class="clase-nombre" title="${c.curso}">${c.curso}</div>
          <div class="clase-meta">${DIAS_NOMBRES[c.dia]} · ${si?.inicio}–${sf?.inicio} · ${GRADOS_DISPLAY[c.grado]}</div>
          <div class="clase-docente">${c.docente}</div>
        </div>
        <button class="clase-del" onclick="confirmDelete(${c.id})" title="Eliminar">✕</button>
      </div>`;
  }).join('');
}

// ─── STATS ────────────────────────────────────────────────────────────

function renderStats() {
  const bar = document.getElementById('stats-bar');
  if (!clases.length) { bar.innerHTML = ''; return; }
  const total = clases.length;
  const porGrado = {};
  GRADOS.forEach(g => { porGrado[g] = clases.filter(c => c.grado === g).length; });
  bar.innerHTML = `
    <div class="stat-pill"><strong>${total}</strong> clase${total !== 1 ? 's' : ''} en total</div>
    ${GRADOS.filter(g => porGrado[g] > 0).map(g => `
      <div class="stat-pill"><strong>${porGrado[g]}</strong> · ${GRADOS_DISPLAY[g]}</div>`).join('')}`;
}

// ─── DAY TABS ─────────────────────────────────────────────────────────

function setupDayTabs() {
  document.getElementById('day-tabs').querySelectorAll('.day-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      viewDay = btn.dataset.day;
      renderTabla();
    });
  });
}

// ─── CLICK CELDA VACÍA ────────────────────────────────────────────────

function celdaClick(slotId, grado, dia) {
  const ocupada = clases.find(c => {
    if (c.dia !== dia || c.grado !== grado) return false;
    const ci = slotIdx(c.inicio), cf = slotIdx(c.fin), si = slotIdx(slotId);
    return si >= ci && si < cf;
  });
  if (ocupada) return;
  document.getElementById('inp-grado').value = grado;
  poblarDocentes();
  document.getElementById('inp-dia').value = dia;
  setTimeout(() => { document.getElementById('inp-inicio').value = slotId; poblarHoraFin(); }, 20);
}

// ─── DRAG & DROP ──────────────────────────────────────────────────────

function dragStart(e, id) { dragId = id; e.dataTransfer.effectAllowed = 'move'; }
function dragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drop-over'); }

function drop(e, slotId, grado, dia) {
  e.preventDefault(); e.currentTarget.classList.remove('drop-over');
  if (!dragId) return;
  const c = clases.find(x => x.id === dragId);
  if (!c) { dragId = null; return; }

  const dur = slotIdx(c.fin) - slotIdx(c.inicio);
  const niIni = slotIdx(slotId);
  const niFin = niIni + dur;
  if (niFin >= SLOTS.length) { toast('No cabe en ese horario', 'error'); dragId = null; return; }
  const nuevoFin = SLOTS[niFin].id;

  const cc = conflictoCelda(grado, dia, slotId, nuevoFin, dragId);
  if (cc) { toast(`Conflicto con "${cc.curso}"`, 'error'); dragId = null; return; }

  const cd = conflictoDocente(c.docente, dia, slotId, nuevoFin, dragId);
  if (cd) {
    const si = SLOTS.find(s => s.id === cd.inicio), sf = SLOTS.find(s => s.id === cd.fin);
    toast(`${c.docente.split(' ')[0]} ya tiene "${cd.curso}" ese día (${si?.inicio}–${sf?.inicio})`, 'error');
    dragId = null; return;
  }

  c.dia = dia; c.grado = grado; c.inicio = slotId; c.fin = nuevoFin;
  guardar(); renderTabla(); renderLista();
  toast('Clase movida ✓', 'success');
  dragId = null;
}

document.addEventListener('dragend', () => {
  document.querySelectorAll('.drop-over').forEach(el => el.classList.remove('drop-over'));
});

// ─── GUARDAR ──────────────────────────────────────────────────────────

function guardar() { localStorage.setItem('horario_clases_v3', JSON.stringify(clases)); }

// ─── TOAST ────────────────────────────────────────────────────────────

function toast(msg, tipo = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${tipo}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast'; }, 3500);
}

// ─── INIT ─────────────────────────────────────────────────────────────

function init() {
  renderColorChips();
  poblarHoraInicio();
  document.getElementById('inp-docente').disabled = true;
  document.getElementById('inp-curso').disabled = true;
  document.getElementById('inp-grado').addEventListener('change', poblarDocentes);
  document.getElementById('inp-docente').addEventListener('change', poblarCursos);
  document.getElementById('inp-inicio').addEventListener('change', poblarHoraFin);
  renderTabla(); renderLista(); renderStats();
  setupDayTabs();
}

document.addEventListener('DOMContentLoaded', init);
