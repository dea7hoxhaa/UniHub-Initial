const root = document.documentElement;
root.dataset.theme = localStorage.getItem('unihub-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

(function restoreLastViewVisual() {
    const saved = localStorage.getItem('unihub-last-view');
    if (!saved || saved === 'home') return;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === saved));
    $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === saved));
})();

function updateCurrentDateLabel() {
    const el = $('#currentDateLabel');
    if (!el) return;
    const lang = localStorage.getItem('unihub-language') || document.documentElement.dataset.language || document.documentElement.lang || 'en';
    const locale = {en: 'en-US', sq: 'sq-AL', mk: 'mk-MK'}[lang] || 'en-US';
    const parts = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t)?.value || '';
    el.textContent = `${get('weekday')}, ${get('day')} ${get('month')}`.toLocaleUpperCase(locale)
}

updateCurrentDateLabel();
new MutationObserver(updateCurrentDateLabel).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'data-language']
});

function syncThemeToggle() {
    const b = $('#themeToggle');
    if (!b) return;
    b.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`);
    b.title = `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`
}

syncThemeToggle();
$('#themeToggle').onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('unihub-theme', root.dataset.theme);
    syncThemeToggle()
};
$('#mobileMenu').onclick = () => $('#sidebar').classList.toggle('open');
$('#logoutButton').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    location.href = 'index.html';
});

function initialsFrom(name) {
    return (name || 'Student').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function renderAvatar(el, name, avatarUrl) {
    if (!el) return;
    el.innerHTML = avatarUrl ? `<img src="${avatarUrl}" alt="${name}">` : initialsFrom(name);
}

function avatarSmInner(name, avatarUrl) {
    const initials = (name || 'Student').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return avatarUrl ? `<img src="${avatarUrl}" alt="${name}">` : initials;
}

function applyProfileDisplay(dbProfile) {
    const name = dbProfile?.full_name || 'Student';
    const firstName = name.split(' ')[0];
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = name);
    document.querySelectorAll('[data-user-firstname]').forEach(el => el.textContent = firstName);
    const compactContext = [dbProfile?.faculty_short || dbProfile?.university_short, dbProfile?.study_year].filter(Boolean).join(' · ') || 'Choose your faculty';
    document.querySelectorAll('[data-user-context]').forEach(el => el.textContent = compactContext);
    renderAvatar(document.getElementById('sidebarAvatar'), name, dbProfile?.avatar_url);
}

window.applyProfileDisplay = applyProfileDisplay;

const viewLoaders = {
    notes: () => loadResources(),
    exams: () => loadExams(),
    internships: () => loadInternships(),
    events: () => loadEvents(),
    teammates: () => loadTeamRequests(),
    roommates: () => loadRoommatePosts(),
    messages: () => loadConversations()
};

let profileReturnContext = null;

function persistLastView(id) {
    const persistable = ['home', 'notes', 'exams', 'internships', 'events', 'teammates', 'roommates', 'messages', 'profile'];
    if (persistable.includes(id)) localStorage.setItem('unihub-last-view', id);
}

function restoreLastView() {
    const saved = localStorage.getItem('unihub-last-view');
    if (saved && saved !== 'home') showView(saved);
}

function showView(id, opts = {}) {
    const isOwnProfileNav = id !== 'profile' || !opts.userId || opts.userId === window.currentUserId;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === id));
    if (id !== 'messages') unsubscribeThreadChannel();
    $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === id && (id !== 'profile' || isOwnProfileNav)));
    $('#sidebar').classList.remove('open');
    scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(observeReveals, 50);
    if (viewLoaders[id]) {
        viewLoaders[id]();
    }
    if (id === 'profile') loadProfilePage(opts.userId || window.currentUserId);
    persistLastView(id);
}

function switchActivityTab(tab) {
    $(`.activity-tabs button[data-activity-tab="${tab}"]`)?.click();
}

function goBackFromProfile() {
    const ctx = profileReturnContext;
    profileReturnContext = null;
    $('#profileBackBtn').style.display = 'none';
    if (!ctx) {
        showView('home');
        return;
    }
    if (ctx.type === 'followlist') {
        showView('profile', {userId: ctx.profileId});
        openFollowList(ctx.profileId, ctx.listType);
        return;
    }
    if (ctx.type === 'detail' && detailConfig[ctx.targetType]) {
        showView(ctx.fromView || 'home');
        openDetail(ctx.targetType, ctx.targetId);
    } else {
        showView(ctx.view || 'home');
    }
}

async function loadProfilePage(userId) {
    if (!userId) return;
    window.currentProfileUserId = userId;
    const isOwn = userId === window.currentUserId;
    $('#profileBackBtn').style.display = profileReturnContext ? '' : 'none';

    $('#editProfileBtn').style.display = isOwn ? '' : 'none';
    $('#followBtn').style.display = isOwn ? 'none' : '';
    $('#messageProfileBtn').style.display = isOwn ? 'none' : '';
    $('#savedTabBtn').style.display = isOwn ? '' : 'none';
    $('#commentsTabBtn').style.display = isOwn ? '' : 'none';
    if (!isOwn && ($('#savedTabBtn').classList.contains('active') || $('#commentsTabBtn').classList.contains('active'))) {
        switchActivityTab('posts');
    }

    const {data: dbProfile} = await supabaseClient.from('profiles').select('*').eq('id', userId).single();
    renderProfilePage(dbProfile, isOwn);
    loadProfileStats(userId);
    loadMyPosts(userId);

    if (isOwn) {
        loadSavedItems();
        loadMyComments();
    } else {
        setupFollowButton(userId);
    }
}

function renderProfilePage(dbProfile, isOwn) {
    const name = dbProfile?.full_name || 'Student';
    $('#profileEyebrow').textContent = isOwn ? 'YOUR STUDENT IDENTITY' : 'STUDENT PROFILE';
    $('#profileHeading').textContent = isOwn ? 'My profile' : name;
    $('#profileSubtitle').textContent = isOwn ? 'Your posts, saved items and activity across UniHub.' : `${name.split(' ')[0]}'s posts and activity on UniHub.`;
    $('#postsTabBtn').textContent = isOwn ? 'My posts' : 'Posts';
    $('[data-profile-name]').textContent = name;
    const fullStudy = [dbProfile?.faculty_short || dbProfile?.faculty, dbProfile?.study_programme, dbProfile?.study_year].filter(Boolean).join(' · ') || 'Hasn\'t completed their profile yet';
    $('[data-profile-study]').textContent = fullStudy;
    $('[data-profile-location]').textContent = `${dbProfile?.city || 'North Macedonia'}, North Macedonia`;
    renderAvatar($('#profileAvatar'), name, dbProfile?.avatar_url);
    $('#profileAbout').textContent = dbProfile?.about_text || 'No bio yet.';
    const skills = (dbProfile?.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    $('#profileSkills').innerHTML = skills.map(s => `<span>${s}</span>`).join('');

    $('#statFollowers').closest('div').onclick = () => openFollowList(window.currentProfileUserId, 'followers');
    $('#statFollowing').closest('div').onclick = () => openFollowList(window.currentProfileUserId, 'following');
}

async function setupFollowButton(profileUserId) {
    const btn = $('#followBtn');
    if (!window.currentUserId) return;
    const {data: existing} = await supabaseClient.from('follows').select('follower_id')
        .eq('follower_id', window.currentUserId).eq('following_id', profileUserId).maybeSingle();
    let following = !!existing;
    renderFollowBtn(btn, following);

    btn.onclick = async () => {
        btn.disabled = true;
        if (following) {
            const {error} = await supabaseClient.from('follows').delete()
                .eq('follower_id', window.currentUserId).eq('following_id', profileUserId);
            if (!error) following = false;
        } else {
            const {error} = await supabaseClient.from('follows')
                .insert({follower_id: window.currentUserId, following_id: profileUserId});
            if (!error) {
                following = true;
                createNotification(profileUserId, 'follow', 'profile', null, 'started following you');
            }
        }
        renderFollowBtn(btn, following);
        loadProfileStats(profileUserId);
        btn.disabled = false;
    };
}

$('#messageProfileBtn').onclick = () => {
    if (window.currentProfileUserId) openConversationWith(window.currentProfileUserId);
};

function renderFollowBtn(btn, following) {
    btn.textContent = following ? 'Following' : 'Follow';
    btn.classList.toggle('following', following);
}

$$('.nav-link').forEach(b => b.onclick = () => { profileReturnContext = null; showView(b.dataset.view); });
$$('[data-jump]').forEach(b => b.onclick = () => showView(b.dataset.jump));
$('#profileBackBtn').onclick = goBackFromProfile;
let toastTimer;

function toast(t) {
    const el = $('#toast');
    el.textContent = t;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200)
}

$('#notificationButton').onclick = async e => {
    e.stopPropagation();
    $('#notifications').classList.toggle('open');
    if ($('#notifications').classList.contains('open')) {
        const unreadIds = await loadNotifications();
        if (unreadIds.length) {
            await supabaseClient.from('notifications').update({is_read: true}).in('id', unreadIds);
            $('#notificationButton').classList.remove('has-unread');
        }
    }
};

async function getAuthUser() {
    const {data: {session}} = await supabaseClient.auth.getSession();
    return session?.user || null;
}

async function getLikeState(targetType, ids) {
    if (!ids.length) return {counts: {}, mine: new Set()};
    const {
        data: rows,
        error
    } = await supabaseClient.from('likes').select('target_id, user_id').eq('target_type', targetType).in('target_id', ids);
    if (error) {
        console.error(error);
        return {counts: {}, mine: new Set()};
    }
    const user = await getAuthUser();
    const counts = {};
    const mine = new Set();
    rows.forEach(r => {
        counts[r.target_id] = (counts[r.target_id] || 0) + 1;
        if (user && r.user_id === user.id) mine.add(r.target_id);
    });
    return {counts, mine};
}

function likeButtonHtml(targetType, id, counts, mine) {
    const count = counts[id] || 0;
    const liked = mine.has(id);
    return `<button class="like-btn${liked ? ' liked' : ''}" data-target-type="${targetType}" data-target-id="${id}">${liked ? '♥' : '♡'} <span class="like-count">${count}</span></button>`;
}

document.addEventListener('click', async e => {
    const btn = e.target.closest('.like-btn[data-target-id]');
    if (!btn) return;
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }

    const targetType = btn.dataset.targetType, targetId = btn.dataset.targetId;
    const liked = btn.classList.contains('liked');
    const allMatches = $$(`.like-btn[data-target-type="${targetType}"][data-target-id="${targetId}"]`);
    allMatches.forEach(b => b.disabled = true);

    if (liked) {
        const {error} = await supabaseClient.from('likes').delete().eq('user_id', user.id).eq('target_type', targetType).eq('target_id', targetId);
        if (!error) {
            allMatches.forEach(b => {
                b.classList.remove('liked');
                b.firstChild.textContent = '♡ ';
                const c = b.querySelector('.like-count');
                c.textContent = Math.max(0, parseInt(c.textContent) - 1);
            });
        }
    } else {
        const {error} = await supabaseClient.from('likes').insert({
            user_id: user.id,
            target_type: targetType,
            target_id: targetId
        });
        if (!error) {
            allMatches.forEach(b => {
                b.classList.add('liked');
                b.firstChild.textContent = '♥ ';
                const c = b.querySelector('.like-count');
                c.textContent = parseInt(c.textContent) + 1;
            });
            const ownerId = await getPostOwner(targetType, targetId);
            if (ownerId) createNotification(ownerId, 'like', targetType, targetId, `liked your ${targetTables[targetType]?.label.toLowerCase() || 'post'}`);
        }
    }
    allMatches.forEach(b => b.disabled = false);
});

