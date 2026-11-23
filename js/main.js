/**
 * RKDF University, Bhopal - Official Website JavaScript
 * Interactive functionality & UI enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Utility
  const toastContainer = document.getElementById('toast-container');
  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #c88e2d;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 2. Generic Modal System
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      const iframe = modal.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src; // resets playback
      }
      const anyActive = document.querySelector('.modal-overlay.active');
      if (!anyActive) {
        document.body.style.overflow = '';
      }
    }
  }

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.modal-close-btn')) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
      const activeSearch = document.querySelector('.search-overlay.active');
      if (activeSearch) activeSearch.classList.remove('active');
    }
  });

  // 3. Modal Triggers
  const applyTriggers = document.querySelectorAll('.trigger-apply');
  applyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-apply');
    });
  });

  const loginTriggers = document.querySelectorAll('.trigger-login');
  loginTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-login');
    });
  });

  const visitTriggers = document.querySelectorAll('.trigger-visit');
  visitTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-visit');
    });
  });

  const videoTriggers = document.querySelectorAll('.trigger-video');
  videoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-video');
    });
  });

  // 4. Program Data & Dynamic Modal for RKDF University
  const programsData = {
    'engineering': {
      title: 'Faculty of Engineering & Technology',
      badge: 'AICTE Approved & NAAC Accredited',
      description: 'RKDF Faculty of Engineering offers state-of-the-art technological education with modern laboratories, robotics facilities, computing centers, and active research partnerships. Students engage in project-based learning and industry internships.',
      features: ['Industry 4.0 Labs (AI, IoT, Robotics)', 'Hands-on Training on Electric Vehicles & Renewable Systems', 'Placement Partnerships with Top Tech Giants'],
      degrees: ['B.Tech in Computer Science & AI', 'B.Tech in Mechanical / Civil / Electrical Engineering', 'M.Tech & Ph.D. Research Programs']
    },
    'business': {
      title: 'Faculty of Management & Commerce',
      badge: 'UGC Recognized Leadership School',
      description: 'Prepare for visionary executive management and entrepreneurial leadership. The curriculum combines core business acumen with digital marketing, corporate finance, supply chain analytics, and practical industry immersion.',
      features: ['Dual Specialization (Marketing, Finance, HR, Operations)', 'Annual State-Level Mega Corporate Placement Drives', 'Entrepreneurship & Incubation Center'],
      degrees: ['Master of Business Administration (MBA)', 'Bachelor of Business Administration (BBA)', 'B.Com (Honours) with Computer Applications']
    },
    'agriculture': {
      title: 'Faculty of Agriculture Science & Technology',
      badge: 'ICAR Accredited Programs',
      description: 'Recognized for pioneering precision farming, sustainable agriculture, and crop biotechnology. The faculty boasts over 50+ acres of dedicated experimental research farms, polyhouses, and soil testing laboratories.',
      features: ['ICAR National Accreditation', 'Funded Project Fellowships in Precision Farming', 'Hands-on Experiential Rural Agriculture Work Experience (RAWE)'],
      degrees: ['B.Sc. (Honours) Agriculture (4 Years)', 'M.Sc. in Agronomy & Horticulture', 'Ph.D. in Agricultural Sciences']
    },
    'health': {
      title: 'Faculty of Pharmacy & Medical Sciences',
      badge: 'PCI, INC & Ayush Approved',
      description: 'A comprehensive healthcare education hub encompassing Pharmacy, Nursing, Paramedical Sciences, and Ram Krishna College of Ayurveda and Medical Sciences (RKCAMS). State-of-the-art simulation wards and clinical partnerships.',
      features: ['PCI Approved Modern Drug Testing Labs', 'In-Campus Hospital Clinical Training', '100% Internship & Clinical Placement Support'],
      degrees: ['Bachelor of Pharmacy (B.Pharm)', 'Diploma in Pharmacy (D.Pharm)', 'B.Sc. Nursing & Paramedical Diploma Courses']
    },
    'computer': {
      title: 'Faculty of Computer Applications & Law',
      badge: 'BCI Approved & IT Center',
      description: 'Developing high-level software professionals, cyber security analysts, and ethical legal practitioners. The law school is recognized by the Bar Council of India (BCI) with moot court training and legal aid clinics.',
      features: ['Moot Court Competitions & Legal Aid Clinic', 'Advanced Cloud Computing & Data Science Labs', 'Specialized Certifications in Cyber Law & AI'],
      degrees: ['Master of Computer Applications (MCA)', 'Bachelor of Computer Applications (BCA)', 'BA LLB (5 Years Integrated - BCI Approved)']
    }
  };

  const programCards = document.querySelectorAll('[data-program]');
  programCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const progKey = card.getAttribute('data-program');
      const data = programsData[progKey];
      if (data) {
        document.getElementById('prog-modal-title').textContent = data.title;
        document.getElementById('prog-modal-badge').textContent = data.badge;
        document.getElementById('prog-modal-desc').textContent = data.description;
        
        const featList = document.getElementById('prog-modal-features');
        featList.innerHTML = '';
        data.features.forEach(f => {
          const li = document.createElement('li');
          li.textContent = f;
          featList.appendChild(li);
        });

        const degList = document.getElementById('prog-modal-degrees');
        degList.innerHTML = '';
        data.degrees.forEach(d => {
          const li = document.createElement('li');
          li.textContent = d;
          degList.appendChild(li);
        });

        openModal('modal-program-detail');
      }
    });
  });

  // 5. News Articles Modal with Live RKDF Content
  const newsData = {
    'placement': {
      date: 'May 24, 2025',
      title: 'RKDF University State Level Mega Open Campus Placement Drive',
      author: 'Training & Placement Cell, RKDF Bhopal',
      content: 'RKDF University organized Central India’s premier State Level Mega Open Campus Recruitment Drive at its Gandhi Nagar campus. Over 150+ leading multinational and national corporations participated, offering competitive salary packages across Engineering, Pharmacy, Management, and Computer Applications disciplines. Over 1,200 student job offers were extended during the two-day recruitment event.'
    },
    'seminar': {
      date: 'April 28, 2025',
      title: 'National Seminar on Skill Empowerment and Sustainable Development',
      author: 'Department of Research & Development',
      content: 'Sponsored by the Indian Council of Social Science Research (ICSSR), the national seminar brought together academic leaders, researchers, and policymakers from across India to discuss innovative workforce skills, AI in sustainable economic development, and green enterprise growth at RKDF University.'
    },
    'agriculture': {
      date: 'April 05, 2025',
      title: 'ICAR Accreditation & Precision Farming Fellowship Grant',
      author: 'Faculty of Agriculture Sciences',
      content: 'Highlighting its academic excellence, RKDF University Faculty of Agriculture received new research grants for Project Fellowships in Precision Farming and Sustainable Agriculture. The program focuses on IoT-enabled soil health monitoring, eco-friendly crop protection, and agricultural drone applications.'
    },
    'sangraam': {
      date: 'March 20, 2025',
      title: 'SANGRAAM 2025: National Level Sports Carnival & Annual Convocation',
      author: 'Office of Student Affairs',
      content: 'The flagship national sports carnival "SANGRAAM" concluded with grand festivities at the RKDF University sports grounds. Over 60 college teams competed in cricket, basketball, volleyball, athletics, and chess. Simultaneously, graduating scholars received their degrees at the university convocation ceremony.'
    }
  };

  const newsCards = document.querySelectorAll('[data-news]');
  newsCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const newsKey = card.getAttribute('data-news');
      const data = newsData[newsKey];
      if (data) {
        document.getElementById('news-modal-date').textContent = data.date;
        document.getElementById('news-modal-title').textContent = data.title;
        document.getElementById('news-modal-author').textContent = `By ${data.author}`;
        document.getElementById('news-modal-content').textContent = data.content;
        openModal('modal-news-detail');
      }
    });
  });

  // 6. Interactive Search Overlay with RKDF searchable index
  const searchTriggers = document.querySelectorAll('.trigger-search');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const searchableIndex = [
    { title: 'B.Tech in Computer Science & AI Admissions', category: 'Engineering', link: '#programs' },
    { title: 'MBA Dual Specialization & Executive Programs', category: 'Management', link: '#programs' },
    { title: 'ICAR Accredited B.Sc. (Hons) Agriculture Course', category: 'Agriculture', link: '#programs' },
    { title: 'Faculty of Pharmacy (B.Pharm / D.Pharm) Admissions', category: 'Pharmacy', link: '#programs' },
    { title: 'B.Sc. Nursing & Paramedical Sciences (AEC)', category: 'Medical', link: '#programs' },
    { title: 'Examination Time Table & Scheme June 2025', category: 'Examinations', link: '#exam' },
    { title: 'SANGRAAM National Level Sports Carnival', category: 'Campus Life', link: '#campus-life' },
    { title: 'NAAC Certificate of Accreditation & UGC Approvals', category: 'Approvals', link: '#approvals' },
    { title: 'Campus Hostel & Transportation Facility, Bhopal', category: 'Campus Services', link: '#campus-life' }
  ];

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 150);
    });
  });

  const searchClose = document.getElementById('search-close');
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<p style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">Type above to search across B.Tech, MBA, Agriculture, Pharmacy, admissions, and exam time tables...</p>';
        return;
      }
      const filtered = searchableIndex.filter(item => 
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
      if (filtered.length === 0) {
        searchResults.innerHTML = `<p style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">No results found for "${q}". Try searching for 'B.Tech', 'MBA', 'Agriculture', or 'Admissions'.</p>`;
      } else {
        searchResults.innerHTML = filtered.map(item => `
          <div class="search-result-item" onclick="document.getElementById('search-overlay').classList.remove('active');">
            <h4>${item.title}</h4>
            <span>${item.category}</span>
          </div>
        `).join('');
      }
    });
  }

  // 7. Animated Number Counters
  const counterElements = document.querySelectorAll('.counter-val');
  let animated = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1800; // ms
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          runCounters();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  } else {
    runCounters();
  }

  // 8. Form Submissions
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      showToast('Thank you! You are now subscribed to RKDF University updates.', 'success');
      emailInput.value = '';
    });
  }

  // Application Form
  const applyForm = document.getElementById('form-apply');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('modal-apply'));
      showToast('Admission application registered! Admissions office will contact you shortly.', 'success');
      applyForm.reset();
    });
  }

  // Visit Booking Form
  const visitForm = document.getElementById('form-visit');
  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('modal-visit'));
      showToast('Campus tour scheduled! Welcome to RKDF University Bhopal.', 'success');
      visitForm.reset();
    });
  }

  // Login Form
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('modal-login'));
      showToast('Authentication successful. Redirecting to your university dashboard...', 'success');
      loginForm.reset();
    });
  }

  // 9. Portal Tabs
  const portalTabs = document.querySelectorAll('.portal-tab');
  portalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portalTabs.forEach(t => {
        t.style.borderBottom = '2px solid transparent';
        t.style.color = '#64748b';
      });
      tab.style.borderBottom = '2px solid #c88e2d';
      tab.style.color = '#0b1a2d';
      const role = tab.getAttribute('data-role');
      document.getElementById('login-id-label').textContent = role === 'Student' ? 'Enrollment Number / Roll No.' : `${role} Email or User ID`;
    });
  });

  // 10. Mobile Menu Toggle & Offcanvas Drawer
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileNavMenu) mobileNavMenu.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileNavMenu) mobileNavMenu.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 11. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        // If not already active, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 12. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade-left, .reveal-fade-right');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 13. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 14. Brochure Download Trigger
  const brochureTriggers = document.querySelectorAll('.trigger-brochure');
  brochureTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Downloading RKDF University 2025-26 Information Brochure...', 'info');
      setTimeout(() => {
        showToast('Brochure download initiated successfully!', 'success');
      }, 1500);
    });
  });

  // 15. Duplicate Marquee Track for Seamless Infinite Loop
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const clone = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML += clone;
  }
});
