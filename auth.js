const root = document.documentElement;
root.dataset.theme = localStorage.getItem('unihub-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

function syncThemeToggle() {
  document.querySelectorAll('#themeToggle').forEach(button => {
    button.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`);
    button.title = `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`;
  });
}

document.querySelectorAll('#themeToggle').forEach(button => {
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('unihub-theme', root.dataset.theme);
    syncThemeToggle();
  });
});
syncThemeToggle();

const login = document.getElementById('loginForm');
const signup = document.getElementById('signupForm');

async function handleLogin(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    const errorBox = document.getElementById('loginError');
    if (error) {
        if (errorBox) errorBox.textContent = error.message;
        return;
    }
    const { data: profile } = await supabaseClient
        .from('profiles').select('*').eq('id', data.user.id).single();

    localStorage.setItem('unihub-auth', 'true');
    localStorage.setItem('unihub-name', profile?.full_name || 'Student');
    localStorage.setItem('unihub-profile', JSON.stringify(profile || {}));

    const onboarded = !!profile?.study_programme;
    location.href = onboarded ? 'app.html' : 'onboarding.html';
}

login?.addEventListener('submit', e => {
    e.preventDefault();
    handleLogin(
        document.getElementById('loginEmail').value,
        document.getElementById('loginPassword').value
    );
});
document.getElementById('googleLogin')?.addEventListener('click', enter);

signup?.addEventListener('submit', async e => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value || 'Student';
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const { error } = await supabaseClient.auth.signUp({ email, password });
    const errorBox = document.getElementById('signupError');
    if (error) {
        if (errorBox) errorBox.textContent = error.message;
        return;
    }
    localStorage.setItem('unihub-name', fullName);
    location.href = 'onboarding.html';
});
document.getElementById('googleSignup')?.addEventListener('click', () => location.href = 'onboarding.html');

const steps = [...document.querySelectorAll('.step')];
if (steps.length) {
  let step = 0;
  const bars = [...document.querySelectorAll('.steps i')];
  const next = document.getElementById('nextStep');
  const back = document.getElementById('backStep');
  const error = document.getElementById('selectionError');
  const state = { universityId: '', facultyId: '', program: '', year: '', interests: [] };

  const universityOptions = document.getElementById('universityOptions');
  const facultyOptions = document.getElementById('facultyOptions');
  const programOptions = document.getElementById('programOptions');

  function optionButton(value, title, subtitle, selected = false) {
    return `<button class="option ${selected ? 'selected' : ''}" type="button" data-value="${String(value).replace(/"/g, '&quot;')}"><b>${title}</b><small>${subtitle}</small></button>`;
  }

  function renderUniversities(query = '') {
    const q = query.trim().toLowerCase();
    const matches = UNIHUB_EDUCATION.filter(u => `${u.shortName} ${u.name} ${u.city}`.toLowerCase().includes(q));
    universityOptions.innerHTML = matches.map(u => optionButton(u.id, u.shortName, `${u.name} · ${u.city} · ${u.faculties.length} IT ${u.faculties.length === 1 ? 'faculty' : 'faculties'}`, state.universityId === u.id)).join('');
    bindSingle(universityOptions, value => {
      if (state.universityId !== value) { state.facultyId = ''; state.program = ''; }
      state.universityId = value;
      renderFaculties();
    });
  }

  function renderFaculties() {
    const university = getUniHubUniversity(state.universityId);
    document.getElementById('facultyContext').textContent = university ? `${university.name} · ${university.city}` : 'Choose a university first.';
    facultyOptions.innerHTML = university ? university.faculties.map(f => optionButton(f.id, f.shortName, `${f.name} · ${f.programs.length} programmes`, state.facultyId === f.id)).join('') : '';
    bindSingle(facultyOptions, value => {
      if (state.facultyId !== value) state.program = '';
      state.facultyId = value;
      renderPrograms();
    });
  }

  function renderPrograms() {
    const faculty = getUniHubFaculty(state.universityId, state.facultyId);
    document.getElementById('programContext').textContent = faculty ? faculty.name : 'Choose a faculty first.';
    programOptions.innerHTML = faculty ? faculty.programs.map(p => optionButton(p, p, 'IT-related study programme', state.program === p)).join('') : '';
    bindSingle(programOptions, value => state.program = value);
  }

  function bindSingle(container, onSelect) {
    container.querySelectorAll('.option').forEach(option => option.addEventListener('click', () => {
      container.querySelectorAll('.option').forEach(x => x.classList.remove('selected'));
      option.classList.add('selected');
      onSelect(option.dataset.value);
      error.textContent = '';
    }));
  }

  bindSingle(document.getElementById('yearOptions'), value => state.year = value);
  document.querySelectorAll('#interestOptions .option').forEach(option => option.addEventListener('click', () => {
    option.classList.toggle('selected');
    const value = option.dataset.value;
    state.interests = option.classList.contains('selected') ? [...new Set([...state.interests, value])] : state.interests.filter(x => x !== value);
    error.textContent = '';
  }));

  document.getElementById('universitySearch')?.addEventListener('input', e => renderUniversities(e.target.value));

  function validCurrentStep() {
    return [state.universityId, state.facultyId, state.program, state.year, state.interests.length][step];
  }

  function render() {
    steps.forEach((s, i) => s.classList.toggle('active', i === step));
    bars.forEach((b, i) => b.classList.toggle('active', i <= step));
    back.style.visibility = step ? 'visible' : 'hidden';
    next.textContent = step === steps.length - 1 ? 'Open my dashboard' : 'Continue';
    error.textContent = '';
  }

    next.addEventListener('click', async () => {
    if (!validCurrentStep()) {
      error.textContent = step === 4 ? 'Choose at least one interest to continue.' : 'Please choose one option to continue.';
      return;
    }
    if (step < steps.length - 1) { step++; render(); return; }

        const university = getUniHubUniversity(state.universityId);
        const faculty = getUniHubFaculty(state.universityId, state.facultyId);
        const profile = {
            ...state,
            university: university?.name || '', universityShort: university?.shortName || '',
            faculty: faculty?.name || '', facultyShort: faculty?.shortName || '', city: university?.city || ''
        };
        localStorage.setItem('unihub-profile', JSON.stringify(profile));

        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
            await supabaseClient.from('profiles').upsert({
                id: user.id,
                full_name: localStorage.getItem('unihub-name') || 'Student',
                university: profile.university,
                university_short: profile.universityShort,
                university_id: state.universityId,      // add
                faculty: profile.faculty,
                faculty_short: profile.facultyShort,
                faculty_id: state.facultyId,             // add
                study_programme: profile.program,
                study_year: profile.year,
                city: profile.city,
                interests: profile.interests
            });
        }

        localStorage.setItem('unihub-auth', 'true');
        localStorage.setItem('unihub-onboarded', 'true');
        location.href = 'app.html';
  });
  back.addEventListener('click', () => { if (step) { step--; render(); } });

  renderUniversities();
  render();
}