async function getSaveState(targetType, ids) {
    if (!ids.length) return new Set();
    const user = await getAuthUser();
    if (!user) return new Set();
    const {
        data: rows,
        error
    } = await supabaseClient.from('saves').select('target_id').eq('user_id', user.id).eq('target_type', targetType).in('target_id', ids);
    if (error) {
        console.error(error);
        return new Set();
    }
    return new Set(rows.map(r => r.target_id));
}

function saveButtonHtml(targetType, id, saved) {
    return `<button class="save-btn${saved.has(id) ? ' saved' : ''}" data-target-type="${targetType}" data-target-id="${id}">${saved.has(id) ? 'Saved' : 'Save'}</button>`;
}

document.addEventListener('click', async e => {
    const btn = e.target.closest('.save-btn[data-target-id]');
    if (!btn) return;
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }

    const targetType = btn.dataset.targetType, targetId = btn.dataset.targetId;
    const saved = btn.classList.contains('saved');
    const allMatches = $$(`.save-btn[data-target-type="${targetType}"][data-target-id="${targetId}"]`);
    allMatches.forEach(b => b.disabled = true);

    if (saved) {
        const {error} = await supabaseClient.from('saves').delete().eq('user_id', user.id).eq('target_type', targetType).eq('target_id', targetId);
        if (!error) {
            allMatches.forEach(b => {
                b.classList.remove('saved');
                b.textContent = 'Save';
            });
            toast('Removed from saved');
        }
    } else {
        const {error} = await supabaseClient.from('saves').insert({
            user_id: user.id,
            target_type: targetType,
            target_id: targetId
        });
        if (!error) {
            allMatches.forEach(b => {
                b.classList.add('saved');
                b.textContent = 'Saved';
            });
            toast('Saved to your list');
        }
    }
    allMatches.forEach(b => b.disabled = false);
    if (btn.closest('#savedItemsList')) loadSavedItems();
});
const modal = $('#createModal');
const categoryLabels = {
    study: 'Upload study material',
    exam: 'Upload a previous exam',
    internship: 'Post an internship',
    event: 'Add an event',
    team: 'Create a team request',
    roommate: 'Post a roommate listing'
};

function updateModalFields(category) {
    $$('#createForm [data-for]').forEach(el => {
        const show = el.dataset.for.split(' ').includes(category);
        el.style.display = show ? '' : 'none';
        el.querySelectorAll('[data-required]').forEach(field => field.required = show);
    });
}

$$('[data-open-modal]').forEach(b => b.onclick = () => {
    delete modal.dataset.editingId;
    delete modal.dataset.editingType;
    $('#createForm').reset();
    window.applyProfilePrefill?.();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const forced = b.dataset.category;
    if (forced) {
        $('#postCategory').value = forced;
        $('#categoryField').style.display = 'none';
        $('.modal-head h2').textContent = categoryLabels[forced] || 'Create a UniHub post';
    } else {
        $('#categoryField').style.display = '';
        $('.modal-head h2').textContent = 'Create a UniHub post';
    }
    updateModalFields($('#postCategory').value);
});
$('#postCategory').addEventListener('change', e => updateModalFields(e.target.value));
['#postEventDate', '#postMoveIn'].forEach(sel => {
    const el = $(sel);
    if (el && el.showPicker) {
        el.addEventListener('click', () => {
            try {
                el.showPicker();
            } catch (err) {
            }
        });
    }
});

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    delete modal.dataset.editingId;
    delete modal.dataset.editingType
}

$('#closeModal').onclick = closeModal;
$('#cancelModal').onclick = closeModal;
modal.onclick = e => {
    if (e.target === modal) closeModal()
};
$('#createForm').onsubmit = async e => {
    e.preventDefault();
    const category = $('#postCategory').value;
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }

    const editingId = modal.dataset.editingId;

    async function saveRecord(table, payload) {
        if (editingId) return supabaseClient.from(table).update(payload).eq('id', editingId);
        return supabaseClient.from(table).insert({user_id: user.id, ...payload});
    }

    function finishSave(successMsg, reloadFn) {
        closeModal();
        toast(successMsg);
        e.target.reset();
        reloadFn();
    }

    if (category === 'study') {
        const title = $('#postTitle').value;
        const description = $('#postDescription').value;
        const university = $('#postUniversity').selectedOptions[0]?.textContent || '';
        const faculty = $('#postFaculty').selectedOptions[0]?.textContent || '';
        const resourceType = $('#postResourceType').value;
        const file = $('#postFile').files[0];

        let fileUrl = null;
        if (file) {
            const path = `${user.id}/${Date.now()}_${file.name}`;
            const {error: uploadError} = await supabaseClient.storage.from('resources').upload(path, file);
            if (uploadError) {
                toast('File upload failed');
                console.error(uploadError);
                return;
            }
            fileUrl = supabaseClient.storage.from('resources').getPublicUrl(path).data.publicUrl;
        }

        const payload = {
            title,
            description,
            resource_type: resourceType,
            university,
            faculty,
            study_programme: $('#postProgram').value || null
        };
        if (fileUrl) payload.file_url = fileUrl;

        const {error} = await saveRecord('resources', payload);
        if (error) {
            toast('Could not save post');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Resource updated!' : 'Resource uploaded!', loadResources);
        return;
    }

    if (category === 'exam') {
        const subject = $('#postTitle').value;
        const description = $('#postDescription').value.trim();
        const university = $('#postUniversity').selectedOptions[0]?.textContent || '';
        const faculty = $('#postFaculty').selectedOptions[0]?.textContent || '';
        const difficulty = $('#postDifficulty').value;
        const examPeriod = $('#postExamPeriod').value.trim();
        const hasSolutions = $('#postHasSolutions').checked;
        const file = $('#postFile').files[0];

        let fileUrl = null;
        if (file) {
            const path = `${user.id}/${Date.now()}_${file.name}`;
            const {error: uploadError} = await supabaseClient.storage.from('resources').upload(path, file);
            if (uploadError) {
                toast('File upload failed');
                console.error(uploadError);
                return;
            }
            fileUrl = supabaseClient.storage.from('resources').getPublicUrl(path).data.publicUrl;
        }

        const payload = {
            subject,
            description,
            difficulty,
            university,
            faculty,
            exam_period: examPeriod || null,
            has_solutions: hasSolutions,
            study_programme: $('#postProgram').value || null
        };
        if (fileUrl) payload.file_url = fileUrl;

        const {error} = await saveRecord('exams', payload);
        if (error) {
            toast('Could not save exam');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Exam updated!' : 'Exam uploaded!', loadExams);
        return;
    }

    if (category === 'internship') {
        const payload = {
            title: $('#postTitle').value,
            description: $('#postDescription').value,
            company: $('#postCompany').value,
            category: $('#postInternshipCategory').value,
            work_type: $('#postWorkType').value,
            city: $('#postInternshipCity').value,
            apply_url: $('#postApplyUrl').value
        };
        const {error} = await saveRecord('internships', payload);
        if (error) {
            toast('Could not save internship');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Internship updated!' : 'Internship posted!', loadInternships);
        return;
    }

    if (category === 'event') {
        const payload = {
            title: $('#postTitle').value,
            description: $('#postDescription').value,
            event_type: $('#postEventType').value,
            city: $('#postEventCity').value,
            webpage_url: $('#postEventUrl').value,
            event_date: $('#postEventDate').value || null
        };
        const {error} = await saveRecord('events', payload);
        if (error) {
            toast('Could not save event');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Event updated!' : 'Event posted!', loadEvents);
        return;
    }

    if (category === 'team') {
        const payload = {
            title: $('#postTitle').value,
            description: $('#postDescription').value,
            skills_needed: $('#postSkills').value,
            project_type: $('#postProjectType').value
        };
        const {error} = await saveRecord('team_requests', payload);
        if (error) {
            toast('Could not save request');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Team request updated!' : 'Team request posted!', loadTeamRequests);
        return;
    }

    if (category === 'roommate') {
        const payload = {
            title: $('#postTitle').value, description: $('#postDescription').value, location: $('#postLocation').value,
            city: $('#postCity').value, rent: parseFloat($('#postRent').value) || null,
            amenities: $('#postAmenities').value, move_in_date: $('#postMoveIn').value || null
        };
        const {error} = await saveRecord('roommate_posts', payload);
        if (error) {
            toast('Could not save listing');
            console.error(error);
            return;
        }
        finishSave(editingId ? 'Listing updated!' : 'Listing posted!', loadRoommatePosts);
        return;
    }

    closeModal();
    toast('This category isn\'t connected yet — coming in a later step');
    e.target.reset();
};

async function getCommentCounts(targetType, ids) {
    if (!ids.length) return {};
    const {
        data: rows,
        error
    } = await supabaseClient.from('comments').select('target_id').eq('target_type', targetType).in('target_id', ids);
    if (error) {
        console.error(error);
        return {};
    }
    const counts = {};
    rows.forEach(r => counts[r.target_id] = (counts[r.target_id] || 0) + 1);
    return counts;
}

function commentButtonHtml(targetType, id, counts) {
    return `<button class="comment-btn" data-target-type="${targetType}" data-target-id="${id}">💬 ${counts[id] || 0}</button>`;
}

const commentsModal = $('#commentsModal');

function closeCommentsModal() {
    commentsModal.classList.remove('open');
    document.body.style.overflow = ''
}

$('#closeCommentsModal').onclick = closeCommentsModal;
commentsModal.onclick = e => {
    if (e.target === commentsModal) closeCommentsModal()
};

async function loadComments(targetType, targetId) {
    const {data: {user}} = await supabaseClient.auth.getUser();
    const {
        data: rows,
        error
    } = await supabaseClient.from('comments').select('*, profiles(full_name, avatar_url)').eq('target_type', targetType).eq('target_id', targetId).order('created_at', {ascending: true});
    if (error) {
        console.error(error);
        return;
    }
    $('#commentsList').innerHTML = rows.length ? rows.map(c => {
        const name = c.profiles?.full_name || 'UniHub Student';
        const mine = user && c.user_id === user.id;
        return `<div class="activity">
            <button class="post-author" data-user-id="${c.user_id}" style="display:contents"><b>${avatarSmInner(name, c.profiles?.avatar_url)}</b></button>
            <button class="post-author" data-user-id="${c.user_id}" style="display:contents"><div><strong>${name}</strong><small>${c.content}</small></div></button>
            ${mine ? `<button class="comment-delete" data-comment-id="${c.id}">×</button>` : ''}
        </div>`;
    }).join('') : '<p>No comments yet — be the first.</p>';
}

document.addEventListener('click', e => {
    const btn = e.target.closest('.comment-btn[data-target-id]');
    if (!btn) return;
    commentsModal.dataset.targetType = btn.dataset.targetType;
    commentsModal.dataset.targetId = btn.dataset.targetId;
    commentsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadComments(btn.dataset.targetType, btn.dataset.targetId);
});

$('#commentForm').onsubmit = async e => {
    e.preventDefault();
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }
    const targetType = commentsModal.dataset.targetType, targetId = commentsModal.dataset.targetId;
    const content = $('#commentInput').value.trim();
    if (!content) return;

    const {error} = await supabaseClient.from('comments').insert({
        user_id: user.id,
        target_type: targetType,
        target_id: targetId,
        content
    });
    if (error) {
        toast('Could not post comment');
        console.error(error);
        return;
    }

    $('#commentInput').value = '';
    loadComments(targetType, targetId);
    $$(`.comment-btn[data-target-type="${targetType}"][data-target-id="${targetId}"]`).forEach(b => b.textContent = `💬 ${parseInt(b.textContent.replace('💬 ', '')) + 1}`);

    const ownerId = await getPostOwner(targetType, targetId);
    if (ownerId) createNotification(ownerId, 'comment', targetType, targetId, `commented on your ${targetTables[targetType]?.label.toLowerCase() || 'post'}`);
};

document.addEventListener('click', async e => {
    const del = e.target.closest('.comment-delete[data-comment-id]');
    if (!del) return;
    const {error} = await supabaseClient.from('comments').delete().eq('id', del.dataset.commentId);
    if (error) {
        toast('Could not delete comment');
        console.error(error);
        return;
    }
    const targetType = commentsModal.dataset.targetType, targetId = commentsModal.dataset.targetId;
    loadComments(targetType, targetId);
    $$(`.comment-btn[data-target-type="${targetType}"][data-target-id="${targetId}"]`).forEach(b => b.textContent = `💬 ${Math.max(0, parseInt(b.textContent.replace('💬 ', '')) - 1)}`);
});

function observeReveals() {
    const obs = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target)
        }
    }), {threshold: .08});
    $$('.view.active .reveal:not(.visible)').forEach(x => obs.observe(x))
}

