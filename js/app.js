// ============================================
// YADCODE — app.js (main logic)
// ============================================

// ---------- TOAST ----------
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = 'toast', 3000);
}

// ---------- LIVE COUNT ----------
function initLiveCount() {
  const el = document.getElementById('liveCount');
  if (!el) return;
  let n = Math.floor(Math.random() * 200) + 400;
  el.textContent = n;
  setInterval(() => {
    n += Math.floor(Math.random() * 11) - 5;
    if (n < 350) n = 350;
    if (n > 700) n = 700;
    el.textContent = n;
  }, 2500);
}

// ---------- STAT COUNTER ----------
function initCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur + (target >= 1000 ? '+' : '');
    }, 25);
  });
}

// ---------- LESSONS DATA ----------
const LESSONS = [
  {id:'html-dasar', title:'HTML Dasar', icon:'📄', desc:'Struktur dasar halaman web', cat:'html', level:'pemula', time:'15 min', quiz:5,
   body:`<h1>HTML Dasar</h1><p>HTML (HyperText Markup Language) adalah bahasa dasar untuk membuat halaman web.</p><h2>Struktur Dasar</h2><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Halo&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Halo Dunia!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><h2>Tag Penting</h2><ul><li><code>&lt;h1&gt;</code> — heading</li><li><code>&lt;p&gt;</code> — paragraf</li><li><code>&lt;a&gt;</code> — link</li><li><code>&lt;img&gt;</code> — gambar</li></ul>`},
  {id:'css-dasar', title:'CSS Dasar', icon:'🎨', desc:'Styling halaman web jadi cantik', cat:'css', level:'pemula', time:'20 min', quiz:5,
   body:`<h1>CSS Dasar</h1><p>CSS (Cascading Style Sheets) mengatur tampilan halaman web.</p><h2>Selector</h2><pre><code>h1 { color: blue; font-size: 32px; }
.card { background: white; padding: 20px; }</code></pre><h2>Box Model</h2><p>Setiap elemen punya <b>margin</b>, <b>border</b>, <b>padding</b>, dan <b>content</b>.</p>`},
  {id:'js-dasar', title:'JavaScript Dasar', icon:'⚡', desc:'Bikin web jadi interaktif', cat:'js', level:'pemula', time:'25 min', quiz:8,
   body:`<h1>JavaScript Dasar</h1><p>JavaScript membuat halaman web jadi interaktif.</p><h2>Variabel</h2><pre><code>let nama = "YADCODE";
const umur = 1;
var lama = "hindari";</code></pre><h2>Function</h2><pre><code>function sapa(nama) {
  return "Halo " + nama;
}</code></pre>`},
  {id:'js-dom', title:'JavaScript DOM', icon:'🌳', desc:'Manipulasi elemen HTML', cat:'js', level:'menengah', time:'30 min', quiz:6,
   body:`<h1>DOM Manipulation</h1><p>DOM = Document Object Model. Dengan JS kita bisa ubah HTML secara live.</p><pre><code>document.getElementById('judul').textContent = 'Baru!';
document.querySelector('.card').style.color = 'red';</code></pre>`},
  {id:'css-flex', title:'CSS Flexbox', icon:'📐', desc:'Layout modern 1 dimensi', cat:'css', level:'menengah', time:'25 min', quiz:6,
   body:`<h1>Flexbox</h1><p>Flexbox memudahkan membuat layout.</p><pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}</code></pre>`},
  {id:'python-dasar', title:'Python Dasar', icon:'🐍', desc:'Bahasa paling ramah pemula', cat:'python', level:'pemula', time:'30 min', quiz:8,
   body:`<h1>Python Dasar</h1><p>Python = bahasa paling mudah untuk pemula.</p><pre><code>nama = "YADCODE"
print(f"Halo {nama}!")

for i in range(5):
    print(i)</code></pre>`},
  {id:'js-async', title:'JavaScript Async', icon:'⏳', desc:'Promise & async/await', cat:'js', level:'lanjutan', time:'35 min', quiz:7,
   body:`<h1>Async JavaScript</h1><pre><code>async function ambilData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  return data;
}</code></pre>`},
  {id:'html-form', title:'HTML Form', icon:'📝', desc:'Input dari user', cat:'html', level:'pemula', time:'20 min', quiz:5,
   body:`<h1>HTML Form</h1><pre><code>&lt;form&gt;
  &lt;input type="text" placeholder="Nama"&gt;
  &lt;input type="email" placeholder="Email"&gt;
  &lt;button type="submit"&gt;Kirim&lt;/button&gt;
&lt;/form&gt;</code></pre>`},
  {id:'css-grid', title:'CSS Grid', icon:'🔲', desc:'Layout 2 dimensi', cat:'css', level:'menengah', time:'25 min', quiz:6,
   body:`<h1>CSS Grid</h1><pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>`},
  {id:'py-oop', title:'Python OOP', icon:'🧬', desc:'Class & Object di Python', cat:'python', level:'menengah', time:'35 min', quiz:7,
   body:`<h1>Python OOP</h1><pre><code>class User:
    def __init__(self, nama):
        self.nama = nama
    def sapa(self):
        return f"Halo, {self.nama}"

u = User("YADCODE")
print(u.sapa())</code></pre>`},
  {id:'js-array', title:'JavaScript Array', icon:'📊', desc:'Method array penting', cat:'js', level:'pemula', time:'20 min', quiz:6,
   body:`<h1>Array Methods</h1><pre><code>const angka = [1, 2, 3, 4, 5];
angka.map(n => n * 2);
angka.filter(n => n > 2);
angka.reduce((a, b) => a + b, 0);</code></pre>`},
  {id:'html-semantic', title:'HTML Semantic', icon:'🧱', desc:'Struktur HTML yang baik', cat:'html', level:'menengah', time:'20 min', quiz:5,
   body:`<h1>HTML Semantic</h1><p>Gunakan tag yang punya makna.</p><pre><code>&lt;header&gt;...&lt;/header&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;...&lt;/main&gt;
&lt;article&gt;...&lt;/article&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>`},
];

