/* === QUIZ LINFAFLOW — rewritten for Atomicat compatibility === */
var QUESTIONS=[{q:"Where is your swelling?",opts:["Feet","Feet and ankles","Feet, ankles and legs"]},{q:"When is your swelling worst?",opts:["End of the day","After standing or sitting","All day, never lets up"]},{q:"Which symptoms do you have?",multi:!0,opts:["Sock marks","Heavy legs","Tight legs","Aching"]},{q:"How long have you had it?",opts:["Under 6 months","6 months to 2 years","2 to 5 years","Over 5 years"]},{q:"What have you tried for it?",opts:["Compression socks","Water pills","Legs up","Nothing yet"]},{q:"How old are you?",opts:["Under 45","45 to 54","55 to 64","65+"]}];
var PACKS=[{name:"1 Bottle",badge:"40% OFF",free:!1,ship:"+ $9.95 Shipping",per:"$59",suffix:"",was:"$99",now:"$59",href:"https://cc.linfaflow.com/dtcnew/checkout.php?hid=b2lkPW9mZl8wMDQyMzQ2JmFpZD1hZmYwODA5NjE5JnVpZD1ibF82NjY4MTEx&affid=aff0809619&tid=[cmc_vid]",img:"https://raw.githubusercontent.com/brunodallas/cdn-assets/main/linfaflow/Mockup_KIT_DEV-1-e1779897369120.webp"},{name:"2 Bottles",badge:"60% OFF",free:!0,per:"$39",suffix:"each",was:"$198",now:"$79",href:"https://cc.linfaflow.com/dtcnew/checkout.php?hid=b2lkPW9mZl8wMDQyMzQ2JmFpZD1hZmYwODA5NjE5JnVpZD1ibF82NjY4MTEx&affid=aff0809619&tid=[cmc_vid]",img:"https://raw.githubusercontent.com/brunodallas/cdn-assets/main/linfaflow/Mockup_KIT_DEV-2-e1779897415278.webp"},{name:"3 Bottles",badge:"70% OFF",free:!0,per:"$29",suffix:"each",was:"$297",now:"$89",href:"https://cc.linfaflow.com/dtcnew/checkout.php?hid=b2lkPW9mZl8wMDQyMzQ2JmFpZD1hZmYwODA5NjE5JnVpZD1ibF82NjY4MTEx&affid=aff0809619&tid=[cmc_vid]",img:"https://raw.githubusercontent.com/brunodallas/cdn-assets/main/linfaflow/Mockup_KIT_DEV-3-e1779897447834.webp"}];
var DEFAULT_PACK=2,DELIVERY_DAYS=3;
var _qAnswers=[],_qStep=0,_qSelPack=DEFAULT_PACK;
var N=QUESTIONS.length;
var _qLastMouse={x:-1,y:-1};

/* Lazy DOM getters — nunca cacheia, busca sempre que precisa */
function _qEl(id){return document.getElementById(id)}
function _qOverlay(){return _qEl('quizOverlay')}
function _qBody(){return _qEl('qBody')}
function _qBar(){return _qEl('qBar')}
function _qTop(){var o=_qOverlay();return o?o.querySelector('.q-top'):null}

function _qSetBar(){var b=_qBar();if(!b)return;var pct=(_qStep<N)?Math.round(((_qStep+0.5)/N)*100):100;b.style.width=pct+'%'}

var _qNoHoverClear=null;
function _qArmNoHover(){var ov=_qOverlay();if(!ov)return;ov.classList.add('nohover');if(_qNoHoverClear)document.removeEventListener('mousemove',_qNoHoverClear);var ax=_qLastMouse.x,ay=_qLastMouse.y;_qNoHoverClear=function(e){if(ax<0||Math.abs(e.clientX-ax)>2||Math.abs(e.clientY-ay)>2){ov.classList.remove('nohover');document.removeEventListener('mousemove',_qNoHoverClear);_qNoHoverClear=null}};document.addEventListener('mousemove',_qNoHoverClear)}

function openQuiz(e){if(e)e.preventDefault();var ov=_qOverlay();if(!ov)return;_qAnswers=[];_qStep=0;_qSelPack=DEFAULT_PACK;ov.classList.add('open');document.body.style.overflow='hidden';_qRender();try{if(window.fbq)fbq('trackCustom','QuizStart');}catch(_){}}
window.openQuiz=openQuiz;

function closeQuiz(){var ov=_qOverlay();if(!ov)return;ov.classList.remove('open');document.body.style.overflow=''}
window.closeQuiz=closeQuiz;

