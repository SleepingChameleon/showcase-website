// ─── DATA ───
const COLORS = ['#1e56c7', '#2d6ef5', '#0d5ad6', '#1a3a6b', '#3b82f6', '#0ea5e9'];
const BGSLIST = [
  'linear-gradient(135deg,#dbeafe,#bfdbfe)',
  'linear-gradient(135deg,#e0eaff,#c7d7ff)',
  'linear-gradient(135deg,#dce9ff,#b8d4ff)',
  'linear-gradient(135deg,#e8f0fe,#c7d9ff)',
  'linear-gradient(135deg,#cfe5ff,#a8c8f5)',
  'linear-gradient(135deg,#d4e8ff,#b0ccf0)',
];

let projects = [
  { id: 1, title: 'StudySync', desc: 'A real-time collaborative study planner with Pomodoro timer, shared to-do lists, and progress tracking built using React and Firebase.', author: 'Maria Santos', role: 'BSIT 3-A', category: 'Web App', tags: ['React', 'Firebase', 'Realtime'], emoji: '📚', link: '#', year: '2025', color: '#1e56c7', bg: BGSLIST[0] },
  { id: 2, title: 'CampusEats', desc: 'Mobile food ordering app for on-campus canteens with digital menu, order queue system, and cashless payment integration.', author: 'Jose Reyes', role: 'BSCS 3-B', category: 'Mobile', tags: ['Flutter', 'REST API'], emoji: '🍱', link: '#', year: '2025', color: '#2d6ef5', bg: BGSLIST[1] },
  { id: 3, title: 'GradeSight', desc: 'Data dashboard that visualizes class performance trends using machine learning predictions on grade patterns. Built with Python and Streamlit.', author: 'Ana Lim', role: 'BSIT 4-A', category: 'Data / ML', tags: ['Python', 'Pandas', 'ML'], emoji: '📊', link: '#', year: '2025', color: '#0d5ad6', bg: BGSLIST[2] },
  { id: 4, title: 'LokalConnect', desc: 'Social network prototype connecting local artisans with buyers in their community, featuring product listings and live chat.', author: 'Carlo Mendoza', role: 'BSCS 2-C', category: 'Web App', tags: ['Vue.js', 'Node', 'MongoDB'], emoji: '🏪', link: '#', year: '2025', color: '#1a3a6b', bg: BGSLIST[3] },
  { id: 5, title: 'PixelQuest', desc: 'A browser-based 2D RPG game built from scratch using JavaScript Canvas. Features turn-based combat, an inventory system, and procedural level generation.', author: 'Denise Cruz', role: 'BSIT 3-C', category: 'Game', tags: ['JS Canvas', 'Game Dev'], emoji: '🎮', link: '#', year: '2025', color: '#3b82f6', bg: BGSLIST[4] },
  { id: 6, title: 'HealthTrack UI', desc: 'A modern health monitoring UI kit designed in Figma with components for wearable data visualization, mood journaling, and sleep analysis.', author: 'Marco Villanueva', role: 'BSCS 3-A', category: 'Design', tags: ['Figma', 'UX', 'Design System'], emoji: '💙', link: '#', year: '2025', color: '#0ea5e9', bg: BGSLIST[5] },
];

let nextId = 7;
let activeFilter = 'all';

// ─── HELPERS ───
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// ─── RENDER CARDS ───
function renderCards() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const grid = document.getElementById('grid');

  const filtered = projects.filter(p => {
    const matchFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  grid.innerHTML = '';

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" fill="none" stroke="#1e56c7" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>No projects found. Try a different search or filter.</p>
      </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = (i * 0.07) + 's';
    card.innerHTML = `
      <div class="card-thumb" style="background:${p.bg}">${p.emoji || '🚀'}</div>
      <div class="card-body">
        <div class="card-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.desc.length > 110 ? p.desc.slice(0, 110) + '…' : p.desc}</div>
        <div class="card-author">
          <div class="avatar" style="background:${p.color}">${getInitials(p.author)}</div>
          <div class="author-info">
            <div class="author-name">${p.author}</div>
            <div class="author-role">${p.role}</div>
          </div>
          <a href="#" class="card-link" onclick="openView(${p.id});return false;">
            View
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Update stats
  document.getElementById('statProjects').textContent = projects.length;
  document.getElementById('statStudents').textContent = [...new Set(projects.map(p => p.author))].length;
}

// ─── MODALS ───
function openView(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  document.getElementById('vmThumb').style.background = p.bg;
  document.getElementById('vmThumb').textContent = p.emoji || '🚀';
  document.getElementById('vmTags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('vmTitle').textContent = p.title;
  document.getElementById('vmDesc').textContent = p.desc;
  document.getElementById('vmAuthor').textContent = `${p.author} · ${p.role}`;
  document.getElementById('vmCategory').textContent = p.category;
  document.getElementById('vmYear').textContent = p.year;

  const lnk = document.getElementById('vmLink');
  lnk.href = p.link || '#';
  lnk.style.display = (!p.link || p.link === '#') ? 'none' : '';

  document.getElementById('viewModal').classList.add('open');
}

function openAddModal() {
  document.getElementById('addModal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
}

// ─── SUBMIT PROJECT ───
function submitProject() {
  const title    = document.getElementById('fTitle').value.trim();
  const desc     = document.getElementById('fDesc').value.trim();
  const author   = document.getElementById('fAuthor').value.trim();
  const category = document.getElementById('fCategory').value;
  const err      = document.getElementById('formError');

  if (!title || !desc || !author || !category) {
    err.textContent = 'Please fill in all required fields.';
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  const colorIdx = nextId % COLORS.length;
  const bgIdx    = nextId % BGSLIST.length;

  projects.unshift({
    id:       nextId++,
    title,
    desc,
    author,
    role:     document.getElementById('fRole').value.trim() || '',
    category,
    tags:     document.getElementById('fTags').value.split(',').map(t => t.trim()).filter(Boolean),
    emoji:    document.getElementById('fEmoji').value.trim() || '🚀',
    link:     document.getElementById('fLink').value.trim() || '#',
    year:     new Date().getFullYear().toString(),
    color:    COLORS[colorIdx],
    bg:       BGSLIST[bgIdx],
  });

  // Reset form fields
  ['fTitle', 'fDesc', 'fAuthor', 'fRole', 'fTags', 'fEmoji', 'fLink'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('fCategory').value = '';

  closeModal('addModal');
  renderCards();
}

// ─── FILTER BAR ───
document.getElementById('filterBar').addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  activeFilter = e.target.dataset.filter;
  renderCards();
});

// ─── NAV: SCROLL SHADOW ───
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

// ─── NAV: HAMBURGER ───
function toggleNav() {
  document.getElementById('navbar').classList.toggle('mobile-open');
}

// ─── INIT ───
if (window.innerWidth <= 768) {
  document.getElementById('navBtnTop').style.display = 'block';
}

renderCards();