// ---------- QUIZ DATA ----------
const QUIZZES = {
  'html-dasar': [
    {q:'Apa kepanjangan HTML?', o:['HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink Text Markup Language'], a:0},
    {q:'Tag untuk heading terbesar?', o:['&lt;h6&gt;','&lt;h1&gt;','&lt;head&gt;','&lt;heading&gt;'], a:1},
    {q:'Tag untuk paragraf?', o:['&lt;para&gt;','&lt;p&gt;','&lt;pg&gt;','&lt;text&gt;'], a:1},
    {q:'Tag untuk link?', o:['&lt;link&gt;','&lt;a&gt;','&lt;href&gt;','&lt;url&gt;'], a:1},
    {q:'Tag untuk gambar?', o:['&lt;image&gt;','&lt;picture&gt;','&lt;img&gt;','&lt;src&gt;'], a:2},
  ],
  'css-dasar': [
    {q:'CSS singkatan dari?', o:['Computer Style Sheets','Cascading Style Sheets','Creative Style System','Colorful Style Sheets'], a:1},
    {q:'Properti untuk warna teks?', o:['text-color','font-color','color','text-style'], a:2},
    {q:'Selector untuk class?', o:['#nama','.nama','nama','*nama'], a:1},
    {q:'Selector untuk id?', o:['#nama','.nama','nama','@nama'], a:0},
    {q:'Properti untuk ukuran font?', o:['text-size','font-size','size','text-height'], a:1},
  ],
  'js-dasar': [
    {q:'Keyword untuk variabel konstanta?', o:['var','let','const','static'], a:2},
    {q:'Operator untuk tidak sama dengan?', o:['!=','<>','=/=','!=='], a:0},
    {q:'Function untuk mencetak di console?', o:['print()','log()','console.log()','echo()'], a:2},
    {q:'Tipe data untuk teks?', o:['int','string','bool','float'], a:1},
    {q:'Cara mendefinisikan function?', o:['function nama() {}','def nama() {}','func nama() {}','void nama() {}'], a:0},
    {q:'Hasil dari 2 + "2"?', o:['4','"22"','NaN','Error'], a:1},
    {q:'Cara komentar satu baris?', o:['# komentar','// komentar','<!-- komentar -->','/* komentar */'], a:1},
    {q:'Method untuk ubah string jadi huruf besar?', o:['toUpperCase()','upper()','big()','capitalize()'], a:0},
  ],
  'js-dom': [
    {q:'DOM singkatan dari?', o:['Data Object Model','Document Object Model','Digital Object Model','Document Oriented Model'], a:1},
    {q:'Method untuk ambil elemen by id?', o:['getElementById()','getId()','queryId()','findId()'], a:0},
    {q:'Method untuk query selector?', o:['querySelector()','select()','find()','getSelector()'], a:0},
    {q:'Properti untuk ubah teks?', o:['innerHTML','textContent','keduanya','innerText'], a:2},
    {q:'Event saat tombol diklik?', o:['onhover','onclick','onpress','ontap'], a:1},
    {q:'Cara tambah class ke elemen?', o:['classList.add()','addClass()','class.add()','className.add()'], a:0},
  ],
  'css-flex': [
    {q:'Untuk aktifkan flexbox?', o:['display: block','display: flex','display: grid','display: inline'], a:1},
    {q:'Untuk atur posisi horizontal?', o:['align-items','justify-content','text-align','flex-align'], a:1},
    {q:'Untuk atur posisi vertikal?', o:['align-items','justify-content','vertical-align','flex-align'], a:0},
    {q:'Untuk jarak antar item?', o:['margin','padding','gap','space'], a:2},
    {q:'Arah default flex?', o:['column','row','grid','inline'], a:1},
    {q:'Untuk wrap item?', o:['flex-wrap: wrap','wrap: true','flex: wrap','nowrap'], a:0},
  ],
  'python-dasar': [
    {q:'Cara print di Python?', o:['echo()','print()','console.log()','printf()'], a:1},
    {q:'Keyword untuk function?', o:['function','def','func','void'], a:1},
    {q:'Tipe data untuk teks?', o:['str','string','text','char'], a:0},
    {q:'Cara komentar?', o:['//','#','/* */','<!-- -->'], a:1},
    {q:'Loop untuk range?', o:['for','while','loop','repeat'], a:0},
    {q:'Struktur data list pakai?', o:['[]','{}','()','<>'], a:0},
    {q:'Cara ambil input?', o:['input()','scan()','read()','get()'], a:0},
    {q:'Indentasi di Python pakai?', o:['tab/spasi','kurung kurawal','kurung siku','tidak perlu'], a:0},
  ],
  'js-async': [
    {q:'Async function mengembalikan?', o:['Promise','Object','Array','String'], a:0},
    {q:'Keyword untuk await?', o:['async','await','wait','then'], a:1},
    {q:'Method untuk handle promise?', o:['.then()','.handle()','.catch()','keduanya a dan c'], a:3},
    {q:'Fetch mengembalikan?', o:['Promise','Data','String','JSON'], a:0},
    {q:'Cara ubah response jadi JSON?', o:['.json()','.toJSON()','.parse()','.data()'], a:0},
    {q:'Keyword untuk error handling async?', o:['try/catch','if/else','error/throw','rescue'], a:0},
    {q:'Async/await adalah syntactic sugar dari?', o:['Callback','Promise','Generator','Observable'], a:1},
  ],
  'html-form': [
    {q:'Tag untuk form?', o:['&lt;form&gt;','&lt;input&gt;','&lt;field&gt;','&lt;data&gt;'], a:0},
    {q:'Input untuk email?', o:['type="text"','type="email"','type="mail"','type="e-mail"'], a:1},
    {q:'Tombol submit?', o:['type="button"','type="submit"','type="send"','type="click"'], a:1},
    {q:'Atribut untuk placeholder?', o:['text','placeholder','hint','label'], a:1},
    {q:'Tag untuk label input?', o:['&lt;label&gt;','&lt;text&gt;','&lt;name&gt;','&lt;desc&gt;'], a:0},
  ],
  'css-grid': [
    {q:'Untuk aktifkan grid?', o:['display: block','display: flex','display: grid','display: inline'], a:2},
    {q:'Untuk atur kolom?', o:['grid-template-columns','grid-columns','columns','grid-cols'], a:0},
    {q:'1fr artinya?', o:['1 pixel','1 fragment','1 fraction','1 free'], a:2},
    {q:'repeat(3, 1fr) artinya?', o:['3 baris','3 kolom sama besar','3 grid','3 item'], a:1},
    {q:'Untuk jarak antar grid?', o:['margin','padding','gap','space'], a:2},
    {q:'Untuk span 2 kolom?', o:['grid-column: span 2','colspan=2','grid: 2','span: 2'], a:0},
  ],
  'py-oop': [
    {q:'Keyword untuk class?', o:['class','struct','object','def'], a:0},
    {q:'Method inisialisasi?', o:['__init__','__new__','__start__','__begin__'], a:0},
    {q:'Parameter self artinya?', o:['Diri sendiri','Static','Global','Kelas'], a:0},
    {q:'Cara buat object?', o:['Class()','new Class()','Class.new()','create Class()'], a:0},
    {q:'Inheritance di Python?', o:['class B(A):','class B extends A:','class B : A','class B &lt;&lt; A'], a:0},
    {q:'Method tanpa self disebut?', o:['static method','class method','global method','free method'], a:0},
    {q:'Attribute diakses pakai?', o:['.attribute','->attribute','::attribute','#attribute'], a:0},
  ],
  'js-array': [
    {q:'Method untuk loop array?', o:['forEach()','for()','loop()','each()'], a:0},
    {q:'Method untuk transformasi?', o:['map()','transform()','change()','apply()'], a:0},
    {q:'Method untuk filter?', o:['filter()','select()','where()','find()'], a:0},
    {q:'Method untuk jumlahkan?', o:['reduce()','sum()','total()','add()'], a:0},
    {q:'Property untuk panjang array?', o:['length','size','count','len'], a:0},
    {q:'Method untuk tambah di akhir?', o:['push()','pop()','shift()','unshift()'], a:0},
  ],
  'html-semantic': [
    {q:'Tag untuk header?', o:['&lt;header&gt;','&lt;head&gt;','&lt;top&gt;','&lt;h&gt;'], a:0},
    {q:'Tag untuk navigasi?', o:['&lt;nav&gt;','&lt;navigate&gt;','&lt;menu&gt;','&lt;link&gt;'], a:0},
    {q:'Tag untuk konten utama?', o:['&lt;main&gt;','&lt;body&gt;','&lt;content&gt;','&lt;center&gt;'], a:0},
    {q:'Tag untuk artikel?', o:['&lt;article&gt;','&lt;post&gt;','&lt;blog&gt;','&lt;text&gt;'], a:0},
    {q:'Tag untuk footer?', o:['&lt;footer&gt;','&lt;bottom&gt;','&lt;end&gt;','&lt;foot&gt;'], a:0},
  ],
};

