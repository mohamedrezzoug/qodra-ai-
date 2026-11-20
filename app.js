const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
let lang = localStorage.getItem('qodra_lang') || 'ar';
const translations = {
en:{welcomeTag:"Your personal growth space",heroTitle:"Every person has potential worth developing.",heroText:"Discover your strengths, learn new skills, and turn ideas into practical steps.",startBtn:"Start with QODRA AI",yourSpace:"YOUR SPACE",dashboard:"Your growth dashboard",activeGoals:"Active goals",completedGoals:"Completed goals",yourJourney:"Day in your journey",explore:"EXPLORE",toolsTitle:"QODRA tools",aiDesc:"Your thinking and planning partner",learnTitle:"Learn",learnDesc:"Develop a new skill",goalsTitle:"My goals",goalsDesc:"Turn ambition into action",discoverTitle:"Discover your strengths",discoverDesc:"Notice what you do well",quote:"Big change starts with a small step. Today is a new chance to begin.",assistantTitle:"AI Assistant",demoNotice:"This is a prototype: replies are local examples, not a live AI connection.",helloMsg:"Hello! I'm QODRA. What would you like to improve or achieve today?",myGoals:"My goals",goalsIntro:"Write a small goal and work on it step by step.",addGoal:"+ Add goal",learningPath:"Learning paths",learnIntro:"Choose an area and begin with one small step.",languageSkill:"Learn languages",languageDetail:"10 minutes a day to build a new habit",digitalSkill:"Digital skills",digitalDetail:"Start with computer and internet basics",thinkingSkill:"Thinking and problem solving",thinkingDetail:"Learn to break a problem into steps",projectSkill:"Build projects",projectDetail:"Turn an idea into a prototype",discoverPrompt:"What activity do you enjoy doing?",discoverText:"Reflect on what interests you. There are no right or wrong answers.",saveReflection:"Save reflection",home:"Home",discoverShort:"Discover"},
fr:{welcomeTag:"Votre espace de développement",heroTitle:"Chaque personne possède un potentiel à développer.",heroText:"Découvrez vos forces, apprenez et transformez vos idées en actions.",startBtn:"Commencer avec QODRA AI",yourSpace:"VOTRE ESPACE",dashboard:"Votre tableau de progression",activeGoals:"Objectifs actifs",completedGoals:"Objectifs terminés",yourJourney:"Jour de votre parcours",explore:"EXPLORER",toolsTitle:"Outils QODRA",aiDesc:"Votre partenaire de réflexion",learnTitle:"Apprendre",learnDesc:"Développer une compétence",goalsTitle:"Mes objectifs",goalsDesc:"Transformer l'ambition en action",discoverTitle:"Découvrez vos forces",discoverDesc:"Identifiez vos points forts",quote:"Le grand changement commence par un petit pas.",assistantTitle:"Assistant IA",demoNotice:"Prototype : les réponses sont locales, sans connexion IA en direct.",helloMsg:"Bonjour ! Je suis QODRA. Que souhaitez-vous développer aujourd'hui ?",myGoals:"Mes objectifs",goalsIntro:"Écrivez un petit objectif et avancez étape par étape.",addGoal:"+ Ajouter",learningPath:"Parcours d'apprentissage",learnIntro:"Choisissez un domaine et commencez simplement.",languageSkill:"Apprendre les langues",languageDetail:"10 minutes par jour",digitalSkill:"Compétences numériques",digitalDetail:"Les bases de l'informatique et d'Internet",thinkingSkill:"Réflexion et résolution",thinkingDetail:"Décomposer un problème en étapes",projectSkill:"Créer des projets",projectDetail:"Transformer une idée en prototype",discoverPrompt:"Quelle activité aimez-vous faire ?",discoverText:"Réfléchissez à vos intérêts. Il n'y a pas de mauvaise réponse.",saveReflection:"Enregistrer",home:"Accueil",discoverShort:"Découvrir"}
};
function applyLang(){
 const t=translations[lang]||{}; document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 $$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(t[k])el.textContent=t[k];});
 $('#langBtn').textContent=lang==='ar'?'ع / EN':lang==='en'?'EN / FR':'FR / ع';
}
function showView(name){
 $('main').classList.toggle('hidden',name!=='home');
 $$('.view').forEach(v=>v.classList.add('hidden'));
 if(name!=='home') $('#'+name+'View').classList.remove('hidden');
 $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.go===name));
 if(name==='goals') renderGoals();
 window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.go)));
