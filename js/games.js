const GAMES=[
{id:'g1',icon:'🔍',title:'Fix Bug',desc:'Perbaiki kode yang error',play:'playFixBug'},
{id:'g2',icon:'🎯',title:'Tebak Kode',desc:'Tebak output kode',play:'playTebakKode'},
{id:'g3',icon:'🧩',title:'Susun Logic',desc:'Susun urutan kode yang benar',play:'playSusunLogic'},
{id:'g4',icon:'⚡',title:'Fast Typing',desc:'Ketik kode secepat mungkin',play:'playFastTyping'},
{id:'g5',icon:'🎨',title:'Color Match',desc:'Cocokkan warna dengan kode hex',play:'playColorMatch'},
{id:'g6',icon:'🔢',title:'Math Code',desc:'Hitung hasil ekspresi kode',play:'playMathCode'},
{id:'g7',icon:'🧠',title:'Memory Card',desc:'Cocokkan pasangan tag HTML',play:'playMemoryCard'},
{id:'g8',icon:'🎪',title:'Code Quiz Rapid',desc:'Jawab 10 soal secepat mungkin',play:'playCodeQuizRapid'}
];
function renderGames(){const grid=document.getElementById('gamesGrid');if(!grid)return;grid.innerHTML=GAMES.map(g=>'<div class="lesson-card" onclick="openGame(\''+g.id+'\')"><div class="lesson-icon">'+g.icon+'</div><h3>'+g.title+'</h3><p>'+g.desc+'</p><div class="lesson-meta"><span>🎮 Play</span><span>→</span></div></div>').join('')}
function openGame(id){const g=GAMES.find(x=>x.id===id);if(!g)return;document.getElementById('gameModal').classList.add('open');const c=document.getElementById('gameContent');if(g.play==='playFixBug')playFixBug(c);else if(g.play==='playTebakKode')playTebakKode(c);else if(g.play==='playSusunLogic')playSusunLogic(c);else if(g.play==='playFastTyping')playFastTyping(c);else if(g.play==='playColorMatch')playColorMatch(c);else if(g.play==='playMathCode')playMathCode(c);else if(g.play==='playMemoryCard')playMemoryCard(c);else if(g.play==='playCodeQuizRapid')playCodeQuizRapid(c)}
function closeGame(){document.getElementById('gameModal').classList.remove('open')}
function gameHeader(c,title,desc){return '<h2 style="text-align:center;margin-bottom:8px">'+title+'</h2><p style="text-align:center;color:var(--text-muted);margin-bottom:20px">'+desc+'</p>'}

// G1: Fix Bug
function playFixBug(c){const rounds=[{bad:'for (let i = 0; i < 5; i++)',good:'for (let i = 0; i < 5; i++)',ans:0,opts:['i < 5','i = 5','i > 5','i <= 5'],correct:0},{bad:'if (x = 5) { }',good:'if (x === 5) { }',opts:['x = 5','x === 5','x == 5','x != 5'],correct:1},{bad:'let arr = (1,2,3);',good:'let arr = [1,2,3];',opts:['(1,2,3)','[1,2,3]','{1,2,3}','"1,2,3"'],correct:1}];let idx=0,score=0;
function next(){if(idx>=rounds.length){c.innerHTML=gameHeader(c,'🎉 Selesai!','Skor: '+score+'/'+rounds.length)+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}const r=rounds[idx];c.innerHTML=gameHeader(c,'🔍 Fix Bug','Klik baris yang benar ('+(idx+1)+'/'+rounds.length+')')+'<div class="code-block" style="background:#060918;padding:20px;border-radius:10px;font-family:monospace;font-size:16px;text-align:center;margin-bottom:20px">'+r.bad+'</div>'+r.opts.map((o,i)=>'<button class="quiz-option" onclick="fixAnswer('+i+','+r.correct+')">'+o+'</button>').join('')}
window.fixAnswer=function(i,correct){if(i===correct){score++;alert('✅ Benar!');idx++;next()}else{alert('❌ Salah!')}};next()}