// ---------- LEADERBOARD DATA ----------
const LEADERBOARD = {
  alltime: [
    {name:'Andi Pratama', score:9850, badge:'🥇 Top Coder'},
    {name:'Sinta Dewi', score:9720, badge:'🥈 Rising Star'},
    {name:'Budi Santoso', score:9540, badge:'🥉 Consistent'},
    {name:'Rina Marlina', score:9210, badge:'⭐ Pro'},
    {name:'Dimas Anggara', score:8940, badge:'⭐ Pro'},
    {name:'Citra Kirana', score:8720, badge:'🔥 Hot'},
    {name:'Eko Prasetyo', score:8510, badge:'🔥 Hot'},
    {name:'Fani Rahma', score:8330, badge:'✨ Rising'},
    {name:'Gilang Ramadhan', score:8120, badge:'✨ Rising'},
    {name:'Hana Salsabila', score:7980, badge:'💫 Active'},
  ],
  weekly: [
    {name:'Rina Marlina', score:2480, badge:'🥇 Weekly'},
    {name:'Andi Pratama', score:2310, badge:'🥈 Weekly'},
    {name:'Dimas Anggara', score:2180, badge:'🥉 Weekly'},
    {name:'Sinta Dewi', score:2050, badge:'⭐ Pro'},
    {name:'Eko Prasetyo', score:1920, badge:'⭐ Pro'},
    {name:'Budi Santoso', score:1810, badge:'🔥 Hot'},
    {name:'Fani Rahma', score:1720, badge:'🔥 Hot'},
    {name:'Citra Kirana', score:1650, badge:'✨ Rising'},
    {name:'Hana Salsabila', score:1540, badge:'✨ Rising'},
    {name:'Gilang Ramadhan', score:1420, badge:'💫 Active'},
  ],
  daily: [
    {name:'Dimas Anggara', score:520, badge:'🥇 Daily'},
    {name:'Rina Marlina', score:480, badge:'🥈 Daily'},
    {name:'Andi Pratama', score:450, badge:'🥉 Daily'},
    {name:'Fani Rahma', score:410, badge:'⭐ Pro'},
    {name:'Eko Prasetyo', score:390, badge:'🔥 Hot'},
    {name:'Sinta Dewi', score:360, badge:'✨ Rising'},
    {name:'Budi Santoso', score:330, badge:'✨ Rising'},
    {name:'Citra Kirana', score:300, badge:'💫 Active'},
    {name:'Hana Salsabila', score:280, badge:'💫 Active'},
    {name:'Gilang Ramadhan', score:250, badge:'🌟 Star'},
  ],
};