observeReveals();
$$('.like-btn').forEach(b => b.onclick = () => {
    b.classList.toggle('liked');
    b.textContent = b.classList.contains('liked') ? 'Liked' : 'Like'
});

const searchTitleSources = {
    notes: {
        table: 'resources',
        titleCol: 'title',
        label: 'Notes & Summaries',
        badge: 'STUDY MATERIAL',
        view: 'notes',
        getTitle: r => r.title,
        getSnippet: r => r.description || ''
    },
    exams: {
        table: 'exams',
        titleCol: 'subject',
        label: 'Previous Exams',
        badge: 'PREVIOUS EXAM',
        view: 'exams',
        getTitle: r => `${r.subject} — ${r.exam_period || ''}`,
        getSnippet: r => `Difficulty: ${r.difficulty || 'medium'}`
    },
    internships: {
        table: 'internships',
        titleCol: 'title',
        label: 'Internships',
        badge: 'INTERNSHIP',
        view: 'internships',
        getTitle: r => r.title,
        getSnippet: r => r.company || ''
    },
    events: {
        table: 'events',
        titleCol: 'title',
        label: 'IT Events',
        badge: 'EVENT',
        view: 'events',
        getTitle: r => r.title,
        getSnippet: r => r.location || ''
    },
    teammates: {
        table: 'team_requests',
        titleCol: 'title',
        label: 'Find Teammates',
        badge: 'TEAM REQUEST',
        view: 'teammates',
        getTitle: r => r.title,
        getSnippet: r => r.skills_needed || ''
    },
    roommates: {
        table: 'roommate_posts',
        titleCol: 'title',
        label: 'Find Roommates',
        badge: 'ROOMMATE POST',
        view: 'roommates',
        getTitle: r => r.title,
        getSnippet: r => r.location || ''
    }
};

let currentSearchResults = [];
let currentSearchCategory = 'all';
let searchProfileMap = {};
async function smart(q) {
    q = (q || '').trim();
    if (!q) return;
    toast('Searching UniHub…');
    try {
        const groups = await Promise.all(Object.entries(searchTitleSources).map(async ([key, cfg]) => {
            const {
                data,
                error
            } = await supabaseClient.from(cfg.table).select('*, profiles(full_name, avatar_url)').ilike(cfg.titleCol, `%${q}%`).order('created_at', {ascending: false}).limit(20);
            if (error) {
                console.error(error);
                return [];
            }
            return (data || []).map(row => ({key, cfg, row}));
        }));
        currentSearchResults = groups.flat().sort((a, b) => new Date(b.row.created_at) - new Date(a.row.created_at));
        currentSearchCategory = 'all';

        renderSearchResults(q);
    } catch (err) {
        console.error(err);
        toast('Search failed — try again');
    }
}

const searchKeyToTargetType = {
    notes: 'resource',
    exams: 'exam',
    internships: 'internship',
    events: 'event',
    teammates: 'team_request',
    roommates: 'roommate_post'
};

function renderSearchResults(q) {
    $('#feedSectionHeader').style.display = 'none';
    $('#homeFeedTabs').style.display = 'none';
    $('#dashboardLayout').style.display = 'none';
    $('#searchResultsHeader').style.display = '';
    $('#searchCategoryTabs').style.display = '';
    $('#searchResultsGrid').style.display = '';
    $('#searchResultsTitle').textContent = `Results for "${q}"`;

    const counts = {};
    currentSearchResults.forEach(({key}) => counts[key] = (counts[key] || 0) + 1);
    const total = currentSearchResults.length;

    $('#searchCategoryTabs').innerHTML = [`<button class="${currentSearchCategory === 'all' ? 'active' : ''}" data-cat="all">All (${total})</button>`]
        .concat(Object.entries(searchTitleSources).filter(([key]) => counts[key]).map(([key, cfg]) =>
            `<button class="${currentSearchCategory === key ? 'active' : ''}" data-cat="${key}">${cfg.label} (${counts[key]})</button>`
        )).join('');
    $$('#searchCategoryTabs button').forEach(b => b.onclick = () => {
        currentSearchCategory = b.dataset.cat;
        renderSearchResults(q);
    });

    const visible = currentSearchCategory === 'all' ? currentSearchResults : currentSearchResults.filter(r => r.key === currentSearchCategory);
    $('#searchResultsGrid').innerHTML = visible.length
        ? visible.map(({key, cfg, row}) => feedCardHtml(cfg, row, row.profiles, searchKeyToTargetType[key])).join('')
        : `<p class="muted">No matches for "${q}".</p>`;
}

function clearSearch() {
    $('#assistantInput').value = '';
    $('#searchResultsHeader').style.display = 'none';
    $('#searchCategoryTabs').style.display = 'none';
    $('#searchResultsGrid').style.display = 'none';
    $('#feedSectionHeader').style.display = '';
    $('#homeFeedTabs').style.display = '';
    $('#dashboardLayout').style.display = '';
}

$('#clearSearchBtn').onclick = clearSearch;

function shortLabel(text) {
    return (text || '').split(' — ')[0].trim();
}

$('#assistantButton').onclick = () => smart($('#assistantInput').value);
$('#assistantInput').onkeydown = e => {
    if (e.key === 'Enter') smart(e.target.value)
};
$$('[data-query]').forEach(b => b.onclick = () => smart(b.dataset.query));
document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        $('#globalSearch').focus()
    }
});
$('#globalSearch').onkeydown = e => {
    if (e.key === 'Enter') {
        showView('home');
        smart(e.target.value)
    }
};

async function loadResources() {
    const {
        data: resources,
        error
    } = await supabaseClient.from('resources').select('*, profiles(full_name, avatar_url)').order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('resource', resources.map(r => r.id));
    const saved = await getSaveState('resource', resources.map(r => r.id));
    $('#notesGrid').innerHTML = resources.map((r, i) => {
        const posterName = r.profiles?.full_name || 'UniHub Student';
        return `<article class="resource-card" data-category="${r.resource_type || 'notes'}" data-target-type="resource" data-target-id="${r.id}"><div class="post-menu"><button class="post-menu-btn" data-target-type="resource" data-target-id="${r.id}" data-author-id="${r.user_id}">⋯</button><div class="post-menu-dropdown"></div></div><div class="resource-cover ${i % 2 ? 'blue' : ''}"><span>${r.subject || ''}</span><b>${(r.resource_type || 'notes').toUpperCase()}</b></div><div class="card-body"><button class="post-author" data-user-id="${r.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, r.profiles?.avatar_url)}</span><span>${posterName}</span></button><small>${[shortLabel(r.faculty), r.study_year].filter(Boolean).join(' · ')}</small><h3>${r.title}</h3><p>Structured student-made resource with clear explanations and exam-focused examples.</p><div class="card-actions">${likeButtonHtml('resource', r.id, counts, mine)}${saveButtonHtml('resource', r.id, saved)}<button class="preview-btn" data-target-type="resource" data-target-id="${r.id}">Preview</button><button class="download-btn" data-file-url="${r.file_url || ''}" data-filename="${r.title || 'download'}">Download</button></div></div></article>`;
    }).join('');
}

async function loadExams() {
    const {
        data: exams,
        error
    } = await supabaseClient.from('exams').select('*, profiles(full_name, avatar_url)').order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('exam', exams.map(x => x.id));
    const saved = await getSaveState('exam', exams.map(x => x.id));
    $('#examsGrid').innerHTML = exams.map((x, i) => {
        const posterName = x.profiles?.full_name || 'UniHub Student';
        return `<article class="resource-card" data-category="${x.difficulty || 'medium'}" data-target-type="exam" data-target-id="${x.id}"><div class="post-menu"><button class="post-menu-btn" data-target-type="exam" data-target-id="${x.id}" data-author-id="${x.user_id}">⋯</button><div class="post-menu-dropdown"></div></div><div class="resource-cover ${i % 2 ? 'blue' : ''}"><span>${x.subject}</span><b>EXAM</b></div><div class="card-body"><button class="post-author" data-user-id="${x.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, x.profiles?.avatar_url)}</span><span>${posterName}</span></button><small>PREVIOUS EXAM · ${x.exam_period || ''}</small><h3>${x.subject} — ${x.exam_period || ''}</h3><p>Difficulty: ${x.difficulty || 'medium'}${x.has_solutions ? ' · Solutions included' : ''}</p><div class="card-actions">${likeButtonHtml('exam', x.id, counts, mine)}${saveButtonHtml('exam', x.id, saved)}<button class="preview-btn" data-target-type="exam" data-target-id="${x.id}">Preview</button><button class="download-btn" data-file-url="${x.file_url || ''}" data-filename="${x.subject || 'exam'}">Download</button></div></div></article>`;
    }).join('');
}

function workTypeLabel(v) {
    return {remote: 'Remote', onsite: 'On-site', hybrid: 'Hybrid'}[v] || '';
}

