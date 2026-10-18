/* Each word has a deliberate sequence of familiar objects and physical actions. */
(function(){
 'use strict';
 const base=window.HangulRides,originalCreate=base.create;
 const PLANS={
  '고마워':['icecream','carousel','slide'],
  '사랑해':['flower','apple','umbrella'],
  '안녕':['egg','duck'],
  '같이 놀자':['blocks','bubble','train','mole'],
  '아름다워':['butterfly','drawer','gift','tube'],
  '즐거워':['popsicle','plates','tube'],
  '행복해':['laundry','lunch','umbrella'],
  '신나':['fish','curtain'],
  '재밌어':['cars','stamp','shell'],
  '흥겨워':['balloon','ferris','tube']
 };
 // title, introduction, motion, instruction explaining the actual object action
 const TEXT={
  icecream:['아이스크림 쌓기','아이스크림마다 글자 친구가 있어요!','스쿱에서 톡! 아이스크림이 쌓여요','모음 아이스크림 위로 자음 아이스크림이 떨어져요.'],
  carousel:['빙글빙글 회전그네','글자 친구들이 그네를 타고 빙글빙글!','그네가 멈추고, 나란히 모여요','자모가 적힌 그네가 함께 제자리를 찾아요.'],
  slide:['구불구불 미끄럼틀','글자 친구들이 미끄럼틀을 탈 거예요!','미끄럼틀을 타고 슈우웅!','자모를 태운 썰매가 길을 따라 내려와요.'],
  flower:['활짝 피는 꽃','어떤 꽃이 피어날까요?','꽃이 핀 화분이 사뿐사뿐 모여요','꽃 가운데 적힌 자모가 화분과 함께 움직여요.'],
  apple:['사과나무','사과에 어떤 글자가 적혀 있나요?','톡, 토독! 사과가 떨어져요','자모가 적힌 사과들이 떨어져 글자의 자리에 쌓여요.'],
  umbrella:['펼쳐지는 우산','접힌 우산을 활짝 펴 볼까요?','두 우산이 나란히 붙어요','우산에 적힌 자모도 우산과 함께 나란히 와요.'],
  egg:['알에서 나온 병아리','알에서 누가 나올까요?','삐약삐약! 병아리들이 모여요','자모가 적힌 병아리들이 통통 뛰어 자리를 찾아요.'],
  duck:['오리 연못','오리 친구들이 헤엄쳐요','첨벙첨벙! 오리들이 자리를 찾아요','오리에 적힌 자모가 물길을 따라 함께 움직여요.'],
  blocks:['쌓기 블록','블록에 적힌 친구들을 찾아보세요','착착! 옆으로 붙이고 아래에 끼워요','자음과 모음 블록이 먼저 붙고, 받침 블록이 아래에 와요.'],
  bubble:['몽글몽글 비눗방울','방울 속에 어떤 친구가 있을까요?','톡톡! 두 방울이 가까워져요','다른 방울은 터지고 필요한 방울만 나란히 붙어요.'],
  train:['칙칙폭폭 기차','글자 친구들이 기차를 타고 와요','칙칙폭폭! 객차가 제자리에 멈춰요','자모를 실은 객차들이 갈라진 선로를 따라 자리 잡아요.'],
  mole:['빼꼼 두더지','누가 빼꼼 올라올까요?','필요한 두더지들만 빼꼼!','자모가 적힌 두더지들이 땅 위로 올라와 모여요.'],
  butterfly:['팔랑팔랑 나비','나비 날개에서 자모를 찾아보세요','팔랑팔랑! 나비가 나란히 앉아요','자모를 달고 날던 나비들이 제자리에 내려앉아요.'],
  drawer:['열리는 서랍','서랍 안에는 누가 있을까요?','드르륵! 서랍 세 칸이 열려요','위·가운데·아래 서랍에 있는 자모가 한 글자가 돼요.'],
  gift:['두근두근 선물','선물 상자 안을 열어 볼까요?','상자가 사르르 열리며 모여요','자모를 담은 상자들이 나란히 자리를 찾아요.'],
  tube:['둥실둥실 튜브','튜브를 탄 글자 친구들이에요','물길을 따라 슈우웅!','자모가 적힌 튜브들이 물미끄럼틀을 내려와 만나요.'],
  popsicle:['쏙쏙 막대아이스크림','꽂혀 있는 아이스크림을 뽑아 볼까요?','쏙! 쏙! 자모가 적힌 아이스크림이에요','아이스크림을 하나씩 뽑아 위·가운데·아래에 놓아요.'],
  plates:['빙글빙글 접시','자모를 담은 접시들이 돌아요','필요한 접시 두 개가 멈춰요','돌아가던 접시들이 나란히 붙어 글자를 만들어요.'],
  laundry:['바람에 펄럭이는 옷','빨랫줄의 옷에 자모가 적혀 있어요','집게를 타고 옷들이 모여요','위쪽 두 옷 사이로 자모가 모이고 받침 옷은 아래에 걸려요.'],
  lunch:['도시락 꾸미기','도시락에 무엇이 들어 있나요?','반찬 컵이 도시락 칸에 쏙쏙!','자모가 적힌 반찬 컵이 위·가운데·아래 칸에 들어가요.'],
  fish:['자석 낚시','물고기에 적힌 자모를 찾아보세요','한 마리씩 낚아 올려요!','낚싯줄을 따라 올라온 물고기들이 글자 자리에 모여요.'],
  curtain:['커튼 숨바꼭질','커튼 뒤에는 어떤 친구가 있나요?','커튼을 열고 창문이 나란히!','커튼 뒤 창문에 적힌 자모가 함께 가까워져요.'],
  cars:['부릉부릉 주차장','어떤 자동차가 들어올까요?','부릉! 주차 칸에 쏙 들어가요','자모가 적힌 자동차들이 나란히 주차해요.'],
  stamp:['꾹꾹 도장','도장에 적힌 자모를 살펴보세요','꾹! 꾹! 받침까지 찍어요','자모 도장 두 개를 위에 찍고, 받침 도장은 아래에 찍어요.'],
  shell:['바닷속 조개','조개 안에는 누가 숨어 있을까요?','조개가 입을 열고 가까이 와요','조개 안에 적힌 자모들이 나란히 만나요.'],
  balloon:['둥실둥실 풍선','어떤 풍선이 떠오를까요?','풍선 세 개가 둥실 떠올라요','자모가 적힌 풍선을 위·가운데·아래 고리에 묶어요.'],
  ferris:['빙글빙글 관람차','자모를 단 관람차가 돌아요','두 곤돌라가 내려와 나란히!','자모가 적힌 곤돌라들이 승강장에 내려와 붙어요.']
 };
 const colors=['#efd394','#dca4af','#adc4d8','#b5cba7','#c6b0d6','#e5bb98'];
 const clamp=t=>Math.max(0,Math.min(1,t)),ease=t=>t<.5?4*t*t*t:1-(-2*t+2)**3/2;
 const mix=(a,b,t)=>a+(b-a)*t,pt=(a,b,t)=>({x:mix(a.x,b.x,t),y:mix(a.y,b.y,t)});
 const bez=(a,b,c,d,t)=>({x:(1-t)**3*a.x+3*(1-t)**2*t*b.x+3*(1-t)*t*t*c.x+t**3*d.x,y:(1-t)**3*a.y+3*(1-t)**2*t*b.y+3*(1-t)*t*t*c.y+t**3*d.y});
 const petals=c=>`<g fill="${c}" stroke="#fff7df" stroke-width="2">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-37" rx="30" ry="37" transform="rotate(${a})"/>`).join('')}<circle r="44" fill="#fff1b7"/></g>`;
 const wheel=(x,y)=>`<circle cx="${x}" cy="${y}" r="14" fill="#747d85"/><circle cx="${x}" cy="${y}" r="6" fill="#e9e2cc"/>`;
 function landscape(type){
  const water=['duck','tube','fish','shell'].includes(type),inside=['drawer','curtain','stamp','lunch'].includes(type);
  return `<rect width="1000" height="600" fill="${water?'#e9f2ed':inside?'#f4ecdf':'#f4eddb'}"/><circle cx="853" cy="78" r="34" fill="#f3d996"/><g fill="#fffdf4"><path d="M58 97q-4-26 21-25 15-28 39-7 28-2 30 24H58z"/><path d="M735 124q-3-23 19-21 15-26 37-6 27-1 28 22H735z"/></g><path d="M0 506q250-65 500 0t500 0v94H0" fill="${water?'#c3e0da':inside?'#dfd2bc':'#c8d8b5'}"/><path d="M0 562q250-39 500-2t500-3v43H0" fill="${water?'#a9d1ce':inside?'#d3c1a8':'#b3cba3'}"/>`;
 }
 function scenery(type,goals){
  if(type==='duck')return `<g id="object-machine"><ellipse cx="500" cy="345" rx="455" ry="193" fill="#c4e1d7"/><path d="M115 335q70-20 140 0M690 405q70-20 140 0M330 480q80-18 160 0" stroke="#f6fae8" stroke-width="5" fill="none"/></g>`;
  if(type==='flower'||type==='butterfly')return `<g id="object-machine"><path d="M75 535v-76M910 540v-64" stroke="#86a779" stroke-width="6"/><g transform="translate(75 459) scale(.4)">${petals('#d7adc7')}</g><g transform="translate(910 477) scale(.45)">${petals('#e9cb86')}</g><path d="M0 540q240-18 500 0t500 0" stroke="#9dbb8e" stroke-width="4" fill="none"/></g>`;
  if(type==='apple')return `<g id="object-machine"><path d="M468 520l17-300h38l24 300" fill="#bc9877"/><path d="M501 295L265 147M509 311l228-166" stroke="#bc9877" stroke-width="23" stroke-linecap="round"/><g fill="#abc497"><ellipse cx="304" cy="180" rx="195" ry="111"/><ellipse cx="502" cy="135" rx="180" ry="110"/><ellipse cx="705" cy="180" rx="188" ry="111"/></g><ellipse cx="500" cy="529" rx="139" ry="22" fill="#99b287"/></g>`;
  if(type==='popsicle')return `<g id="object-machine"><path d="M80 350h840v170H80z" fill="#aabfc5" stroke="#fdf7e6" stroke-width="7"/><path d="M80 350l60-54h720l60 54" fill="#d5e2db"/><path d="M107 352h786" stroke="#86a4ad" stroke-width="10"/><path d="M112 382h776v105H112z" fill="#d4e0d6"/><path d="M270 420h460" stroke="#a7bbb0" stroke-width="7" stroke-linecap="round"/><path d="M130 519v30M870 519v30" stroke="#839c9a" stroke-width="12"/></g>`;
  if(type==='drawer')return `<g id="object-machine"><rect x="285" y="98" width="430" height="426" rx="18" fill="#c5a484" stroke="#af8d70" stroke-width="7"/><rect x="305" y="117" width="390" height="380" rx="8" fill="#9d8067"/><path d="M310 523v30M690 523v30" stroke="#a98b72" stroke-width="16" stroke-linecap="round"/></g>`;
  if(type==='train'){const rails=goals.map(g=>`M0 493H300C390 493 365 ${g.y+26} ${g.x} ${g.y+26}`);return `<g id="object-machine">${rails.map(p=>`<path d="${p}" stroke="#ae9b81" stroke-width="15" fill="none"/><path d="${p}" stroke="#fff8e7" stroke-width="5" stroke-dasharray="6 20" fill="none"/>`).join('')}<g id="object-locomotive"><path d="M51 424h131v54H51z" fill="#a0b9a9"/><path d="M77 380h68v44H77z" fill="#bdd2c4"/><path d="M58 364h17v60H58" stroke="#8baba0" stroke-width="15"/>${wheel(77,482)}${wheel(155,482)}</g></g>`;}
  if(type==='plates')return `<g id="object-machine"><ellipse cx="500" cy="360" rx="420" ry="130" fill="#ded0bc"/><ellipse cx="500" cy="344" rx="420" ry="130" fill="#f9edda" stroke="#c8baa4" stroke-width="10"/><ellipse cx="500" cy="344" rx="290" ry="55" fill="#b6c7a4"/><path d="M95 363q70 125 420 102t395-102" stroke="#c1ae96" stroke-width="5" fill="none"/></g>`;
  if(type==='laundry')return `<g id="object-machine"><path d="M70 550V100M930 550V100" stroke="#b59b7c" stroke-width="15" stroke-linecap="round"/><path d="M70 160q430 75 860 0M70 393q430 68 860 0" stroke="#c3ad8e" stroke-width="5" fill="none"/><path d="M95 550H45M905 550h50" stroke="#b59b7c" stroke-width="12" stroke-linecap="round"/></g>`;
  if(type==='lunch')return `<g id="object-machine"><rect x="190" y="100" width="620" height="430" rx="60" fill="#cc9f97" stroke="#fff7e7" stroke-width="8"/><rect x="216" y="126" width="568" height="378" rx="40" fill="#f1dcd0"/>${goals.map(g=>`<rect x="${g.x-88}" y="${g.y-42}" width="176" height="84" rx="22" fill="#d7bbb0" stroke="#fff0df" stroke-width="4"/>`).join('')}<path d="M98 186v239M130 186v239M873 180v242" stroke="#b7976f" stroke-width="11" stroke-linecap="round"/><ellipse cx="875" cy="164" rx="23" ry="38" fill="#d7bf96"/></g>`;
  if(type==='fish')return `<g id="object-machine"><ellipse cx="500" cy="431" rx="445" ry="115" fill="#a9d5d0"/><ellipse cx="500" cy="413" rx="416" ry="86" fill="#c7e6de"/><path d="M90 457q60-20 120 0t120 0M680 450q60-20 120 0t100 0" fill="none" stroke="#f6fbec" stroke-width="5"/><path d="M840 130q40-100 90-75" fill="none" stroke="#b99c77" stroke-width="13" stroke-linecap="round"/></g>`;
  if(type==='cars')return `<g id="object-machine"><path d="M0 510H285Q350 510 350 425V260Q350 205 430 205H960" fill="none" stroke="#c4c5b9" stroke-width="100"/><path d="M0 510H285Q350 510 350 425V260Q350 205 430 205H960" fill="none" stroke="#fff7db" stroke-width="4" stroke-dasharray="19 20"/>${goals.map(g=>`<rect x="${g.x-85}" y="${g.y-65}" width="170" height="135" rx="10" fill="#b8c8ad" stroke="#fff7df" stroke-width="5"/>`).join('')}<path d="M850 520V403" stroke="#a8ac9b" stroke-width="7"/><rect x="819" y="375" width="62" height="65" rx="12" fill="#abc0b2"/><path d="M841 419v-28h14q17 0 0 15h-14" fill="none" stroke="#fffbe9" stroke-width="5"/></g>`;
  if(type==='stamp')return `<g id="object-machine"><rect x="235" y="120" width="530" height="395" rx="22" fill="#fff9e9" stroke="#e4d8bd" stroke-width="5"/><path d="M288 174h60M288 195h110M652 457h60" stroke="#eadfc4" stroke-width="5" stroke-linecap="round"/><rect x="55" y="435" width="132" height="65" rx="12" fill="#c7abc5"/><rect x="69" y="445" width="104" height="35" rx="6" fill="#957a9b"/></g>`;
  if(type==='ferris')return `<g id="object-machine"><path d="M500 300L322 547M500 300l178 272" stroke="#a6bcae" stroke-width="28" stroke-linecap="round"/><circle cx="500" cy="300" r="185" fill="#fbf3df" stroke="#c7a7bd" stroke-width="13"/><g id="object-spokes" stroke="#c7a7bd" stroke-width="7">${Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return `<path d="M500 300L${500+185*Math.cos(a)} ${300+185*Math.sin(a)}"/>`;}).join('')}</g><circle cx="500" cy="300" r="24" fill="#e8cb8c"/><path d="M275 547h450" stroke="#a4b59d" stroke-width="18" stroke-linecap="round"/></g>`;
  if(type==='tube')return `<g id="object-machine"><path d="M700 90C970 165 360 195 605 288S735 425 475 473" fill="none" stroke="#a8c9c9" stroke-width="125" stroke-linecap="round"/><path d="M700 90C970 165 360 195 605 288S735 425 475 473" fill="none" stroke="#d1e9df" stroke-width="106" stroke-linecap="round"/><path d="M700 90C970 165 360 195 605 288S735 425 475 473" fill="none" stroke="#f7fbec" stroke-width="5" stroke-linecap="round" stroke-dasharray="30 37"/></g>`;
  if(type==='mole')return `<g id="object-machine">${positions(type).map(p=>`<ellipse cx="${p.x}" cy="${p.y+65}" rx="87" ry="28" fill="#b3b98d"/><ellipse cx="${p.x}" cy="${p.y+60}" rx="69" ry="18" fill="#8c9572"/>`).join('')}</g>`;
  if(type==='balloon')return `<g id="object-machine"><path d="M330 540h340" stroke="#c7b58f" stroke-width="11" stroke-linecap="round"/>${goals.map(g=>`<circle cx="${g.x}" cy="${g.y+100}" r="8" fill="#d4bd87"/>`).join('')}</g>`;
  return '<g id="object-machine"></g>';
 }
 function plainShell(type,c,i){
  const feature=id=>`id="object-feature-${i}" data-feature="${id}"`;
  const second=id=>`id="object-second-${i}" data-feature="${id}"`;
  if(type==='flower')return `<path d="M0 30v101M0 84q-55-3-47-34 35-2 47 34M0 105q53-3 44-32-33-3-44 32" fill="#a1ba88" stroke="#92ab7c" stroke-width="4"/><path d="M-48 113h96l-13 65h-70z" fill="#cfad90"/><path d="M-55 112H55v16H-55z" fill="#e0c3a3"/><g ${feature('flower-bloom')}>${petals(c)}</g>`;
  if(type==='apple')return `<path d="M0-49q-4-26 15-38" fill="none" stroke="#a18367" stroke-width="7" stroke-linecap="round"/><path d="M6-66q39-18 46 5-29 16-46-5" fill="#8eaf7f"/><path d="M0-49C-93-84-112 46-38 67-20 73-4 61 0 62 27 76 62 68 77 29 99-29 57-78 0-49" fill="${c}" stroke="#f9edd5" stroke-width="4"/><path d="M-52-27q-14 13-13 28" stroke="#fff6de" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if(type==='umbrella')return `<path d="M0 36v86q0 29 24 23" stroke="#a39888" stroke-width="6" stroke-linecap="round" fill="none"/><g ${feature('umbrella-open')}><path d="M-91 27a92 92 0 0 1 182 0q-30-20-60 0-31-20-62 0-30-20-60 0" fill="${c}" stroke="#fff4d9" stroke-width="4"/><path d="M0-65Q-35-35-31 27M0-65Q35-35 31 27" fill="none" stroke="#fff7e4" stroke-width="3"/><path d="M0-64v-15" stroke="#a39888" stroke-width="5" stroke-linecap="round"/></g>`;
  if(type==='egg')return `<g ${feature('chick')}><ellipse cy="7" rx="61" ry="65" fill="#f1d28a"/><path d="M-48 9l-29 22M48 9l29 22" stroke="#dfba72" stroke-width="11" stroke-linecap="round"/><path d="M-25 69l-8 14M25 69l8 14" stroke="#d7a478" stroke-width="6"/></g><g ${second('egg-top')}><path d="M-66 14C-77-101 76-101 66 14l-18-16-19 17L9-2-12 15-33-2-49 15z" fill="#fff8e8" stroke="#dbcdae" stroke-width="4"/></g><path d="M-66 23l18-16 19 17L-9 7l21 17L33 7l16 17 17-16q6 71-66 72-71-2-66-57" fill="#faf0da" stroke="#dbcdae" stroke-width="4"/>`;
  if(type==='duck')return `<path d="M-50 18q-44-4-45-29 35 3 45-12" fill="${c}"/><ellipse cy="20" rx="72" ry="46" fill="${c}" stroke="#fff6db" stroke-width="3"/><circle cx="45" cy="-35" r="33" fill="${c}"/><path d="M73-37l31 12-31 8" fill="#d9a475"/><circle cx="53" cy="-43" r="4" fill="#657061"/><path d="M-60 73q65 12 124-1" stroke="#f8fbeb" stroke-width="4" fill="none"/>`;
  if(type==='blocks')return `<rect x="-69" y="-62" width="138" height="124" rx="12" fill="${c}" stroke="#fff7dc" stroke-width="5"/><path d="M-69 45H69v17H-69z" fill="#00000012"/><path d="M-45-63v-12h29v12M16-63v-12h29v12" fill="${c}" stroke="#fff7dc" stroke-width="4"/>`;
  if(type==='bubble')return `<circle r="78" fill="${c}" fill-opacity=".22" stroke="#fff9ed" stroke-width="6"/><circle r="72" fill="none" stroke="${c}" stroke-width="4"/><path d="M-53-30q14-25 37-27M40 49l11-13" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  if(type==='train')return `<path d="M-74-61H74v107H-74z" fill="${c}" stroke="#fff7df" stroke-width="4"/><rect x="-60" y="-48" width="120" height="88" rx="12" fill="#fff9e7" fill-opacity=".65"/><path d="M-85 50H85" stroke="#9e9d8c" stroke-width="9"/>${wheel(-47,62)}${wheel(47,62)}`;
  if(type==='mole')return `<path d="M-67 54V-9q0-71 67-71T67-9v63" fill="${c}" stroke="#fff5df" stroke-width="4"/><circle cx="-43" cy="-55" r="4" fill="#6e7365"/><circle cx="43" cy="-55" r="4" fill="#6e7365"/><rect x="-45" y="-37" width="90" height="80" rx="17" fill="#fff4d9"/><ellipse cx="-65" cy="48" rx="20" ry="13" fill="${c}"/><ellipse cx="65" cy="48" rx="20" ry="13" fill="${c}"/>`;
  if(type==='butterfly')return `<g ${feature('butterfly-wings')}><path d="M-7 0C-157-156-151 57-50 27-147 126 19 125-7 0" fill="${c}" stroke="#fff7df" stroke-width="4"/><path d="M7 0C157-156 151 57 50 27 147 126-19 125 7 0" fill="${c}" stroke="#fff7df" stroke-width="4"/><ellipse cx="-55" cy="-22" rx="23" ry="34" fill="#fff4d8" fill-opacity=".65"/><ellipse cx="55" cy="-22" rx="23" ry="34" fill="#fff4d8" fill-opacity=".65"/></g><ellipse cy="13" rx="12" ry="59" fill="#a2b393"/><path d="M-5-43q-21-28-31-11M5-43q21-28 31-11" stroke="#869b7c" stroke-width="4" fill="none"/><circle r="48" fill="#fff6da"/>`;
  if(type==='drawer')return `<path d="M-80-47h160v100H-80z" fill="#c4a583" stroke="#f3ddba" stroke-width="4"/><path d="M-80-47l17-31H63l17 31" fill="#e8d1ac"/><path d="M-80 42H80v20H-80z" fill="${c}"/><path d="M-24 52H24" stroke="#9a8a76" stroke-width="7" stroke-linecap="round"/>`;
  if(type==='gift')return `<path d="M-74-48H74v113H-74z" fill="${c}" stroke="#fff5de" stroke-width="4"/><path d="M-13-49h26V65" fill="#f9e1a1"/><g ${feature('gift-lid')}><rect x="-83" y="-66" width="166" height="26" rx="5" fill="${c}" stroke="#fff5de" stroke-width="4"/><path d="M0-66q-77-57-65-6 10 27 65 6 77-57 65-6-10 27-65 6" fill="none" stroke="#f7d994" stroke-width="12"/></g><rect x="-52" y="-31" width="104" height="78" rx="12" fill="#fff9e8"/>`;
  if(type==='tube')return `<ellipse cy="21" rx="93" ry="62" fill="#99c7c8"/><ellipse rx="88" ry="65" fill="${c}" stroke="#fff9e4" stroke-width="5"/><ellipse rx="57" ry="43" fill="#f9f1d7"/><path d="M-66-44l19 20M66 44L47 24M-66 44l19-20M66-44L47-24" stroke="#fff6df" stroke-width="18"/>`;
  if(type==='popsicle')return `<rect x="-14" y="60" width="28" height="93" rx="12" fill="#d0b18b"/><path d="M-59 60V-49q0-47 59-47t59 47V60q-57 15-118 0" fill="${c}" stroke="#fff8e0" stroke-width="4"/><path d="M-37-48v26" stroke="#fff7df" stroke-width="6" stroke-linecap="round"/>`;
  if(type==='plates')return `<ellipse cy="16" rx="87" ry="59" fill="#d6c7b2"/><ellipse rx="87" ry="59" fill="${c}" stroke="#fffae9" stroke-width="5"/><ellipse rx="66" ry="43" fill="#fff8e5"/>`;
  if(type==='laundry')return `<path d="M-38-55l-42 29 22 29 20-11v73h76v-73L58 3l22-29-42-29-15 14h-46z" fill="${c}" stroke="#fff7e3" stroke-width="4"/><path d="M-22-56q22 25 44 0" stroke="#fff7e3" stroke-width="6" fill="none"/><path d="M-34-69v17M34-69v17" stroke="#b69b74" stroke-width="9" stroke-linecap="round"/>`;
  if(type==='lunch')return `<ellipse cy="37" rx="81" ry="28" fill="#c9ab97"/><path d="M-81-29q81-35 162 0L70 39q-70 35-140 0z" fill="${c}" stroke="#fff4df" stroke-width="4"/><ellipse cy="-25" rx="78" ry="31" fill="#fff1d0"/><path d="M-51-38q17-23 33 0M20-40q17-23 33 0" stroke="#b6c98d" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cy="5" rx="56" ry="34" fill="#fff8e6"/>`;
  if(type==='fish')return `<path d="M-63-5l-48-42v89l48-38" fill="${c}" stroke="#fff6e1" stroke-width="4"/><ellipse rx="77" ry="52" fill="${c}" stroke="#fff6e1" stroke-width="4"/><path d="M-17-49l26-27 29 35M-8 50l22 21 22-30" fill="${c}"/><circle cx="57" cy="-18" r="5" fill="#66766d"/><ellipse cx="1" cy="1" rx="48" ry="37" fill="#fff6de" fill-opacity=".75"/>`;
  if(type==='curtain')return `<rect x="-80" y="-90" width="160" height="183" rx="10" fill="#fff9e8" stroke="#c5ad91" stroke-width="9"/><rect x="-66" y="-76" width="132" height="154" fill="#d7e9e0"/><path d="M-68 81H68M0-76V-55" stroke="#c5ad91" stroke-width="6"/><g ${feature('curtain-left')}><path d="M-79-91H0V92q-39-14-79 0z" fill="${c}"/><path d="M-53-80V83M-27-80V83" stroke="#fff4dc" stroke-width="3"/></g><g ${second('curtain-right')}><path d="M0-91H79V92q-39-14-79 0z" fill="${c}"/><path d="M27-80V83M53-80V83" stroke="#fff4dc" stroke-width="3"/></g>`;
  if(type==='cars')return `<path d="M-82 18l17-61q6-19 30-19h64q24 0 33 21l21 59v37H-82z" fill="${c}" stroke="#fff4d9" stroke-width="4"/><rect x="-47" y="-43" width="94" height="78" rx="18" fill="#f9f4df"/>${wheel(-51,58)}${wheel(51,58)}<path d="M-72 31h11M61 31h11" stroke="#fff0b6" stroke-width="9" stroke-linecap="round"/>`;
  if(type==='stamp')return `<path d="M-21-69v-47q0-24 21-24t21 24v47" fill="${c}" stroke="#fff7df" stroke-width="4"/><path d="M-73-69H73l12 109H-85z" fill="${c}" stroke="#fff7df" stroke-width="4"/><rect x="-87" y="38" width="174" height="22" rx="7" fill="#a18aa1"/><rect x="-52" y="-50" width="104" height="80" rx="13" fill="#fff8e9"/>`;
  if(type==='shell')return `<path d="M-82 14q82 108 164 0-82-42-164 0" fill="${c}" stroke="#fff5dd" stroke-width="4"/><g ${feature('shell-open')}><path d="M-82 0q-13-103 31-67 5-61 51-17 44-44 51 17 44-36 31 67z" fill="${c}" stroke="#fff5dd" stroke-width="4"/><path d="M-58-36L0 20M-29-59L0 20M29-59L0 20M58-36L0 20" stroke="#fff0d8" stroke-width="4"/></g><ellipse cy="16" rx="56" ry="40" fill="#fff5df"/>`;
  if(type==='balloon')return `<path d="M0 76q-20 38 0 57t0 12" fill="none" stroke="#b2a48e" stroke-width="3"/><ellipse cy="-6" rx="69" ry="84" fill="${c}" stroke="#fff8e2" stroke-width="4"/><path d="M-8 78l-8 14h32L8 78" fill="${c}"/><path d="M-43-40q6-17 20-23" fill="none" stroke="#fff5dd" stroke-width="7" stroke-linecap="round"/>`;
  if(type==='ferris')return `<path d="M-66-52q66-29 132 0v107H-66z" fill="${c}" stroke="#fff7df" stroke-width="5"/><path d="M-77-53q77-42 154 0" stroke="#b7a4bc" stroke-width="13" stroke-linecap="round"/><rect x="-48" y="-32" width="96" height="73" rx="12" fill="#fff9e8"/><path d="M-56 62H56" stroke="#a58da9" stroke-width="9" stroke-linecap="round"/>`;
  throw new Error('Unknown object scene: '+type);
 }
 function shell(type,c,i){return plainShell(type,c,i)+window.HangulArt.details(type);}
 function positions(type){
  if(type==='flower')return Array.from({length:6},(_,i)=>({x:115+i*154,y:320}));
  if(type==='balloon')return Array.from({length:6},(_,i)=>({x:115+i*154,y:445}));
  if(type==='fish')return [{x:225,y:390},{x:500,y:375},{x:775,y:390},{x:300,y:450},{x:560,y:450},{x:800,y:440}];
  if(type==='apple')return [{x:340,y:175},{x:560,y:140},{x:740,y:220},{x:190,y:245},{x:420,y:90},{x:790,y:115}];
  if(type==='popsicle')return Array.from({length:6},(_,i)=>({x:150+i*140,y:325}));
  if(type==='drawer')return Array.from({length:6},(_,i)=>({x:400+(i%2)*200,y:190+Math.floor(i/2)*125}));
  if(type==='laundry')return [{x:285,y:238},{x:530,y:251},{x:760,y:235},{x:240,y:460},{x:505,y:478},{x:770,y:459}];
  if(type==='lunch')return [{x:300,y:180},{x:690,y:188},{x:500,y:473},{x:300,y:437},{x:700,y:430},{x:500,y:145}];
  if(type==='train')return Array.from({length:6},(_,i)=>({x:240+i*132,y:431}));
  if(type==='mole')return [{x:250,y:230},{x:510,y:230},{x:770,y:230},{x:250,y:430},{x:510,y:430},{x:770,y:430}];
  if(type==='curtain')return [{x:270,y:270},{x:520,y:270},{x:770,y:270},{x:270,y:470},{x:520,y:470},{x:770,y:470}];
  if(type==='tube')return [{x:690,y:95},{x:835,y:143},{x:355,y:125},{x:195,y:250},{x:830,y:365},{x:180,y:440}];
  if(type==='stamp')return [{x:145,y:285},{x:855,y:285},{x:500,y:485},{x:125,y:470},{x:875,y:470},{x:500,y:185}];
  return [{x:235,y:230},{x:505,y:205},{x:775,y:225},{x:230,y:432},{x:500,y:438},{x:775,y:432}];
 }
 function decorate(ride){const t=TEXT[ride.type];return Object.assign(ride,{title:t[0],intro:t[1],introNote:'사물에 적힌 자음과 모음 친구들을 찾아보세요.',action:t[2],actionNote:t[3],showTime:ride.type==='carousel'?4600:2800,assembleTime:['slide','icecream','tube'].includes(ride.type)?5600:4200});}
 let playSerial=0;
 const layouts=[[4,1,5,0,3,2],[2,5,0,4,1,3],[5,3,1,2,0,4],[1,4,3,5,2,0],[3,0,4,1,5,2],[0,5,2,4,1,3],[2,4,5,0,3,1],[5,1,3,4,0,2]];
 const offsets=[[-40,-5],[-95,5],[95,-15],[-50,20],[65,0],[-75,-10],[70,15],[-85,20],[85,-5],[0,-15]];
 function create({host,d,jamoSVG,word,index,variation}){
  const wi=Math.max(0,Object.keys(PLANS).indexOf(word)),n=index||0,turn=variation===undefined?playSerial++:variation;
  const slots=layouts[(wi*3+n*5+turn)%layouts.length];
  const offset={x:offsets[wi][0]+[-20,20,0,10][n%4],y:offsets[wi][1]+[0,12,-8,5][n%4]};
  const type=PLANS[word]?.[index];if(!type||['icecream','carousel','slide'].includes(type))return decorate(originalCreate({host,d,jamoSVG,slots,offset}));
  const shape=base.kind(d),oldCenter=shape==='slide'?392:shape==='icecream'?(d.final?320:340):310;
  const {parts,goals,compound}=base.splitVowel(d,base.block(d,shape).map(g=>({...g,x:g.x+offset.x,y:g.y-oldCenter+330+offset.y})));
  const extras=['ㄴ','ㅅ','ㅓ','ㅋ','ㅣ','ㅈ'].filter(j=>!parts.includes(j)),letters=[...parts,...extras.slice(0,6-parts.length)];
  let markup=`<svg class="ride-canvas" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${TEXT[type][0]}에서 ${d.char} 만들기">${landscape(type)}${scenery(type,goals)}<g id="object-lines">${letters.map((_,i)=>`<path id="object-line-${i}" fill="none" stroke="#a7a494" stroke-width="2" opacity="0"/>`).join('')}</g><g id="object-props">${letters.map((j,i)=>`<g id="object-prop-${i}" data-object="${type}" data-jamo="${j}" data-selected="${i<parts.length}" data-slot="${slots[i]}" role="img" aria-label="${j}가 적힌 ${TEXT[type][0]}"><g id="object-shell-${i}">${shell(type,colors[slots[i]],i)}</g><g id="object-glyph-${i}" style="color:${[...'ㅏㅐㅑㅓㅕㅗㅜㅡㅣㅘㅝ'].includes(j)?'#b35f7f':'#596c9d'}">${jamoSVG(j).replace('<svg ','<svg x="-50" y="-50" width="100" height="100" ')}</g></g>`).join('')}</g></svg>`;
  if(type==='popsicle')markup=markup.slice(0,-6)+`<g id="object-foreground"><path d="M80 356h840v164H80z" fill="#aac0c5" stroke="#fdf7e6" stroke-width="6"/><rect x="112" y="383" width="776" height="106" rx="8" fill="#d4e0d6"/><path d="M270 420h460" stroke="#a7bbb0" stroke-width="7" stroke-linecap="round"/></g></svg>`;
  markup=window.HangulArt.enhance(markup);
  host.innerHTML=markup;const find=id=>host.querySelector('#'+id),props=letters.map((_,i)=>find('object-prop-'+i)),shells=letters.map((_,i)=>find('object-shell-'+i)),glyphs=letters.map((_,i)=>find('object-glyph-'+i)),features=letters.map((_,i)=>find('object-feature-'+i)),seconds=letters.map((_,i)=>find('object-second-'+i)),lines=letters.map((_,i)=>find('object-line-'+i));
  const setA=(el,k,v)=>el?.setAttribute(k,String(v)),alpha=(el,a)=>setA(el,'opacity',clamp(a));
  const set=(i,p,angle=0,s=1)=>setA(props[i],'transform',`translate(${p.x} ${p.y}) rotate(${angle}) scale(${s})`);
  const size=(i,w,h)=>setA(glyphs[i],'transform',`scale(${w/100} ${h/100})`);
  const endScale=shape==='icecream'?(d.final ? .42 : .62):.65;
  const grid=positions(type),pos=letters.map((_,i)=>grid[slots[i]]);let parked=pos.map(p=>({...p}));
  const orbit=(i,t,rx,ry,cx=500,cy=340)=>{const a=slots[i]*Math.PI/3+t*Math.PI*2;return {x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry};};
  const hop=(from,end,t,lift)=>{const q=ease(t),p=pt(from,end,q);p.y-=Math.sin(q*Math.PI)*lift;return p;};
  function show(t){letters.forEach((_,i)=>{const p={...pos[i]};let angle=0,s=1;const u=clamp((t-i*.075)*1.7);
   if(type==='flower'){setA(features[i],'transform',`scale(${.12+.88*ease(u)})`);alpha(glyphs[i],u);}
   else if(type==='umbrella'){setA(features[i],'transform',`scale(${.12+.88*ease(u)} 1)`);alpha(glyphs[i],u);angle=Math.sin(t*6+i)*4;}
   else if(type==='egg'){alpha(features[i],u);setA(seconds[i],'transform',`translate(${u*70} ${-u*104}) rotate(${u*49})`);alpha(seconds[i],1-u);alpha(glyphs[i],u);p.y-=Math.sin(u*Math.PI)*13;}
   else if(type==='duck'||type==='fish'){p.x+=Math.sin(t*5+i)*39;p.y+=Math.sin(t*9+i)*7;angle=Math.sin(t*5+i)*4;}
   else if(type==='bubble'||type==='balloon'){p.x+=Math.sin(t*5+i)*25;p.y-=t*(type==='balloon'?50:66);s=.9+Math.sin(t*4+i)*.06;}
   else if(type==='butterfly'){p.x+=Math.sin(t*5+i)*38;p.y+=Math.cos(t*7+i)*26;setA(features[i],'transform',`scale(${.35+.65*Math.abs(Math.cos(t*22+i))} 1)`);}
   else if(type==='drawer'){p.y+=u*23;s=.86+.14*u;alpha(glyphs[i],u);}
   else if(type==='gift'){setA(features[i],'transform',`translate(${u*12} ${-u*74}) rotate(${u*10})`);alpha(features[i],1-u*.7);alpha(glyphs[i],u);}
   else if(type==='plates')Object.assign(p,orbit(i,t*.95,350,92));
   else if(type==='laundry'){angle=Math.sin(t*7+i)*8;}
   else if(type==='curtain'){setA(features[i],'transform',`translate(${-u*64} 0) scale(${1-u*.67} 1)`);setA(seconds[i],'transform',`translate(${u*64} 0) scale(${1-u*.67} 1)`);alpha(glyphs[i],u);}
   else if(type==='shell'){setA(features[i],'transform',`translate(0 ${-u*55}) scale(1 ${1-u*.45})`);alpha(glyphs[i],u);}
   else if(type==='mole'){const up=.2+.8*Math.abs(Math.sin(t*8+i));p.y+=(1-up)*87;alpha(props[i],up);}
   else if(type==='train'){p.x-=t*90;setA(find('object-locomotive'),'transform',`translate(${-t*90} 0)`);}
   else if(type==='cars'){p.x+=Math.sin(t*3+i)*30;angle=Math.sin(t*4+i)*3;}
   else if(type==='ferris'){Object.assign(p,orbit(i,t*.7,185,185,500,300));setA(find('object-spokes'),'transform',`rotate(${t*.7*360} 500 300)`);}
   else if(type==='tube'){p.y+=Math.sin(t*8+i)*5;angle=Math.sin(t*5+i)*5;}
   else if(type==='apple'){angle=Math.sin(t*7+i)*4;}
   set(i,p,angle,s);size(i,68,68);parked[i]=p;
  });}
  let selectedStart;
  function select(t){if(!selectedStart)selectedStart=parked.map(p=>({...p}));letters.forEach((_,i)=>{const chosen=i<parts.length;
   if(type==='bubble'&&!chosen){set(i,selectedStart[i],0,1+t*.5);alpha(props[i],1-t);}
   else if(type==='mole'&&!chosen){set(i,{x:selectedStart[i].x,y:selectedStart[i].y+100*t});alpha(props[i],1-t);}
   else if(type==='drawer'&&!chosen){set(i,{x:selectedStart[i].x,y:selectedStart[i].y-25*t},0,1-t*.15);alpha(props[i],1-t);}
   else alpha(props[i],chosen?1:1-t);
  });}
  function assemble(t){if(type==='popsicle'){const leave=clamp((t-.6)/.4);setA(find('object-machine'),'transform',`translate(0 ${leave*240})`);setA(find('object-foreground'),'transform',`translate(0 ${leave*240})`);}parts.forEach((_,i)=>{const u=base.partTime(t,i,parts.length,compound),q=ease(u),a=parked[i],end=goals[i];let p,angle=0;
   if(type==='popsicle'){
    const lifted={x:a.x,y:Math.max(105,a.y-205)};
    if(u<.45)p=pt(a,lifted,ease(u/.45));else p=hop(lifted,end,(u-.45)/.55,35);
   }else if(type==='apple'){const above={x:end.x,y:a.y};if(u<.28)p=pt(a,above,ease(u/.28));else{const v=(u-.28)/.72,fall=v<.82?(v/.82)**2:1+Math.sin((v-.82)/.18*Math.PI)*.05;p=pt(above,end,fall);angle=Math.sin(v*Math.PI)*9;}}
   else if(type==='flower'){p=pt(a,end,q);p.y-=Math.abs(Math.sin(u*Math.PI*3))*18*(1-u);}
   else if(type==='egg'||type==='mole'){p=pt(a,end,q);p.y-=Math.abs(Math.sin(u*Math.PI*3))*55*(1-u);}
   else if(type==='duck'){p=bez(a,{x:a.x+180,y:a.y+60},{x:end.x-130,y:end.y+45},end,q);angle=Math.sin(u*Math.PI*4)*5;}
   else if(type==='fish'){p=hop(a,end,u,135);setA(lines[i],'d',`M864 125L${p.x} ${p.y-50}q-9-9 0-15`);alpha(lines[i],Math.sin(u*Math.PI));angle=Math.sin(u*Math.PI*4)*7;}
   else if(type==='butterfly'){p=hop(a,end,u,100);setA(features[i],'transform',`scale(${.3+.7*Math.abs(Math.cos(u*24))} 1)`);}
   else if(type==='tube'){
    const top={x:700,y:90},middle={x:605,y:288},bottom={x:475,y:473};
    if(u<.1)p=pt(a,top,ease(u/.1));else if(u<.5){const v=(u-.1)/.4;p=bez(top,{x:970,y:165},{x:360,y:195},middle,v);angle=Math.sin(v*Math.PI)*15;}
    else if(u<.9){const v=(u-.5)/.4;p=bez(middle,{x:850,y:381},{x:735,y:425},bottom,v);angle=-Math.sin(v*Math.PI)*13;}else p=pt(bottom,end,ease((u-.9)/.1));
   }else if(type==='blocks'){
    const from={x:i===1?925:75,y:end.y};p=hop(u<.22?a:from,u<.22?from:end,u<.22?u/.22:(u-.22)/.78,u<.22?10:40);angle=Math.sin(u*Math.PI*2)*5*(1-u);
   }else if(type==='train'){
    const junction={x:300,y:431};if(u<.3)p=pt(a,junction,ease(u/.3));else{const v=(u-.3)/.7;p=bez(junction,{x:390,y:431},{x:365,y:end.y},end,v);angle=Math.sin(v*Math.PI)*(end.y<431?-12:4);}
   }else if(type==='cars'){p=bez(a,{x:330,y:510},{x:330,y:end.y},end,q);angle=Math.sin(u*Math.PI)*12;}
   else if(type==='stamp'){const above={x:end.x,y:end.y-115};if(u<.6)p=pt(a,above,ease(u/.6));else if(u<.82)p=pt(above,end,((u-.6)/.22)**2);else{p={...end};p.y-=Math.sin((u-.82)/.18*Math.PI)*5;}}
   else if(type==='laundry'){p=pt(a,end,q);angle=Math.sin(u*12+i)*7*(1-u);setA(lines[i],'d',`M${mix(a.x,end.x,q)-60} ${mix(a.y-80,end.y-80,q)}h120`);alpha(lines[i],1);}
   else if(type==='balloon'){p=bez(a,{x:a.x-80,y:a.y-150},{x:end.x+55,y:end.y-60},end,q);angle=Math.sin(u*8+i)*5*(1-u);}
   else if(type==='ferris'){p=bez(a,{x:a.x,y:510},{x:end.x,y:510},end,q);}
   else if(type==='drawer'){p=pt(a,end,q);}
   else if(type==='plates'){p=pt(a,end,q);angle=Math.sin(u*Math.PI)*9;}
   else if(type==='gift'||type==='lunch'){p=hop(a,end,u,type==='lunch'?85:50);}
   else {p=pt(a,end,q);if(type==='bubble')p.y-=Math.sin(q*Math.PI)*28;if(type==='umbrella')angle=Math.sin(u*8+i)*5*(1-u);}
   const ps=mix(1,endScale,q);set(i,p,angle,ps);if(compound&&(i===1||i===2)){const meet=ease(clamp((u-.78)/.22));size(i,mix(68,end.w/ps,meet),mix(68,end.h/ps,meet));alpha(shells[i],1-meet*.8);}else size(i,68,68);
  });}
  function reveal(t){parts.forEach((_,i)=>{set(i,goals[i],0,mix(endScale,1,t));size(i,compound&&(i===1||i===2)?goals[i].w/mix(endScale,1,t):mix(68,goals[i].w,t),compound&&(i===1||i===2)?goals[i].h/mix(endScale,1,t):mix(68,goals[i].h,t));alpha(shells[i],(compound&&(i===1||i===2) ? .2 : 1)*(1-t));if(type==='stamp')setA(shells[i],'transform',`translate(0 ${-150*t})`);else setA(shells[i],'transform',`scale(${mix(1,goals[i].w/100,t)} ${mix(1,goals[i].h/100,t)})`);if(type==='butterfly')setA(features[i],'transform','scale(1)');alpha(lines[i],1-t);});alpha(find('object-machine'),1-t*.9);if(type==='popsicle')alpha(find('object-foreground'),1-t);}
  show(0);return decorate({type,parts,markup,goals,slots,offset,compound,show,select,assemble,reveal});
 }
 base.create=create;base.plans=PLANS;base.sceneText=TEXT;base.planNames=word=>PLANS[word].map(t=>TEXT[t][0]);
})();
