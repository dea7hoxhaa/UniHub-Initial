(function () {
    const CONSENT_KEY = 'unihub-cookie-consent';

    function saveChoice(choice) {
        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify({
                choice,
                savedAt: new Date().toISOString()
            })
        );
    }

    function hasChoice() {
        return Boolean(localStorage.getItem(CONSENT_KEY));
    }

    function buildBanner() {
        const banner = document.createElement('section');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie notice');

        banner.innerHTML = `
            <div class="cookie-copy">
                <strong>Cookies and storage</strong>
                <p>UniHub uses essential browser storage for login sessions and small preferences like your last viewed tab. We do not use advertising or analytics cookies. Read our <a href="privacy.html">Privacy page</a>.</p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn" type="button" data-cookie-choice="rejected">Reject</button>
                <button class="cookie-btn primary" type="button" data-cookie-choice="accepted">Accept</button>
            </div>
        `;

        banner.addEventListener('click', event => {
            const button = event.target.closest('[data-cookie-choice]');

            if (!button) {
                return;
            }

            saveChoice(button.dataset.cookieChoice);
            banner.hidden = true;
            banner.remove();
        });

        return banner;
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (hasChoice()) {
            return;
        }

        document.body.appendChild(buildBanner());
    });
})();