// ---------- LESSON RENDERING ----------
function renderLessons(filter) {
  filter = filter || {};
  const grid = document.getElementById('lessonGrid');
  if (!grid) return;
  const search = filter.search || '';
  const cat = filter.cat || 'all';
  const level = filter.level || 'all';
  const filtered = LESSONS.filter(function(l) {
    const matchSearch = l.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                        l.desc.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    const matchCat = cat === 'all' || l.cat === cat;
    const matchLevel = level === 'all' || l.level === level;
    return matchSearch && matchCat && matchLevel;
  });
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px">😕 Tidak ada materi yang cocok.</p>';
    return;
  }
  grid.innerHTML = filtered.map(function(l) {
    return '<div class="lesson-card fade-up" onclick="openReader(\\'' + l.id + '\\')">' +
      '<div class="lesson-icon">' + l.icon + '</div>' +
      '<h3>' + l.title + '</h3>' +
      '<p>' + l.desc + '</p>' +
      '<div class="lesson-meta">' +
        '<span>⏱️ ' + l.time + '</span>' +
        '<span>❓ ' + l.quiz + ' soal</span>' +
      '</div>' +
      '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<span class="badge badge-new">' + l.cat.toUpperCase() + '</span>' +
        '<span class="badge badge-' + (l.level === 'pemula' ? 'pro' : l.level === 'menengah' ? 'hot' : 'new') + '">' + l.level + '</span>' +
      '</div>' +
      '<button class="btn btn-primary btn-small" style="margin-top:16px;width:100%;justify-content:center" onclick="event.stopPropagation();startQuiz(\\'' + l.id + '\\')">🎯 Mulai Quiz</button>' +
    '</div>';
  }).join('');
}