async function loadInternships() {
    const {
        data: jobs,
        error
    } = await supabaseClient.from('internships').select('*, profiles(full_name, avatar_url)').order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('internship', jobs.map(x => x.id));
    const saved = await getSaveState('internship', jobs.map(x => x.id));
    $('#jobsGrid').innerHTML = jobs.map(x => {
        const posterName = x.profiles?.full_name || 'UniHub Student';
        const initials = (x.company || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        const meta = [workTypeLabel(x.work_type), x.city].filter(Boolean).join(' · ');
        return `<article class="job-card" data-category="${x.category || 'software'}" data-target-type="internship" data-target-id="${x.id}">
          <div class="post-menu"><button class="post-menu-btn" data-target-type="internship" data-target-id="${x.id}" data-author-id="${x.user_id}">⋯</button><div class="post-menu-dropdown"></div></div>
          <div class="job-top"><div class="company-logo">${initials}</div>${saveButtonHtml('internship', x.id, saved)}</div>
          <button class="post-author" data-user-id="${x.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, x.profiles?.avatar_url)}</span><span>${posterName}</span></button>
          <h3>${x.title}</h3>
          <div class="job-company">${x.company}</div>
          <div class="tags"><span>${(x.category || 'software').toUpperCase()}</span></div>
          <div class="job-bottom"><b>${meta || 'Work type TBD'}</b></div>
          <div class="card-actions">
            ${likeButtonHtml('internship', x.id, counts, mine)}
            <button class="preview-btn" data-target-type="internship" data-target-id="${x.id}">Details</button>
            ${x.apply_url ? `<a class="apply-btn" href="${x.apply_url}" target="_blank" rel="noopener">Apply now</a>` : '<button class="apply-btn" disabled>Apply now</button>'}
          </div>
        </article>`;
    }).join('');
}

async function loadEvents() {
    const {
        data: events,
        error
    } = await supabaseClient.from('events').select('*, profiles(full_name, avatar_url)').order('event_date', {ascending: true});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('event', events.map(x => x.id));
    const saved = await getSaveState('event', events.map(x => x.id));
    $('#eventsGrid').innerHTML = events.map((x, i) => {
        const posterName = x.profiles?.full_name || 'UniHub Student';
        const d = x.event_date ? new Date(x.event_date) : null;
        const day = d ? String(d.getDate()).padStart(2, '0') : '--';
        const month = d ? d.toLocaleString('en-US', {month: 'short'}).toUpperCase() : '';
        const symbol = x.title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        return `<article class="event-card" data-category="${x.event_type || 'meetup'}" data-target-type="event" data-target-id="${x.id}">
          <div class="post-menu"><button class="post-menu-btn" data-target-type="event" data-target-id="${x.id}" data-author-id="${x.user_id}">⋯</button><div class="post-menu-dropdown"></div></div>
          <div class="event-hero ${i % 2 ? 'blue' : ''}"><div class="event-date"><b>${day}</b><span>${month}</span></div><div class="event-symbol">${symbol}</div></div>
          <div class="card-body">
            <button class="post-author" data-user-id="${x.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, x.profiles?.avatar_url)}</span><span>${posterName}</span></button>
            <small>${(x.event_type || '').toUpperCase()}</small>
            <h3>${x.title}</h3>
            <div class="event-details"><span>${x.location || ''}</span><span>${x.city || ''}</span></div>
            <div class="card-actions">
              ${likeButtonHtml('event', x.id, counts, mine)}
              ${saveButtonHtml('event', x.id, saved)}
              <button class="preview-btn" data-target-type="event" data-target-id="${x.id}">Details</button>
              ${x.webpage_url ? `<a class="apply-btn" href="${x.webpage_url}" target="_blank" rel="noopener">View event</a>` : '<button class="apply-btn" disabled>View event</button>'}
            </div>
          </div>
        </article>`;
    }).join('');
}

const projectTypeLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    design: 'Design',
    ai: 'AI',
    cybersecurity: 'Cybersecurity',
    databases: 'Databases'
};

async function loadTeamRequests() {
    const {
        data: requests,
        error
    } = await supabaseClient.from('team_requests').select('*, profiles(full_name, faculty_short, study_year, avatar_url)').order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('team_request', requests.map(r => r.id));
    const saved = await getSaveState('team_request', requests.map(r => r.id));
    $('#peopleGrid').innerHTML = requests.map(r => {
        const poster = r.profiles;
        const posterName = poster?.full_name || 'UniHub Student';
        const tags = [projectTypeLabels[r.project_type] || r.project_type, ...(r.skills_needed || '').split(',').map(s => s.trim()).filter(Boolean)].filter(Boolean);
        return `<article class="person-card" data-category="${r.project_type || 'frontend'}" data-target-type="team_request" data-target-id="${r.id}">
          <div class="post-menu"><button class="post-menu-btn" data-target-type="team_request" data-target-id="${r.id}" data-author-id="${r.user_id}">⋯</button><div class="post-menu-dropdown"></div></div>
          <button class="post-author" data-user-id="${r.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, poster?.avatar_url)}</span><span>${posterName}</span></button>
          <h3>${r.title}</h3>
          <p>${poster?.faculty_short || ''} · ${poster?.study_year || ''}</p>
          <div class="tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>
          <div class="card-actions">
            ${likeButtonHtml('team_request', r.id, counts, mine)}
            ${saveButtonHtml('team_request', r.id, saved)}
            <button class="preview-btn" data-target-type="team_request" data-target-id="${r.id}">Details</button>
            <button class="contact-btn" data-owner-id="${r.user_id}" data-target-id="${r.id}">Contact</button>
          </div>
        </article>`;
    }).join('');
}

document.addEventListener('click', async e => {
    const btn = e.target.closest('.contact-btn[data-owner-id]');
    if (!btn) return;
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }
    if (user.id === btn.dataset.ownerId) {
        toast("That's your own post");
        return;
    }
    openConversationWith(btn.dataset.ownerId);
});
const reportModal = $('#reportModal');

function closeReportModal() {
    reportModal.classList.remove('open');
    document.body.style.overflow = '';
    $('#reportForm').reset();
}

$('#closeReportModal').onclick = closeReportModal;
$('#cancelReportModal').onclick = closeReportModal;
reportModal.onclick = e => {
    if (e.target === reportModal) closeReportModal();
};
// Delegated click handler for opening the ⋯ dropdown
document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('.post-menu-btn');
    if (trigger) {
        e.stopPropagation();
        document.querySelectorAll('.post-menu-dropdown.open').forEach(d => {
            if (d !== trigger.nextElementSibling) d.classList.remove('open');
        });

        const dropdown = trigger.nextElementSibling;
        if (trigger.id === 'sidebarMenuBtn') {
            dropdown.classList.toggle('open');
            return;
        }
        const targetType = trigger.dataset.targetType;
        const targetId = trigger.dataset.targetId;
        const postAuthorId = trigger.dataset.authorId;

        const {data: {user}} = await supabaseClient.auth.getUser();
        const isOwner = user && user.id === postAuthorId;

        dropdown.innerHTML = isOwner ? `
            <button class="menu-item edit-post-btn" data-target-type="${targetType}" data-target-id="${targetId}">Edit</button>
            <button class="menu-item delete-post-btn" data-target-type="${targetType}" data-target-id="${targetId}">Delete</button>
        ` : `
            <button class="menu-item report-post-btn" data-target-type="${targetType}" data-target-id="${targetId}">Report</button>
        `;
        dropdown.classList.toggle('open');
        return;
    }

    if (!e.target.closest('.post-menu-dropdown')) {
        document.querySelectorAll('.post-menu-dropdown.open').forEach(d => d.classList.remove('open'));
    }

    const reportBtn = e.target.closest('.report-post-btn');
    if (reportBtn) {
        $('#reportTargetType').value = reportBtn.dataset.targetType;
        $('#reportTargetId').value = reportBtn.dataset.targetId;
        $('#reportForm').reset();
        $('#reportModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }
});

$('#reportForm').onsubmit = async (e) => {
    e.preventDefault();

    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }

    const targetType = $('#reportTargetType').value;
    const targetId = $('#reportTargetId').value;
    const reason = document.querySelector('input[name="reportReason"]:checked')?.value;
    const details = $('#reportDetails').value.trim();

    const {error} = await supabaseClient.from('reports').insert({
        reporter_id: user.id, target_type: targetType, target_id: targetId, reason, details: details || null
    });

    $('#reportModal').classList.remove('open');
    document.body.style.overflow = '';

    if (error) {
        toast(error.code === '23505' ? "You've already reported this post." : "Something went wrong submitting your report.");
        return;
    }
    toast('Report submitted. Thanks for flagging this.');
};

async function loadRoommatePosts() {
    const {
        data: rooms,
        error
    } = await supabaseClient.from('roommate_posts').select('*, profiles(full_name, avatar_url)').order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    const {counts, mine} = await getLikeState('roommate_post', rooms.map(x => x.id));
    const saved = await getSaveState('roommate_post', rooms.map(x => x.id));
    $('#roomsGrid').innerHTML = rooms.map((x, i) => {
        const moveIn = x.move_in_date ? new Date(x.move_in_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        }) : '';
        const posterName = x.profiles?.full_name || 'UniHub Student';
        return `<article class="room-card" data-category="${x.city || 'skopje'}" data-target-type="roommate_post" data-target-id="${x.id}">
          <div class="post-menu"><button class="post-menu-btn" data-target-type="roommate_post" data-target-id="${x.id}" data-author-id="${x.user_id}">⋯</button><div class="post-menu-dropdown"></div></div>
          <div class="room-image ${i % 2 ? 'alt' : ''}"><span>€${x.rent}/month</span></div>
          <div class="card-body">
            <button class="post-author" data-user-id="${x.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, x.profiles?.avatar_url)}</span><span>${posterName}</span></button>
            <small>${x.location || ''}</small>
            <h3>${x.title}</h3>
            <div class="room-info"><div><b>${x.amenities || '—'}</b><span>included</span></div><div><b>${moveIn}</b><span>move-in</span></div></div>
            <div class="card-actions">
              ${likeButtonHtml('roommate_post', x.id, counts, mine)}
              ${saveButtonHtml('roommate_post', x.id, saved)}
              <button class="preview-btn" data-target-type="roommate_post" data-target-id="${x.id}">Details</button>
              <button class="contact-btn" data-owner-id="${x.user_id}" data-target-id="${x.id}">Contact</button>
            </div>
          </div>
        </article>`;
    }).join('');
}

let currentConversationId = null;
let threadChannel = null;

function unsubscribeThreadChannel() {
    if (threadChannel) {
        supabaseClient.removeChannel(threadChannel);
        threadChannel = null;
    }
}

async function loadConversations() {
    const list = $('#conversationList');
    if (!list) return;
    const user = await getAuthUser();
    if (!user) {
        list.innerHTML = '<p class="muted">Log in to see your messages.</p>';
        return;
    }
    list.innerHTML = '<p class="muted">Loading conversations…</p>';

    const { data: convos, error } = await supabaseClient
        .from('conversations')
        .select('*')
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

    if (error) {
        console.error(error);
        list.innerHTML = '<p class="muted">Could not load conversations.</p>';
        return;
    }

    if (!convos.length) {
        list.innerHTML = '<p class="muted">No conversations yet — use Contact on a teammate or roommate post to start one.</p>';
        updateMessagesNavBadge(0);
        return;
    }

    const otherIds = convos.map(c => c.user_a_id === user.id ? c.user_b_id : c.user_a_id);
    const { data: profiles } = await supabaseClient.from('profiles').select('id, full_name, avatar_url').in('id', otherIds);
    const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));

    const convoIds = convos.map(c => c.id);

    const { data: unreadRows } = await supabaseClient
        .from('messages')
        .select('conversation_id')
        .in('conversation_id', convoIds)
        .neq('sender_id', user.id)
        .is('read_at', null);
    const unreadByConvo = {};
    (unreadRows || []).forEach(r => unreadByConvo[r.conversation_id] = (unreadByConvo[r.conversation_id] || 0) + 1);

    const { data: lastMessages } = await supabaseClient
        .from('messages')
        .select('conversation_id, content, created_at')
        .in('conversation_id', convoIds)
        .order('created_at', { ascending: false });
    const lastByConvo = {};
    (lastMessages || []).forEach(m => { if (!lastByConvo[m.conversation_id]) lastByConvo[m.conversation_id] = m; });

    list.innerHTML = convos.map(c => {
        const otherId = c.user_a_id === user.id ? c.user_b_id : c.user_a_id;
        const other = profileMap[otherId] || {};
        const name = other.full_name || 'UniHub Student';
        const last = lastByConvo[c.id];
        const snippet = last ? last.content : 'No messages yet';
        const unread = unreadByConvo[c.id] || 0;
        return `<button type="button" class="conversation-row${c.id === currentConversationId ? ' active' : ''}" data-conversation-id="${c.id}" data-other-id="${otherId}">
            <span class="avatar-sm">${avatarSmInner(name, other.avatar_url)}</span>
            <span>
                <span class="conversation-name">${name}</span>
                <span class="conversation-snippet">${escapeHtml(snippet)}</span>
            </span>
            <span class="conversation-meta">
                <span class="conversation-time">${timeAgo(c.last_message_at)}</span>
                ${unread ? '<span class="conversation-unread-dot"></span>' : ''}
            </span>
        </button>`;
    }).join('');

    updateMessagesNavBadge(Object.values(unreadByConvo).reduce((a, b) => a + b, 0));
}

