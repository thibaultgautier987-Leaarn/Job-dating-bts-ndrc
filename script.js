const content = window.SITE_CONTENT || {};

document.querySelectorAll("[data-field]").forEach((element) => {
  const value = content[element.dataset.field];
  if (value) element.textContent = value;
});

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  if (content.telephoneLien) link.href = `tel:${content.telephoneLien}`;
});

document.querySelectorAll("[data-map-link]").forEach((link) => {
  if (content.itineraire) link.href = content.itineraire;
});

const emailLinks = document.querySelectorAll("[data-email-link]");
const emailStatus = document.querySelector("[data-email-status]");

if (content.emailConfirmee && content.email) {
  const subject = encodeURIComponent("Participation au Job Dating BTS NDRC");
  emailLinks.forEach((link) => {
    link.href = `mailto:${content.email}?subject=${subject}`;
    link.removeAttribute("aria-disabled");
    const label = link.querySelector("strong");
    if (label) label.textContent = content.email;
  });
  if (emailStatus) emailStatus.hidden = true;
} else {
  emailLinks.forEach((link) => {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  });
  if (emailStatus) emailStatus.hidden = false;
}

const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const active = item === tab;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
    if (panel) panel.hidden = !active;
  });
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    activateTab(tabs[nextIndex], true);
  });
});

document.querySelectorAll("[data-dialog-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.dialogOpen);
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  const closeButton = dialog.querySelector(".dialog-close");
  closeButton?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px 8%", threshold: .05 });

  revealElements.forEach((element) => observer.observe(element));
}