// ---------- FILTER ----------
function initFilter() {
  const search = document.getElementById('searchInput');
  const cat = document.getElementById('categoryFilter');
  const level = document.getElementById('levelFilter');
  if (!search) return;
  const apply = function() {
    renderLessons({ search: search.value, cat: cat.value, level: level.value });
  };
  search.addEventListener('input', apply);
  cat.addEventListener('change', apply);
  level.addEventListener('change', apply);
}

// ---------- READER ----------
function openReader(id) {
  const lesson = LESSONS.find(function(l) { return l.id === id; });
  if (!lesson) return;
  const modal = document.getElementById('readerModal');
  const body = document.getElementById('readerBody');
  if (!modal || !body) return;
  body.innerHTML =
    '<h1>' + lesson.icon + ' ' + lesson.title + '</h1>' +
    '<div class="meta">⏱️ ' + lesson.time + ' • 📚 ' + lesson.cat.toUpperCase() + ' • 🎯 ' + lesson.level + '</div>' +
    '<div class="body">' + lesson.body + '</div>' +
    '<div style="margin-top:30px;display:flex;gap:12px;flex-wrap:wrap">' +
      '<button class="btn btn-primary" onclick="closeReader();startQuiz(\\'' + lesson.id + '\\')">🎯 Mulai Quiz</button>' +
      '<button class="btn btn-secondary" onclick="closeReader()">Tutup</button>' +
    '</div>';
  modal.classList.add('open');
}
function closeReader() {
  const m = document.getElementById('readerModal');
  if (m) m.classList.remove('open');
}

