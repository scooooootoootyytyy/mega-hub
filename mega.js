(()=>{if(window.__MEGA_HUB__){window.__MEGA_HUB__.toggle();return}window.__MEGA_HUB__={};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;

let points=Number(localStorage.megaPoints||0);
let played=Number(localStorage.megaPlayed||0);

const style=document.createElement("style");
style.textContent=`
#megaHub *{box-sizing:border-box}
#megaHub{position:fixed;z-index:2147483647;left:50%;top:50%;transform:translate(-50%,-50%);
width:min(1100px,94vw);height:min(720px,90vh);background:#080a12;color:#eee;
font-family:Inter,Arial,sans-serif;border:1px solid #303650;border-radius:20px;
box-shadow:0 25px 100px #000b,0 0 50px #5666ff22;overflow:hidden;user-select:none}
#megaHub:before{content:"";position:absolute;inset:0;pointer-events:none;background:
radial-gradient(circle at 20% 0%,#596cff18,transparent 30%),
radial-gradient(circle at 100% 100%,#00e5ff12,transparent 35%)}
#mhTop{height:64px;border-bottom:1px solid #252a40;display:flex;align-items:center;padding:0 18px;
background:#0d101b;position:relative}
#mhLogo{font-size:18px;font-weight:900;letter-spacing:2px}
#mhLogo span{color:#7280ff}
#mhStatus{margin-left:18px;font-size:11px;color:#737b99}
#mhClose{margin-left:auto;border:0;background:#181c2b;color:#aaa;border-radius:9px;width:34px;height:34px;cursor:pointer}
#mhClose:hover{background:#ef4444;color:white}
#mhBody{display:flex;height:calc(100% - 64px)}
#mhSide{width:180px;background:#0b0e17;border-right:1px solid #252a40;padding:12px}
.mhNav{width:100%;padding:11px 12px;margin:3px 0;background:transparent;border:0;border-radius:9px;
color:#8f96b0;text-align:left;cursor:pointer;font-size:13px}
.mhNav:hover,.mhNav.active{background:#5966ff1c;color:#fff}
#mhMain{flex:1;overflow:auto;padding:25px;position:relative}
.mhPage{display:none}.mhPage.active{display:block}
.mhTitle{font-size:28px;font-weight:900;margin-bottom:5px}
.mhSub{color:#737b99;font-size:13px;margin-bottom:22px}
.mhGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.mhCard{background:#111522;border:1px solid #242a40;border-radius:14px;padding:17px;cursor:pointer;
transition:.15s;min-height:100px}
.mhCard:hover{transform:translateY(-3px);border-color:#6975ff;box-shadow:0 8px 30px #0005}
.mhIcon{font-size:27px;margin-bottom:10px}.mhName{font-weight:800}.mhDesc{font-size:11px;color:#707891;margin-top:5px}
.mhBtn{border:1px solid #343b59;background:#151a2a;color:#eee;border-radius:9px;padding:9px 13px;
cursor:pointer}.mhBtn:hover{background:#5966ff;border-color:#5966ff}
.mhInput{background:#0b0e17;border:1px solid #343b59;color:white;border-radius:9px;padding:10px;outline:none}
.mhInput:focus{border-color:#6975ff}
.mhHero{background:linear-gradient(135deg,#171d38,#0f1423);border:1px solid #30385a;border-radius:17px;
padding:25px;margin-bottom:18px}
.mhHero h1{margin:0 0 7px;font-size:31px}.mhHero p{color:#858daa;margin:0}
.mhStats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}
.mhStat{background:#0b0e17;border:1px solid #242a40;padding:14px;border-radius:11px}
.mhStat b{display:block;font-size:22px}.mhStat span{font-size:10px;color:#737b99}
#mhModal{position:absolute;inset:0;background:#05070ddd;display:none;align-items:center;justify-content:center;padding:25px}
#mhModal.show{display:flex}
#mhModalBox{width:min(650px,100%);max-height:90%;overflow:auto;background:#0d111d;border:1px solid #343b59;border-radius:17px;padding:22px}
.mhGame{background:#090c15;border:1px solid #272e47;border-radius:13px;padding:20px;min-height:300px}
.mhBig{font-size:42px;font-weight:900;text-align:center;margin:35px 0}
.mhCenter{text-align:center}
.mhConsole{background:#03050a;color:#76ff9b;font:12px Consolas,monospace;padding:15px;border-radius:10px;min-height:300px;white-space:pre-wrap}
#mhParticles{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.mhp{position:absolute;width:2px;height:2px;background:#7785ff;border-radius:50%;opacity:.5}
@media(max-width:700px){#mhSide{width:55px}.mhNav{font-size:0;text-align:center}.mhNav:first-letter{font-size:17px}.mhStats{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

const hub=document.createElement("div");
hub.id="megaHub";
hub.innerHTML=`
<div id="mhParticles"></div>
<div id="mhTop">
 <div id="mhLogo">MEGA<span>//</span>HUB</div>
 <div id="mhStatus">ONLINE • LOCAL • ${navigator.platform}</div>
 <button id="mhClose">×</button>
</div>
<div id="mhBody">
 <aside id="mhSide">
  <button class="mhNav active" data-page="home">⌂ Home</button>
  <button class="mhNav" data-page="games">🎮 Games</button>
  <button class="mhNav" data-page="arcade">⚡ Arcade</button>
  <button class="mhNav" data-page="tools">🔧 Tools</button>
  <button class="mhNav" data-page="visuals">✨ Visuals</button>
  <button class="mhNav" data-page="terminal">▣ Terminal</button>
 </aside>
 <main id="mhMain">

 <section class="mhPage active" id="page-home">
  <div class="mhHero">
   <h1>Welcome to MEGA HUB</h1>
   <p>Your little browser command centre.</p>
   <div class="mhStats">
    <div class="mhStat"><b id="statPoints">${points}</b><span>POINTS</span></div>
    <div class="mhStat"><b id="statPlayed">${played}</b><span>GAMES PLAYED</span></div>
    <div class="mhStat"><b id="statRank">ROOKIE</b><span>RANK</span></div>
   </div>
  </div>
  <div class="mhGrid">
   <div class="mhCard" data-open="reaction"><div class="mhIcon">⚡</div><div class="mhName">Reaction Test</div><div class="mhDesc">How fast are you?</div></div>
   <div class="mhCard" data-open="aim"><div class="mhIcon">🎯</div><div class="mhName">Aim Trainer</div><div class="mhDesc">Hit the target.</div></div>
   <div class="mhCard" data-open="snake"><div class="mhIcon">🐍</div><div class="mhName">Snake</div><div class="mhDesc">Classic arcade.</div></div>
   <div class="mhCard" data-open="typing"><div class="mhIcon">⌨️</div><div class="mhName">Typing Test</div><div class="mhDesc">Speed challenge.</div></div>
  </div>
 </section>

 <section class="mhPage" id="page-games">
  <div class="mhTitle">Games</div><div class="mhSub">Small games. Big leaderboard energy.</div>
  <div class="mhGrid">
   ${[
   ["🎯","Aim Trainer","aim"],["⚡","Reaction Test","reaction"],["🐍","Snake","snake"],
   ["🧠","Memory","memory"],["🔢","Higher / Lower","higher"],["✂️","Rock Paper Scissors","rps"],
   ["⌨️","Typing Test","typing"],["➗","Math Rush","math"],["🔢","Number Memory","number"],
   ["🎨","Colour Challenge","colour"],["🟢","Clicker","clicker"],["🎲","Dice","dice"],
   ["🪙","Coin Flip","coin"],["🎰","Slots","slots"],["🎡","Random Wheel","wheel"],
   ["❌","Tic Tac Toe","ttt"]
   ].map(x=>`<div class="mhCard" data-open="${x[2]}"><div class="mhIcon">${x[0]}</div><div class="mhName">${x[1]}</div><div class="mhDesc">Play now →</div></div>`).join("")}
  </div>
 </section>

 <section class="mhPage" id="page-arcade">
  <div class="mhTitle">Arcade</div><div class="mhSub">Fast games for when you have 30 seconds.</div>
  <div class="mhGrid">
   <div class="mhCard" data-open="reaction"><div class="mhIcon">🚦</div><div class="mhName">Reaction</div></div>
   <div class="mhCard" data-open="clicker"><div class="mhIcon">🖱️</div><div class="mhName">Click Frenzy</div></div>
   <div class="mhCard" data-open="higher"><div class="mhIcon">📈</div><div class="mhName">Higher / Lower</div></div>
   <div class="mhCard" data-open="dice"><div class="mhIcon">🎲</div><div class="mhName">Dice</div></div>
   <div class="mhCard" data-open="coin"><div class="mhIcon">🪙</div><div class="mhName">Coin Flip</div></div>
   <div class="mhCard" data-open="slots"><div class="mhIcon">🎰</div><div class="mhName">Slots</div></div>
  </div>
 </section>

 <section class="mhPage" id="page-tools">
  <div class="mhTitle">Tools</div><div class="mhSub">Useful little utilities.</div>
  <div class="mhGrid">
   <div class="mhCard" data-open="calculator"><div class="mhIcon">🧮</div><div class="mhName">Calculator</div></div>
   <div class="mhCard" data-open="timer"><div class="mhIcon">⏱️</div><div class="mhName">Timer</div></div>
   <div class="mhCard" data-open="stopwatch"><div class="mhIcon">⏲️</div><div class="mhName">Stopwatch</div></div>
   <div class="mhCard" data-open="notes"><div class="mhIcon">📝</div><div class="mhName">Notes</div></div>
   <div class="mhCard" data-open="random"><div class="mhIcon">🎲</div><div class="mhName">Random Number</div></div>
   <div class="mhCard" data-open="colourpicker"><div class="mhIcon">🌈</div><div class="mhName">Colour Generator</div></div>
  </div>
 </section>

 <section class="mhPage" id="page-visuals">
  <div class="mhTitle">Visuals</div><div class="mhSub">Make the screen do stupidly cool things.</div>
  <div class="mhGrid">
   <div class="mhCard" id="rainbow"><div class="mhIcon">🌈</div><div class="mhName">Rainbow Mode</div></div>
   <div class="mhCard" id="shake"><div class="mhIcon">💥</div><div class="mhName">Screen Shake</div></div>
   <div class="mhCard" id="glitch"><div class="mhIcon">👾</div><div class="mhName">Glitch</div></div>
   <div class="mhCard" id="scan"><div class="mhIcon">📺</div><div class="mhName">Scanlines</div></div>
   <div class="mhCard" id="rotate"><div class="mhIcon">🌀</div><div class="mhName">Reality Spin</div></div>
   <div class="mhCard" id="jumpscare"><div class="mhIcon">😈</div><div class="mhName">Jumpscare</div></div>
   <div class="mhCard" id="alert"><div class="mhIcon">⚠️</div><div class="mhName">Fake Alert</div></div>
  </div>
 </section>

 <section class="mhPage" id="page-terminal">
  <div class="mhTitle">Terminal</div><div class="mhSub">Totally serious computer stuff.</div>
  <div class="mhConsole" id="console">MEGA OS v9.4
--------------------------------
Boot sequence complete.
Graphics ........ ONLINE
Arcade .......... ONLINE
Games ........... ONLINE
Tools ........... ONLINE
Friend network .. LOCAL

Type commands below.

> <span id="termText"></span></div>
  <div style="margin-top:10px;display:flex;gap:8px">
   <input class="mhInput" id="termInput" placeholder="try: help" style="flex:1">
   <button class="mhBtn" id="termRun">RUN</button>
  </div>
 </section>

 </main>
</div>
<div id="mhModal"><div id="mhModalBox"></div></div>
`;
document.body.appendChild(hub);

const modal=$("#mhModal"), box=$("#mhModalBox");

function save(){
 localStorage.megaPoints=points;
 localStorage.megaPlayed=played;
 $("#statPoints").textContent=points;
 $("#statPlayed").textContent=played;
 $("#statRank").textContent=points>=1000?"LEGEND":points>=500?"ELITE":points>=100?"PRO":"ROOKIE";
}
function award(n=10){points+=n;played++;save();beep(500,.05)}

function beep(freq=440,d=.07){
 try{let a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.frequency.value=freq;o.connect(g);g.connect(a.destination);g.gain.value=.025;o.start();o.stop(a.currentTime+d)}catch(e){}
}
function openGame(title,html,setup){
 box.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px"><h2 style="margin:0">${title}</h2><button class="mhBtn" id="modalClose">Close</button></div><div class="mhGame">${html}</div>`;
 modal.classList.add("show");
 $("#modalClose").onclick=()=>modal.classList.remove("show");
 if(setup)setup();
}

$$(".mhNav").forEach(b=>b.onclick=()=>{
 $$(".mhNav").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 $$(".mhPage").forEach(x=>x.classList.remove("active"));
 $("#page-"+b.dataset.page).classList.add("active");
});

$$("[data-open]").forEach(x=>x.onclick=()=>launch(x.dataset.open));

function launch(g){
 if(g==="reaction")return reaction();
 if(g==="aim")return aim();
 if(g==="snake")return snake();
 if(g==="memory")return memory();
 if(g==="higher")return higher();
 if(g==="rps")return rps();
 if(g==="typing")return typing();
 if(g==="math")return math();
 if(g==="number")return numberMemory();
 if(g==="colour")return colour();
 if(g==="clicker")return clicker();
 if(g==="dice")return dice();
 if(g==="coin")return coin();
 if(g==="slots")return slots();
 if(g==="wheel")return wheel();
 if(g==="ttt")return ttt();
 if(g==="calculator")return calculator();
 if(g==="timer")return timer();
 if(g==="stopwatch")return stopwatch();
 if(g==="notes")return notes();
 if(g==="random")return randomTool();
 if(g==="colourpicker")return colourPicker();
}

function reaction(){
 openGame("⚡ Reaction Test",`<div class="mhCenter"><p>Wait for GREEN, then click as fast as possible.</p><button class="mhBtn" id="react" style="font-size:22px;padding:25px 55px">WAIT...</button><div id="reactResult" class="mhBig">—</div></div>`,()=>{
 let btn=$("#react"),ready=false,start;
 setTimeout(()=>{btn.textContent="CLICK!";btn.style.background="#16a34a";ready=true;start=performance.now();beep(900)},rand(1500,4500));
 btn.onclick=()=>{
  if(!ready){btn.textContent="Too early 😭";return}
  let ms=Math.round(performance.now()-start);$("#reactResult").textContent=ms+" ms";
  award(Math.max(5,100-Math.floor(ms/10)));ready=false;btn.textContent="Again";
 };
 });
}

function aim(){
 openGame("🎯 Aim Trainer",`<div id="aimArea" style="height:300px;position:relative;background:#05070d;border-radius:10px;overflow:hidden"><button id="target" style="position:absolute;border:0;border-radius:50%;width:45px;height:45px;background:#ff4757;cursor:pointer">🎯</button></div><div id="aimScore" class="mhCenter" style="margin-top:10px">Hits: 0</div>`,()=>{
 let area=$("#aimArea"),t=$("#target"),hits=0,start=Date.now();
 function move(){t.style.left=rand(5,90)+"%";t.style.top=rand(5,82)+"%"}
 t.onclick=()=>{hits++;award(2);$("#aimScore").textContent="Hits: "+hits;move();beep(700,.03)};
 move();setTimeout(()=>{t.disabled=true;$("#aimScore").textContent+=` • Final: ${hits}`},30000);
 });
}

function snake(){
 openGame("🐍 Snake",`<div class="mhCenter"><canvas id="snakeCanvas" width="500" height="320" style="max-width:100%;background:#030509;border-radius:10px"></canvas><p>Use arrow keys / WASD</p><b id="snakeScore">0</b></div>`,()=>{
 let c=$("#snakeCanvas"),x=c.getContext("2d"),s=16,body=[{x:10,y:10}],dx=1,dy=0,food={x:20,y:10},score=0;
 document.onkeydown=e=>{
  if((e.key==="ArrowUp"||e.key==="w")&&dy!==1){dx=0;dy=-1}
  if((e.key==="ArrowDown"||e.key==="s")&&dy!==-1){dx=0;dy=1}
  if((e.key==="ArrowLeft"||e.key==="a")&&dx!==1){dx=-1;dy=0}
  if((e.key==="ArrowRight"||e.key==="d")&&dx!==-1){dx=1;dy=0}
 };
 let iv=setInterval(()=>{
  let h={x:body[0].x+dx,y:body[0].y+dy};
  if(h.x<0||h.y<0||h.x>=31||h.y>=20||body.some(b=>b.x===h.x&&b.y===h.y)){clearInterval(iv);$("#snakeScore").textContent="GAME OVER • "+score;return}
  body.unshift(h);
  if(h.x===food.x&&h.y===food.y){score++;award(5);food={x:rand(0,30),y:rand(0,19)}}else body.pop();
  x.clearRect(0,0,c.width,c.height);x.fillStyle="#5966ff";body.forEach(b=>x.fillRect(b.x*s,b.y*s,s-2,s-2));x.fillStyle="#ff476f";x.fillRect(food.x*s,food.y*s,s-2,s-2);$("#snakeScore").textContent=score;
 },100);
 });
}

function memory(){
 let vals=["🚀","👾","🔥","🎮","🐍","💎","⚡","🦖"],cards=[...vals,...vals].sort(()=>Math.random()-.5),open=[],matched=0;
 openGame("🧠 Memory",`<div id="mem" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px"></div><p id="memStatus">Find all pairs.</p>`,()=>{
 let m=$("#mem");
 cards.forEach((v,i)=>{let b=document.createElement("button");b.className="mhBtn";b.style.height="70px";b.textContent="❓";b.onclick=()=>{
  if(open.length>=2||b.dataset.done)return;b.textContent=v;open.push([b,v]);
  if(open.length===2){if(open[0][1]===open[1][1]){open.forEach(a=>a[0].dataset.done=1);open=[];matched++;award(10);if(matched===vals.length)$("#memStatus").textContent="YOU WON 🏆"}else setTimeout(()=>{open.forEach(a=>a[0].textContent="❓");open=[]},500)}
 };m.appendChild(b)});
 });
}

function higher(){
 let current=rand(1,100);
 openGame("📈 Higher / Lower",`<div class="mhCenter"><p>Will the next number be higher or lower?</p><div id="highNum" class="mhBig">${current}</div><button class="mhBtn" id="higherBtn">HIGHER ↑</button> <button class="mhBtn" id="lowerBtn">LOWER ↓</button><p id="highResult"></p></div>`,()=>{
 function guess(dir){let n=rand(1,100),ok=(dir==="h"&&n>current)||(dir==="l"&&n<current);$("#highResult").textContent=`${n} — ${ok?"CORRECT 🔥":"WRONG 💀"}`;if(ok)award(8);current=n;$("#highNum").textContent=n}
 $("#higherBtn").onclick=()=>guess("h");$("#lowerBtn").onclick=()=>guess("l");
 });
}

function rps(){
 openGame("✂️ Rock Paper Scissors",`<div class="mhCenter"><button class="mhBtn" data-r="rock">🪨 Rock</button><button class="mhBtn" data-r="paper">📄 Paper</button><button class="mhBtn" data-r="scissors">✂️ Scissors</button><div id="rpsResult" class="mhBig">?</div></div>`,()=>{
 $$("[data-r]").forEach(b=>b.onclick=()=>{let p=b.dataset.r,c=["rock","paper","scissors"][rand(0,2)],w=p===c?"DRAW":((p==="rock"&&c==="scissors")||(p==="paper"&&c==="rock")||(p==="scissors"&&c==="paper"))?"YOU WIN":"YOU LOSE";$("#rpsResult").textContent=`${p} vs ${c} — ${w}`;if(w==="YOU WIN")award(10)});
 });
}

function typing(){
 let text="the quick brown fox jumps over the lazy dog";
 openGame("⌨️ Typing Test",`<p>Type this:</p><div style="padding:15px;background:#080b13;border-radius:9px">${text}</div><br><input id="typeInput" class="mhInput" style="width:100%" autofocus><div id="typeResult" class="mhBig"></div>`,()=>{
 let start=0,i=$("#typeInput");i.oninput=()=>{if(!start)start=Date.now();if(i.value===text){let sec=(Date.now()-start)/1000,wpm=Math.round(9/sec*60);$("#typeResult").textContent=wpm+" WPM 🔥";award(25)}};
 });
}

function math(){
 let score=0,time=20,a,b,op;
 openGame("➗ Math Rush",`<div class="mhCenter"><div id="mathQ" class="mhBig"></div><input id="mathI" class="mhInput" type="number" autofocus><p id="mathS">Score: 0 • 20s</p></div>`,()=>{
 function q(){a=rand(1,20);b=rand(1,20);op=["+","-","×"][rand(0,2)];$("#mathQ").textContent=`${a} ${op} ${b}`;$("#mathI").value="";$("#mathI").focus()}
 $("#mathI").onkeydown=e=>{if(e.key==="Enter"){let ans=op==="+"?a+b:op==="-"?a-b:a*b;if(+e.target.value===ans){score++;award(3)}q()}};
 q();let iv=setInterval(()=>{time--;$("#mathS").textContent=`Score: ${score} • ${time}s`;if(time<=0)clearInterval(iv)},1000)
 });
}

function numberMemory(){
 let n=String(rand(10000,99999));
 openGame("🔢 Number Memory",`<div class="mhCenter"><div class="mhBig" id="numShow">${n}</div><input id="numInput" class="mhInput" placeholder="remember it"><button class="mhBtn" id="numCheck">CHECK</button><p id="numRes"></p></div>`,()=>{
 setTimeout(()=>$("#numShow").textContent="?????",2000);
 $("#numCheck").onclick=()=>{$("#numRes").textContent=$("#numInput").value===n?"CORRECT 🔥":"Wrong — "+n;if($("#numInput").value===n)award(20)}
 });
}

function colour(){
 let c=["red","blue","green","yellow","purple","orange"],correct=c[rand(0,5)];
 openGame("🎨 Colour Challenge",`<div class="mhCenter"><div class="mhBig">${correct.toUpperCase()}</div><p>Click the colour matching the word.</p><div id="cols"></div><p id="colRes"></p></div>`,()=>{
 let d=$("#cols");c.forEach(v=>{let b=document.createElement("button");b.className="mhBtn";b.textContent=v;b.style.margin="4px";b.onclick=()=>{let ok=v===correct;$("#colRes").textContent=ok?"CORRECT":"NOPE";if(ok)award(10)};d.appendChild(b)})
 });
}

function clicker(){
 openGame("🖱️ Click Frenzy",`<div class="mhCenter"><div id="clickScore" class="mhBig">0</div><button id="clickBtn" class="mhBtn" style="font-size:25px;padding:25px">CLICK!</button><p>Click as many as possible in 10 seconds.</p></div>`,()=>{
 let n=0,t=10;$("#clickBtn").onclick=()=>{n++;$("#clickScore").textContent=n;beep(300,.02)};
 let iv=setInterval(()=>{t--;if(t<=0){clearInterval(iv);$("#clickBtn").disabled=true;award(n)}},1000)
 });
}

function dice(){openGame("🎲 Dice",`<div class="mhCenter"><div id="dice" class="mhBig">🎲</div><button class="mhBtn" id="roll">ROLL</button></div>`,()=>$("#roll").onclick=()=>{$("#dice").textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][rand(0,5)];award(2)})}
function coin(){openGame("🪙 Coin Flip",`<div class="mhCenter"><div id="coin" class="mhBig">🪙</div><button class="mhBtn" id="flip">FLIP</button></div>`,()=>$("#flip").onclick=()=>{$("#coin").textContent=Math.random()>.5?"🟡 HEADS":"⚪ TAILS";award(2)})}
function slots(){openGame("🎰 Slots",`<div class="mhCenter"><div id="slots" class="mhBig">🍒 🍋 🍉</div><button class="mhBtn" id="spin">SPIN</button></div>`,()=>$("#spin").onclick=()=>{let x=["🍒","🍋","🍉","💎","7️⃣"];let r=[x[rand(0,4)],x[rand(0,4)],x[rand(0,4)]];$("#slots").textContent=r.join(" ");if(r[0]===r[1]&&r[1]===r[2]){award(100);$("#slots").textContent+=" JACKPOT 🔥"}})}
function wheel(){let opts=["YES","NO","MAYBE","DO IT","NOT TODAY","ABSOLUTELY"];openGame("🎡 Random Wheel",`<div class="mhCenter"><div id="wheel" class="mhBig">?</div><button class="mhBtn" id="wspin">SPIN</button></div>`,()=>$("#wspin").onclick=()=>$("#wheel").textContent=opts[rand(0,opts.length-1)])}