$('#langBtn').addEventListener('click',()=>{lang=lang==='ar'?'en':lang==='en'?'fr':'ar';localStorage.setItem('qodra_lang',lang);applyLang();});
const key='qodra_goals';
function getGoals(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
function saveGoals(items){localStorage.setItem(key,JSON.stringify(items));renderGoals();updateStats()}
function renderGoals(){
 const list=$('#goalList'); list.innerHTML=''; const goals=getGoals();
 if(!goals.length){list.innerHTML='<p class="muted">مازال ما ضفتي حتى هدف. البداية بهدف واحد كافية.</p>';return;}
 goals.forEach(g=>{const row=document.createElement('div');row.className='goal-item'+(g.done?' done':'');
 const check=document.createElement('input');check.type='checkbox';check.checked=g.done;check.addEventListener('change',()=>{g.done=check.checked;saveGoals(goals)});
 const label=document.createElement('span');label.textContent=g.text;
 const del=document.createElement('button');del.className='delete-goal';del.textContent='×';del.setAttribute('aria-label','Delete');del.addEventListener('click',()=>saveGoals(goals.filter(x=>x.id!==g.id)));
 row.append(check,label,del);list.append(row);});
}
$('#goalForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#goalInput');const text=input.value.trim();if(!text)return;const goals=getGoals();goals.unshift({id:Date.now(),text,done:false});saveGoals(goals);input.value='';});
function updateStats(){const g=getGoals();$('#goalCount').textContent=g.filter(x=>!x.done).length;$('#doneCount').textContent=g.filter(x=>x.done).length;}
const today=new Date();$('#todayLabel').textContent=today.toLocaleDateString(lang==='ar'?'ar-MA':lang==='fr'?'fr-FR':'en-US',{day:'numeric',month:'short'});
function localReply(q){
 const s=q.toLowerCase();
 if(/تعلم|learn|apprendre/.test(s))return 'بداية زوينة! اختار مهارة واحدة، خصص ليها 15 دقيقة يومياً، وطبق اللي تعلمتي في تمرين صغير. شنو المهارة اللي باغي تبدأ بها؟';
 if(/مشروع|project|projet/.test(s))return 'باش نحولو الفكرة لمشروع، نحددو أولاً: شكون غادي يستافد؟ شنو المشكل؟ وشنو أبسط نسخة نقدروا نجربوها؟ كتب ليا الفكرة ديالك.';
 if(/هدف|goal|objectif/.test(s))return 'قسم الهدف لخطوات صغيرة وواضحة، وحدد أول خطوة تقدر تديرها اليوم. تقدر تسجل الهدف في قسم "أهدافي".';
 return 'شكراً على سؤالك! في هاد النسخة التجريبية نقدر نعاونك بأفكار أولية. جرّب تشرح ليا شنو بغيتي تحقق، شنو الصعوبة، وشنو النتيجة اللي كتتمناها. ملاحظة: هاد الرد مثال محلي وماشي جواب مولّد مباشرة بالذكاء الاصطناعي.';
}
function addMessage(text,type){const el=document.createElement('div');el.className='message '+type;el.textContent=text;$('#chatBox').append(el);$('#chatBox').scrollTop=$('#chatBox').scrollHeight;}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#chatInput');const q=input.value.trim();if(!q)return;addMessage(q,'user');input.value='';setTimeout(()=>addMessage(localReply(q),'bot'),250);});
$('#strengthBtn').addEventListener('click',()=>{const v=$('#strengthInput').value.trim();if(!v){$('#savedMsg').textContent='كتب شي حاجة أولاً.';return;}localStorage.setItem('qodra_reflection',v);$('#savedMsg').textContent='تم حفظ تأملك على هذا الهاتف بنجاح.';});
$('#strengthInput').value=localStorage.getItem('qodra_reflection')||'';
if('serviceWorker' in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
applyLang();updateStats();
