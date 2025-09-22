// Global Variables
        let currentPage = 'home';

        // Loading Screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hide');
            }, 1500);
        });

        document.getElementById("currentYear").textContent = new Date().getFullYear();

        // Page Navigation System
        function showPage(pageName) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageName).classList.add('active');
            currentPage = pageName;
            
            // Update navbar active state
            updateNavLinks();
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Trigger animations for the new page
            setTimeout(() => {
                animatePageElements();
            }, 100);
        }

        function updateNavLinks() {
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.style.color = '';
            });
        }

        // Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu i');
            
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('fa-bars');
                mobileMenu.classList.add('fa-times');
            } else {
                mobileMenu.classList.remove('fa-times');
                mobileMenu.classList.add('fa-bars');
            }
        }

        function closeMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu i');
            
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('fa-times');
            mobileMenu.classList.add('fa-bars');
        }

        // Scroll Reveal Animation
        function revealElements() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        function animatePageElements() {
            const currentPageElement = document.getElementById(currentPage);
            const reveals = currentPageElement.querySelectorAll('.reveal');
            
            // Reset animations
            reveals.forEach(element => {
                element.classList.remove('active');
            });
            
            // Trigger animations with delay
            reveals.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100);
            });
        }

        // Contact Form Handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Notification System
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 2rem;
                border-radius: 5px;
                color: white;
                font-weight: bold;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 400px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            `;
            
            if (type === 'success') {
                notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            } else {
                notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
            }
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">×</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 5000);
        }

        // Gallery Image Click Handler
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('span').textContent;
                showNotification(`${title} - Photo gallery coming soon!`, 'success');
            });
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
            
            revealElements();
        });

        // Smooth Scrolling for Internal Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Initialize animations on page load
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                animatePageElements();
            }, 2000);
        });

        // Keyboard Navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Form Select Styling
        document.querySelectorAll('select').forEach(select => {
            select.style.cssText = `
                width: 100%;
                padding: 0.8rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.3s ease;
                background-color: white;
                cursor: pointer;
            `;
        });

        // Enhanced Form Validation
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('focus', function() {
                this.style.borderColor = 'var(--secondary-color)';
                this.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.3)';
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            
            if (field.hasAttribute('required') && !value) {
                showFieldError(field, 'This field is required');
                return false;
            }
            
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
            }
            
            if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    return false;
                }
            }
            
            clearFieldError(field);
            return true;
        }

        function showFieldError(field, message) {
            field.style.borderColor = '#f44336';
            field.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
            
            let errorDiv = field.parentNode.querySelector('.field-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.cssText = `
                    color: #f44336;
                    font-size: 0.8rem;
                    margin-top: 0.3rem;
                    animation: fadeInUp 0.3s ease;
                `;
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
        }

        function clearFieldError(field) {
            field.style.borderColor = '#e0e0e0';
            field.style.boxShadow = 'none';
            
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }

        // Add some interactive hover effects
        document.querySelectorAll('.card, .gallery-item').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('gallery-item') ? 'scale(1.05)' : 'translateY(-10px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = this.classList.contains('gallery-item') ? 'scale(1)' : 'translateY(0)';
            });
        });

        // Initialize page
        revealElements();