// Samanwaya Nepal - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initContactForm();
});

// Navigation scroll effect
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  function handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Scroll-triggered animations
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-fade-in-up, .pillar-card, .author-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// Mobile menu functionality
let mobileMenuOpen = false;

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!menuToggle) return;
  
  menuToggle.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!mobileMenu) return;
  
  mobileMenuOpen = !mobileMenuOpen;
  
  if (mobileMenuOpen) {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!mobileMenu) return;
  
  mobileMenuOpen = false;
  mobileMenu.classList.add('hidden');
  document.body.style.overflow = '';
}

// Contact form handling
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = formData.get('name') || document.querySelector('input[type="text"]')?.value;
    const email = formData.get('email') || document.querySelector('input[type="email"]')?.value;
    const message = formData.get('message') || document.querySelector('textarea')?.value;
    
    // Simple validation
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual API call)
    const submitButton = this.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      this.reset();
    }, 1500);
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '16px 24px',
    borderRadius: '12px',
    backgroundColor: type === 'success' ? '#40916C' : type === 'error' ? '#DC2626' : '#1B4332',
    color: '#FFFFFF',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: '100',
    animation: 'slideIn 0.3s ease-out',
    maxWidth: '400px'
  });
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Brand click to scroll to top
function initBrandClick() {
  const brand = document.querySelector('.navbar-brand');
  
  if (!brand) return;
  
  brand.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    closeMobileMenu();
  });
}

// Call initBrandClick when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrandClick);
} else {
  initBrandClick();
}

console.log('Samanwaya Nepal website initialized successfully!');
