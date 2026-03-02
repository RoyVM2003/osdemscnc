document.addEventListener('DOMContentLoaded', async () => {
  try {
    const headerTarget = document.getElementById('site-header');
    const footerTarget = document.getElementById('site-footer');

    if (headerTarget) {
      const resHeader = await fetch('header.html');
      headerTarget.innerHTML = await resHeader.text();
    }

    if (footerTarget) {
      const resFooter = await fetch('footer.html');
      footerTarget.innerHTML = await resFooter.text();
    }
  } catch (e) {
    console.error('Error cargando header/footer', e);
  }

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu > li > a');

  mobileMenuBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  document.querySelectorAll('[data-page="career"]').forEach(a => {
    a.classList.add('active');
  });
});
