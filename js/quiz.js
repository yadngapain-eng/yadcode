const QUIZ_TOPICS=[
{id:'q1',icon:'📄',title:'Quiz HTML',desc:'10 soal dasar HTML',level:'Pemula',quiz:[
{q:'Tag untuk heading paling besar?',o:['<h1>','<h6>','<header>','<title>'],c:0},
{q:'Tag untuk paragraf?',o:['<p>','<par>','<text>','<para>'],c:0},
{q:'Atribut untuk link?',o:['src','href','link','url'],c:1},
{q:'Tag untuk gambar?',o:['<img>','<pic>','<image>','<photo>'],c:0},
{q:'DOCTYPE html itu untuk?',o:['Style','Deklarasi HTML5','Script','Meta'],c:1}]},
{id:'q2',icon:'🎨',title:'Quiz CSS',desc:'10 soal dasar CSS',level:'Pemula',quiz:[
{q:'CSS singkatan dari?',o:['Computer Style','Cascading Style Sheets','Creative Style','Colorful'],c:1},
{q:'Cara pakai CSS external?',o:['<style>','<css>','<link>','<script>'],c:2},
{q:'Selector untuk class?',o:['#nama','.nama','*nama','@nama'],c:1},
{q:'Properti ubah warna text?',o:['background','color','font','text-color'],c:1},
{q:'Padding itu?',o:['jarak luar','jarak dalam','border','garis'],c:1}]},
{id:'q3',icon:'⚡',title:'Quiz JavaScript',desc:'10 soal JS dasar',level:'Pemula',quiz:[
{q:'Deklarasi variabel const?',o:['tidak bisa diubah','bisa diubah','error','global'],c:0},
{q:'Operator === untuk?',o:['assign','compare nilai & tipe','compare nilai','tidak ada'],c:1},
{q:'Method array untuk tambah di akhir?',o:['push','pop','shift','unshift'],c:0},
{q:'Function arrow ditulis?',o:['function()','() =>','func()','fn()'],c:1},
{q:'console.log() untuk?',o:['hapus','print','input','stop'],c:1}]},
{id:'q4',icon:'☕',title:'Quiz Java',desc:'10 soal Java dasar',level:'Pemula',quiz:[
{q:'Tipe data bilangan bulat?',o:['String','int','boolean','double'],c:1},
{q:'Keyword perulangan?',o:['if','switch','for','try'],c:2},
{q:'Method print console?',o:['print()','System.out.println()','echo','log()'],c:1},
{q:'Class di Java harus diawali?',o:['lowercase','uppercase','angka','simbol'],c:1},
{q:'Modifier akses paling ketat?',o:['public','protected','private','default'],c:2}]},
{id:'q5',icon:'🐍',title:'Quiz Python',desc:'10 soal Python dasar',level:'Pemula',quiz:[
{q:'Print di Python?',o:['echo','print()','console.log()','println()'],c:1},
{q:'Komentar single line?',o:['//','#','/*','--'],c:1},
{q:'Tipe data list?',o:['[]','{}','()','<>'],c:0},
{q:'Function didefinisikan pakai?',o:['func','def','function','fn'],c:1},
{q:'Indentasi di Python?',o:['tidak penting','wajib','opsional','pakai tab aja'],c:1}]},
{id:'q6',icon:'🎯',title:'Quiz Flexbox',desc:'8 soal Flexbox',level:'Menengah',quiz:[
{q:'Display untuk aktifkan flex?',o:['block','flex','grid','inline'],c:1},
{q:'Properti atur horizontal alignment?',o:['align-items','justify-content','flex-direction','gap'],c:1},
{q:'Default flex-direction?',o:['row','column','row-reverse','column-reverse'],c:0},
{q:'Untuk spacing antar item?',o:['margin','padding','gap','border'],c:2}]},
{id:'q7',icon:'🟣',title:'Quiz Kotlin',desc:'8 soal Kotlin',level:'Menengah',quiz:[
{q:'val vs var?',o:['sama','val immutable','var immutable','bebas'],c:1},
{q:'Function Kotlin pakai?',o:['def','func','fun','function'],c:2},
{q:'Null safety operator?',o:['?.','!!','?:','semua benar'],c:3},
{q:'Data class untuk?',o:['database','model data','UI','network'],c:1}]},
{id:'q8',icon:'🐙',title:'Quiz Git',desc:'8 soal Git',level:'Menengah',quiz:[
{q:'Perintah commit?',o:['git save','git commit','git store','git push'],c:1},
{q:'Buat branch baru?',o:['git new','git branch -c','git checkout -b','git fork'],c:2},
{q:'Clone repo?',o:['git pull','git clone','git copy','git get'],c:1},
{q:'Lihat history?',o:['git status','git log','git history','git show'],c:1}]},
{id:'q9',icon:'🎨',title:'Quiz UI/UX',desc:'6 soal desain',level:'Pemula',quiz:[
{q:'Prinsip utama UI?',o:['rumit','konsisten','acak','warna banyak'],c:1},
{q:'Feedback UI contoh?',o:['diam','ripple saat klik','tidak ada respon','error'],c:1},
{q:'Aksesibilitas penting untuk?',o:['developer','semua user','Google','bos'],c:1}]},
{id:'q10',icon:'🚀',title:'Quiz Performa',desc:'6 soal optimasi',level:'Lanjutan',quiz:[
{q:'Kerja berat sebaiknya di?',o:['main thread','background thread','UI','layout'],c:1},
{q:'ListView vs RecyclerView?',o:['ListView cepat','RecyclerView efisien','sama','ListView baru'],c:1},
{q:'Obfuscate kode pakai?',o:['ProGuard','Zipalign','Apktool','Dex2jar'],c:0}]}
];
let currentTopic=null,currentQ=0,score=0;
function renderQuizTopics(){const grid=document.getElementById('quizTopicGrid');if(!grid)return;grid.innerHTML=QUIZ_TOPICS.map(t=>'<div class="lesson-card" onclick="openQuiz(\''+t.id+'\')"><div class="lesson-icon">'+t.icon+'</div><h3>'+t.title+'</h3><p>'+t.desc+'</p><div class="lesson-meta"><span>📝 '+t.quiz.length+' soal</span><span>'+t.level+'</span></div></div>').join('')}
function openQuiz(id){currentTopic=QUIZ_TOPICS.find(t=>t.id===id);if(!currentTopic)return;currentQ=0;score=0;document.getElementById('quizModal').classList.add('open');renderQuiz();setTimeout(()=>{if(typeof initQuizStickman==='function')initQuizStickman()},100)}
function closeQuiz(){document.getElementById('quizModal').classList.remove('open');if(typeof quizAnimFrame!=='undefined'&&quizAnimFrame)cancelAnimationFrame(quizAnimFrame)}
function renderQuiz(){const box=document.getElementById('quizContent');const q=currentTopic.quiz;if(currentQ>=q.length){const pct=Math.round(score/q.length*100);const emoji=pct>=80?'🏆':pct>=60?'👍':'📚';if(typeof setQuizState==='function')setQuizState(pct>=60?'happy':'sad');saveScore(currentTopic.id,pct);box.innerHTML='<h2 style="text-align:center">'+emoji+' Selesai!</h2><canvas id="quizStickman" style="width:100%;height:180px;margin:16px 0"></canvas><p style="font-size:22px;margin:16px 0;text-align:center">Skor: <b>'+score+'/'+q.length+'</b> ('+pct+'%)</p><div style="text-align:center"><button class="btn btn-primary" onclick="openQuiz(\''+currentTopic.id+'\')">🔄 Ulangi</button> <button class="btn btn-secondary" onclick="closeQuiz()">Tutup</button></div>';setTimeout(()=>{if(typeof initQuizStickman==='function')initQuizStickman()},100);return}
const cur=q[currentQ];if(typeof setQuizState==='function')setQuizState('thinking');box.innerHTML='<div class="quiz-progress"><span>Soal '+(currentQ+1)+' dari '+q.length+'</span><span>Skor: '+score+'</span></div><canvas id="quizStickman" style="width:100%;height:160px;margin:8px 0 16px"></canvas><h3 class="quiz-q" style="text-align:center">'+cur.q+'</h3>'+cur.o.map((opt,i)=>'<button class="quiz-option" onclick="answerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+opt+'</button>').join('');setTimeout(()=>{if(typeof initQuizStickman==='function')initQuizStickman()},100)}
function answerQuiz(idx){const q=currentTopic.quiz[currentQ];const ok=idx===q.c;if(typeof setQuizState==='function')setQuizState(ok?'happy':'sad');document.querySelectorAll('.quiz-option').forEach((el,i)=>{if(i===q.c)el.classList.add('correct');else if(i===idx)el.classList.add('wrong');el.disabled=true});if(ok)score++;setTimeout(()=>{currentQ++;renderQuiz()},1800)}
function saveScore(topicId,pct){const scores=DB.get('quiz_scores',{});scores[topicId]=Math.max(scores[topicId]||0,pct);DB.set('quiz_scores',scores)}
document.addEventListener('DOMContentLoaded',renderQuizTopics);