function _qChoose(i){_qAnswers[_qStep]=i;_qStep++;(_qStep<N)?_qRender():_qRenderLoader()}
function _qBack(){if(_qStep>0){_qStep--;_qRender()}}
function _qToggleMulti(i,btn){var arr=_qAnswers[_qStep]||(_qAnswers[_qStep]=[]);var idx=arr.indexOf(i);if(idx>-1){arr.splice(idx,1);btn.classList.remove('sel')}else{arr.push(i);btn.classList.add('sel')}}
function _qAdvanceMulti(){if(!_qAnswers[_qStep])_qAnswers[_qStep]=[];_qStep++;(_qStep<N)?_qRender():_qRenderLoader()}

function _qRender(){_qSetBar();var top=_qTop();if(top)top.style.display='';var bd=_qBody();if(!bd)return;var Q=QUESTIONS[_qStep],html='<div class="q-step">';if(_qStep===0){html+='<p class="q-brand">See if you qualify for 70% off</p>'}else{html+='<p class="q-kicker">Question '+(_qStep+1)+' of '+N+'</p>'}
html+='<h2 class="q-question">'+Q.q+'</h2>';if(Q.multi)html+='<p class="q-hint">Select all that apply</p>';html+='<div class="q-opts">';var msel=Q.multi?(_qAnswers[_qStep]||[]):null;var isLast=(_qStep===N-1);Q.opts.forEach(function(o,i){var on=Q.multi&&msel.indexOf(i)>-1;html+='<button'+(isLast?' id="ViewContent"':'')+' class="q-opt'+(Q.multi?' q-check':'')+(on?' sel':'')+'" data-i="'+i+'">'+o+'</button>'});html+='</div>';if(Q.multi)html+='<button class="q-continue" id="qCont">Continue<span class="arw" aria-hidden="true">&rarr;</span></button>';if(_qStep>0)html+='<button class="q-back" id="qBack">&larr; Back</button>';html+='</div>';bd.innerHTML=html;
if(Q.multi){bd.querySelectorAll('.q-opt').forEach(function(b){b.addEventListener('click',function(){_qToggleMulti(+b.getAttribute('data-i'),b)})});var cont=_qEl('qCont');if(cont)cont.addEventListener('click',_qAdvanceMulti)}else{bd.querySelectorAll('.q-opt').forEach(function(b){b.addEventListener('click',function(){_qChoose(+b.getAttribute('data-i'))})})}
var bk=_qEl('qBack');if(bk)bk.addEventListener('click',_qBack);_qArmNoHover()}

function _qRenderLoader(){_qStep=N;_qSetBar();var bd=_qBody();if(!bd)return;bd.innerHTML='<div class="q-load"><div class="q-spinner"></div><p>Calculating your results&hellip;</p><small>Checking whether Linfaflow is a match for you</small></div>';var wait=window.matchMedia('(prefers-reduced-motion: reduce)').matches?300:2200;setTimeout(_qRenderResult,wait)}

