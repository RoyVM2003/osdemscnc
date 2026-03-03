document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.service-chip');
  const cards = document.querySelectorAll('.service-modern-card');

  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const selected = chip.getAttribute('data-filter');

      chips.forEach(btn => btn.classList.remove('active'));
      chip.classList.add('active');

      cards.forEach(card => {
        const group = card.getAttribute('data-group');
        const visible = selected === 'all' || group === selected;
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
});
