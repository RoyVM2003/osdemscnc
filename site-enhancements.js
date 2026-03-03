document.addEventListener('DOMContentLoaded', () => {
  // Mobile: handle COMPANY submenu before page-specific handlers
  document.addEventListener(
    'click',
    event => {
      const companyLink = event.target.closest('.has-dropdown > a[data-page="company"]');
      if (!companyLink || window.innerWidth > 768) return;

      // Prevent existing page scripts from closing the whole menu
      event.preventDefault();
      event.stopPropagation();

      const parent = companyLink.closest('.has-dropdown');
      parent?.classList.toggle('active');
    },
    true
  );

  // Progressive image loading defaults
  document.querySelectorAll('img').forEach(img => {
    if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
  });

  // Global floating CTA
  if (!document.querySelector('.floating-cta')) {
    const cta = document.createElement('a');
    cta.className = 'floating-cta';
    cta.href = 'https://wa.me/523311744584?text=Hola%2C%20quiero%20agendar%20una%20demo%20con%20OSDEMS%20CNC.';
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.setAttribute('aria-label', 'Contact on WhatsApp');
    cta.innerHTML = '<i class="fab fa-whatsapp"></i> Book Demo';
    document.body.appendChild(cta);
  }

  // Page progress bar
  if (!document.querySelector('.page-progress')) {
    const progress = document.createElement('div');
    progress.className = 'page-progress';
    document.body.appendChild(progress);
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // Services: grid/list view toggle
  const servicesGrid = document.querySelector('.services-modern-grid');
  const viewButtons = document.querySelectorAll('.services-view-btn');
  if (servicesGrid && viewButtons.length) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        servicesGrid.classList.toggle('list-view', btn.dataset.view === 'list');
      });
    });
  }

  // Home case tabs
  const caseButtons = document.querySelectorAll('.case-tab-btn');
  const casePanels = document.querySelectorAll('.case-tab-panel');
  if (caseButtons.length && casePanels.length) {
    caseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-case-tab');
        caseButtons.forEach(b => b.classList.remove('active'));
        casePanels.forEach(panel => panel.classList.remove('active'));
        btn.classList.add('active');
        const target = document.querySelector(`[data-case-panel="${key}"]`);
        target?.classList.add('active');
      });
    });
  }

  // AMR counters
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length) {
    const runCounter = el => {
      const target = Number(el.dataset.counterTarget || 0);
      const suffix = el.dataset.counterSuffix || '';
      const duration = 1300;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(target * progress);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(counter => observer.observe(counter));
  }

  // Career: drag and drop visual helper
  const fileInput = document.getElementById('apply-cv');
  const dropzone = document.querySelector('.career-dropzone');
  if (fileInput && dropzone) {
    const setLabel = () => {
      const file = fileInput.files && fileInput.files[0];
      dropzone.textContent = file ? `Selected CV: ${file.name}` : 'Drag and drop CV here or click to browse (.pdf, .doc, .docx)';
    };

    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', setLabel);

    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.add('dragging');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, e => {
        e.preventDefault();
        dropzone.classList.remove('dragging');
      });
    });
    dropzone.addEventListener('drop', e => {
      const files = e.dataTransfer?.files;
      if (!files || !files.length) return;
      fileInput.files = files;
      setLabel();
    });
  }
});
