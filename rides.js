/* Objects carry the letters through the entire ride, until the objects dissolve. */
(function(){
 'use strict';
 const palette=['#efd38e','#d69eaa','#aabed5','#b1c8a1','#c4aed4','#e7b598'];
 const clamp=x=>Math.max(0,Math.min(1,x));
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 const lerp=(a,b,t)=>a+(b-a)*t;
 const point=(a,b,t)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)});
 const cubic=(a,b,c,d,t)=>({x:(1-t)**3*a.x+3*(1-t)**2*t*b.x+3*(1-t)*t*t*c.x+t**3*d.x,y:(1-t)**3*a.y+3*(1-t)**2*t*b.y+3*(1-t)*t*t*c.y+t**3*d.y});
 function kind(d){return ['ㅗ','ㅜ','ㅡ','ㅛ','ㅠ'].includes(d.vowel)?'icecream':['ㅘ','ㅝ','ㅙ','ㅚ','ㅞ','ㅟ','ㅢ'].includes(d.vowel)?'slide':'carousel';}
 function block(d,type){
  const f=!!d.final,mixed=type==='slide',horizontal=type==='icecream';let s;
  if(horizontal)s=f?[{x:0,y:-60,w:142,h:70},{x:0,y:-10,w:170,h:50},{x:0,y:43,w:150,h:60}]:[{x:0,y:-45,w:145,h:106},{x:0,y:30,w:178,h:86}];
  else if(mixed)s=f?[{x:-44,y:-72,w:88,h:66},{x:0,y:-18,w:194,h:150},{x:0,y:92,w:155,h:60}]:[{x:-44,y:-59,w:88,h:86},{x:0,y:15,w:194,h:200}];
  else s=f?[{x:-57,y:-32,w:98,h:141},{x:61,y:-32,w:68,h:151},{x:0,y:93,w:155,h:63}]:[{x:-57,y:0,w:102,h:188},{x:61,y:0,w:70,h:198}];
  const cy=type==='slide'?392:horizontal?(f?320:340):310;return s.map(v=>({...v,x:v.x+500,y:v.y+cy}));
 }
 function splitVowel(d,goals){
  const g=goals[1];let pieces,sub;
  if(d.vowel==='ㅝ'){pieces=['ㅜ','ㅓ'];sub=[{...g,x:g.x-.18*g.w,y:g.y-.03849*g.h,w:g.w*.6,h:g.h*50/53},{...g,x:g.x+.219474*g.w,w:g.w*24/38}];}
  else if(d.vowel==='ㅘ'){pieces=['ㅗ','ㅏ'];sub=[{...g,x:g.x-.17*g.w,y:g.y+.115918*g.h,w:g.w*46/80,h:g.h*34/49},{...g,x:g.x+.218919*g.w,w:g.w*24/37}];}
  if(!pieces)return {parts:[d.initial,d.vowel,...(d.final?[d.final]:[])],goals,compound:null};
  return {parts:[d.initial,...pieces,...(d.final?[d.final]:[])],goals:[goals[0],...sub,...goals.slice(2)],compound:{vowel:d.vowel,pieces}};
 }
 function partTime(t,i,count,compound){if(!compound)return clamp(t*(count+.65)-i*.79);if(i===1)return clamp(t/.28);if(i===2)return clamp((t-.19)/.28);if(i===0)return clamp((t-.67)/.28);return clamp((t-.82)/.18);}
 function glyph(markup){return markup.replace('<svg ','<svg x="-50" y="-50" width="100" height="100" ');}
 function backdrop(type){if(window.HangulSprites)return `<rect width="1000" height="600" fill="${type==='slide'?'#e6eff0':'#f3eddb'}"/><path d="M0 520q250-55 500 0t500 0v80H0" fill="#c4d5b4"/>${window.HangulArt.backdrop(type)}`;return `<rect width="1000" height="600" fill="${type==='icecream'?'#f3eddb':type==='carousel'?'#eae9f1':'#e6eff0'}"/><circle cx="855" cy="80" r="36" fill="#f5dd9d"/><g fill="#fffdf5"><path d="M65 100q-7-29 19-30 16-30 42-10 31-4 33 27H65z"/><path d="M745 126q-5-25 19-25 17-30 40-7 29-3 30 24H745z"/></g><path d="M0 520q230-65 480 1t520-4v83H0" fill="#c4d5b4"/><path d="M0 567q250-47 510-7t490-3v43H0" fill="#b5cba2"/><g stroke="#8daa79" stroke-width="5"><path d="M90 600v-65M918 600v-53"/></g><g fill="#e6c2d0"><circle cx="75" cy="530" r="15"/><circle cx="102" cy="530" r="15"/><circle cx="88" cy="514" r="15"/><circle cx="904" cy="545" r="13"/><circle cx="930" cy="545" r="13"/><circle cx="917" cy="531" r="13"/></g><g fill="#f4dda2"><circle cx="89" cy="530" r="10"/><circle cx="917" cy="546" r="9"/></g>${window.HangulArt.backdrop(type)}`;}
 function iceSet(){return `<g id="ride-machine"><path d="M415 430h170L500 580z" fill="#d9ac70" stroke="#c9975d" stroke-width="4"/><path d="M430 441l94 106M454 435l88 95M480 435l76 78M570 441l-94 106M546 435l-88 95M520 435l-76 78" stroke="#f3d39d" stroke-width="6"/><path d="M415 430h170" stroke="#eac68e" stroke-width="12" stroke-linecap="round"/><path d="M40 460h205v45H40zM755 460h205v45H755z" fill="#dfcdb0"/><path d="M50 449h185v15H50zM765 449h185v15H765z" fill="#faf2e0"/></g>`;}
 function carouselSet(){return `<g id="ride-machine"><ellipse cx="500" cy="539" rx="260" ry="31" fill="#becfaf"/><path d="M464 190h72v319h-72z" fill="#c4b3d2"/><path d="M465 240l70-33M465 305l70-33M465 370l70-33M465 435l70-33M465 500l70-33" stroke="#a9c7b2" stroke-width="22"/><path d="M500 54V16l46 17-46 14" fill="#b8bd8d" stroke="#b8bd8d" stroke-width="4"/><path d="M500 54L214 187h572z" fill="#d9aab9"/><path d="M500 60L300 187M500 60l-106 127M500 60l106 127M500 60l200 127" stroke="#fff1d9" stroke-width="12"/><path d="M220 187q55 52 112 0 55 52 112 0 55 52 112 0 55 52 112 0 55 52 112 0" fill="none" stroke="#dfbf7d" stroke-width="18" stroke-linecap="round"/><g fill="#f8e7ab">${[240,325,410,500,590,675,760].map(x=>`<circle cx="${x}" cy="182" r="6"/>`).join('')}</g><path d="M379 516h242l22 27H357z" fill="#d0c0da"/></g>`;}
 function slideSet(){return `<g id="ride-machine"><path d="M590 200V55h150v145M510 210V118h80v92M741 210V118h80v92" fill="#d5b9cb"/><path d="M565 55l100-52 101 52M492 118l58-47 58 47M722 118l60-47 60 47" fill="#a7c4ba"/><path d="M665 3v-25l39 13-39 10" stroke="#dfb27c" stroke-width="5" fill="#dfb27c"/><path d="M635 148v-29a30 30 0 0 1 60 0v29" fill="#ab8eaf"/><path d="M668 143C880 202 298 210 543 283S756 395 500 435" fill="none" stroke="#c7c7bf" stroke-width="116" stroke-linecap="round"/><path d="M668 143C880 202 298 210 543 283S756 395 500 435" fill="none" stroke="#fffbef" stroke-width="101" stroke-linecap="round"/><path d="M668 143C880 202 298 210 543 283S756 395 500 435" fill="none" stroke="#e4e2d6" stroke-width="3"/><path d="M668 143C880 202 298 210 543 283S756 395 500 435" fill="none" stroke="#e4e2d6" stroke-width="3" transform="translate(0 27)"/><path d="M440 480h140l15 22H425z" fill="#a8c5bd"/></g>`;}
 function plainCarrier(type,color){
  if(type==='icecream')return `<g data-carrier="icecream"><path d="M-74 35C-91 20-83-9-61-13-61-54 1-69 23-42 50-53 80-23 74 4 98 17 81 44 56 37 35 55 19 35 0 43-20 36-45 53-60 35z" fill="${color}" stroke="#fff8e7" stroke-width="3"/><path d="M-47-14l9 4M33-23l9 4M-10 24l11-2M57 12l8-5" stroke="#fff8e7" stroke-width="4" stroke-linecap="round"/></g>`;
  if(type==='carousel')return `<g data-carrier="swing"><path d="M-69-51Q0-68 69-51L66 42Q0 61-66 42z" fill="${color}" stroke="#fff9ed" stroke-width="4"/><path d="M-75 40h150v15H-75z" fill="#a28caa"/><path d="M-62-49v-16M62-49v-16" stroke="#858494" stroke-width="5" stroke-linecap="round"/></g>`;
  return `<g data-carrier="slide-rider"><ellipse cy="35" rx="79" ry="20" fill="#9fbdb8"/><path d="M-62-38q61-37 124 0v65q-62 31-124 0z" fill="${color}" stroke="#fff8e8" stroke-width="4"/><path d="M-80 33q4 28 40 28H49q25-2 32-25" stroke="#83aaa4" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
 }
 function carrier(type,color){const id={icecream:'ice-cream',carousel:'swing',slide:'slide'}[type];return window.HangulSprites?.[id]?window.HangulSprites.carrier(id):plainCarrier(type,color)+window.HangulArt.details(type);}
 function scoopTool(i){return `<g id="ride-tool-${i}" data-object="icecream-scoop"><path d="M29-44L132-92" stroke="#8eabb2" stroke-width="18" stroke-linecap="round"/><path d="M-86-35q-6 67 77 67 86-2 89-64" fill="#c4d6d8" stroke="#8eabb2" stroke-width="5"/><path d="M-64-23q62 17 124-2" stroke="#eef3ed" stroke-width="5" fill="none"/></g>`;}
 function create({host,d,jamoSVG,slots=[0,1,2,3,4,5],offset={x:0,y:0}}){
  const type=kind(d),split=splitVowel(d,block(d,type).map(g=>({...g,x:g.x+offset.x,y:g.y+offset.y}))),{parts,goals,compound}=split,extra=['ㄴ','ㅅ','ㅓ','ㅋ','ㅣ','ㅈ'].filter(x=>!parts.includes(x));const letters=[...parts,...extra.slice(0,6-parts.length)];
  const rawMarkup=`<svg class="ride-canvas" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${type==='icecream'?'아이스크림이 스쿱에서 떨어져 쌓이는':type==='carousel'?'자모를 단 회전그네가 도는':'자모를 태운 썰매가 미끄럼틀을 내려오는'} ${d.char} 만들기">${backdrop(type)}${type==='icecream'?iceSet():type==='carousel'?carouselSet():slideSet()}<g id="ride-lines">${type==='carousel'?letters.map((_,i)=>`<path id="ride-rope-${i}" fill="none" stroke="#8e9198" stroke-width="3"/>`).join(''):''}</g>${type==='icecream'?letters.map((_,i)=>scoopTool(i)).join(''):''}<g id="ride-props">${letters.map((j,i)=>`<g id="ride-prop-${i}" data-jamo="${j}" data-selected="${i<parts.length}" data-object="${type}" role="img" aria-label="${j}가 적힌 ${type==='icecream'?'아이스크림':type==='carousel'?'회전그네':'미끄럼틀 썰매'}"><g id="ride-shell-${i}">${carrier(type,palette[slots[i]])}</g><g id="ride-glyph-${i}" style="color:${parts.includes(j)&&['ㅏ','ㅐ','ㅑ','ㅓ','ㅕ','ㅗ','ㅜ','ㅡ','ㅣ','ㅘ','ㅝ'].includes(j)?'#b15b7c':'#596b9c'}">${glyph(jamoSVG(j))}</g></g>`).join('')}</g><g id="ride-cherry" opacity="0"><path d="M503 156q-8-23 12-32" stroke="#85a578" stroke-width="5" fill="none"/><circle cx="500" cy="162" r="12" fill="#bc7d8b"/></g></svg>`;
  const markup=window.HangulArt.enhance(rawMarkup);
  host.innerHTML=markup;
  const find=id=>host.querySelector('#'+id),props=letters.map((_,i)=>find('ride-prop-'+i)),shells=letters.map((_,i)=>find('ride-shell-'+i)),glyphs=letters.map((_,i)=>find('ride-glyph-'+i)),tools=type==='icecream'?letters.map((_,i)=>find('ride-tool-'+i)):[],ropes=type==='carousel'?letters.map((_,i)=>find('ride-rope-'+i)):[];
  const attr=(el,key,value)=>el?.setAttribute(key,String(value));
  const set=(i,p,angle=0,depth=1)=>{attr(props[i],'transform',`translate(${p.x} ${p.y}) rotate(${angle}) scale(${depth})`);};
  const alpha=(el,a)=>attr(el,'opacity',clamp(a));
  const size=(i,w,h)=>attr(glyphs[i],'transform',`scale(${w/100} ${h/100})`);
  const icePositions=[{x:720,y:125},{x:310,y:125},{x:510,y:112},{x:125,y:325},{x:875,y:325},{x:140,y:165}];
  const slidePositions=[{x:610,y:100},{x:718,y:109},{x:814,y:152},{x:282,y:126},{x:168,y:230},{x:856,y:310}];
  const orbit=(i,t)=>{const a=slots[i]/letters.length*Math.PI*2+t*Math.PI*2;return {x:500+Math.cos(a)*327,y:342+Math.sin(a)*75,z:.85+Math.sin(a)*.12,a};};
  let parked=letters.map((_,i)=>type==='icecream'?icePositions[slots[i]]:type==='slide'?slidePositions[slots[i]]:orbit(i,.1));
  function rope(i,p,opacity=1){const anchorX=500+(p.x-500)*.55,anchorY=181+(p.y-342)*.13;attr(ropes[i],'d',`M${anchorX-12} ${anchorY}L${p.x-55} ${p.y-53}M${anchorX+12} ${anchorY}L${p.x+55} ${p.y-53}`);alpha(ropes[i],opacity);}
  function show(t){letters.forEach((_,i)=>{let p=parked[i],angle=0,z=1;if(type==='carousel'){p=orbit(i,t*1.7);angle=-Math.cos(p.a)*9;z=p.z;rope(i,p);}if(type==='icecream'){p={x:p.x,y:p.y+Math.sin(t*7+i)*4};attr(tools[i],'transform',`translate(${p.x} ${p.y+36}) rotate(${-8+Math.sin(t*4+i)*3})`);}set(i,p,angle,z);size(i,76,76);parked[i]=type==='carousel'?p:parked[i];});}
  const frozen=()=>parked.map(p=>({...p}));let startPoints;
  function select(t){if(!startPoints)startPoints=frozen();letters.forEach((_,i)=>{const chosen=i<parts.length;const from=startPoints[i];if(type==='carousel'){const final=chosen?{x:500+(i-(parts.length-1)/2)*176,y:358}: {x:from.x+(from.x<500?-90:90),y:from.y+50};const p=point(from,final,ease(t));set(i,p,0,1);rope(i,p,chosen?1:1-t);parked[i]=p;}alpha(props[i],chosen?1:1-t);if(type==='icecream')alpha(tools[i],chosen?1:1-t);});}
  function assemble(t){
   const order=type==='icecream'?[1,0,...(d.final?[2]:[])]:parts.map((_,i)=>i);
   parts.forEach((_,i)=>{
    const rank=order.indexOf(i),local=compound?partTime(t,i,parts.length,compound):clamp(t*(parts.length+.55)-rank*.82),q=ease(local),start=parked[i],end=goals[i];let p,angle=0;
    if(type==='icecream'){
     const above={x:end.x,y:Math.min(start.y,105)};
     if(local<.35){p=point(start,above,ease(local/.35));attr(tools[i],'transform',`translate(${p.x} ${p.y+36}) rotate(${lerp(-8,-30,local/.35)})`);}
     else {const drop=clamp((local-.35)/.65);const fall=drop<.8?(drop/.8)**2:1+Math.sin((drop-.8)/.2*Math.PI)*.04;p=point(above,end,fall);attr(tools[i],'transform',`translate(${above.x+drop*170} ${above.y+36-drop*100}) rotate(${-30-drop*42})`);alpha(tools[i],1-clamp(drop*2));}
    }else if(type==='carousel'){
     p=point(start,end,q);rope(i,p,1-clamp(local*1.5));
    }else{
     const a={x:668,y:143},b={x:543,y:283},c={x:500,y:435};
     if(local<.14)p=point(start,a,ease(local/.14));
     else if(local<.52){const u=(local-.14)/.38;p=cubic(a,{x:880,y:202},{x:298,y:210},b,u);angle=Math.sin(u*Math.PI)*12;}
     else if(local<.9){const u=(local-.52)/.38;p=cubic(b,{x:788,y:356},{x:756,y:395},c,u);angle=-Math.sin(u*Math.PI)*14;}
     else p=point(c,end,ease((local-.9)/.1));
    }
    set(i,p,angle);if(compound&&(i===1||i===2)){const meet=ease(clamp((local-.78)/.22));size(i,lerp(76,end.w,meet),lerp(76,end.h,meet));alpha(shells[i],1-meet*.8);}else size(i,76,76);
   });
  }
  function reveal(t){parts.forEach((_,i)=>{set(i,goals[i]);size(i,compound&&(i===1||i===2)?goals[i].w:lerp(76,goals[i].w,t),compound&&(i===1||i===2)?goals[i].h:lerp(76,goals[i].h,t));attr(shells[i],'transform',`scale(${lerp(1,goals[i].w/100,t)} ${lerp(1,goals[i].h/100,t)})`);alpha(shells[i],(compound&&(i===1||i===2)?.2:1)*(1-t));});alpha(find('ride-machine'),1-t*.85);ropes.forEach(el=>alpha(el,0));tools.forEach(el=>alpha(el,0));}
  if(type==='icecream')attr(find('ride-machine'),'transform',`translate(${offset.x} ${offset.y})`);
  show(0);
  return {type,parts,markup,goals,slots,offset,compound,show,select,assemble,reveal};
 }
 window.HangulRides={create,kind,block,splitVowel,partTime};
})();