// ---------- QUIZ ----------
let quizState = null;

function startQuiz(lessonId) {
  const questions = QUIZZES[lessonId];
  const lesson = LESSONS.find(function(l) { return l.id === lessonId; });
  if (!questions || !lesson) {
    showToast('Quiz belum tersedia 😅', 'error');
    return;
  }
  quizState = { lessonId: lessonId, lesson: lesson, questions: questions, index: 0, score: 0 };
  const modal = document.getElementById('quizModal');
  if (!modal) return;
  modal.classList.add('open');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const body = document.getElementById('quizBody');
  if (!body || !quizState) return;
  const questions = quizState.questions;
  const index = quizState.index;
  const score = quizState.score;
  const lesson = quizState.lesson;
  const q = questions[index];
  const optsHtml = q.o.map(function(opt, i) {
    return '<button class="quiz-option" onclick="answerQuiz(' + i + ')">' + opt + '</button>';
  }).join('');
  body.innerHTML =
    '<h2 style="margin-bottom:16px">🎯 ' + lesson.icon + ' Quiz: ' + lesson.title + '</h2>' +
    '<div class="quiz-progress">' +
      '<span>Soal ' + (index + 1) + ' / ' + questions.length + '</span>' +
      '<span>Skor: <b style="color:var(--primary)">' + score + '</b></span>' +
    '</div>' +
    '<div class="quiz-q">' + q.q + '</div>' +
    '<div id="quizOptions">' + optsHtml + '</div>';
}

function answerQuiz(choice) {
  if (!quizState) return;
  const questions = quizState.questions;
  const index = quizState.index;
  const q = questions[index];
  const buttons = document.querySelectorAll('#quizOptions .quiz-option');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === q.a) btn.classList.add('correct');
    else if (i === choice) btn.classList.add('wrong');
  });
  const correct = choice === q.a;
  if (correct) {
    quizState.score += 1;
    showToast('✅ Benar!', 'success');
  } else {
    showToast('❌ Salah!', 'error');
  }
  setTimeout(function() {
    quizState.index += 1;
    if (quizState.index >= questions.length) {
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  }, 900);
}

function finishQuiz() {
  if (!quizState) return;
  const score = quizState.score;
  const questions = quizState.questions;
  const lesson = quizState.lesson;
  const pct = Math.round((score / questions.length) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪';
  const body = document.getElementById('quizBody');
  if (body) {
    body.innerHTML =
      '<div style="text-align:center;padding:20px 0">' +
        '<div style="font-size:72px;margin-bottom:16px">' + emoji + '</div>' +
        '<h2 style="font-size:28px;margin-bottom:12px">Quiz Selesai!</h2>' +
        '<p style="color:var(--text-muted);margin-bottom:24px">' + lesson.title + '</p>' +
        '<div style="font-size:48px;font-weight:900;background:linear-gradient(90deg,#00e5ff,#7c4dff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px">' + score + ' / ' + questions.length + '</div>' +
        '<p style="color:var(--text-muted);margin-bottom:32px">' + pct + '% benar</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<button class="btn btn-primary" onclick="closeQuiz();startQuiz(\\'' + lesson.id + '\\')">🔄 Ulangi</button>' +
          '<button class="btn btn-secondary" onclick="closeQuiz()">Tutup</button>' +
        '</div>' +
      '</div>';
  }
  showToast('Skor kamu: ' + score + '/' + questions.length + ' (' + pct + '%)', 'success');
}

function closeQuiz() {
  const m = document.getElementById('quizModal');
  if (m) m.classList.remove('open');
  quizState = null;
}

// ---------- LEADERBOARD ----------
function renderLeaderboard(range) {
  range = range || 'alltime';
  const container = document.getElementById('lbContent');
  if (!container) return;
  const data = LEADERBOARD[range] || LEADERBOARD.alltime;
  container.innerHTML = data.map(function(u, i) {
    const rank = i + 1;
    const cls = rank === 1 ? 'lb-top1' : rank === 2 ? 'lb-top2' : rank === 3 ? 'lb-top3' : '';
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    return '<div class="lb-row ' + cls + ' fade-up">' +
      '<div class="lb-rank">' + medal + '</div>' +
      '<div class="lb-avatar">' + u.name.charAt(0) + '</div>' +
      '<div class="lb-name">' + u.name + '</div>' +
      '<div class="lb-badge">' + u.badge + '</div>' +
      '<div class="lb-score">' + u.score.toLocaleString() + '</div>' +
    '</div>';
  }).join('');
}

function initLeaderboardTabs() {
  const tabs = document.querySelectorAll('.lb-tab');
  if (!tabs.length) return;
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderLeaderboard(tab.dataset.range);
    });
  });
}