function renderThreadMessages(msgs, myId) {
    const el = $('#threadMessages');
    if (!el) return;
    const lastMineIndex = msgs.map(m => m.sender_id).lastIndexOf(myId);
    el.innerHTML = msgs.length ? msgs.map((m, i) => `
        <div class="message-bubble-row ${m.sender_id === myId ? 'mine' : 'theirs'}">
            <div class="message-bubble">${escapeHtml(m.content)}</div>
            <small class="message-time">${timeAgo(m.created_at)}${m.sender_id === myId && i === lastMineIndex && m.read_at ? ' · Seen' : ''}</small>
        </div>
    `).join('') : '<p class="muted">No messages yet — say hi.</p>';
    el.scrollTop = el.scrollHeight;
}

async function openThread(conversationId, otherId) {
    currentConversationId = conversationId;
    $$('.conversation-row').forEach(r => r.classList.toggle('active', r.dataset.conversationId === conversationId));

    const user = await getAuthUser();
    if (!user) return;

    const threadPanel = $('#threadPanel');
    threadPanel.innerHTML = '<p class="muted">Loading conversation…</p>';

    const { data: other } = await supabaseClient.from('profiles').select('full_name, avatar_url').eq('id', otherId).single();
    const otherName = other?.full_name || 'UniHub Student';

    const { data: msgs, error } = await supabaseClient
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error(error);
        threadPanel.innerHTML = '<p class="muted">Could not load this conversation.</p>';
        return;
    }

    threadPanel.innerHTML = `
        <button type="button" class="post-author thread-header" data-user-id="${otherId}">
            <span class="avatar-sm">${avatarSmInner(otherName, other?.avatar_url)}</span>
            <span class="conversation-name">${otherName}</span>
        </button>
        <div class="thread-messages" id="threadMessages"></div>
        <form class="thread-composer" id="threadComposerForm">
            <textarea id="threadComposerInput" placeholder="Type a message…" required></textarea>
            <button class="primary-btn" type="submit">Send</button>
        </form>
    `;

    renderThreadMessages(msgs, user.id);

    const unreadIds = msgs.filter(m => m.sender_id !== user.id && !m.read_at).map(m => m.id);
    if (unreadIds.length) {
        await supabaseClient.from('messages').update({ read_at: new Date().toISOString() }).in('id', unreadIds);
        loadConversations();
    }

    subscribeToThread(conversationId, user.id, msgs);

    $('#threadComposerForm').onsubmit = async e => {
        e.preventDefault();
        const input = $('#threadComposerInput');
        const content = input.value.trim();
        if (!content) return;

        const { data: newMsg, error: sendError } = await supabaseClient
            .from('messages')
            .insert({ conversation_id: conversationId, sender_id: user.id, content })
            .select()
            .single();

        if (sendError) {
            toast('Could not send message');
            console.error(sendError);
            return;
        }

        input.value = '';
        msgs.push(newMsg);
        renderThreadMessages(msgs, user.id);
        loadConversations();
        maybeNotifyNewMessage(otherId, conversationId, user.id);
    };
}

function subscribeToThread(conversationId, myId, msgs) {
    unsubscribeThreadChannel();
    threadChannel = supabaseClient
        .channel(`thread-${conversationId}`)
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
        }, async payload => {
            if (payload.eventType === 'INSERT') {
                const newMsg = payload.new;
                if (msgs.some(m => m.id === newMsg.id)) return; // already have it — this was our own send
                msgs.push(newMsg);
                renderThreadMessages(msgs, myId);
                if (newMsg.sender_id !== myId) {
                    await supabaseClient.from('messages').update({ read_at: new Date().toISOString() }).eq('id', newMsg.id);
                    loadConversations();
                }
            } else if (payload.eventType === 'UPDATE') {
                const updated = payload.new;
                const idx = msgs.findIndex(m => m.id === updated.id);
                if (idx !== -1) {
                    msgs[idx] = updated;
                    renderThreadMessages(msgs, myId);
                }
            }
        })
        .subscribe();
}

async function maybeNotifyNewMessage(recipientId, conversationId, senderId) {
    const { data: existingUnread } = await supabaseClient
        .from('notifications')
        .select('id')
        .eq('user_id', recipientId)
        .eq('actor_id', senderId)
        .eq('type', 'message')
        .eq('target_type', 'conversation')
        .eq('target_id', conversationId)
        .eq('is_read', false)
        .maybeSingle();
    if (existingUnread) return;
    createNotification(recipientId, 'message', 'conversation', conversationId, 'sent you a message');
}

async function openConversationWith(otherUserId) {
    const user = await getAuthUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }
    if (user.id === otherUserId) {
        toast("That's your own post");
        return;
    }

    const [a, b] = [user.id, otherUserId].sort();

    let { data: existing, error } = await supabaseClient
        .from('conversations')
        .select('id')
        .eq('user_a_id', a)
        .eq('user_b_id', b)
        .maybeSingle();

    if (error) {
        console.error(error);
        toast('Could not open conversation');
        return;
    }

    let conversationId = existing?.id;
    if (!conversationId) {
        const { data: created, error: insertErr } = await supabaseClient
            .from('conversations')
            .insert({ user_a_id: a, user_b_id: b })
            .select()
            .single();
        if (insertErr) {
            console.error(insertErr);
            toast('Could not start conversation');
            return;
        }
        conversationId = created.id;
    }

    showView('messages');
    await loadConversations();
    openThread(conversationId, otherUserId);
}

async function refreshMessagesBadge() {
    const user = await getAuthUser();
    if (!user) {
        updateMessagesNavBadge(0);
        return;
    }
    const { data: convos, error } = await supabaseClient
        .from('conversations')
        .select('id')
        .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`);
    if (error || !convos || !convos.length) {
        updateMessagesNavBadge(0);
        return;
    }
    const convoIds = convos.map(c => c.id);
    const { count, error: countError } = await supabaseClient
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .in('conversation_id', convoIds)
        .neq('sender_id', user.id)
        .is('read_at', null);
    if (countError) {
        console.error(countError);
        return;
    }
    updateMessagesNavBadge(count || 0);
}

function updateMessagesNavBadge(count) {
    const badge = $('#messagesUnreadCount');
    if (!badge) return;
    badge.textContent = count;
    badge.style.display = count > 0 ? '' : 'none';
}

document.addEventListener('click', e => {
    const row = e.target.closest('.conversation-row[data-conversation-id]');
    if (!row) return;
    openThread(row.dataset.conversationId, row.dataset.otherId);
});

const homeFeedSources = {
    resource: {
        table: 'resources',
        view: 'notes',
        badge: 'STUDY MATERIAL',
        getTitle: r => r.title,
        getSnippet: r => r.description || 'New study resource shared.'
    },
    exam: {
        table: 'exams',
        view: 'exams',
        badge: 'PREVIOUS EXAM',
        getTitle: r => `${r.subject} — ${r.exam_period || ''}`,
        getSnippet: r => `Difficulty: ${r.difficulty || 'medium'}`
    },
    internship: {
        table: 'internships',
        view: 'internships',
        badge: 'INTERNSHIP',
        getTitle: r => r.title,
        getSnippet: r => r.description || r.company || ''
    },
    event: {
        table: 'events',
        view: 'events',
        badge: 'EVENT',
        getTitle: r => r.title,
        getSnippet: r => r.description || r.location || ''
    },
    team_request: {
        table: 'team_requests',
        view: 'teammates',
        badge: 'TEAM REQUEST',
        getTitle: r => r.title,
        getSnippet: r => r.description || ''
    },
    roommate_post: {
        table: 'roommate_posts',
        view: 'roommates',
        badge: 'ROOMMATE POST',
        getTitle: r => r.title,
        getSnippet: r => r.description || ''
    }
};

function feedCardHtml(cfg, row, profile, type) {
    const name = profile?.full_name || 'UniHub Student';
    return `<article class="feed-card reveal visible" data-target-type="${type}" data-target-id="${row.id}">
        <div class="feed-head">
          <button type="button" class="post-author feed-author" data-user-id="${row.user_id}">
            <span class="avatar feed-avatar">${avatarSmInner(name, profile?.avatar_url)}</span>
            <span class="feed-author-text"><b>${name}</b><small>${timeAgo(row.created_at)}</small></span>
          </button>
          <span>${cfg.badge}</span>
        </div>
        <h3>${cfg.getTitle(row)}</h3><p>${cfg.getSnippet(row)}</p>
      </article>`;
}

async function loadHomeFeed() {
    const grid = $('#homeFeed');
    if (!grid) return;
    grid.innerHTML = '<p class="muted">Loading your feed…</p>';
    try {
        const groups = await Promise.all(Object.entries(homeFeedSources).map(async ([type, cfg]) => {
            const {data, error} = await supabaseClient.from(cfg.table)
                .select('*, profiles(full_name, avatar_url)')
                .order('created_at', {ascending: false}).limit(8);
            if (error) {
                console.error(cfg.table, error);
                return [];
            }
            return (data || []).map(row => ({type, cfg, row}));
        }));
        const items = groups.flat()
            .sort((a, b) => new Date(b.row.created_at) - new Date(a.row.created_at))
            .slice(0, 12);

        if (!items.length) {
            grid.innerHTML = '<p class="muted">No activity yet — be the first to post.</p>';
            return;
        }

        grid.innerHTML = items.map(({type, cfg, row}) => feedCardHtml(cfg, row, row.profiles, type)).join('');
    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p class="muted">Could not load the feed right now.</p>';
    }
}

loadHomeFeed();

async function loadFollowingFeed() {
    const grid = $('#homeFeedFollowing');
    if (!grid) return;
    if (!window.currentUserId) {
        grid.innerHTML = '<p class="muted">Log in to see posts from people you follow.</p>';
        return;
    }
    grid.innerHTML = '<p class="muted">Loading your following feed…</p>';
    try {
        const {data: followRows, error: followErr} = await supabaseClient
            .from('follows').select('following_id').eq('follower_id', window.currentUserId);
        if (followErr) {
            console.error(followErr);
            grid.innerHTML = '<p class="muted">Could not load the feed right now.</p>';
            return;
        }

        const followingIds = followRows.map(r => r.following_id);
        if (!followingIds.length) {
            grid.innerHTML = '<p class="muted">Follow other students to see their posts here.</p>';
            return;
        }

        const groups = await Promise.all(Object.entries(homeFeedSources).map(async ([type, cfg]) => {
            const {data, error} = await supabaseClient.from(cfg.table)
                .select('*, profiles(full_name, avatar_url)')
                .in('user_id', followingIds)
                .order('created_at', {ascending: false}).limit(8);
            if (error) {
                console.error(cfg.table, error);
                return [];
            }
            return (data || []).map(row => ({type, cfg, row}));
        }));
        const items = groups.flat()
            .sort((a, b) => new Date(b.row.created_at) - new Date(a.row.created_at))
            .slice(0, 12);

        if (!items.length) {
            grid.innerHTML = '<p class="muted">No posts yet from people you follow.</p>';
            return;
        }

        grid.innerHTML = items.map(({type, cfg, row}) => feedCardHtml(cfg, row, row.profiles, type)).join('');
    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p class="muted">Could not load the feed right now.</p>';
    }
}

function initHomeFeedTabs() {
    const tabs = $$('#homeFeedTabs button');
    tabs.forEach(t => t.onclick = () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        $('#homeFeed').style.display = t.dataset.tab === 'all' ? '' : 'none';
        $('#homeFeedFollowing').style.display = t.dataset.tab === 'following' ? '' : 'none';
        if (t.dataset.tab === 'following') loadFollowingFeed();
    });
}

initHomeFeedTabs();

function initActivityTabs() {
    const map = {posts: 'myPostsList', saved: 'savedItemsList', comments: 'myCommentsList'};
    $$('.activity-tabs button').forEach(b => b.onclick = () => {
        $$('.activity-tabs button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        $$('.activity-tab-content').forEach(c => c.classList.remove('active'));
        $('#' + map[b.dataset.activityTab]).classList.add('active');
    });
}

initActivityTabs();

function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

function bindDynamic() {
    $$('.filters button').forEach(b => {
        if (b.closest('#homeFeedTabs')) return; // Dashboard All/Following tabs have their own handler
        b.onclick = () => {
            const box = b.parentElement;
            box.querySelectorAll('button').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            const view = b.closest('.view'), filter = b.dataset.filter;
            view.querySelectorAll('[data-category]').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
        };
    });
}

bindDynamic();
const c = $('#networkCanvas'), ctx = c.getContext('2d');
let ps = [];

function resize() {
    c.width = innerWidth * devicePixelRatio;
    c.height = innerHeight * devicePixelRatio;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ps = Array.from({length: Math.min(70, Math.floor(innerWidth / 19))}, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.4 + .4
    }))
}

function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const light = root.dataset.theme === 'light';
    ps.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = light ? 'rgba(92,75,190,.25)' : 'rgba(173,154,255,.42)';
        ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
            const q = ps[j], d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 120) * (light ? .07 : .11)})`;
                ctx.lineWidth = .6;
                ctx.stroke()
            }
        }
    });
    requestAnimationFrame(draw)
}

