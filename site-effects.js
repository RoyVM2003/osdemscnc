document.addEventListener('DOMContentLoaded', () => {
  const animatedSelectors = [
    '.module-hero-copy',
    '.media-placeholder',
    '.module-kpi',
    '.home-why-item',
    '.home-visual-card',
    '.home-visual-note',
    '.case-tab-panels',
    '.capability-card-premium',
    '.about-narrative-card',
    '.about-team-card',
    '.capability-item',
    '.service-card',
    '.service-modern-card',
    '.services-matrix .career-box',
    '.industry-panel',
    '.industry-media-slot',
    '.ind-row',
    '.job-card',
    '.career-box',
    '.amr-card',
    '.amr-advantage',
    '.amr-modern-card',
    '.amr-pillar',
    '.amr-metric',
    '.amr-compare-card',
    '.amr-phase',
    '.amr-support-item',
    '.amr-media-tile',
    '.amr-summary-card',
    '.history-section-col',
    '.history-gallery-item',
    '.timeline-item'
  ];

  const nodes = document.querySelectorAll(animatedSelectors.join(', '));
  if (!nodes.length) return;

  nodes.forEach((node, index) => {
    node.classList.add('fx-reveal');
    node.style.transitionDelay = `${Math.min(index * 45, 480)}ms`;
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fx-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  nodes.forEach(node => observer.observe(node));
});
