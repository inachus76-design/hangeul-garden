(function(){
 'use strict';
 let mode='watch',stars=0,cancelPick=null,rewardTimer=null;
 const el=id=>document.querySelector('#'+id);
 function reward(message,big=false){clearTimeout(rewardTimer);const layer=el('reward-layer');layer.innerHTML=`<div class="reward-toast ${big?'big':''}">${message}</div><div class="reward-sparks" aria-hidden="true">${Array.from({length:big?22:9},(_,i)=>`<span style="--x:${(i*43)%100}%;--delay:${i%5*.05}s;--spin:${i%2?150:-150}deg">${['⭐','✦','🌸','✨'][i%4]}</span>`).join('')}</div>`;rewardTimer=setTimeout(()=>{layer.innerHTML='';},big?2700:1400);}
 function pickMode(next){mode=next;el('mode-make').setAttribute('aria-pressed',String(mode==='make'));el('mode-watch').setAttribute('aria-pressed',String(mode==='watch'));el('word-menu').hidden=false;el('mode-note').textContent=mode==='make'?'👆 이제 만들고 싶은 말을 골라 주세요. 글자 친구를 직접 찾을 거예요!':'🌼 살펴보고 싶은 말을 골라 주세요. 편하게 감상해요.';}
 function reset(){cancelPick?.();cancelPick=null;clearTimeout(rewardTimer);el('reward-layer').innerHTML='';el('pick-progress').innerHTML='';el('game-hud').hidden=true;}
 function begin(){stars=0;el('game-hud').hidden=mode!=='make';el('game-stars').textContent='⭐ 0';}
 async function choose({ride,host,char,active}){
  const canvas=host.querySelector('svg');canvas?.setAttribute('role','group');
  const props=[...host.querySelectorAll('[data-jamo]')],chosen=new Set(),needed=ride.parts.length;
  el('pick-progress').innerHTML=`<span>‘${char}’ 친구 찾기</span> ${ride.parts.map(()=>'<span class="pick-slot">?</span>').join('')}`;
  return new Promise(resolve=>{
   let finished=false;
   const handlers=[];
   function clean(){canvas?.setAttribute('role','img');handlers.forEach(([node,click,key])=>{node.removeEventListener('click',click);node.removeEventListener('keydown',key);node.removeAttribute('tabindex');node.removeAttribute('aria-pressed');node.setAttribute('role','img');node.classList.remove('pickable','picked','try-again');node.querySelector('.pick-hit')?.remove();});}
   function end(ok){if(finished)return;finished=true;clean();cancelPick=null;resolve(ok);}
   cancelPick=()=>end(false);
   props.forEach((node,index)=>{
    node.insertAdjacentHTML('beforeend',ride.type==='drawer'?'<rect class="pick-hit" x="-75" y="-85" width="150" height="125" rx="16" fill="transparent"/>':'<rect class="pick-hit" x="-110" y="-165" width="220" height="225" rx="20" fill="transparent"/>');node.classList.add('pickable');node.setAttribute('role','button');node.setAttribute('tabindex','0');node.setAttribute('aria-pressed','false');node.setAttribute('aria-label',`${node.dataset.jamo} 친구 선택`);
    const click=()=>{
     if(finished||!active()||chosen.has(index))return;
     if(index>=needed){node.classList.remove('try-again');void node.getBoundingClientRect();node.classList.add('try-again');el('explanation').textContent='다른 친구를 찾아볼까요? 괜찮아요, 다시 톡!';return;}
     chosen.add(index);node.classList.add('picked','jamo-only');node.setAttribute('aria-label',`${node.dataset.jamo} 선택 완료`);host.querySelectorAll(`#ride-tool-${index},#ride-rope-${index},#object-line-${index}`).forEach(part=>part.classList.add('selected-prop-tool')); node.setAttribute('aria-pressed','true');stars++;el('game-stars').textContent=`⭐ ${stars}`;
     const slots=el('pick-progress').querySelectorAll('.pick-slot');slots[chosen.size-1].textContent=node.dataset.jamo;slots[chosen.size-1].classList.add('found');
     chime();reward(['찾았다! ✨','멋진 발견! ⭐','잘했어요! 🌸'][(chosen.size-1)%3]);
     el('explanation').textContent=`${needed}명 중 ${chosen.size}명을 찾았어요!`;
     if(chosen.size===needed){el('instruction').textContent='모두 찾았어요! 이제 글자를 만들어요 ✨';end(true);}
    };
    const key=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();click();}};
    node.addEventListener('click',click);node.addEventListener('keydown',key);handlers.push([node,click,key]);
   });
  });
 }
 el('mode-make').onclick=()=>pickMode('make');el('mode-watch').onclick=()=>pickMode('watch');
 window.GardenPlay={get mode(){return mode;},reset,begin,choose,letter(char){el('pick-progress').innerHTML='';if(mode==='make')reward(`${char} 완성! 🌟`,true);},finish(word){if(mode==='make')reward(`🎉 ${word} 완성! 별 ${stars}개를 찾았어요`,true);}};
})();