resize();
draw();
addEventListener('resize', resize);
const targetTables = {
    resource: {table: 'resources', label: 'Resource', title: r => r.title},
    exam: {table: 'exams', label: 'Exam', title: r => `${r.subject} — ${r.exam_period || ''}`},
    internship: {table: 'internships', label: 'Internship', title: r => r.title},
    event: {table: 'events', label: 'Event', title: r => r.title},
    team_request: {table: 'team_requests', label: 'Team request', title: r => r.title},
    roommate_post: {table: 'roommate_posts', label: 'Roommate post', title: r => r.title}
};

async function getPostOwner(targetType, targetId) {
    const cfg = targetTables[targetType];
    if (!cfg) return null;
    const {data} = await supabaseClient.from(cfg.table).select('user_id').eq('id', targetId).single();
    return data?.user_id || null;
}

async function createNotification(recipientId, type, targetType, targetId, message) {
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user || !recipientId || recipientId === user.id) return;
    const {error} = await supabaseClient.from('notifications').insert({
        user_id: recipientId,
        actor_id: user.id,
        type,
        target_type: targetType,
        target_id: targetId,
        message
    });
    if (error) console.error(error);
}

async function loadNotifications() {
    const user = await getAuthUser();
    if (!user) {
        $('#notificationsList').innerHTML = '<p class="muted">Log in to see notifications.</p>';
        return [];
    }
    const {
        data: rows,
        error
    } = await supabaseClient.from('notifications').select('*, profiles!notifications_actor_id_fkey(full_name, avatar_url)').eq('user_id', user.id).order('created_at', {ascending: false}).limit(20);
    if (error) {
        console.error(error);
        return [];
    }
    $('#notificationsList').innerHTML = rows.length ? rows.map(r => {
        const name = escapeHtml(r.profiles?.full_name || 'A student');
        return `<button type="button" class="notification-item${r.is_read ? '' : ' unread'}"
            data-notif-type="${r.type}" data-target-type="${r.target_type || ''}" data-target-id="${r.target_id || ''}" data-actor-id="${r.actor_id || ''}">
            <span class="avatar-sm">${avatarSmInner(name, r.profiles?.avatar_url)}</span>
            <span class="notification-text"><b>${name} ${escapeHtml(r.message)}</b><small>${timeAgo(r.created_at)}</small></span>
        </button>`;
    }).join('') : '<p class="muted">No notifications yet.</p>';
    const unreadIds = rows.filter(r => !r.is_read).map(r => r.id);
    $('#notificationButton').classList.toggle('has-unread', unreadIds.length > 0);
    return unreadIds;
}

document.addEventListener('click', e => {
    const item = e.target.closest('.notification-item');
    if (!item) return;
    const {notifType, targetType, targetId, actorId} = item.dataset;
    $('#notifications').classList.remove('open');
    if (notifType === 'follow') {
        if (actorId) showView('profile', {userId: actorId});
        return;
    }
    if (notifType === 'message') {
        showView('messages');
        loadConversations().then(() => openThread(targetId, actorId));
        return;
    }
    if (targetType && targetId && detailConfig[targetType]) {
        openDetail(targetType, targetId);
    }
});

loadNotifications();

async function loadProfileStats(userId) {
    if (!userId) return;
    const postTables = ['resources', 'exams', 'internships', 'events', 'team_requests', 'roommate_posts'];
    const counts = await Promise.all(postTables.map(t =>
        supabaseClient.from(t).select('id', {count: 'exact', head: true}).eq('user_id', userId)
    ));
    const postsTotal = counts.reduce((sum, r) => sum + (r.count || 0), 0);
    const {count: followers} = await supabaseClient.from('follows').select('follower_id', {
        count: 'exact',
        head: true
    }).eq('following_id', userId);
    const {count: following} = await supabaseClient.from('follows').select('following_id', {
        count: 'exact',
        head: true
    }).eq('follower_id', userId);
    $('#statPosts').textContent = postsTotal;
    $('#statFollowers').textContent = followers || 0;
    $('#statFollowing').textContent = following || 0;
}

async function loadSavedItems() {
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        $('#savedItemsList').innerHTML = '<p>Log in to see your saved items.</p>';
        return;
    }

    const {
        data: saves,
        error
    } = await supabaseClient.from('saves').select('target_type, target_id, created_at').eq('user_id', user.id).order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    if (!saves.length) {
        $('#savedItemsList').innerHTML = '<p>No saved items yet.</p>';
        return;
    }

    const byType = {};
    saves.forEach(s => (byType[s.target_type] ||= []).push(s.target_id));

    const rows = [];
    for (const [type, ids] of Object.entries(byType)) {
        const cfg = targetTables[type];
        if (!cfg) continue;
        const {data, error: fetchErr} = await supabaseClient.from(cfg.table).select('*').in('id', ids);
        if (fetchErr) {
            console.error(fetchErr);
            continue;
        }
        data.forEach(item => rows.push({type, label: cfg.label, title: cfg.title(item), id: item.id}));
    }

    const order = saves.map(s => s.target_id);
    rows.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    const savedSet = new Set(rows.map(r => r.id));

    $('#savedItemsList').innerHTML = rows.map(r => `<div class="activity" data-target-type="${r.type}" data-target-id="${r.id}"><b>${r.label[0]}</b><div><strong>${r.title}</strong><small>${r.label}</small></div>${saveButtonHtml(r.type, r.id, savedSet)}</div>`).join('');
}

async function loadMyComments() {
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        $('#myCommentsList').innerHTML = '<p>Log in to see your comments.</p>';
        return;
    }
    const {
        data: rows,
        error
    } = await supabaseClient.from('comments').select('*').eq('user_id', user.id).order('created_at', {ascending: false});
    if (error) {
        console.error(error);
        return;
    }
    if (!rows.length) {
        $('#myCommentsList').innerHTML = '<p>No comments yet.</p>';
        return;
    }

    const byType = {};
    rows.forEach(c => (byType[c.target_type] ||= []).push(c.target_id));
    const titleMap = {};
    for (const [type, ids] of Object.entries(byType)) {
        const cfg = targetTables[type];
        if (!cfg) continue;
        const {data, error: fetchErr} = await supabaseClient.from(cfg.table).select('*').in('id', ids);
        if (fetchErr) {
            console.error(fetchErr);
            continue;
        }
        data.forEach(item => titleMap[`${type}:${item.id}`] = cfg.title(item));
    }

    $('#myCommentsList').innerHTML = rows.map(c => {
        const cfg = targetTables[c.target_type];
        const title = titleMap[`${c.target_type}:${c.target_id}`] || 'Deleted post';
        return `<div class="activity" data-target-type="${c.target_type}" data-target-id="${c.target_id}"><b>${cfg ? cfg.label[0] : '?'}</b><div><strong>${title}</strong><small>${c.content}</small></div></div>`;
    }).join('');
}

async function loadMyPosts(userId) {
    if (!userId) {
        $('#myPostsList').innerHTML = '<p>Log in to see posts.</p>';
        return;
    }
    const groups = await Promise.all(Object.entries(targetTables).map(async ([type, cfg]) => {
        const {
            data,
            error
        } = await supabaseClient.from(cfg.table).select('*').eq('user_id', userId).order('created_at', {ascending: false});
        if (error) {
            console.error(error);
            return [];
        }
        return (data || []).map(row => ({type, cfg, row}));
    }));
    const items = groups.flat().sort((a, b) => new Date(b.row.created_at) - new Date(a.row.created_at));
    if (!items.length) {
        $('#myPostsList').innerHTML = '<p>No posts yet.</p>';
        return;
    }
    $('#myPostsList').innerHTML = items.map(({type, cfg, row}) =>
        `<div class="activity" data-target-type="${type}" data-target-id="${row.id}"><b>${cfg.label[0]}</b><div><strong>${cfg.title(row)}</strong><small>${cfg.label} · ${timeAgo(row.created_at)}</small></div><div class="post-menu"><button class="post-menu-btn" data-target-type="${type}" data-target-id="${row.id}" data-author-id="${row.user_id}">⋯</button><div class="post-menu-dropdown"></div></div></div>`
    ).join('');
}

const reloadFns = {
    resource: loadResources, exam: loadExams, internship: loadInternships, event: loadEvents,
    team_request: loadTeamRequests, roommate_post: loadRoommatePosts
};
const targetTypeToCategory = {
    resource: 'study', exam: 'exam', internship: 'internship', event: 'event',
    team_request: 'team', roommate_post: 'roommate'
};

function findUniversityIdByLabel(label) {
    const uni = (window.UNIHUB_EDUCATION || []).find(u => `${u.shortName} — ${u.name}` === label);
    return uni?.id || '';
}

function findFacultyIdByLabel(universityId, label) {
    const uni = getUniHubUniversity(universityId);
    const fac = uni?.faculties.find(f => `${f.shortName} — ${f.name}` === label);
    return fac?.id || '';
}