// G2: Tebak Kode
function playTebakKode(c){const rounds=[{code:'console.log(2 + 3)',ans:'5',opts:['23','5','2+3','error'],c:1},{code:'console.log("2" + "3")',ans:'23',opts:['5','23','error','"23"'],c:1},{code:'let x = 5; x++; console.log(x)',ans:'6',opts:['5','6','7','error'],c:1},{code:'console.log(typeof [])',ans:'object',opts:['array','object','list','undefined'],c:1},{code:'console.log(10 % 3)',ans:'1',opts:['3','1','0','3.33'],c:1}];let idx=0,score=0;
function next(){if(idx>=rounds.length){c.innerHTML=gameHeader(c,'🎉 Selesai!','Skor: '+score+'/'+rounds.length)+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}const r=rounds[idx];c.innerHTML=gameHeader(c,'🎯 Tebak Output','Soal '+(idx+1)+'/'+rounds.length)+'<div class="code-block" style="background:#060918;padding:20px;border-radius:10px;font-family:monospace;font-size:16px;text-align:center;margin-bottom:20px">'+r.code+'</div>'+r.opts.map((o,i)=>'<button class="quiz-option" onclick="tkAnswer('+i+','+r.c+')">'+o+'</button>').join('')}
window.tkAnswer=function(i,correct){if(i===correct){score++;alert('✅ Benar!')}else{alert('❌ Salah!')}idx++;next()};next()}

