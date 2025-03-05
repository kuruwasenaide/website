// wait for dom to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // elements
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    // toggle navigation menu for mobile
    burger.addEventListener('click', () => {
        // toggle navigation
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        
        // animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade .5s ease forwards ${index / 7 + .3}s`;
            }
        });
    });
    
    // close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // update active nav link on scroll
        updateActiveNavLink();
    });
    
    // update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }
    
    // initialize active nav link on page load
    updateActiveNavLink();
    
    // smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // form submission handling (AI made)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // simple validation
            if (!name || !email || !message) {
                alert('please fill all fields');
                return;
            }
            
            // simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'sending...';
            submitBtn.disabled = true;
            
            // simulate api call
            setTimeout(() => {
                alert('message not sent, try again later.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // add reveal animations for sections
    const revealElements = document.querySelectorAll('.section-header, .about-content, .projects-grid, .contact-container');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 150) {
                element.classList.add('revealed');
            }
        });
    };
    
    // add css classes for revealed elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .section-header, .about-content, .projects-grid, .contact-container {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    // call reveal function on scroll and on load
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // add typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.innerText;
        subtitle.innerText = ' ';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        };
        setTimeout(typeWriter, 0);
    }

    // animated main title
    const glitch = document.querySelector('.glitch');
    if (glitch) {
        const text = glitch.innerText;
        let i = 0;
        
        const animateCursor = () => {
          const textArray = text.split('');
          textArray[i] = '_';
          glitch.innerText = textArray.join('');
          i = (i + 1) % text.length;
          setTimeout(animateCursor, 1000);
        };
        setTimeout(animateCursor, 0);
      }
    
    // add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(255, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
});

// pasted moving title code

// function MovingTitle(writeText, interval, visibleLetters) {
//     var _instance = {};

//     var _currId = 0;
//     var _numberOfLetters = writeText.length;

//     function updateTitle() {
//         _currId += 1;
//         if(_currId > _numberOfLetters - 1) {
//             _currId = 0; 
//         }

//         var startId = _currId;
//         var endId = startId + visibleLetters;
//         var finalText;
//         if(endId < _numberOfLetters - 1) {
//             finalText = writeText.substring(startId, endId);
//         } else {
//             var cappedEndId = _numberOfLetters;
//             endId = endId - cappedEndId;

//             finalText = writeText.substring(startId, cappedEndId) +     writeText.substring(0, endId);
//         }

//         document.title = finalText; 
//     }

//     _instance.init = function() {
//         setInterval(updateTitle, interval);
//     };

//     return _instance;
// }

// var title = new MovingTitle("clean-code ", 300, 10);
// title.init();