function openEditModal(targetType, row) {
    const category = targetTypeToCategory[targetType];
    $('#createForm').reset();
    modal.dataset.editingType = targetType;
    modal.dataset.editingId = row.id;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#postCategory').value = category;
    $('#categoryField').style.display = 'none';
    $('.modal-head h2').textContent = 'Edit post';
    updateModalFields(category);

    if ($('#postTitle')) $('#postTitle').value = row.title || row.subject || '';
    if ($('#postDescription')) $('#postDescription').value = row.description || '';

    if (category === 'study' || category === 'exam') {
        const postUniversity = $('#postUniversity'), postFaculty = $('#postFaculty'), postProgram = $('#postProgram');
        const uniId = findUniversityIdByLabel(row.university);
        if (uniId && window.populateFaculties) {
            postUniversity.value = uniId;
            window.populateFaculties(uniId, postFaculty);
            const facId = findFacultyIdByLabel(uniId, row.faculty);
            if (facId) {
                postFaculty.value = facId;
                window.populatePrograms(uniId, facId, postProgram);
                if (row.study_programme) postProgram.value = row.study_programme;
            }
        }
    }

    if (category === 'study') $('#postResourceType').value = row.resource_type || '';
    if (category === 'exam') {
        $('#postDifficulty').value = row.difficulty || '';
        $('#postExamPeriod').value = row.exam_period || '';
        $('#postHasSolutions').checked = !!row.has_solutions;
    }
    if (category === 'internship') {
        $('#postCompany').value = row.company || '';
        $('#postInternshipCategory').value = row.category || '';
        $('#postWorkType').value = row.work_type || '';
        $('#postInternshipCity').value = row.city || '';
        $('#postApplyUrl').value = row.apply_url || '';
    }
    if (category === 'event') {
        $('#postEventType').value = row.event_type || '';
        $('#postEventCity').value = row.city || '';
        $('#postEventUrl').value = row.webpage_url || '';
        $('#postEventDate').value = row.event_date ? row.event_date.split('T')[0] : '';
    }
    if (category === 'team') {
        $('#postSkills').value = row.skills_needed || '';
        $('#postProjectType').value = row.project_type || '';
    }
    if (category === 'roommate') {
        $('#postLocation').value = row.location || '';
        $('#postCity').value = row.city || '';
        $('#postRent').value = row.rent || '';
        $('#postAmenities').value = row.amenities || '';
        $('#postMoveIn').value = row.move_in_date || '';
    }
}

const editProfileModal = $('#editProfileModal');

function closeEditProfileModal() {
    editProfileModal.classList.remove('open');
    document.body.style.overflow = ''
}

$('#closeEditProfileModal').onclick = closeEditProfileModal;
$('#cancelEditProfile').onclick = closeEditProfileModal;
editProfileModal.onclick = e => {
    if (e.target === editProfileModal) closeEditProfileModal();
};

$('#editProfileBtn').onclick = async () => {
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }
    const p = window.unihubProfile || {};
    $('#editFullName').value = p.full_name || '';
    $('#editCity').value = p.city || '';
    $('#editAbout').value = p.about_text || '';
    $('#editSkills').value = p.skills || '';
    $('#editStudyYear').value = p.study_year || '';
    if (p.university_id && window.populateFaculties) {
        $('#editUniversity').value = p.university_id;
        window.populateFaculties(p.university_id, $('#editFaculty'));
        $('#editFaculty').value = p.faculty_id || '';
        window.populatePrograms(p.university_id, p.faculty_id, $('#editProgram'));
        $('#editProgram').value = p.study_programme || '';
    }
    editProfileModal.classList.add('open');
    document.body.style.overflow = 'hidden';
};
$('#editUniversity').addEventListener('change', () => {
    window.populateFaculties($('#editUniversity').value, $('#editFaculty'));
    window.populatePrograms('', '', $('#editProgram'));
});
$('#editFaculty').addEventListener('change', () => window.populatePrograms($('#editUniversity').value, $('#editFaculty').value, $('#editProgram')));

$('#editProfileForm').onsubmit = async e => {
    e.preventDefault();
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }

    const uniLabel = $('#editUniversity').selectedOptions[0]?.textContent || '';
    const facLabel = $('#editFaculty').selectedOptions[0]?.textContent || '';
    const file = $('#editAvatarFile').files[0];

    let avatarUrl = window.unihubProfile?.avatar_url || null;
    if (file) {
        const path = `${user.id}/${Date.now()}_${file.name}`;
        const {error: uploadError} = await supabaseClient.storage.from('avatars').upload(path, file);
        if (uploadError) {
            toast('Photo upload failed');
            console.error(uploadError);
            return;
        }
        avatarUrl = supabaseClient.storage.from('avatars').getPublicUrl(path).data.publicUrl;
    }

    const payload = {
        full_name: $('#editFullName').value,
        university_id: $('#editUniversity').value || null,
        university_short: uniLabel.split(' — ')[0] || null,
        faculty_id: $('#editFaculty').value || null,
        faculty_short: facLabel.split(' — ')[0] || null,
        study_programme: $('#editProgram').value || null,
        study_year: $('#editStudyYear').value || null,
        city: $('#editCity').value || null,
        about_text: $('#editAbout').value || null,
        skills: $('#editSkills').value || null,
        avatar_url: avatarUrl
    };

    const {
        data: updatedProfile,
        error
    } = await supabaseClient.from('profiles').update(payload).eq('id', user.id).select().single();
    if (error) {
        toast('Could not save profile');
        console.error(error);
        return;
    }

    window.unihubProfile = updatedProfile;
    applyProfileDisplay(updatedProfile);
    loadProfileStats(window.currentUserId);
    if ($('#profile').classList.contains('active')) renderProfilePage(updatedProfile, true);

    closeEditProfileModal();
    toast('Profile updated!');
};

document.addEventListener('click', async e => {
    const btn = e.target.closest('.edit-post-btn[data-target-id]');
    if (!btn) return;
    const targetType = btn.dataset.targetType, targetId = btn.dataset.targetId;
    const cfg = targetTables[targetType];
    if (!cfg) return;
    const {data: row, error} = await supabaseClient.from(cfg.table).select('*').eq('id', targetId).single();
    if (error || !row) {
        toast('Could not load post for editing');
        console.error(error);
        return;
    }
    openEditModal(targetType, row);
});

document.addEventListener('click', async e => {
    const btn = e.target.closest('.delete-post-btn[data-target-id]');
    if (!btn) return;
    const targetType = btn.dataset.targetType, targetId = btn.dataset.targetId;
    const cfg = targetTables[targetType];
    if (!cfg) return;
    if (!confirm("Delete this post? This can't be undone.")) return;
    const {error} = await supabaseClient.from(cfg.table).delete().eq('id', targetId);
    if (error) {
        toast('Could not delete post');
        console.error(error);
        return;
    }
    toast('Post deleted');
    reloadFns[targetType]?.();
    loadMyPosts(window.currentUserId);
});

const detailModal = $('#detailModal');
let currentDetail = null;
let currentFollowList = null;

const detailConfig = {
    resource: {
        table: 'resources',
        label: 'Resource',
        renderMaterial: r => `
            <span class="badge">${(r.resource_type || 'notes').toUpperCase()}</span>
            <h2>${r.title}</h2>
            <small>${[shortLabel(r.faculty), r.study_year].filter(Boolean).join(' · ')}</small>
            <p>${r.description || 'No description added.'}</p>
            ${r.file_url ? `<div class="file-preview"><a href="${r.file_url}" target="_blank" rel="noopener">Open file in a new tab ↗</a></div>` : '<p class="muted">No file attached.</p>'}
        `
    },
    exam: {
        table: 'exams',
        label: 'Exam',
        renderMaterial: x => `
        <span class="badge">EXAM${x.has_solutions ? ' · SOLUTIONS INCLUDED' : ''}</span>
        <h2>${x.subject}${x.exam_period ? ' — ' + x.exam_period : ''}</h2>
        <small>${[shortLabel(x.faculty), x.difficulty ? `Difficulty: ${x.difficulty}` : ''].filter(Boolean).join(' · ')}</small>
        <p>${x.description || 'No description added.'}</p>
        ${x.file_url ? `<div class="file-preview"><a href="${x.file_url}" target="_blank" rel="noopener">Open file in a new tab ↗</a></div>` : '<p class="muted">No file attached.</p>'}
    `
    },
    internship: {
        table: 'internships',
        label: 'Internship',
        renderMaterial: x => `
            <span class="badge">${(x.category || 'SOFTWARE').toUpperCase()}</span>
            <h2>${x.title}</h2>
            <small>${[x.company, workTypeLabel(x.work_type), x.city].filter(Boolean).join(' · ')}</small>
            <p>${x.description || 'No description added.'}</p>
        `,
        renderActions: (x, targetType, targetId, counts, mine, saved) => `
            ${likeButtonHtml(targetType, targetId, counts, mine)}
            ${saveButtonHtml(targetType, targetId, saved)}
            ${x.apply_url ? `<a class="apply-btn detail-apply" href="${x.apply_url}" target="_blank" rel="noopener">Apply now</a>` : '<span class="muted">No application link</span>'}
        `
    },
    event: {
        table: 'events',
        label: 'Event',
        renderMaterial: x => `
            <span class="badge">${(x.event_type || 'EVENT').toUpperCase()}</span>
            <h2>${x.title}</h2>
            <small>${[x.location, x.city].filter(Boolean).join(' · ')}</small>
            <p>${x.description || 'No description added.'}</p>
        `,
        renderActions: (x, targetType, targetId, counts, mine, saved) => `
            ${likeButtonHtml(targetType, targetId, counts, mine)}
            ${saveButtonHtml(targetType, targetId, saved)}
            ${x.webpage_url ? `<a class="apply-btn detail-apply" href="${x.webpage_url}" target="_blank" rel="noopener">View event</a>` : '<span class="muted">No event link</span>'}
        `
    },
    team_request: {
        table: 'team_requests',
        label: 'Team request',
        renderMaterial: r => `
        <span class="badge">${(projectTypeLabels[r.project_type] || 'TEAM').toString().toUpperCase()}</span>
        <h2>${r.title}</h2>
        <small>${(r.skills_needed || '').split(',').map(s => s.trim()).filter(Boolean).join(' · ')}</small>
        <p>${r.description || 'No description added.'}</p>
    `,
        renderActions: (r, targetType, targetId, counts, mine, saved) => `
        ${likeButtonHtml(targetType, targetId, counts, mine)}
        ${saveButtonHtml(targetType, targetId, saved)}
        <button class="contact-btn detail-contact" data-owner-id="${r.user_id}" data-target-id="${targetId}">Contact</button>
    `
    },
    roommate_post: {
        table: 'roommate_posts',
        label: 'Roommate post',
        renderMaterial: x => `
        <span class="badge">€${x.rent}/MONTH</span>
        <h2>${x.title}</h2>
        <small>${[x.location, x.city].filter(Boolean).join(' · ')}</small>
        <p>${x.description || 'No description added.'}</p>
        <div class="room-info"><div><b>${x.amenities || '—'}</b><span>included</span></div><div><b>${x.move_in_date ? new Date(x.move_in_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        }) : '—'}</b><span>move-in</span></div></div>
    `,
        renderActions: (x, targetType, targetId, counts, mine, saved) => `
        ${likeButtonHtml(targetType, targetId, counts, mine)}
        ${saveButtonHtml(targetType, targetId, saved)}
        <button class="contact-btn detail-contact" data-owner-id="${x.user_id}" data-target-id="${targetId}">Contact</button>
    `
    }
};

