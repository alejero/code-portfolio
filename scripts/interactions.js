// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const logoImage = document.querySelector('.navbar-logo img');

// Paths for logos
const lightLogoPath = "assets/alejero.studio/logos/alejero.studio-logo-black.svg";
const darkLogoPath = "assets/alejero.studio/logos/alejero.studio-logo-white.svg";

// Check and apply saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    logoImage.src = darkLogoPath; // Use white logo in dark mode
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Update icon for light mode
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    // Update toggle icon
    darkModeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    // Update logo
    logoImage.src = isDarkMode ? darkLogoPath : lightLogoPath;
});

// Skills Filter Functionality
const skillFilterButtons = document.querySelectorAll('.skills-filter .filter-btn');
const skillBubbles = document.querySelectorAll('.skill-bubble');
let activeSkillFilters = new Set(['all']); // Initialize with 'all'

// Set initial state
document.querySelector('.skills-filter [data-filter="all"]').classList.add('active');
updateSkillBubbles();

function updateSkillBubbles() {
    skillBubbles.forEach((bubble) => {
        const category = bubble.dataset.category;
        const isHighlighted = activeSkillFilters.has('all') || 
                            (activeSkillFilters.size > 0 && [...activeSkillFilters].includes(category));
        
        bubble.classList.toggle('highlighted', isHighlighted);
    });
}

skillFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Toggle filter button state
        if (activeSkillFilters.has(filter)) {
            activeSkillFilters.delete(filter);
            button.classList.remove('active');
            
            // If no filters are active, set 'all' as default
            if (activeSkillFilters.size === 0) {
                activeSkillFilters.add('all');
                document.querySelector('.skills-filter [data-filter="all"]').classList.add('active');
            }
        } else {
            if (filter === 'all') {
                // If 'all' is clicked, remove other filters
                activeSkillFilters.clear();
            } else {
                // If another filter is clicked, remove 'all'
                activeSkillFilters.delete('all');
                document.querySelector('.skills-filter [data-filter="all"]').classList.remove('active');
            }
            activeSkillFilters.add(filter);
            button.classList.add('active');
        }

        updateSkillBubbles();

        // Update all button states
        skillFilterButtons.forEach((btn) => {
            const btnFilter = btn.dataset.filter;
            btn.classList.toggle('active', activeSkillFilters.has(btnFilter));
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Portfolio Filter Functionality
const portfolioFilterButtons = document.querySelectorAll('.portfolio-filter .filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');
let activePortfolioFilters = new Set(['all']); // Initialize with 'all'

// Set initial state
document.querySelector('.portfolio-filter [data-filter="all"]').classList.add('active');
updatePortfolioItems();

function updatePortfolioItems() {
    portfolioItems.forEach((item) => {
        const category = item.dataset.category;
        const isVisible = activePortfolioFilters.has('all') || 
                         (activePortfolioFilters.size > 0 && [...activePortfolioFilters].includes(category));
        
        item.style.display = isVisible ? 'block' : 'none';
    });
}

portfolioFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Toggle filter button state
        if (activePortfolioFilters.has(filter)) {
            activePortfolioFilters.delete(filter);
            button.classList.remove('active');
            
            // If no filters are active, set 'all' as default
            if (activePortfolioFilters.size === 0) {
                activePortfolioFilters.add('all');
                document.querySelector('.portfolio-filter [data-filter="all"]').classList.add('active');
            }
        } else {
            if (filter === 'all') {
                // If 'all' is clicked, remove other filters
                activePortfolioFilters.clear();
            } else {
                // If another filter is clicked, remove 'all'
                activePortfolioFilters.delete('all');
                document.querySelector('.portfolio-filter [data-filter="all"]').classList.remove('active');
            }
            activePortfolioFilters.add(filter);
            button.classList.add('active');
        }

        updatePortfolioItems();

        // Update all button states
        portfolioFilterButtons.forEach((btn) => {
            const btnFilter = btn.dataset.filter;
            btn.classList.toggle('active', activePortfolioFilters.has(btnFilter));
        });
    });
});