// G3: Susun Logic
function playSusunLogic(c){const correct=['function sapa(nama) {','  return "Halo " + nama;','}'];let shuffled=[...correct].sort(()=>Math.random()-0.5);let picked=[];
function render(){c.innerHTML=gameHeader(c,'🧩 Susun Logic','Susun urutan kode yang benar')+'<div style="min-height:100px;background:#060918;padding:16px;border-radius:10px;margin-bottom:16px;font-family:monospace">'+picked.map(p=>'<div style="padding:8px;background:rgba(0,229,255,.1);border-radius:6px;margin:4px 0">'+p+'</div>').join('')+'</div>'+shuffled.filter(s=>!picked.includes(s)).map(s=>'<button class="quiz-option" onclick="slPick(\''+s.replace(/'/g,"\\'")+'\')">'+s+'</button>').join('')+'<button class="btn btn-primary" onclick="slCheck()" style="margin-top:16px">Cek Jawaban</button>'}
window.slPick=function(s){picked.push(s);render()};
window.slCheck=function(){if(picked.join('|')===correct.join('|')){alert('✅ Benar!')}else{alert('❌ Salah! Coba lagi.')}};
render()}

// G4: Fast Typing
function playFastTyping(c){const words=['console.log','function','document','addEventListener','querySelector','getElementById','innerHTML','classList','forEach','setTimeout'];let idx=0,start=0,score=0;
function next(){if(idx>=words.length){const elapsed=(Date.now()-start)/1000;c.innerHTML=gameHeader(c,'⚡ Selesai!','Waktu: '+elapsed.toFixed(1)+'s')+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}if(idx===0)start=Date.now();const w=words[idx];c.innerHTML=gameHeader(c,'⚡ Fast Typing','Ketik: <b style="color:#00e5ff">'+w+'</b> ('+(idx+1)+'/'+words.length+')')+'<input id="ftInput" type="text" style="width:100%;padding:16px;background:#060918;color:#fff;border:2px solid #00e5ff;border-radius:10px;font-size:18px;font-family:monospace;text-align:center" autofocus onkeypress="if(event.key===\'Enter\'){ftSubmit(\''+w+'\')}">'}
window.ftSubmit=function(w){const v=document.getElementById('ftInput').value.trim();if(v===w){score++;idx++;next()}else{alert('❌ Salah!')}};
next();setTimeout(()=>document.getElementById('ftInput')?.focus(),100)}

// G5: Color Match
function playColorMatch(c){const colors=[{name:'Merah',hex:'#ff0000'},{name:'Hijau',hex:'#00ff00'},{name:'Biru',hex:'#0000ff'},{name:'Kuning',hex:'#ffff00'},{name:'Ungu',hex:'#800080'}];let idx=0,score=0;
function next(){if(idx>=colors.length){c.innerHTML=gameHeader(c,'🎉 Selesai!','Skor: '+score+'/'+colors.length)+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}const target=colors[Math.floor(Math.random()*colors.length)];const opts=[...colors].sort(()=>Math.random()-0.5).slice(0,4);if(!opts.includes(target))opts[0]=target;c.innerHTML=gameHeader(c,'🎨 Color Match','Warna apa ini: <b style="color:'+target.hex+'">'+target.hex+'</b>')+opts.map(o=>'<button class="quiz-option" onclick="cmAnswer(\''+o.name+'\',\''+target.name+'\')">'+o.name+'</button>').join('')}
window.cmAnswer=function(picked,correct){if(picked===correct){score++;alert('✅ Benar!')}else{alert('❌ Salah! Jawaban: '+correct)}idx++;next()};next()}

// G6: Math Code
function playMathCode(c){const rounds=[{q:'5 + 3 * 2',a:'11',opts:['16','11','13','10']},{q:'(5 + 3) * 2',a:'16',opts:['16','11','13','10']},{q:'10 % 3',a:'1',opts:['3','1','0','3.33']},{q:'2 ** 3',a:'8',opts:['6','8','9','5']},{q:'10 / 2',a:'5',opts:['5','20','0.5','2']}];let idx=0,score=0;
function next(){if(idx>=rounds.length){c.innerHTML=gameHeader(c,'🎉 Selesai!','Skor: '+score+'/'+rounds.length)+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}const r=rounds[idx];c.innerHTML=gameHeader(c,'🔢 Math Code','Hasil dari: <b style="color:#00e5ff">'+r.q+'</b>')+r.opts.map(o=>'<button class="quiz-option" onclick="mcAnswer(\''+o+'\',\''+r.a+'\')">'+o+'</button>').join('')}
window.mcAnswer=function(picked,correct){if(picked===correct){score++;alert('✅ Benar!')}else{alert('❌ Salah! Jawaban: '+correct)}idx++;next()};next()}

// G7: Memory Card
function playMemoryCard(c){const pairs=[{a:'<p>',b:'paragraf'},{a:'<h1>',b:'heading'},{a:'<a>',b:'link'},{a:'<img>',b:'gambar'},{a:'<div>',b:'container'},{a:'<button>',b:'tombol'}];const cards=[];pairs.forEach((p,i)=>{cards.push({id:i,text:p.a,type:'tag'});cards.push({id:i,text:p.b,type:'desc'})});cards.sort(()=>Math.random()-0.5);let flipped=[],matched=[],tries=0;
function render(){c.innerHTML=gameHeader(c,'🧠 Memory Card','Cocokkan tag dengan fungsinya. Percobaan: '+tries)+'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+cards.map((card,idx)=>{const isFlipped=flipped.includes(idx)||matched.includes(card.id);return '<div onclick="memFlip('+idx+')" style="padding:16px 8px;background:'+(isFlipped?'rgba(0,229,255,.2)':'#060918')+';border:2px solid '+(isFlipped?'#00e5ff':'#1a1f3a')+';border-radius:8px;text-align:center;font-family:monospace;font-size:13px;cursor:pointer;min-height:60px;display:flex;align-items:center;justify-content:center">'+(isFlipped?card.text:'?')+'</div>'}).join('')+'</div>'+(matched.length===pairs.length?'<div style="text-align:center;margin-top:16px"><h3>🎉 Menang! '+tries+' percobaan</h3><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>':'')}
window.memFlip=function(idx){if(flipped.length>=2||flipped.includes(idx)||matched.includes(cards[idx].id))return;flipped.push(idx);render();if(flipped.length===2){tries++;setTimeout(()=>{const [a,b]=flipped;if(cards[a].id===cards[b].id&&cards[a].type!==cards[b].type){matched.push(cards[a].id)}flipped=[];render()},800)}}
render()}

// G8: Code Quiz Rapid
function playCodeQuizRapid(c){const qs=[{q:'Tag HTML untuk judul halaman?',a:'title',opts:['head','title','h1','meta']},{q:'CSS untuk warna text?',a:'color',opts:['background','color','font','text']},{q:'JS deklarasi konstanta?',a:'const',opts:['let','var','const','final']},{q:'Method array tambah di awal?',a:'unshift',opts:['push','pop','shift','unshift']},{q:'Symbol komentar JS?',a:'//',opts:['#','//','/*','--']}];let idx=0,score=0,start=Date.now();
function next(){if(idx>=qs.length){const t=((Date.now()-start)/1000).toFixed(1);c.innerHTML=gameHeader(c,'🏆 Selesai!','Skor: '+score+'/'+qs.length+' • Waktu: '+t+'s')+'<div style="text-align:center"><button class="btn btn-primary" onclick="closeGame()">Tutup</button></div>';return}const q=qs[idx];c.innerHTML=gameHeader(c,'🎪 Rapid Quiz','Soal '+(idx+1)+'/'+qs.length)+'<h3 style="text-align:center;margin-bottom:16px">'+q.q+'</h3>'+q.opts.map(o=>'<button class="quiz-option" onclick="rqAnswer(\''+o+'\',\''+q.a+'\')">'+o+'</button>').join('')}
window.rqAnswer=function(picked,correct){if(picked===correct)score++;idx++;next()};next()}

document.addEventListener('DOMContentLoaded',renderGames);
