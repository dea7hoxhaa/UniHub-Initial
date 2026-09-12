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

const c = document.getElementById("publicCanvas"), x = c.getContext("2d");
let p = [];

function r() {
    c.width = innerWidth * devicePixelRatio;
    c.height = innerHeight * devicePixelRatio;
    c.style.width = innerWidth + "px";
    c.style.height = innerHeight + "px";
    x.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    p = Array.from({ length: Math.min(75, innerWidth / 17) }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18
    }));
}

function d() {
    x.clearRect(0, 0, innerWidth, innerHeight);
    const light = root.dataset.theme === 'light';

    p.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > innerWidth) a.vx *= -1;
        if (a.y < 0 || a.y > innerHeight) a.vy *= -1;

        x.fillStyle = light
            ? "rgba(94,72,190,.28)"
            : "rgba(180,160,255,.45)";

        x.beginPath();
        x.arc(a.x, a.y, 1, 0, 7);
        x.fill();

        for (let j = i + 1; j < p.length; j++) {
            let b = p[j];
            let m = Math.hypot(a.x - b.x, a.y - b.y);

            if (m < 120) {
                x.strokeStyle = `rgba(139,92,246,${(1 - m / 120) * (light ? .07 : .1)})`;

                x.beginPath();
                x.moveTo(a.x, a.y);
                x.lineTo(b.x, b.y);
                x.stroke();
            }
        }
    });

    requestAnimationFrame(d);
}

r();
d();
addEventListener("resize", r);

const o = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add("visible");
    }
}), {
    threshold: .1
});

document.querySelectorAll(".reveal").forEach(e => o.observe(e));

const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;

    const n = e.target;
    const t = +n.dataset.count;
    const s = performance.now();

    function a(now) {
        let q = Math.min(1, (now - s) / 1100);

        n.textContent =
            Math.floor(t * (1 - Math.pow(1 - q, 3))).toLocaleString() + "+";

        if (q < 1) {
            requestAnimationFrame(a);
        }
    }

    requestAnimationFrame(a);
    co.unobserve(n);
}));

document.querySelectorAll("[data-count]").forEach(e => co.observe(e));

const hubVisual = document.getElementById('hubVisual');

if (
    hubVisual &&
    matchMedia('(pointer:fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;

    hubVisual.addEventListener('pointermove', e => {
        const r = hubVisual.getBoundingClientRect();

        tx = (e.clientX - r.left) / r.width - .5;
        ty = (e.clientY - r.top) / r.height - .5;
    });

    hubVisual.addEventListener('pointerleave', () => {
        tx = 0;
        ty = 0;
    });

    (function animateHub() {
        rx += ((-ty * 7) - rx) * .075;
        ry += ((tx * 9) - ry) * .075;

        hubVisual.style.transform =
            `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;

        requestAnimationFrame(animateHub);
    })();
}


// Contact form presentation behavior.
// Supabase/backend delivery can be connected later
// without changing the form UI.

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    if (contactStatus) {
        contactStatus.textContent =
            'Thank you! Your message is ready to be connected to the project backend.';
    }

    contactForm.reset();
});