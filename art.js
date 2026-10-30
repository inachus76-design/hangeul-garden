(function(){
 'use strict';let serial=0;
 const tint=(hex,amount)=>{const n=parseInt(hex.slice(1),16),a=[n>>16,(n>>8)&255,n&255];return '#'+a.map(v=>Math.round(amount>0?v+(255-v)*amount:v*(1+amount)).toString(16).padStart(2,'0')).join('');};
 const face=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="21" ry="14" fill="#fff9eb" fill-opacity=".9"/><circle cx="-7" cy="-2" r="2.3" fill="#655b63"/><circle cx="7" cy="-2" r="2.3" fill="#655b63"/><path d="M-4 4q4 5 8 0" stroke="#8f727b" stroke-width="2.3" fill="none" stroke-linecap="round"/><ellipse cx="-13" cy="4" rx="4" ry="2.5" fill="#efb1b8"/><ellipse cx="13" cy="4" rx="4" ry="2.5" fill="#efb1b8"/></g>`;
 function details(type){
  if(type==='flower')return face(0,146,1.2);
  if(type==='popsicle')return face(24,43,.82);
  if(['gift','blocks','cars','balloon','icecream'].includes(type))return face(45,38,.75);
  if(type==='drawer')return face(60,50,.65);
  if(type==='umbrella')return face(-57,4,.65);
  return '';
 }
 function bunny(x,y,s=1,c='#fff8e9',pose='wave'){
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="63" rx="49" ry="12" fill="#83997b" opacity=".12"/><path d="M-27-42q-25-83-2-87 21-1 27 84M9-47q-1-84 23-83 22 7 2 91" fill="${c}" stroke="#e4d4be" stroke-width="3"/><path d="M-20-57q-16-58-8-61M18-59q4-58 12-59" stroke="#f0c0c2" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cy="33" rx="36" ry="40" fill="${c}" stroke="#e4d4be" stroke-width="3"/><ellipse cy="-17" rx="48" ry="45" fill="${c}" stroke="#e4d4be" stroke-width="3"/><circle cx="-16" cy="-23" r="4.7" fill="#605f65"/><circle cx="16" cy="-23" r="4.7" fill="#605f65"/><circle cx="-17" cy="-25" r="1.5" fill="white"/><circle cx="15" cy="-25" r="1.5" fill="white"/><path d="M-4-8q4-5 8 0l-4 4z" fill="#c28e9b"/><path d="M-9 1q9 12 18 0" stroke="#b28992" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="-31" cy="-8" rx="9" ry="5" fill="#eeb8bc"/><ellipse cx="31" cy="-8" rx="9" ry="5" fill="#eeb8bc"/><path d="M-30 28q-29-14-31 2M30 27q29-${pose==='hug'?'7':'45'} 35-${pose==='hug'?'1':'23'}" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round"/><ellipse cx="-22" cy="65" rx="18" ry="10" fill="${c}"/><ellipse cx="22" cy="65" rx="18" ry="10" fill="${c}"/><path d="M-24 27q24 19 48 0v23q-24 15-48 0z" fill="#c5d6b5"/></g>`;
 }
 function enhance(markup){
  const p='toy'+serial++,matches=[...new Set([...markup.matchAll(/\bfill="(#[0-9a-f]{6})"/gi)].map(m=>m[1]))];
  const gradients=matches.map((c,i)=>`<linearGradient id="${p}-p${i}" x1="0" y1="0" x2=".65" y2="1"><stop stop-color="${tint(c,.36)}"/><stop offset=".44" stop-color="${c}"/><stop offset="1" stop-color="${tint(c,-.12)}"/></linearGradient>`).join('');
  matches.forEach((c,i)=>{if(!['#ffffff','#fffdf4','#fffdf5','#fff8e9','#fff9e8','#fff9e7'].includes(c.toLowerCase()))markup=markup.replaceAll(`fill="${c}"`,`fill="url(#${p}-p${i})"`);});
  markup=markup.replaceAll(/(<g id="(?:object|ride)-shell-\d+")/g,`$1 filter="url(#${p}-soft)"`);
  const defs=`<defs>${gradients}<filter id="${p}-soft" x="-35%" y="-30%" width="180%" height="185%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#6e6170" flood-opacity=".16"/></filter></defs>`;
  return markup.replace('<svg ','<svg stroke-linecap="round" stroke-linejoin="round" ').replace('>','>'+defs);
 }
 function backdrop(type){
  const sprites=window.HangulSprites;if(!sprites)return '';
  const water=['duck','tube','fish','shell'].includes(type),inside=['drawer','curtain','stamp','lunch','laundry'].includes(type),fair=['carousel','ferris','balloon','plates','bubble'].includes(type),rail=['train','cars'].includes(type);
  const id=water?'duck-pond':inside?'warm-house':fair?'festival':rail?'train-station':'flower-garden';
  const corner=water?'seashell':inside?'flower':fair?'balloons':rail?'flower':'apple-tree';
  return `<g class="picture-backdrop" aria-hidden="true" pointer-events="none"><image href="${sprites[id]}" x="20" y="0" width="960" height="565" preserveAspectRatio="xMidYMid meet" opacity=".24"/><image href="${sprites[id]}" x="135" y="400" width="730" height="210" preserveAspectRatio="xMidYMax meet" opacity=".8"/><image href="${sprites[corner]}" x="-25" y="355" width="205" height="245" preserveAspectRatio="xMidYMax meet" opacity=".85"/><image href="${sprites[water?'flower':fair?'flower':inside?'gift-box':'butterfly']}" x="845" y="405" width="175" height="195" preserveAspectRatio="xMidYMax meet" opacity=".85"/></g>`;
 }
 window.HangulArt={tint,face,details,bunny,enhance,backdrop};
})();