var QUALIFY={product:'Linfaflow',pack:0,offerPrice:'$19.99',discount:'70% OFF',timerMinutes:10,stockStart:9,stockFloor:3,stockTotal:40,stockTickSeconds:37,ctaText:'GET MY 70% DISCOUNT NOW'};
var _qqTimerInt=null,_qqStockInt=null,_qqStock=0;
function _qqPad(n){return(n<10?'0':'')+n}
function _qqDeliveryDate(){var d=new Date();d.setDate(d.getDate()+DELIVERY_DAYS);return d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
function _qqStockPct(){var pct=Math.round((1-(_qqStock/QUALIFY.stockTotal))*100);return Math.max(0,Math.min(99,pct))}
function _qqPaintStock(){var el=_qEl('qqStock'),bar=_qEl('qqBar2'),pc=_qEl('qqPct');if(!el){if(_qqStockInt){clearInterval(_qqStockInt);_qqStockInt=null}return}el.textContent=_qqStock;if(bar)bar.style.width=_qqStockPct()+'%';if(pc)pc.textContent=_qqStockPct()+'%'}
function _qqStartStock(){if(_qqStockInt)clearInterval(_qqStockInt);_qqStock=QUALIFY.stockStart;_qqPaintStock();_qqStockInt=setInterval(function(){if(!_qEl('qqStock')){clearInterval(_qqStockInt);_qqStockInt=null;return}if(_qqStock>QUALIFY.stockFloor){_qqStock--;_qqPaintStock()}},QUALIFY.stockTickSeconds*1000)}
function _qqStartTimer(){if(_qqTimerInt)clearInterval(_qqTimerInt);var left=QUALIFY.timerMinutes*60;function paint(){var el=_qEl('qqClock');if(!el){clearInterval(_qqTimerInt);_qqTimerInt=null;return}el.textContent=_qqPad(Math.floor(left/60))+':'+_qqPad(left%60);if(left<=0){clearInterval(_qqTimerInt);_qqTimerInt=null;var box=_qEl('qqTimer');if(box)box.classList.add('out');var lbl=_qEl('qqTimerLbl');if(lbl)lbl.textContent='Your discount is expiring';var ft=_qEl('qqTimerFoot');if(ft)ft.textContent='Check out now before it is released to the next person in line.';return}left--}paint();_qqTimerInt=setInterval(paint,1000)}

function _qRenderResult(){_qStep=N+1;_qSetBar();var top=_qTop();if(top)top.style.display='none';
try{if(window.fbq)fbq('track','Lead');}catch(_){}
if(_qqTimerInt){clearInterval(_qqTimerInt);_qqTimerInt=null}
if(_qqStockInt){clearInterval(_qqStockInt);_qqStockInt=null}
_qSelPack=QUALIFY.pack;var p=PACKS[_qSelPack];var bd=_qBody();if(!bd)return;
var html='<div class="q-step qq">';
html+='<div class="qq-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>You qualify</div>';
html+='<h2 class="qq-h">You qualify for <span>'+QUALIFY.product+'</span></h2>';
html+='<p class="qq-sub">Based on your answers, you are a match for the <b>'+p.name+'</b> protocol at <b>'+QUALIFY.discount+'</b>.</p>';
html+='<div class="qq-timer" id="qqTimer"><span class="qq-timer-lbl" id="qqTimerLbl">Your '+QUALIFY.discount+' is reserved for</span><span class="qq-clock" id="qqClock">'+_qqPad(QUALIFY.timerMinutes)+':00</span><span class="qq-timer-foot" id="qqTimerFoot">After that your spot is released to the next person in line.</span></div>';
var opm=/^(\D*)(.*)$/.exec(QUALIFY.offerPrice),opcur=opm[1],opnum=opm[2];
html+='<div class="qq-offer"><div class="qq-offer-img"><img decoding="async" src="'+p.img+'" alt="'+p.name+'"></div><div class="qq-offer-price"><span class="qq-cur">'+opcur+'</span><span class="qq-num">'+opnum+'</span></div></div>';
html+='<div class="qq-stock"><div class="qq-stock-top"><span>Kits left at this price</span><span><b id="qqStock">'+QUALIFY.stockStart+'</b> left</span></div><div class="qq-stock-bar"><i id="qqBar2"></i></div><div class="qq-stock-foot"><b id="qqPct">0%</b> of today\u2019s stock has already been claimed.</div></div>';
html+='<p class="qq-delivery"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span>Order now and it arrives by <b>'+_qqDeliveryDate()+'</b></span></p>';
html+='<button class="q-final-cta qq-cta ctack" id="qGo"><span id="qGoTxt">'+QUALIFY.ctaText+'</span><span class="arw" aria-hidden="true">&rarr;</span></button>';
html+='<p class="qq-cta-sub">Secure checkout &middot; Ships today &middot; Cancel anytime</p>';
html+='<p class="q-guarantee"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg><span><b>100% money-back guarantee.</b><br>If you\u2019re not satisfied for any reason, you\u2019ll receive a full refund. No questions asked.</span></p>';
html+='</div>';
bd.innerHTML=html;
var goBtn=_qEl('qGo');if(goBtn)goBtn.addEventListener('click',function(){_qGoCheckout(p.href)});
_qqStartTimer();_qqStartStock();_qArmNoHover()}

function _qWithParams(url){var qs=window.location.search.replace(/^\?/,'');return qs?url+(url.indexOf('?')>-1?'&':'?')+qs:url}
function _qGoCheckout(url){try{if(window.fbq)fbq('track','InitiateCheckout');}catch(_){}try{if(window.utmify&&window.utmify.track)window.utmify.track('InitiateCheckout');}catch(_){}window.location.href=_qWithParams(url)}

/* === EVENT DELEGATION — nao depende de quando o DOM carrega === */
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('.ctaquiz');
  if(a){e.preventDefault();e.stopPropagation();openQuiz(e);return}
  var cl=e.target.closest&&e.target.closest('#qClose');
  if(cl){closeQuiz();return}
  var ov=e.target;
  if(ov&&ov.id==='quizOverlay'){closeQuiz();return}
},true);
document.addEventListener('keydown',function(e){var ov=_qOverlay();if(e.key==='Escape'&&ov&&ov.classList.contains('open'))closeQuiz()});
document.addEventListener('mousemove',function(e){_qLastMouse.x=e.clientX;_qLastMouse.y=e.clientY},{passive:!0});

/* Fallback: se DOMContentLoaded ja passou, tenta setar IDs nos CTAs */
function _qInitCtas(){document.querySelectorAll('.glance-cta, .cta-btn').forEach(function(b){b.id='DTC_CTA'})}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',_qInitCtas)}else{_qInitCtas()}

/* === NO-JUMP === */
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a[href="#"]');
  if (!a) return;
  e.preventDefault();
}, false);