async function openDetail(targetType, targetId) {
    const cfg = detailConfig[targetType];
    if (!cfg) return;
    const {
        data: row,
        error
    } = await supabaseClient.from(cfg.table).select('*, profiles(full_name, avatar_url)').eq('id', targetId).single();
    if (error || !row) {
        toast('Could not load post');
        console.error(error);
        return;
    }

    currentDetail = {targetType, targetId, row};
    const posterName = row.profiles?.full_name || 'UniHub Student';

    $('#detailMaterial').innerHTML = `
        <button class="post-author" data-user-id="${row.user_id}"><span class="avatar-sm">${avatarSmInner(posterName, row.profiles?.avatar_url)}</span><span>${posterName}</span></button>
        ${cfg.renderMaterial(row)}
    `;

    const {counts, mine} = await getLikeState(targetType, [targetId]);
    const saved = await getSaveState(targetType, [targetId]);
    $('#detailActions').innerHTML = cfg.renderActions
        ? cfg.renderActions(row, targetType, targetId, counts, mine, saved)
        : `
        ${likeButtonHtml(targetType, targetId, counts, mine)}
        ${saveButtonHtml(targetType, targetId, saved)}
        <button class="download-btn" data-file-url="${row.file_url || ''}" data-filename="${row.title || 'download'}">Download</button>
    `;

    detailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadDetailComments(targetType, targetId);
}

function closeDetail() {
    detailModal.classList.remove('open');
    document.body.style.overflow = '';
    currentDetail = null;
}

$('#closeDetailModal').onclick = closeDetail;
detailModal.onclick = e => {
    if (e.target === detailModal) closeDetail();
};

function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, ch => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[ch]));
}

async function loadDetailComments(targetType, targetId) {
    const user = await getAuthUser();
    const {
        data: rows,
        error
    } = await supabaseClient.from('comments').select('*, profiles(full_name, avatar_url)').eq('target_type', targetType).eq('target_id', targetId).order('created_at', {ascending: true});
    if (error) {
        console.error(error);
        return;
    }
    $('#detailComments').innerHTML = rows.length ? rows.map(c => {
        const name = c.profiles?.full_name || 'UniHub Student';
        const mine = user && c.user_id === user.id;
        return `<div class="comment-item">
            <div class="comment-head">
                <button type="button" class="post-author comment-author" data-user-id="${c.user_id}">
                    <span class="avatar-sm comment-avatar">${avatarSmInner(name, c.profiles?.avatar_url)}</span>
                    <span class="comment-author-text"><b>${escapeHtml(name)}</b><small>${timeAgo(c.created_at)}</small></span>
                </button>
                ${mine ? `<button type="button" class="detail-comment-delete" data-comment-id="${c.id}">×</button>` : ''}
            </div>
            <p class="comment-body">${escapeHtml(c.content)}</p>
        </div>`;
    }).join('') : '<p class="muted">No comments yet — be the first.</p>';
}

$('#detailCommentForm').onsubmit = async e => {
    e.preventDefault();
    if (!currentDetail) return;
    const {data: {user}} = await supabaseClient.auth.getUser();
    if (!user) {
        toast('You need to be logged in');
        return;
    }
    const content = $('#detailCommentInput').value.trim();
    if (!content) return;
    const {targetType, targetId} = currentDetail;

    const {error} = await supabaseClient.from('comments').insert({
        user_id: user.id,
        target_type: targetType,
        target_id: targetId,
        content
    });
    if (error) {
        toast('Could not post comment');
        console.error(error);
        return;
    }

    $('#detailCommentInput').value = '';
    loadDetailComments(targetType, targetId);
    const ownerId = await getPostOwner(targetType, targetId);
    if (ownerId) createNotification(ownerId, 'comment', targetType, targetId, `commented on your ${targetTables[targetType]?.label.toLowerCase() || 'post'}`);
};

document.addEventListener('click', async e => {
    const del = e.target.closest('.detail-comment-delete[data-comment-id]');
    if (!del || !currentDetail) return;
    const {error} = await supabaseClient.from('comments').delete().eq('id', del.dataset.commentId);
    if (error) {
        toast('Could not delete comment');
        console.error(error);
        return;
    }
    loadDetailComments(currentDetail.targetType, currentDetail.targetId);
});

async function downloadFile(url, filename) {
    if (!url) {
        toast('No file attached to this post');
        return;
    }
    try {
        toast('Preparing download…');
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed');
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
    } catch (err) {
        console.error(err);
        toast('Download failed — try opening the file link instead');
    }
}

document.addEventListener('click', e => {
    const btn = e.target.closest('.download-btn[data-file-url]');
    if (!btn) return;
    downloadFile(btn.dataset.fileUrl, btn.dataset.filename || 'download');
});

document.addEventListener('click', e => {
    const btn = e.target.closest('.preview-btn[data-target-id]');
    if (!btn) return;
    openDetail(btn.dataset.targetType, btn.dataset.targetId);
});

document.addEventListener('click', e => {
    const btn = e.target.closest('.post-author[data-user-id]');
    if (!btn) return;
    const activeView = document.querySelector('.view.active');
    if (btn.closest('#followListModal') && currentFollowList) {
        profileReturnContext = {type: 'followlist', profileId: currentFollowList.userId, listType: currentFollowList.type, fromView: activeView?.id};
    } else if (currentDetail) {
        profileReturnContext = {type: 'detail', targetType: currentDetail.targetType, targetId: currentDetail.targetId, fromView: activeView?.id};
    } else if (activeView && activeView.id !== 'profile') {
        profileReturnContext = {type: 'view', view: activeView.id};
    } else {
        profileReturnContext = null;
    }
    closeCommentsModal();
    closeDetail();
    closeFollowListModal();
    showView('profile', {userId: btn.dataset.userId});
});

// Click anywhere on a configured card (except its buttons/links) opens the detail panel
document.addEventListener('click', e => {
    if (e.target.closest('button, a')) return;
    const card = e.target.closest('[data-target-type][data-target-id]');
    if (!card || !detailConfig[card.dataset.targetType]) return;
    openDetail(card.dataset.targetType, card.dataset.targetId);
});

/* Followers / Following list */
const followListModal = $('#followListModal');

function closeFollowListModal() {
    followListModal.classList.remove('open');
    document.body.style.overflow = '';
    currentFollowList = null;
}

$('#closeFollowListModal').onclick = closeFollowListModal;
followListModal.onclick = e => {
    if (e.target === followListModal) closeFollowListModal();
};

async function openFollowList(userId, type) {
    currentFollowList = {userId, type};
    $('#followListTitle').textContent = type === 'followers' ? 'Followers' : 'Following';
    $('#followListContent').innerHTML = '<p class="muted">Loading…</p>';
    followListModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const col = type === 'followers' ? 'following_id' : 'follower_id';
    const otherCol = type === 'followers' ? 'follower_id' : 'following_id';
    const {data: rows, error} = await supabaseClient.from('follows').select(otherCol).eq(col, userId);
    if (error) {
        console.error(error);
        $('#followListContent').innerHTML = '<p class="muted">Could not load.</p>';
        return;
    }
    const ids = rows.map(r => r[otherCol]);
    if (!ids.length) {
        $('#followListContent').innerHTML = `<p class="muted">No ${type} yet.</p>`;
        return;
    }

    const {data: profiles} = await supabaseClient.from('profiles').select('id, full_name, avatar_url').in('id', ids);
    const showUnfollow = userId === window.currentUserId && type === 'following';

    $('#followListContent').innerHTML = (profiles || []).map(p => `
        <div class="activity">
            <button class="post-author" data-user-id="${p.id}" style="display:contents"><b>${avatarSmInner(p.full_name, p.avatar_url)}</b></button>
            <button class="post-author" data-user-id="${p.id}" style="display:contents"><div><strong>${p.full_name || 'UniHub Student'}</strong></div></button>
            ${showUnfollow ? `<button class="unfollow-list-btn" data-target-id="${p.id}">Unfollow</button>` : ''}
        </div>
    `).join('');
}

document.addEventListener('click', async e => {
    const btn = e.target.closest('.unfollow-list-btn[data-target-id]');
    if (!btn) return;
    const {error} = await supabaseClient.from('follows').delete()
        .eq('follower_id', window.currentUserId).eq('following_id', btn.dataset.targetId);
    if (error) {
        toast('Could not unfollow');
        return;
    }
    btn.closest('.activity').remove();
    loadProfileStats(window.currentUserId);
});

/* Education directory integration */
(async function initialiseEducationDirectory() {
    if (!window.UNIHUB_EDUCATION) return;
    const user = await getAuthUser();
    window.currentUserId = user?.id || null;
    refreshMessagesBadge();
    const dbProfile = user ? (await supabaseClient.from('profiles').select('*').eq('id', user.id).single()).data : null;

    applyProfileDisplay(dbProfile);

    const universitySelects = [document.getElementById('notesUniversityFilter'), document.getElementById('postUniversity'), document.getElementById('editUniversity')].filter(Boolean);
    universitySelects.forEach(select => {
        const first = select.options[0]?.outerHTML || '<option value="">Choose university</option>';
        select.innerHTML = first + UNIHUB_EDUCATION.filter(u => u.id !== 'other').map(u => `<option value="${u.id}">${u.shortName} — ${u.name}</option>`).join('');
        if (dbProfile?.university_id && select.id === 'postUniversity') select.value = dbProfile.university_id;
    });

    function populateFaculties(universityId, select, includeAll = false) {
        const uni = getUniHubUniversity(universityId);
        select.innerHTML = `<option value="">${includeAll ? 'All IT faculties' : 'Choose faculty'}</option>` + (uni?.faculties || []).map(f => `<option value="${f.id}">${f.shortName} — ${f.name}</option>`).join('');
    }

    function populatePrograms(universityId, facultyId, select) {
        const faculty = getUniHubFaculty(universityId, facultyId);
        select.innerHTML = '<option value="">Choose programme</option>' + (faculty?.programs || []).map(p => `<option value="${p}">${p}</option>`).join('');
    }

    const notesUniversity = document.getElementById('notesUniversityFilter');
    const notesFaculty = document.getElementById('notesFacultyFilter');
    notesUniversity?.addEventListener('change', () => populateFaculties(notesUniversity.value, notesFaculty, true));
    if (notesUniversity && dbProfile?.university_id) {
        notesUniversity.value = dbProfile.university_id;
        populateFaculties(dbProfile.university_id, notesFaculty, true);
        notesFaculty.value = dbProfile.faculty_id || '';
    }

    const postUniversity = document.getElementById('postUniversity');
    const postFaculty = document.getElementById('postFaculty');
    const postProgram = document.getElementById('postProgram');
    postUniversity?.addEventListener('change', () => {
        populateFaculties(postUniversity.value, postFaculty);
        populatePrograms('', '', postProgram);
    });
    postFaculty?.addEventListener('change', () => populatePrograms(postUniversity.value, postFaculty.value, postProgram));
    window.unihubProfile = dbProfile;
    window.populateFaculties = populateFaculties;
    window.populatePrograms = populatePrograms;
    window.applyProfilePrefill = function () {
        const p = window.unihubProfile;
        if (postUniversity && p?.university_id) {
            postUniversity.value = p.university_id;
            populateFaculties(p.university_id, postFaculty);
            postFaculty.value = p.faculty_id || '';
            populatePrograms(p.university_id, p.faculty_id, postProgram);
            postProgram.value = p.study_programme || '';
        }
    };
    window.applyProfilePrefill();
    restoreLastView();
})();