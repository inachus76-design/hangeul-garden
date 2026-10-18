'use strict';
const CUSTOM_KEY='hangul-garden-custom-v1';
let customWords=[];
function validCustom(word){return /^[가-힣]+(?: [가-힣]+)*$/.test(word)&&[...word.replaceAll(' ','')].length<=8;}
function readCustom(){try{const data=JSON.parse(localStorage.getItem(CUSTOM_KEY)||'[]');return Array.isArray(data)?data.filter(x=>x&&typeof x.word==='string'&&validCustom(x.word)&&!WORDS.slice(0,10).includes(x.word)).slice(0,50):[];}catch{return [];}}
function persistCustom(next){try{localStorage.setItem(CUSTOM_KEY,JSON.stringify(next));return true;}catch{$('#custom-status').textContent='이 브라우저에 저장할 수 없어요. 저장 공간과 개인정보 설정을 확인해 주세요.';return false;}}
function installCustom(){for(const item of customWords){window.HangulRides.plans[item.word]=window.HangulRides.makePlan(item.word,item.material);if(!WORDS.includes(item.word))WORDS.push(item.word);}renderWords();renderCustomList();}
function renderCustomList(){$('#custom-list').innerHTML=customWords.map(x=>`<div class="custom-row"><strong>${x.word}</strong><button type="button" class="small-btn" data-remove-word="${x.word}" aria-label="${x.word} 삭제">삭제</button></div>`).join('')||'<p>아직 추가한 말이 없어요.</p>';}
function customDraft(){const word=$('#custom-word').value.normalize('NFC').trim().replace(/\s+/g,' '),material=$('#custom-material').value;if(!validCustom(word))throw Error('완성된 한글 1~8글자를 입력해 주세요. 띄어쓰기도 사용할 수 있어요.');return {word,material};}
function describeDraft(){try{const x=customDraft();$('#custom-plan').textContent=[...x.word].filter(c=>c!==' ').map((c,i)=>`${c}: ${window.HangulRides.sceneText[window.HangulRides.makePlan(x.word,x.material)[i]][0]}`).join(' · ');$('#custom-status').textContent='';}catch{$('#custom-plan').textContent='한글 1~8글자와 띄어쓰기를 입력해 주세요.';}}
$('#custom-material').innerHTML+=Object.entries(window.HangulRides.sceneText).filter(([id])=>!['icecream','carousel','slide'].includes(id)).map(([id,t])=>`<option value="${id}">${t[0]}</option>`).join('');
$('#add-word').onclick=()=>{$('#custom-status').textContent='';renderCustomList();$('#custom-dialog').showModal();$('#custom-word').focus();};
$('#custom-close').onclick=()=>$('#custom-dialog').close();
$('#custom-word').addEventListener('input',describeDraft);$('#custom-material').addEventListener('change',describeDraft);
$('#custom-preview').onclick=()=>{try{const x=customDraft();if(WORDS.slice(0,10).includes(x.word))throw Error('기본 단어에 있는 말이에요. 다른 말을 입력해 주세요.');window.HangulRides.plans[x.word]=window.HangulRides.makePlan(x.word,x.material);$('#custom-dialog').close();start(x.word);}catch(e){$('#custom-status').textContent=e.message;}};
$('#custom-form').onsubmit=e=>{e.preventDefault();try{const x=customDraft();if(WORDS.slice(0,10).includes(x.word))throw Error('이미 기본 목록에 있는 말이에요.');if(!customWords.some(v=>v.word===x.word)&&customWords.length>=50)throw Error('새 단어는 50개까지 저장할 수 있어요. 사용하지 않는 단어를 삭제해 주세요.');const next=[...customWords.filter(v=>v.word!==x.word),x];if(!persistCustom(next))return;customWords=next;installCustom();$('#custom-status').textContent=`‘${x.word}’을 저장했어요. 단어 목록에서 누르거나 말해 보세요.`;}catch(err){$('#custom-status').textContent=err.message;}};
$('#custom-list').addEventListener('click',e=>{const word=e.target.closest('[data-remove-word]')?.dataset.removeWord;if(!word)return;const next=customWords.filter(x=>x.word!==word);if(!persistCustom(next))return;customWords=next;const index=WORDS.indexOf(word);if(index>=10)WORDS.splice(index,1);delete window.HangulRides.plans[word];installCustom();$('#custom-status').textContent=`‘${word}’을 목록에서 지웠어요.`;});
customWords=readCustom();installCustom();