// ---------- PLAYGROUND ----------
const PG_DEFAULT = { html: '', css: '', js: '' };

function initPlayground() {
  const tabs = document.querySelectorAll('.pg-tab');
  if (!tabs.length) return;

  PG_DEFAULT.html = document.getElementById('pgHtml').value;
  PG_DEFAULT.css = document.getElementById('pgCss').value;
  PG_DEFAULT.js = document.getElementById('pgJs').value;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const target = tab.dataset.tab;
      ['html', 'css', 'js'].forEach(function(t) {
        const el = document.getElementById('pg' + t.charAt(0).toUpperCase() + t.slice(1));
        if (el) el.style.display = (t === target) ? 'block' : 'none';
      });
    });
  });

  runCode();
}

function runCode() {
  const html = document.getElementById('pgHtml').value;
  const css = document.getElementById('pgCss').value;
  const js = document.getElementById('pgJs').value;
  const frame = document.getElementById('pgFrame');
  if (!frame) return;
  const closeScript = '<' + '/script>';
  const doc = '<!DOCTYPE html><html><head><style>' + css + '</style></head><body>' + html + '<script>' + js + closeScript + '</body></html>';
  frame.srcdoc = doc;
}

function resetCode() {
  document.getElementById('pgHtml').value = PG_DEFAULT.html;
  document.getElementById('pgCss').value = PG_DEFAULT.css;
  document.getElementById('pgJs').value = PG_DEFAULT.js;
  runCode();
  showToast('🔄 Kode di-reset', 'success');
}

function downloadCode() {
  const html = document.getElementById('pgHtml').value;
  const css = document.getElementById('pgCss').value;
  const js = document.getElementById('pgJs').value;
  const closeScript = '<' + '/script>';
  const full = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>YADCODE Playground</title>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n' + html + '\n<script>\n' + js + '\n' + closeScript + '\n</body>\n</html>';
  const blob = new Blob([full], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'yadcode-playground.html';
  a.click();
  URL.revokeObjectURL(url);
  showToast('💾 Kode tersimpan!', 'success');
}

// ---------- NAV ACTIVE ----------
function initNavActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
    else a.classList.remove('active');
  });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', function() {
  initNavActive();
  initLiveCount();
  initCounters();
  initFilter();
  initLeaderboardTabs();
  initPlayground();

  if (document.getElementById('lessonGrid')) renderLessons();
  if (document.getElementById('lbContent')) renderLeaderboard('alltime');

  document.querySelectorAll('.modal').forEach(function(m) {
    m.addEventListener('click', function(e) {
      if (e.target === m) m.classList.remove('open');
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(function(m) { m.classList.remove('open'); });
      quizState = null;
    }
  });

  ['pgHtml', 'pgCss', 'pgJs'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) {
      let timer;
      el.addEventListener('input', function() {
        clearTimeout(timer);
        timer = setTimeout(runCode, 500);
      });
    }
  });
});