function ttt(){
 let board=Array(9).fill(""),turn="X";
 openGame("❌ Tic Tac Toe",`<div id="ttt" style="display:grid;grid-template-columns:repeat(3,90px);gap:5px;justify-content:center"></div><p class="mhCenter" id="tttR">Your turn</p>`,()=>{
 let d=$("#ttt");
 board.forEach((_,i)=>{let b=document.createElement("button");b.className="mhBtn";b.style.height="90px";b.style.fontSize="30px";b.onclick=()=>{if(board[i])return;board[i]="X";b.textContent="X";let empty=board.map((v,j)=>v?null:j).filter(v=>v!==null);if(empty.length){let j=empty[rand(0,empty.length-1)];board[j]="O";d.children[j].textContent="O"}let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(a=>board[a[0]]&&board[a[0]]===board[a[1]]&&board[a[1]]===board[a[2]]);if(win){$("#tttR").textContent="Game over";award(20)}};d.appendChild(b)})
 });
}

function calculator(){
 openGame("🧮 Calculator",`<input id="calc" class="mhInput" style="width:100%;font-size:22px" placeholder="e.g. 12*8+4"><br><br><button class="mhBtn" id="calcGo">CALCULATE</button><div id="calcR" class="mhBig"></div>`,()=>$("#calcGo").onclick=()=>{try{let s=$("#calc").value;if(!/^[0-9+\\-*/().% ]+$/.test(s))throw 0;$("#calcR").textContent=Function("return "+s)()}catch(e){$("#calcR").textContent="Invalid"}})
}
function timer(){
 openGame("⏱️ Timer",`<input id="timerN" class="mhInput" type="number" placeholder="seconds"><button class="mhBtn" id="timerGo">START</button><div id="timerR" class="mhBig">0</div>`,()=>$("#timerGo").onclick=()=>{let n=+$("#timerN").value||10;let iv=setInterval(()=>{n--;$("#timerR").textContent=n;if(n<=0){clearInterval(iv);beep(900,.5);$("#timerR").textContent="DONE!"}},1000)})
}
function stopwatch(){
 openGame("⏲️ Stopwatch",`<div class="mhCenter"><div id="sw" class="mhBig">0.0</div><button class="mhBtn" id="swStart">START</button> <button class="mhBtn" id="swStop">STOP</button></div>`,()=>{let t,st;$("#swStart").onclick=()=>{st=Date.now();t=setInterval(()=>$("#sw").textContent=((Date.now()-st)/1000).toFixed(1)),100};$("#swStop").onclick=()=>clearInterval(t)})
}
function notes(){
 openGame("📝 Notes",`<textarea id="notes" class="mhInput" style="width:100%;height:300px;resize:none" placeholder="Your notes..."></textarea><br><button class="mhBtn" id="saveNotes">SAVE</button>`,()=>{$("#notes").value=localStorage.megaNotes||"";$("#saveNotes").onclick=()=>{localStorage.megaNotes=$("#notes").value;beep(700)}})
}
function randomTool(){
 openGame("🎲 Random Number",`<div class="mhCenter"><input id="rMin" class="mhInput" value="1" type="number"> <input id="rMax" class="mhInput" value="100" type="number"><br><br><button class="mhBtn" id="rGo">GENERATE</button><div id="rResult" class="mhBig">?</div></div>`,()=>$("#rGo").onclick=()=>$("#rResult").textContent=rand(+$("#rMin").value,+$("#rMax").value))
}
function colourPicker(){
 openGame("🌈 Colour Generator",`<div class="mhCenter"><div id="cp" style="height:150px;border-radius:15px;background:#5966ff"></div><div id="cpText" class="mhBig">#5966FF</div><button class="mhBtn" id="cpGo">GENERATE</button></div>`,()=>$("#cpGo").onclick=()=>{let h="#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");$("#cp").style.background=h;$("#cpText").textContent=h.toUpperCase()})
}

