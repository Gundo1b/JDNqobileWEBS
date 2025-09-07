// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Subject card interactions
document.addEventListener('DOMContentLoaded', function() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            showSubjectDetails(subject);
        });
        
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Show subject details (could be expanded to show modal or more info)
function showSubjectDetails(subject) {
    const messages = {
        'reading': 'Ready to start your reading adventure? Our tutors make learning letters and sounds super fun!',
        'math': 'Let\'s explore the wonderful world of numbers! Math can be as fun as playing games!',
        'writing': 'Time to create amazing stories and practice beautiful handwriting!',
        'science': 'Get ready to discover amazing things about our world through fun experiments!'
    };
    
    const message = messages[subject] || 'Let\'s start learning together!';
    
    // Create a fun alert with the subject message
    showFunAlert(message);
}

// Fun alert function
function showFunAlert(message) {
    // Create custom alert overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        font-size: 1.2rem;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: bounce 0.5s ease;
    `;
    
    alertBox.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <i data-lucide="star" style="width: 2rem; height: 2rem; color: #ffd700; fill: #ffd700;"></i>
        </div>
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: white; color: #333; border: none; padding: 0.5rem 1rem; 
                       border-radius: 25px; margin-top: 1rem; cursor: pointer; font-weight: bold;
                       display: flex; align-items: center; gap: 0.5rem; justify-content: center;">
            Awesome! <i data-lucide="rocket" style="width: 1rem; height: 1rem;"></i>
        </button>
    `;
    
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
    
    // Initialize icons in the alert
    lucide.createIcons();
    
    // Remove overlay when clicking outside
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const parentName = formData.get('parentName');
        const childName = formData.get('childName');
        const grade = formData.get('grade');
        const subject = formData.get('subject');
        
        // Simple form validation
        if (!parentName || !childName || !grade || !subject) {
            showFunAlert('Please fill in all the required fields so we can help you better!');
            return;
        }
        
        // Send to WhatsApp
        sendToWhatsApp(parentName, childName, grade, subject, formData.get('message'));
        contactForm.reset();
    });
});

// Send form data to WhatsApp
function sendToWhatsApp(parentName, childName, grade, subject, message) {
    const whatsappNumber = '27763803862';
    const text = `Hi! I'm interested in Nqobile Tutoring.\n\nParent: ${parentName}\nChild: ${childName}\nGrade: ${grade}\nSubject: ${subject}\n\nMessage: ${message || 'No additional message'}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Add some fun interactions for better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add floating animation to learning icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add entrance animations for cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for entrance animations
    const cards = document.querySelectorAll('.subject-card, .feature');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add some educational mini-games or interactions
function createLearningGame() {
    // This could be expanded to include simple educational games
    // For now, we'll add a simple counting game
    const games = [
        {
            question: "🍎 + 🍎 = ?",
            answer: "2",
            hint: "Count the apples!"
        },
        {
            question: "What letter does 'Cat' start with?",
            answer: "C",
            hint: "Think about the first sound you hear!"
        },
        {
            question: "How many sides does a triangle have?",
            answer: "3",
            hint: "Count the sides of this shape: △"
        }
    ];
    
    // This function could be called to show random learning questions
    // Implementation would depend on specific requirements
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    console.log('Nqobile Tutoring website loaded successfully!');
    
    // Add some welcome interactions
    setTimeout(() => {
        const hero = document.querySelector('.hero-content h2');
        if (hero) {
            hero.style.animation = 'bounce 2s infinite';
        }
    }, 1000);
});