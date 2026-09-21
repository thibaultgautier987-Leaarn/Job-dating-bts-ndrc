const content = window.SITE_CONTENT || {};
document.querySelectorAll("[data-field]").forEach(el => { const value = content[el.dataset.field]; if (value) el.textContent = value; });
document.querySelectorAll('[href^="tel:"]').forEach(el => { if(content.telephoneLien) el.href = `tel:${content.telephoneLien}`; if(el.textContent.includes('04 66')) el.textContent = content.telephoneAffiche; });
document.querySelectorAll('[data-email-link]').forEach(el => { if(content.email){ el.href = `mailto:${content.email}`; el.textContent = content.email; } });

const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(other => { const active = other === tab; other.setAttribute('aria-selected', active); document.getElementById(other.getAttribute('aria-controls')).hidden = !active; });
}));

document.querySelectorAll('[data-dialog-open]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.dialogOpen).showModal()));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
});

document.getElementById('year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