$("#rainbow").onclick=()=>{hub.animate([{filter:"hue-rotate(0deg)"},{filter:"hue-rotate(360deg)"}],{duration:1800,iterations:3})};
$("#shake").onclick=()=>{hub.animate([{transform:"translate(-50%,-50%)"},{transform:"translate(-52%,-49%)"},{transform:"translate(-48%,-51%)"},{transform:"translate(-50%,-50%)"}],{duration:500})};
$("#glitch").onclick=()=>{hub.style.filter="hue-rotate(120deg) contrast(1.4)";setTimeout(()=>hub.style.filter="",1000)};
$("#rotate").onclick=()=>{hub.animate([{transform:"translate(-50%,-50%) rotate(0deg)"},{transform:"translate(-50%,-50%) rotate(360deg)"}],{duration:900})};
$("#scan").onclick=()=>{hub.style.backgroundImage="repeating-linear-gradient(0deg,#0002 0,#0002 1px,transparent 1px,transparent 4px)";setTimeout(()=>hub.style.backgroundImage="",5000)};
$("#alert").onclick=()=>alert("⚠️ MEGA HUB SYSTEM ALERT\n\nEverything is completely fine.\n\nProbably.");
$("#jumpscare").onclick=()=>{let o=document.createElement("div");o.style="position:fixed;inset:0;background:#000;z-index:2147483648;display:grid;place-items:center;font-size:25vw;color:#f22";o.textContent="👁️";document.body.appendChild(o);beep(80,1);setTimeout(()=>o.remove(),900)};

$("#mhClose").onclick=()=>hub.style.display="none";

document.addEventListener("keydown",e=>{
 if(e.key==="Escape")hub.style.display=hub.style.display==="none"?"":"none";
 if(e.key===";")hub.style.display=hub.style.display==="none"?"":"none";
});

$("#termRun").onclick=()=>{
 let v=$("#termInput").value.toLowerCase(),c=$("#console");
 let out=v==="help"?"commands: help, games, points, clear, whoami, date":
 v==="games"?"16 games loaded.":
 v==="points"?`points: ${points}`:
 v==="whoami"?"USER@MEGA-HUB":
 v==="clear"?"":v==="date"?new Date().toString():"command not found";
 c.textContent+="\n> "+v+"\n"+out+"\n";
 $("#termInput").value="";
};

for(let i=0;i<70;i++){let p=document.createElement("i");p.className="mhp";p.style.left=Math.random()*100+"%";p.style.top=Math.random()*100+"%";p.style.animation=`float${i} ${4+Math.random()*8}s infinite alternate`;$("#mhParticles").appendChild(p)}
save();

let dragging=false,ox=0,oy=0;
$("#mhTop").onmousedown=e=>{dragging=true;ox=e.clientX-hub.offsetLeft;oy=e.clientY-hub.offsetTop};
document.onmousemove=e=>{if(dragging){hub.style.left=(e.clientX-ox+hub.offsetWidth/2)+"px";hub.style.top=(e.clientY-oy+hub.offsetHeight/2)+"px";hub.style.transform="translate(-50%,-50%)"}};
document.onmouseup=()=>dragging=false;

window.__MEGA_HUB__.toggle=()=>hub.style.display=hub.style.display==="none"?"":"none";
})();
