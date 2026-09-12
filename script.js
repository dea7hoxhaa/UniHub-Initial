const logout=document.getElementById("logoutButton");if(logout)logout.addEventListener("click",()=>{localStorage.removeItem("unihub-auth");location.href="index.html"});
const root=document.documentElement;root.dataset.theme=localStorage.getItem('unihub-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function updateCurrentDateLabel(){const el=$('#currentDateLabel');if(!el)return;const lang=localStorage.getItem('unihub-language')||document.documentElement.dataset.language||document.documentElement.lang||'en';const locale={en:'en-US',sq:'sq-AL',mk:'mk-MK'}[lang]||'en-US';const parts=new Intl.DateTimeFormat(locale,{weekday:'long',day:'numeric',month:'long'}).formatToParts(new Date());const get=t=>parts.find(p=>p.type===t)?.value||'';el.textContent=`${get('weekday')}, ${get('day')} ${get('month')}`.toLocaleUpperCase(locale)}
updateCurrentDateLabel();
new MutationObserver(updateCurrentDateLabel).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-language']});
function syncThemeToggle(){const b=$('#themeToggle');if(!b)return;b.setAttribute('aria-label',`Switch to ${root.dataset.theme==='dark'?'light':'dark'} mode`);b.title=`Switch to ${root.dataset.theme==='dark'?'light':'dark'} mode`}syncThemeToggle();
$('#themeToggle').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('unihub-theme',root.dataset.theme);syncThemeToggle()};
$('#mobileMenu').onclick=()=>$('#sidebar').classList.toggle('open');
function showView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.view===id));$('#sidebar').classList.remove('open');scrollTo({top:0,behavior:'smooth'});setTimeout(observeReveals,50)}
$$('.nav-link').forEach(b=>b.onclick=()=>showView(b.dataset.view));$$('[data-jump]').forEach(b=>b.onclick=()=>showView(b.dataset.jump));
let toastTimer;function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
$('#notificationButton').onclick=e=>{e.stopPropagation();$('#notifications').classList.toggle('open')};document.addEventListener('click',e=>{if(!$('#notifications').contains(e.target)&&e.target!==$('#notificationButton'))$('#notifications').classList.remove('open')});
const modal=$('#createModal');$$('[data-open-modal]').forEach(b=>b.onclick=()=>{modal.classList.add('open');document.body.style.overflow='hidden'});function closeModal(){modal.classList.remove('open');document.body.style.overflow=''}$('#closeModal').onclick=closeModal;$('#cancelModal').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};$('#createForm').onsubmit=e=>{e.preventDefault();closeModal();toast('Post created in demo mode');e.target.reset()};
function observeReveals(){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.08});$$('.view.active .reveal:not(.visible)').forEach(x=>obs.observe(x))}observeReveals();
$$('.like-btn').forEach(b=>b.onclick=()=>{b.classList.toggle('liked');b.textContent=b.classList.contains('liked')?'Liked':'Like'});
function smart(q){q=(q||'').toLowerCase();let v=q.includes('exam')?'exams':q.includes('intern')||q.includes('job')?'internships':q.includes('event')||q.includes('hack')||q.includes('workshop')?'events':q.includes('team')?'teammates':q.includes('room')||q.includes('apartment')?'roommates':q.includes('announcement')||q.includes('deadline')?'announcements':'notes';toast('Finding the best results');setTimeout(()=>showView(v),550)}
$('#assistantButton').onclick=()=>smart($('#assistantInput').value);$('#assistantInput').onkeydown=e=>{if(e.key==='Enter')smart(e.target.value)};$$('[data-query]').forEach(b=>b.onclick=()=>smart(b.dataset.query));
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#globalSearch').focus()}});$('#globalSearch').onkeydown=e=>{if(e.key==='Enter')smart(e.target.value)};
const resources=[['Algorithms — Complete Notes','Algorithms','PDF','4.9','1,284','notes',''],['Calculus I — Exam Summary','Mathematics','DOC','4.8','964','summary','blue'],['Computer Networks — Full Course','Networks','PDF','4.7','812','notes','orange'],['Java OOP — Quick Revision','Programming','PDF','4.9','1,106','summary','blue'],['Database Systems — Lecture Notes','Databases','DOC','4.6','601','notes',''],['AI Fundamentals — Cheat Sheet','Artificial Intelligence','PDF','4.8','728','summary','orange']];
$('#notesGrid').innerHTML=resources.map(x=>`<article class="resource-card" data-category="${x[5]}"><div class="resource-cover ${x[6]}"><span>${x[1]}</span><b>${x[2]}</b></div><div class="card-body"><small>FINKI · YEAR 2</small><h3>${x[0]}</h3><p>Structured student-made resource with clear explanations and exam-focused examples.</p><div class="meta"><span>Rating ${x[3]}</span><span>${x[4]} downloads</span></div><div class="card-actions"><button>Preview</button><button onclick="toast('Download started')">Download</button></div></div></article>`).join('');
const exams=[['Algorithms Midterm — January 2025','ADS','medium','4.6','812',''],['Calculus I Final — September 2024','M1','hard','4.8','1,040','blue'],['Computer Networks Practical — 2025','CN','medium','4.7','634','orange'],['Java OOP Midterm — April 2025','OOP','easy','4.9','928','blue'],['Discrete Mathematics — June 2024','DM','hard','4.5','512',''],['Databases Final — January 2025','DB','medium','4.7','731','orange']];
$('#examsGrid').innerHTML=exams.map(x=>`<article class="resource-card" data-category="${x[2]}"><div class="resource-cover ${x[5]}"><span>${x[1]}</span><b>EXAM</b></div><div class="card-body"><small>PREVIOUS EXAM</small><h3>${x[0]}</h3><p>Difficulty: ${x[2]} · Solutions included</p><div class="meta"><span>Rating ${x[3]}</span><span>${x[4]} downloads</span></div><div class="card-actions"><button>Preview</button><button>Practice</button></div></div></article>`).join('');
const jobs=[['SE','Junior Frontend Developer','Semos Education','React,JavaScript,Hybrid','Paid · Skopje','software'],['IT','Software Engineering Intern','IT Labs','Java,Spring,On-site','Paid · Skopje','software'],['BC','Data Analytics Intern','Brainster Next','Python,SQL,Hybrid','Paid · Skopje','data'],['EN','Junior QA Intern','Endava','Testing,Jira,Remote','Paid · Macedonia','software'],['AI','Machine Learning Intern','AI Macedonia','Python,PyTorch,Hybrid','Paid · Skopje','data'],['UX','Product Design Intern','Solveo','Figma,UX Research,Hybrid','Paid · Skopje','design']];
$('#jobsGrid').innerHTML=jobs.map(x=>`<article class="job-card" data-category="${x[5]}"><div class="job-top"><div class="company-logo">${x[0]}</div><button class="save-btn">Save</button></div><h3>${x[1]}</h3><div class="job-company">${x[2]}</div><div class="tags">${x[3].split(',').map(t=>`<span>${t}</span>`).join('')}</div><div class="job-bottom"><b>${x[4]}</b><span>Closes in 6 days</span></div><div class="card-actions"><button>Details</button><button>Apply now</button></div></article>`).join('');
const events=[['28','JUL','AI Builders Macedonia','Skopje Innovation Center','Meetup · Free','AI','','meetup'],['03','AUG','Code by the Lake','Ohrid · 48 hours','Hackathon · Team event','</>','blue','hackathon'],['12','AUG','Design Thinking Lab','Bitola Tech Hub','Workshop · Limited','UX','orange','workshop'],['20','AUG','Cybersecurity Student Night','Skopje · Hybrid','Talks · Networking','CY','green','meetup'],['05','SEP','Women in Tech Macedonia','SEEU Campus','Conference · Free','WT','','meetup'],['14','SEP','Startup Weekend Skopje','Innovation Center','Startup · 54 hours','SW','blue','hackathon']];
$('#eventsGrid').innerHTML=events.map(x=>`<article class="event-card" data-category="${x[7]}"><div class="event-hero ${x[6]}"><div class="event-date"><b>${x[0]}</b><span>${x[1]}</span></div><div class="event-symbol">${x[5]}</div></div><div class="card-body"><small>${x[4]}</small><h3>${x[2]}</h3><div class="event-details"><span>${x[3]}</span><span>18:00</span><span>120 students interested</span></div><div class="card-actions"><button>Save</button><button>View event</button></div></div></article>`).join('');
const people=[['AN','Ana Nikolovska','FINKI · Year 2','React,Figma,UI/UX','95%','frontend'],['MK','Marko Iliev','SEEU · Year 3','Node.js,Python,SQL','92%','backend'],['EL','Elena Petrova','FINKI · Year 2','Java,Spring,Git','89%','backend'],['AR','Arben Rexhepi','SEEU · Year 1','C++,Algorithms,Linux','87%','backend'],['MS','Mila Stojanova','UGD · Year 3','Data Science,Python,AI','85%','ai'],['DN','David Naumov','FINKI · Year 2','Flutter,Firebase,UX','83%','frontend']];
$('#peopleGrid').innerHTML=people.map(x=>`<article class="person-card" data-category="${x[5]}"><span class="match">${x[4]} match</span><div class="person-avatar">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><div class="tags">${x[3].split(',').map(t=>`<span>${t}</span>`).join('')}</div><div class="person-stats"><div><b>12</b><span>projects</span></div><div><b>4.9</b><span>rating</span></div><div><b>18h</b><span>weekly</span></div></div><div class="card-actions"><button>Profile</button><button onclick="toast('Invitation sent')">Invite</button></div></article>`).join('');
const rooms=[['Room near FINKI','Karpoš, Skopje','€180/month','12 min','Utilities','01 Sep','','skopje'],['Modern shared apartment','Centar, Skopje','€240/month','8 min','Furnished','15 Aug','alt','skopje'],['Student room in Aerodrom','Aerodrom, Skopje','€160/month','25 min','Wi-Fi','01 Sep','third','skopje'],['Shared flat near SEEU','Tetovo','€140/month','10 min','Heating','20 Aug','alt','tetovo'],['Room by City Park','Karpoš, Skopje','€210/month','15 min','Balcony','01 Oct','third','skopje'],['Affordable studio','Bitola Center','€130/month','7 min','Private','10 Sep','','bitola']];
$('#roomsGrid').innerHTML=rooms.map(x=>`<article class="room-card" data-category="${x[7]}"><div class="room-image ${x[6]}"><span>${x[2]}</span></div><div class="card-body"><small>${x[1]}</small><h3>${x[0]}</h3><div class="room-info"><div><b>${x[3]}</b><span>to campus</span></div><div><b>${x[4]}</b><span>included</span></div><div><b>${x[5]}</b><span>move-in</span></div></div><div class="card-actions"><button>Save</button><button>Contact</button></div></div></article>`).join('');
const announcements=[['UK','UKIM Student Office','Official · 25 minutes ago','DEADLINE','Applications open for student mobility programme','Students can apply for the autumn semester exchange programme until 15 August.'],['FH','FINKI Hub','Verified · 2 hours ago','CAMPUS','New summer consultation schedule published','The updated consultation schedule for Mathematics 1, ADS and Computer Networks is now available.'],['ST','Student Talks Macedonia','Community · Today','OPPORTUNITY','Call for student speakers: Technology and Society','Submit a 10-minute talk proposal by 5 August. First-time speakers are welcome.']];
$('#announcementFeed').innerHTML=announcements.map(x=>`<article class="feed-card"><div class="feed-head"><div class="avatar">${x[0]}</div><div><b>${x[1]}</b><small>${x[2]}</small></div><span>${x[3]}</span></div><h3>${x[4]}</h3><p>${x[5]}</p><div class="feed-actions"><button class="like-btn">Like</button><button>Comments</button><button>Share</button></div></article>`).join('');
function bindDynamic(){$$('.save-btn').forEach(b=>b.onclick=()=>{b.classList.toggle('saved');b.textContent=b.classList.contains('saved')?'Saved':'Save';toast(b.classList.contains('saved')?'Saved to your list':'Removed from saved')});$$('#announcementFeed .like-btn').forEach(b=>b.onclick=()=>{b.classList.toggle('liked');b.textContent=b.classList.contains('liked')?'Liked':'Like'});$$('.filters button').forEach(b=>b.onclick=()=>{const box=b.parentElement;box.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const view=b.closest('.view'),filter=b.dataset.filter;view.querySelectorAll('[data-category]').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter))})}bindDynamic();
const c=$('#networkCanvas'),ctx=c.getContext('2d');let ps=[];function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);ps=Array.from({length:Math.min(70,Math.floor(innerWidth/19))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.4}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);const light=root.dataset.theme==='light';ps.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=light?'rgba(92,75,190,.25)':'rgba(173,154,255,.42)';ctx.fill();for(let j=i+1;j<ps.length;j++){const q=ps[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(139,92,246,${(1-d/120)*(light?.07:.11)})`;ctx.lineWidth=.6;ctx.stroke()}}});requestAnimationFrame(draw)}resize();draw();addEventListener('resize',resize);

/* Education directory integration */
(function initialiseEducationDirectory(){
  if (!window.UNIHUB_EDUCATION) return;
  const profile = JSON.parse(localStorage.getItem('unihub-profile') || '{}');
  const name = localStorage.getItem('unihub-name') || 'Student';
  document.querySelectorAll('[data-user-name],[data-profile-name]').forEach(el => el.textContent = name);
  const compactContext = [profile.facultyShort || profile.universityShort, profile.year].filter(Boolean).join(' · ') || 'Choose your faculty';
  document.querySelectorAll('[data-user-context]').forEach(el => el.textContent = compactContext);
  const fullStudy = [profile.facultyShort || profile.faculty, profile.program, profile.year].filter(Boolean).join(' · ') || 'Complete your student profile';
  document.querySelectorAll('[data-profile-study]').forEach(el => el.textContent = fullStudy);
  document.querySelectorAll('[data-profile-location]').forEach(el => el.textContent = `${profile.city || 'North Macedonia'}, North Macedonia`);

  const universitySelects = [document.getElementById('notesUniversityFilter'), document.getElementById('postUniversity')].filter(Boolean);
  universitySelects.forEach(select => {
    const first = select.options[0]?.outerHTML || '<option value="">Choose university</option>';
    select.innerHTML = first + UNIHUB_EDUCATION.filter(u => u.id !== 'other').map(u => `<option value="${u.id}">${u.shortName} — ${u.name}</option>`).join('');
    if (profile.universityId && select.id === 'postUniversity') select.value = profile.universityId;
  });

  function populateFaculties(universityId, select, includeAll = false){
    const uni = getUniHubUniversity(universityId);
    select.innerHTML = `<option value="">${includeAll ? 'All IT faculties' : 'Choose faculty'}</option>` + (uni?.faculties || []).map(f => `<option value="${f.id}">${f.shortName} — ${f.name}</option>`).join('');
  }
  function populatePrograms(universityId, facultyId, select){
    const faculty = getUniHubFaculty(universityId, facultyId);
    select.innerHTML = '<option value="">Choose programme</option>' + (faculty?.programs || []).map(p => `<option value="${p}">${p}</option>`).join('');
  }

  const notesUniversity = document.getElementById('notesUniversityFilter');
  const notesFaculty = document.getElementById('notesFacultyFilter');
  notesUniversity?.addEventListener('change', () => populateFaculties(notesUniversity.value, notesFaculty, true));
  if (notesUniversity && profile.universityId) {
    notesUniversity.value = profile.universityId;
    populateFaculties(profile.universityId, notesFaculty, true);
    notesFaculty.value = profile.facultyId || '';
  }

  const postUniversity = document.getElementById('postUniversity');
  const postFaculty = document.getElementById('postFaculty');
  const postProgram = document.getElementById('postProgram');
  postUniversity?.addEventListener('change', () => { populateFaculties(postUniversity.value, postFaculty); populatePrograms('', '', postProgram); });
  postFaculty?.addEventListener('change', () => populatePrograms(postUniversity.value, postFaculty.value, postProgram));
  if (postUniversity && profile.universityId) {
    postUniversity.value = profile.universityId;
    populateFaculties(profile.universityId, postFaculty);
    postFaculty.value = profile.facultyId || '';
    populatePrograms(profile.universityId, profile.facultyId, postProgram);
    postProgram.value = profile.program || '';
  }
})();
