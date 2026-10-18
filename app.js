'use strict';
const $=s=>document.querySelector(s);
const WORDS=['고마워','사랑해','안녕','같이 놀자','아름다워','즐거워','행복해','신나','재밌어','흥겨워'];
const COLORS=['#d79b5a','#c77986','#7398a4','#8a9e69','#a78db5','#cc9a54','#d48b7f','#7fa497','#b393b4','#9caa6f'];
const BGS=['#f2e9d5','#f5e5e4','#e5edf0','#e9eedf','#eeE7f1','#f5edda','#f2e6dc','#e1ede6','#f0e7ed','#e9ebda'];
const svg=(body,view='0 0 100 100')=>`<svg viewBox="${view}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
const face=(x,y)=>`<circle cx="${x-6}" cy="${y}" r="1.6" fill="#576351"/><circle cx="${x+6}" cy="${y}" r="1.6" fill="#576351"/><path d="M${x-3} ${y+6}q3 4 6 0" fill="none" stroke="#576351" stroke-width="1.6" stroke-linecap="round"/>`;
const petals=(cx,cy,color)=>`<g fill="${color}">${[0,60,120,180,240,300].map(a=>`<ellipse cx="${cx}" cy="${cy-13}" rx="9" ry="13" transform="rotate(${a} ${cx} ${cy})"/>`).join('')}<circle cx="${cx}" cy="${cy}" r="10" fill="#f8e4a6"/></g>`;
function illustration(i){
 const c=COLORS[i];
 const pictures=[
 `<path d="M34 58l17 33 17-33" fill="#dcb877"/><path d="M39 62l23 17M45 58l20 13M61 60L46 80M65 65L51 86" stroke="#f4d6a5" stroke-width="2"/><path d="M27 54a24 24 0 1 1 48 0v7H27z" fill="#ecd69a"/><path d="M32 43a20 20 0 1 1 39 0" fill="#d99a91"/>${face(51,38)}<circle cx="56" cy="14" r="5" fill="#ad766c"/>`,
 `<path d="M50 83C5 53 12 25 31 25q13-1 19 12 7-13 20-12c23 1 27 31-20 58" fill="#d48a91"/>${face(50,53)}<path d="M15 14v12M9 20h12M82 66v12M76 72h12" stroke="#d8b46b" stroke-width="3" stroke-linecap="round"/>`,
 `<path d="M24 67q-8-25 0-32t10 10V22q0-10 7-7v28-31q4-7 9 0v31-28q7-7 9 1v31-22q8-5 9 4v26l8-11q13-4 9 9L67 79q-12 20-32 6z" fill="#deb883"/>${face(49,65)}<path d="M11 29l-6-5M12 43H4M80 25l7-6" stroke="#a4b9b2" stroke-width="3" stroke-linecap="round"/>`,
 `<circle cx="33" cy="31" r="13" fill="#dfb877"/><circle cx="70" cy="31" r="13" fill="#b2bfa0"/><path d="M20 56q13-23 26 0l2 19H18z" fill="#d9a382"/><path d="M57 56q13-23 26 0l2 19H55z" fill="#8fae9c"/><path d="M43 58l13 1M27 76l-5 16M39 76l6 16M63 76l-4 16M75 76l6 16" stroke="#707f6d" stroke-width="4" stroke-linecap="round"/>${face(33,30)}${face(70,30)}`,
 `<path d="M50 56v35M49 77q-22 1-24-15 19-3 24 15M51 83q22-1 24-18-20-1-24 18" fill="#a1b38a" stroke="#a1b38a" stroke-width="3"/>${petals(50,35,'#baa0bf')}${face(50,34)}`,
 `<path d="M16 67a34 34 0 0 1 68 0" fill="none" stroke="#d9a087" stroke-width="9"/><path d="M25 67a25 25 0 0 1 50 0" fill="none" stroke="#e7c67f" stroke-width="8"/><path d="M33 67a17 17 0 0 1 34 0" fill="none" stroke="#a8baa0" stroke-width="8"/><path d="M41 67a9 9 0 0 1 18 0" fill="none" stroke="#a4bcc2" stroke-width="8"/><path d="M7 69q0-14 12-11 9-12 17 2 14-3 13 12H7M60 71q-1-14 11-12 10-12 17 0 10-2 11 12z" fill="#fffaf0"/>`,
 `<path d="M36 29q-9-32 0-26 11 9 12 28M55 29q1-30 10-28 7 8-1 30" fill="#d8c8b0"/><ellipse cx="50" cy="55" rx="30" ry="29" fill="#e6d8c3"/><ellipse cx="50" cy="88" rx="20" ry="13" fill="#e6d8c3"/>${face(50,52)}<ellipse cx="33" cy="62" rx="6" ry="3" fill="#e3b0a2"/><ellipse cx="67" cy="62" rx="6" ry="3" fill="#e3b0a2"/>`,
 `<path d="M50 11l11 27 29 3-22 20 7 29-25-15-25 15 7-29L10 41l29-3z" fill="#d8bf78" stroke="#e4d39c" stroke-width="2"/>${face(50,51)}<path d="M13 10v11M7 15h12M89 77v12M83 83h12" stroke="#91aca1" stroke-width="3"/>`,
 `<path d="M19 69q17-46 62 0z" fill="#b6a0bd"/><path d="M17 66h66v12q-34 21-66 0z" fill="#c8b4cb"/><circle cx="51" cy="53" r="6" fill="#e8c985"/><path d="M24 31l7 7M73 25l-3 10M49 10v12" stroke="#d5b277" stroke-width="4" stroke-linecap="round"/>`,
 `<path d="M27 28h8v42q-21-9-23 5-1 14 17 8 9-3 6-13V37l37-8v31q-19-5-22 8-3 14 14 10 11-2 10-16V14L27 25z" fill="#9bab79"/><path d="M10 19v9M6 23h8M88 67v10M83 72h10" stroke="#d8b573" stroke-width="3"/>`
 ];return window.HangulArt.enhance(svg(pictures[i]));
}
function renderWords(){ $('#word-grid').innerHTML=WORDS.map((w,i)=>`<button class="word-card" style="--card-bg:${BGS[i%BGS.length]}" data-word="${w}" aria-label="${w} 만들기"><span class="card-number">${String(i+1).padStart(2,'0')}</span><span class="picture">${illustration(i%10)}</span><strong>${w}</strong><span class="scene-caption">${window.HangulRides.planNames(w).map(n=>n.replace(/빙글빙글 |활짝 피는 |펼쳐지는 |둥실둥실 |쏙쏙 |몽글몽글 |팔랑팔랑 |구불구불 |바람에 펄럭이는 |두근두근 |꾹꾹 |칙칙폭폭 |부릉부릉 /g,'')).join(' · ')}</span></button>`).join('');}
renderWords();
const CHO=[...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'];
const JUNG=[...'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'];
const JONG=['',...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];
function decompose(c){const n=c.charCodeAt(0)-0xac00;if(n<0||n>=11172)return null;return {initial:CHO[Math.floor(n/588)],vowel:JUNG[Math.floor(n%588/28)],final:JONG[n%28],char:c};}
const PATHS={
 'ㄱ':'M18 18H82V82','ㄴ':'M18 18V82H82','ㄷ':'M82 18H18V82H82','ㄹ':'M18 18H82V50H18V82H82','ㅁ':'M18 18H82V82H18Z','ㅂ':'M18 18V82H82V18M18 49H82','ㅅ':'M50 18Q48 57 16 82M50 18Q52 57 84 82','ㅇ':'M50 17C7 17 7 83 50 83S93 17 50 17','ㅈ':'M18 20H82M50 20Q47 57 16 82M50 20Q53 57 84 82','ㅊ':'M50 9V20M18 30H82M50 30Q47 60 16 86M50 30Q53 60 84 86','ㅋ':'M18 18H82V82M18 49H82','ㅌ':'M82 18H18V82H82M18 50H82','ㅍ':'M12 18H88M12 82H88M30 18V82M70 18V82','ㅎ':'M50 9V18M16 29H84M50 43C17 43 17 88 50 88S83 43 50 43',
 'ㅏ':'M44 10V90M44 50H81','ㅐ':'M30 10V90M30 50H60M76 10V90','ㅑ':'M44 10V90M44 34H81M44 65H81','ㅓ':'M58 10V90M20 50H58','ㅕ':'M58 10V90M20 34H58M20 65H58','ㅗ':'M50 16V65M10 65H90','ㅜ':'M10 35H90M50 35V88','ㅡ':'M10 50H90','ㅣ':'M50 10V90','ㅘ':'M10 72H56M32 38V72M68 10V90M68 43H92','ㅝ':'M8 32H56M32 32V82M77 10V90M53 57H77'
};
function jamoSVG(j){let p=PATHS[j];if(!p&&j==='ㅆ')return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="${PATHS['ㅅ']}" transform="translate(-2 0) scale(.55 1)"/><path d="${PATHS['ㅅ']}" transform="translate(47 0) scale(.55 1)"/></g></svg>`;if(!p)return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><text x="50" y="79" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-weight="700" font-size="90" fill="currentColor">${j}</text></svg>`;return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${p}" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;}
let runId=0,paused=false,sound=true,currentWord='',speed=1,recognition=null,listening=false;
const stage=$('#stage');
const wait=async(ms,id)=>{let elapsed=0;while(elapsed<ms){if(id!==runId)return false;await new Promise(r=>setTimeout(r,40));if(!paused)elapsed+=40;}return id===runId;};
async function animate(ms,draw,id){let elapsed=0;draw(0);while(elapsed<ms){if(id!==runId)return false;await new Promise(r=>setTimeout(r,40));if(id!==runId)return false;if(!paused){elapsed+=40/speed;draw(Math.min(1,elapsed/ms));}}return true;}
function speak(text){if(!sound||!('speechSynthesis'in window))return;window.speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.lang='ko-KR';u.rate=.78;window.speechSynthesis.speak(u);}
function chime(final=false){if(!sound)return;try{const ctx=audioContext||(audioContext=new(window.AudioContext||window.webkitAudioContext)());ctx.resume();(final?[523.25,659.25,783.99,1046.5]:[659.25,783.99]).forEach((freq,i)=>{const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.15;o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.45);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.5);});}catch{}}
let audioContext;
const VOWEL_NOTES={'ㅘ':'ㅘ는 ㅗ와 ㅏ가 만난 모양이에요.','ㅝ':'ㅝ는 ㅜ와 ㅓ가 만난 모양이에요.','ㅐ':'ㅐ는 하나의 모음 친구로 만나요.'};
function stopVoice(){if(recognition){recognition.abort();recognition=null;}listening=false;$('#listen').classList.remove('listening');$('#listen span').textContent='말해 볼래요';}
function home(){runId++;paused=false;stopVoice();window.speechSynthesis?.cancel();$('#play').hidden=true;$('#home').hidden=false;$('#word-grid button')?.focus({preventScroll:true});}
async function start(word){stopVoice();const id=++runId;currentWord=word;paused=false;window.speechSynthesis?.resume();speed=Number($('#speed').value);$('#pause').textContent='Ⅱ 잠깐 멈춤';$('#pause').disabled=false;$('#home').hidden=true;$('#play').hidden=false;$('#finish-actions').hidden=true;$('#play-hint').hidden=false;$('#collected').innerHTML='';$('#word-result').classList.remove('show');$('#word-result').innerHTML='';$('#confetti').innerHTML='';$('#syllable-result').classList.remove('show');$('#syllable-result').innerHTML='';$('#tokens').innerHTML='';$('#scene').classList.remove('dim');$('#assembly').style.opacity=0;const chars=[...word].filter(c=>c!==' ');$('#progress').innerHTML=chars.map(()=>'<span></span>').join('');$('#back').focus({preventScroll:true});window.scrollTo({top:0,behavior:'smooth'});
 for(let n=0;n<chars.length;n++){if(id!==runId)return;const d=decompose(chars[n]);$('#progress').children[n].className='active';$('#scene').classList.remove('dim');$('#syllable-result').classList.remove('show');$('#syllable-result').innerHTML='';$('#assembly').style.opacity=0;
 const ride=window.HangulRides.create({host:$('#scene'),d,jamoSVG,word,index:n});
 $('#step-label').textContent=`${n+1} / ${chars.length} 번째 글자 · ${ride.title}`;
 $('#instruction').textContent=ride.intro;
 $('#explanation').textContent=ride.introNote;
 if(!await animate(ride.showTime,ride.show,id))return;
 $('#instruction').textContent=`‘${d.char}’을 만드는 친구들만 남아요`;
 $('#explanation').textContent=ride.parts.join(' · ');chime();
 if(!await animate(1400,ride.select,id))return;
 $('#instruction').textContent=ride.compound?`‘${ride.compound.pieces[0]}’와 ‘${ride.compound.pieces[1]}’가 만나요!`:ride.action;
 $('#explanation').textContent=ride.compound?`${ride.compound.pieces.join(' + ')} → ${ride.compound.vowel}, 이어서 자음이 만나 ‘${d.char}’이 돼요.`:ride.actionNote;
 if(!await animate(ride.assembleTime,ride.assemble,id))return;
 $('#instruction').textContent='이제 어떤 글자가 보이나요?';
 $('#explanation').textContent=VOWEL_NOTES[d.vowel]||(d.final?`받침 ‘${d.final}’은 글자 아래에 있어요.`:'사물이 사라져도, 글자 친구들은 남아요.');
 if(!await animate(1700,ride.reveal,id))return;
 $('#instruction').textContent=`‘${d.char}’ 완성!`;speak(d.char);chime();
 if(!await wait(1800*speed,id))return;
 $('#collected').insertAdjacentHTML('beforeend',`<span class="collected-letter">${d.char}</span>`);$('#progress').children[n].className='done';
 }
 if(!await wait(250*speed,id))return;
 $('#tokens').innerHTML='';$('#syllable-result').classList.remove('show');$('#step-label').textContent='글자가 모여, 마음이 되었어요';
 const ending=window.HangulEndings.create({host:$('#scene'),word});$('#scene').classList.remove('dim');
 $('#instruction').textContent=ending.title;$('#explanation').textContent=ending.note;
 $('#word-result').setAttribute('data-ending',ending.theme);
 $('#word-result').innerHTML=[...word].map((c,i)=>c===' '?'<span class="space"></span>':`<span class="finished-letter" style="--letter-index:${i};color:#${['665689','8a5268','527a6a','58744e','7e5a8c','79618d','796740','5a6a92','8d5f71','55785d'][Math.max(0,WORDS.indexOf(word))%10]};animation-delay:${i*.14}s">${c}</span>`).join('');
 $('#word-result').classList.add('show');$('#confetti').innerHTML='';chime(true);
 if(!await animate(3400,ending.frame,id))return;
 $('#pause').disabled=true;speak(word);$('#finish-actions').hidden=false;$('#play-hint').hidden=true;

}
$('#word-grid').addEventListener('click',e=>{const b=e.target.closest('[data-word]');if(b)start(b.dataset.word);});
$('#back').onclick=home;$('#choose').onclick=home;$('#replay').onclick=()=>start(currentWord);
$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'▶ 계속 보기':'Ⅱ 잠깐 멈춤';stage.getAnimations({subtree:true}).forEach(a=>paused?a.pause():a.play());if(paused)window.speechSynthesis?.pause();else window.speechSynthesis?.resume();};
$('#speed').onchange=()=>{speed=Number($('#speed').value);};
$('#sound').onclick=()=>{sound=!sound;$('#sound').textContent=sound?'♫':'♪';$('#sound').setAttribute('aria-label',sound?'소리 끄기':'소리 켜기');$('#sound').title=sound?'소리 끄기':'소리 켜기';if(!sound)window.speechSynthesis?.cancel();};
$('#guide').onclick=()=>$('#guide-dialog').showModal();$('#close-guide').onclick=$('#guide-done').onclick=()=>$('#guide-dialog').close();$('#guide-dialog').addEventListener('click',e=>{if(e.target===$('#guide-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SpeechRecognition)$('#voice-status').textContent='이 브라우저에서는 말을 눌러 골라 주세요.';
$('#listen').onclick=()=>{if(listening){stopVoice();$('#voice-status').textContent='말하기를 마쳤어요. 다시 눌러 시작할 수 있어요.';return;}if(!SpeechRecognition){$('#voice-status').textContent='음성 인식을 지원하지 않아요. 원하는 말을 눌러 주세요.';return;}window.speechSynthesis?.cancel();recognition=new SpeechRecognition();const r=recognition;r.lang='ko-KR';r.interimResults=false;r.maxAlternatives=5;r.continuous=false;listening=true;$('#listen').classList.add('listening');$('#listen span').textContent='듣고 있어요…';$('#voice-status').textContent='예를 들어 “고마워”라고 말해 주세요.';r.onresult=e=>{const alternatives=Array.from(e.results[0]).map(v=>v.transcript);const normalize=s=>s.replace(/[\s.,!?。！？]/g,'');const match=WORDS.find(w=>alternatives.some(a=>normalize(a)===normalize(w)));if(match){$('#voice-status').textContent=`“${match}” 들었어요!`;start(match);}else $('#voice-status').textContent=`“${alternatives[0]}” 들었어요. 화면에 있는 말을 다시 말해 주세요.`;};r.onerror=e=>{const messages={'not-allowed':'마이크 사용이 허용되지 않았어요. 말을 눌러 골라 주세요.','no-speech':'잘 듣지 못했어요. 한 번 더 눌러 말해 주세요.','audio-capture':'마이크를 찾지 못했어요. 말을 눌러 골라 주세요.','network':'음성 인식에 연결하지 못했어요. 말을 눌러 골라 주세요.'};$('#voice-status').textContent=messages[e.error]||'말을 듣지 못했어요. 화면에서 골라도 좋아요.';};r.onend=()=>{if(recognition===r){recognition=null;listening=false;$('#listen').classList.remove('listening');$('#listen span').textContent='말해 볼래요';}};try{r.start();}catch{stopVoice();$('#voice-status').textContent='마이크를 시작하지 못했어요. 말을 눌러 골라 주세요.';}};
// Validate the full word set, including finals and compound vowels, before play.
for(const word of WORDS)for(const c of word){if(c===' ')continue;const d=decompose(c);[d.initial,d.vowel,d.final].filter(Boolean).forEach(j=>jamoSVG(j));}
