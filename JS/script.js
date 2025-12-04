document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
    const navbar = document.getElementById('navbar');
    const featuresDropdown = document.getElementById('features-dropdown');
    const featuresLink = featuresDropdown.querySelector('.nav-link');

    // Toggle Mobile Menu
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');

        // If the menu is closing, also explicitly close the dropdown
        if (isActive) {
            featuresDropdown.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Scroll Effect (Add shadow on scroll)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Dropdown Handling
    featuresLink.addEventListener('click', (e) => {
        // Only activate click toggle on mobile screens
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent link navigation
            featuresDropdown.classList.toggle('active');
        }
    });

    // Close menu when resizing from mobile to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset all mobile states
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            featuresDropdown.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});