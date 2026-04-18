/* ============================================================
   Horario Diversificado 2026 — Centro Cultural de América
   horario.js
   ============================================================ */

// ─── CONSTANTES ───────────────────────────────────────────────────────

const GRADOS = [
  'CUARTO BACH',
  'QUINTO BACH',
  'CUARTO PC',
  'QUINTO PC',
  'SEXTO PC'
];

const DIAS = ['L', 'M', 'X', 'J', 'V'];

const DIAS_NOMBRES = {
  L: 'Lunes',
  M: 'Martes',
  X: 'Miércoles',
  J: 'Jueves',
  V: 'Viernes'
};

// Genera slots de 30 min entre 07:00 y 18:00
const SLOTS = generarSlots('07:00', '18:00', 30);

const COLORES = [
  { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', nombre: 'Azul' },
  { bg: '#dcfce7', text: '#15803d', border: '#86efac', nombre: 'Verde' },
  { bg: '#fef3c7', text: '#92400e', border: '#fcd34d', nombre: 'Dorado' },
  { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd', nombre: 'Morado' },
  { bg: '#ffedd5', text: '#9a3412', border: '#fdba74', nombre: 'Naranja' },
  { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4', nombre: 'Rosa' },
  { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7', nombre: 'Menta' },
  { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5', nombre: 'Rojo' }
];

// ─── ESTADO ───────────────────────────────────────────────────────────

let clases    = JSON.parse(localStorage.getItem('horario_clases_v2') || '[]');
let colorSel  = 0;
let viewDay   = 'ALL';
let deleteId  = null;
let dragId    = null;
let toastTimer;

// ─── GENERAR SLOTS ────────────────────────────────────────────────────

function generarSlots(desde, hasta, minutos) {
  const slots = [];
  let [h, m] = desde.split(':').map(Number);
  const [hf, mf] = hasta.split(':').map(Number);

  while (h < hf || (h === hf && m < mf)) {
    const inicio = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    m += minutos;
    if (m >= 60) { h += Math.floor(m / 60); m = m % 60; }
    if (h > hf || (h === hf && m > mf)) break;
    const fin = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    slots.push({ id: inicio.replace(':', ''), inicio, fin });
  }
  return slots;
}

// ─── POBLAR SELECT DE HORAS ───────────────────────────────────────────

function poblarHoraInicio() {
  const selInicio = document.getElementById('inp-inicio');
  const selFin    = document.getElementById('inp-fin');
  selInicio.innerHTML = '<option value="">— Seleccionar —</option>';
  selFin.innerHTML    = '<option value="">— Seleccionar —</option>';

  SLOTS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.inicio;
    selInicio.appendChild(opt);
  });
}

function poblarHoraFin() {
  const inicioVal = document.getElementById('inp-inicio').value;
  const selFin    = document.getElementById('inp-fin');
  selFin.innerHTML = '<option value="">— Seleccionar —</option>';
  if (!inicioVal) return;

  const idx = SLOTS.findIndex(s => s.id === inicioVal);
  SLOTS.slice(idx + 1).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.inicio;
    selFin.appendChild(opt);
  });
}

// ─── COLOR CHIPS ──────────────────────────────────────────────────────

function renderColorChips() {
  const row = document.getElementById('color-row');
  row.innerHTML = COLORES.map((c, i) => `
    <div class="color-chip ${i === colorSel ? 'active' : ''}"
         style="background:${c.bg}; border-color:${i === colorSel ? c.border : 'transparent'}"
         title="${c.nombre}"
         onclick="selectColor(${i})">
    </div>
  `).join('');
}

function selectColor(i) {
  colorSel = i;
  renderColorChips();
}

// ─── AGREGAR CLASE ────────────────────────────────────────────────────

function agregarClase() {
  const curso  = document.getElementById('inp-curso').value.trim();
  const dia    = document.getElementById('inp-dia').value;
  const inicio = document.getElementById('inp-inicio').value;
  const fin    = document.getElementById('inp-fin').value;
  const grado  = document.getElementById('inp-grado').value;

  if (!curso)  { toast('Escribe el nombre del curso', 'error');  return; }
  if (!dia)    { toast('Selecciona un día', 'error');            return; }
  if (!inicio) { toast('Selecciona la hora de inicio', 'error'); return; }
  if (!fin)    { toast('Selecciona la hora de fin', 'error');    return; }
  if (!grado)  { toast('Selecciona el grado', 'error');          return; }

  // Detectar conflicto: cualquier clase del mismo día/grado que se solape
  const slotInicio = SLOTS.findIndex(s => s.id === inicio);
  const slotFin    = SLOTS.findIndex(s => s.id === fin);

  const conflicto = clases.find(c => {
    if (c.dia !== dia || c.grado !== grado) return false;
    const ci = SLOTS.findIndex(s => s.id === c.inicio);
    const cf = SLOTS.findIndex(s => s.id === c.fin);
    return slotInicio < cf && slotFin > ci;
  });

  if (conflicto) {
    toast(`Conflicto con "${conflicto.curso}"`, 'error');
    return;
  }

  const nueva = {
    id:    Date.now(),
    curso,
    dia,
    inicio,
    fin,
    grado,
    color: colorSel
  };

  clases.push(nueva);
  guardar();
  renderTabla();
  renderLista();
  renderStats();
  toast(`"${curso}" agregado ✓`, 'success');
  limpiarForm();
}

function limpiarForm() {
  document.getElementById('inp-curso').value  = '';
  document.getElementById('inp-dia').value    = '';
  document.getElementById('inp-inicio').value = '';
  document.getElementById('inp-fin').value    = '';
  document.getElementById('inp-grado').value  = '';
  poblarHoraFin();
}

// ─── ELIMINAR CLASE ───────────────────────────────────────────────────

function confirmDelete(id) {
  const c = clases.find(x => x.id === id);
  if (!c) return;
  deleteId = id;
  const si = SLOTS.find(s => s.id === c.inicio);
  const sf = SLOTS.find(s => s.id === c.fin);
  document.getElementById('modal-desc').textContent =
    `"${c.curso}" — ${DIAS_NOMBRES[c.dia]}, ${si ? si.inicio : ''} a ${sf ? sf.inicio : ''}, ${c.grado}`;
  document.getElementById('modal-bg').classList.add('open');
  document.getElementById('modal-confirm').onclick = doDelete;
}

function doDelete() {
  clases = clases.filter(c => c.id !== deleteId);
  guardar();
  renderTabla();
  renderLista();
  renderStats();
  closeModal();
  toast('Clase eliminada');
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  deleteId = null;
}

// ─── RENDER TABLA ─────────────────────────────────────────────────────

function renderTabla() {
  const dias = viewDay === 'ALL' ? DIAS : [viewDay];
  const wrap = document.getElementById('table-wrap');
  let html   = '';

  dias.forEach(dia => {
    // Clases de este día — calcular rango de slots a mostrar
    const clasesHoy = clases.filter(c => c.dia === dia);

    // Siempre mostrar todos los slots de 07:00 a 18:00
    html += `
      <div>
        ${viewDay === 'ALL' ? `<div class="day-header">${DIAS_NOMBRES[dia]}</div>` : ''}
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              ${GRADOS.map(g => `<th>${g}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${SLOTS.map(slot => {
              return `
                <tr>
                  <td class="hora-cell">
                    <b>${slot.inicio}</b>
                    <span class="hora-range">${slot.fin}</span>
                  </td>
                  ${GRADOS.map(g => {
                    // Buscar clase que comienza exactamente en este slot
                    const clase = clases.find(c =>
                      c.dia === dia &&
                      c.grado === g &&
                      c.inicio === slot.id
                    );

                    // Ver si esta celda está cubierta por una clase que empezó antes (para ocultar)
                    const cubierta = !clase && clases.some(c => {
                      if (c.dia !== dia || c.grado !== g) return false;
                      const ci = SLOTS.findIndex(s => s.id === c.inicio);
                      const cf = SLOTS.findIndex(s => s.id === c.fin);
                      const si = SLOTS.findIndex(s => s.id === slot.id);
                      return si > ci && si < cf;
                    });

                    if (cubierta) return ''; // celdas intermedias omitidas (rowspan)

                    // Calcular rowspan
                    let rowspan = 1;
                    if (clase) {
                      const ci = SLOTS.findIndex(s => s.id === clase.inicio);
                      const cf = SLOTS.findIndex(s => s.id === clase.fin);
                      rowspan = Math.max(1, cf - ci);
                    }

                    const col = clase ? COLORES[clase.color] : null;
                    return `
                      <td class="class-cell"
                          data-slot="${slot.id}" data-grado="${g}"
                          rowspan="${rowspan}"
                          onclick="celdaClick('${slot.id}','${g}','${dia}')"
                          ondragover="dragOver(event)"
                          ondrop="drop(event,'${slot.id}','${g}','${dia}')">
                        ${clase ? `
                          <div class="class-block"
                               style="background:${col.bg};color:${col.text};border:1px solid ${col.border}"
                               draggable="true"
                               ondragstart="dragStart(event,${clase.id})">
                            <div class="block-name">${clase.curso}</div>
                            <div class="block-grado">${clase.grado} · ${SLOTS.find(s=>s.id===clase.inicio)?.inicio} – ${SLOTS.find(s=>s.id===clase.fin)?.inicio}</div>
                            <button class="block-del"
                                    onclick="event.stopPropagation(); confirmDelete(${clase.id})">✕</button>
                          </div>` : ''}
                      </td>`;
                  }).join('')}
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  });

  wrap.innerHTML = html;
}

// ─── RENDER LISTA SIDEBAR ─────────────────────────────────────────────

function renderLista() {
  const lista = document.getElementById('clases-lista');

  if (!clases.length) {
    lista.innerHTML = `
      <div class="empty-state">
        <span class="icon">📅</span>
        Aún no hay clases.<br>Agrega tu primera clase arriba.
      </div>`;
    return;
  }

  lista.innerHTML = clases.map(c => {
    const col = COLORES[c.color];
    const si  = SLOTS.find(s => s.id === c.inicio);
    const sf  = SLOTS.find(s => s.id === c.fin);
    return `
      <div class="clase-item" style="border-left-color:${col.border}">
        <div class="clase-dot" style="background:${col.border}"></div>
        <div class="clase-info">
          <div class="clase-nombre" title="${c.curso}">${c.curso}</div>
          <div class="clase-meta">
            ${DIAS_NOMBRES[c.dia]} · ${si?.inicio ?? ''}–${sf?.inicio ?? ''} · ${c.grado}
          </div>
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
      <div class="stat-pill"><strong>${porGrado[g]}</strong> · ${g}</div>
    `).join('')}`;
}

// ─── TABS DE DÍAS ─────────────────────────────────────────────────────

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

// ─── CLICK EN CELDA VACÍA → PRE-RELLENA FORMULARIO ───────────────────

function celdaClick(slotId, grado, dia) {
  const ocupada = clases.find(c =>
    c.dia === dia && c.grado === grado &&
    (() => {
      const ci = SLOTS.findIndex(s => s.id === c.inicio);
      const cf = SLOTS.findIndex(s => s.id === c.fin);
      const si = SLOTS.findIndex(s => s.id === slotId);
      return si >= ci && si < cf;
    })()
  );
  if (ocupada) return;

  document.getElementById('inp-dia').value = dia;
  poblarHoraFin();
  setTimeout(() => {
    document.getElementById('inp-inicio').value = slotId;
    poblarHoraFin();
    setTimeout(() => {
      document.getElementById('inp-grado').value = grado;
    }, 20);
  }, 20);
  document.getElementById('inp-curso').focus();
}

// ─── DRAG & DROP ──────────────────────────────────────────────────────

function dragStart(e, id) {
  dragId = id;
  e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drop-over');
}

function drop(e, slotId, grado, dia) {
  e.preventDefault();
  e.currentTarget.classList.remove('drop-over');
  if (!dragId) return;

  const c = clases.find(x => x.id === dragId);
  if (!c) { dragId = null; return; }

  // Calcular duración original en slots
  const ci = SLOTS.findIndex(s => s.id === c.inicio);
  const cf = SLOTS.findIndex(s => s.id === c.fin);
  const duracion = cf - ci;

  const niInicio = SLOTS.findIndex(s => s.id === slotId);
  const niFin    = niInicio + duracion;
  if (niFin >= SLOTS.length) { toast('No cabe en ese horario', 'error'); dragId = null; return; }

  const nuevoFin = SLOTS[niFin].id;

  // Verificar conflicto (ignorando la propia clase)
  const conflicto = clases.find(x => {
    if (x.id === dragId || x.dia !== dia || x.grado !== grado) return false;
    const xi = SLOTS.findIndex(s => s.id === x.inicio);
    const xf = SLOTS.findIndex(s => s.id === x.fin);
    return niInicio < xf && niFin > xi;
  });

  if (conflicto) {
    toast(`Conflicto con "${conflicto.curso}"`, 'error');
    dragId = null;
    return;
  }

  c.dia    = dia;
  c.inicio = slotId;
  c.fin    = nuevoFin;
  c.grado  = grado;

  guardar();
  renderTabla();
  renderLista();
  toast('Clase movida ✓', 'success');
  dragId = null;
}

document.addEventListener('dragend', () => {
  document.querySelectorAll('.drop-over').forEach(el => el.classList.remove('drop-over'));
});

// ─── GUARDAR EN LOCALSTORAGE ──────────────────────────────────────────

function guardar() {
  localStorage.setItem('horario_clases_v2', JSON.stringify(clases));
}

// ─── TOAST ────────────────────────────────────────────────────────────

function toast(msg, tipo = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = `toast show ${tipo}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast'; }, 3200);
}

// ─── INICIALIZAR ──────────────────────────────────────────────────────

function init() {
  renderColorChips();
  poblarHoraInicio();
  poblarHoraFin();
  renderTabla();
  renderLista();
  renderStats();
  setupDayTabs();

  // Actualizar horas de fin cuando cambie inicio
  document.getElementById('inp-inicio').addEventListener('change', poblarHoraFin);
}

document.addEventListener('DOMContentLoaded', init);
