document.addEventListener('scroll', () => {
    // Profile image animation
    const profileImage = document.querySelector('.profile-image');
    const aboutSection = document.querySelector('.about');
    const heroContent = document.querySelector('.hero-content');
    const scrollPosition = window.scrollY;

    if (aboutSection && profileImage) {
        const aboutOffset = aboutSection.offsetTop;
        if (scrollPosition > aboutOffset + 100) {
            profileImage.classList.add('scrolled');
        } else {
            profileImage.classList.remove('scrolled');
        }
    }

    if (heroContent) {
        const heroOffset = heroContent.offsetTop;
        if (scrollPosition > heroOffset + 100) {
            heroContent.classList.add('scrolled');
        }
    }
    // Photo, Work, and Recent items scroll animation
    const items = document.querySelectorAll('.photo-item, .Work-item, .recent-item');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
        
        if (isVisible) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});

// Initial check for visible elements when page loads
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.photo-item, .Work-item, .recent-item');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
        
        if (isVisible) {
            item.classList.add('visible');
        }
    });

    // Auto-scroll for photography section
    const photoGrid = document.querySelector('.photo-grid');
    let isMouseOver = false;
    let scrollInterval;
    const scrollSpeed = 1; // Pixels per frame
    let scrollPosition = 0;

    // Function to handle the smooth scrolling
    function autoScroll() {
        if (!isMouseOver && photoGrid) {
            scrollPosition += scrollSpeed;
            
            // Reset scroll position when reaching the end
            if (scrollPosition >= photoGrid.scrollWidth - photoGrid.clientWidth) {
                scrollPosition = 0;
            }
            
            photoGrid.scrollLeft = scrollPosition;
        }
    }

    // Start auto-scrolling animation
    function startAutoScroll() {
        if (!scrollInterval) {
            scrollInterval = setInterval(autoScroll, 30); // Update every 30ms for smooth animation
        }
    }

    // Stop auto-scrolling
    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    // Pause scrolling when mouse is over the section
    if (photoGrid) {
        photoGrid.addEventListener('mouseenter', () => {
            isMouseOver = true;
        });

        photoGrid.addEventListener('mouseleave', () => {
            isMouseOver = false;
        });

        // Handle touch events for mobile devices
        photoGrid.addEventListener('touchstart', () => {
            isMouseOver = true;
        });

        photoGrid.addEventListener('touchend', () => {
            isMouseOver = false;
            // Prevent immediate scroll after touch
            setTimeout(() => {
                if (!isMouseOver) {
                    startAutoScroll();
                }
            }, 1000);
        });

        // Start auto-scrolling
        startAutoScroll();
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
