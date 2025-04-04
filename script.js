document.addEventListener('DOMContentLoaded', function() {
    // ===== Page Navigation System =====
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the requested page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            // Fallback to home if page doesn't exist
            document.getElementById('home').classList.add('active');
        }
    }

    // Set up navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').replace('.html', '').replace('#', '');
            showPage(pageId);
            window.history.pushState({}, '', `#${pageId}`);
        });
    });

    // Check URL on initial load
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (message.length < 10) {
                alert('Message should be at least 10 characters');
                return;
            }

            alert('Message sent successfully!');
            this.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== Back to Top Button =====
    const topButton = document.createElement('div');
    topButton.className = 'back-to-top';
    topButton.innerHTML = '↑';
    topButton.style.display = 'none'; // Hidden by default
    document.body.appendChild(topButton);

    window.addEventListener('scroll', () => {
        topButton.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});