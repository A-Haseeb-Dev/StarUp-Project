// small helpers
        document.getElementById('yr').textContent = new Date().getFullYear();

        // New feature init functions (Demo/Modal)
        const modal = document.getElementById('modal');
        const demoModal = document.getElementById('demo-modal');

        function openSignup() { showModal(); }
        function openSignIn() { alert('Sign in flow — integrate auth (placeholder)'); }
        function showDemo() { showDemoModal(); }
        function openDemo() { showDemoModal(); } // Alias for consistency

        // modal controls
        function showModal() {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            // Focus first input for accessibility
            setTimeout(() => modal.querySelector('input')?.focus(), 50);
        }
        function closeModal() {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }

        function showDemoModal() {
            demoModal.style.display = 'flex';
            demoModal.setAttribute('aria-hidden', 'false');
        }
        function closeDemo() {
            demoModal.style.display = 'none';
            demoModal.setAttribute('aria-hidden', 'true');
            // stop video by resetting src
            const frame = document.getElementById('demoFrame');
            if (frame && frame.src) {
                const src = frame.src;
                frame.src = src;
            }
        }

        // Waitlist form handler (mock)
        function evtWaitlist(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');

            // Basic validation
            const inputs = [...form.querySelectorAll('input')];
            const invalid = inputs.some(i => !i.value.trim());
            if (invalid) {
                alert('Please complete all fields.');
                inputs.find(i => !i.value.trim())?.focus();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                const prevText = submitBtn.textContent;
                submitBtn.textContent = 'Joining...';

                setTimeout(() => {
                    alert('Thanks — you are on the waitlist. (demo only)');
                    submitBtn.disabled = false;
                    submitBtn.textContent = prevText;
                    closeModal();
                }, 900);
            }
        }

        // ADDED: Mobile menu toggles
        const mobileMenu = document.getElementById('mobileMenu');
        const hambtn = document.getElementById('hambtn');

        function openMobileMenu() {
            mobileMenu.style.display = 'block';
            setTimeout(() => mobileMenu.classList.add('open'), 10);
            mobileMenu.setAttribute('aria-hidden', 'false');
            hambtn.setAttribute('aria-expanded', 'true');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            setTimeout(() => mobileMenu.style.display = 'none', 320);
            mobileMenu.setAttribute('aria-hidden', 'true');
            hambtn.setAttribute('aria-expanded', 'false');
        }

        hambtn?.addEventListener('click', () => {
            const open = mobileMenu.style.display === 'block';
            if (open) closeMobileMenu(); else openMobileMenu();
        });

        // Close mobile menu when clicking outside panel
        mobileMenu?.addEventListener('click', (ev) => {
            if (ev.target === mobileMenu) closeMobileMenu();
        });

        // ADDED: FAQ accordion logic
        document.querySelectorAll('.faq-item').forEach(item => {
            const q = item.querySelector('.faq-q');
            q.addEventListener('click', () => toggleFaq(item));
            q.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleFaq(item);
            });
        });

        function toggleFaq(item) {
            const open = item.classList.toggle('open');
            const btn = item.querySelector('.faq-q');
            if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            // change sign
            const sign = item.querySelector('.faq-q .muted-sm');
            if (sign) sign.textContent = open ? '−' : '+';
        }

        // ADDED: Smooth scroll for internal links & mobile menu close
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href === '#') return;
                const el = document.querySelector(href);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // close mobile menu if open
                    if (mobileMenu?.style.display === 'block') closeMobileMenu();
                }
            });
        });

        // Simple accessibility: focus trapping for modals (full feature init)
        function trapFocus(modalElem, closeFn) {
            const focusable = modalElem.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            function keyListener(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
                if (e.key === 'Escape') {
                    closeFn();
                }
            }
            modalElem.addEventListener('keydown', keyListener);
            return () => modalElem.removeEventListener('keydown', keyListener);
        }

        // Attach focus trap when modals open
        const observer = new MutationObserver(() => {
            if (modal.style.display === 'flex') {
                trapFocus(modal, closeModal);
            }
            if (demoModal.style.display === 'flex') {
                trapFocus(demoModal, closeDemo);
            }
        });
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });