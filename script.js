// ===============================
// Modern Portfolio JavaScript
// ===============================

// Theme Toggle (persist)
const themeBtn = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
function applyTheme(theme) {
  body.classList.toggle('light', theme === 'light');
  themeBtn.textContent = theme === 'light' ? '🌞' : '🌙';
  localStorage.setItem('theme', theme);
}
applyTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  const next = body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('show');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Smooth scroll & Active nav link
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
    navMenu.classList.remove('show');
  });
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// Typing effect in hero
const typingText = document.getElementById("typingText");
if (typingText) {
  const words = ["MERN Developer", "React & .NET Engineer", "Frontend Specialist", "Problem Solver 💡"];
  let i = 0, j = 0, isDeleting = false;
  const type = () => {
    const current = words[i];
    typingText.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
    if (!isDeleting && j === current.length + 1) { isDeleting = true; setTimeout(type, 900); }
    else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; setTimeout(type, 300); }
    else { setTimeout(type, isDeleting ? 60 : 120); }
  };
  type();
}

// Set year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Animate skill bars when visible
const fills = document.querySelectorAll('.fill');
const barObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const fill = entry.target;
      const val = fill.getAttribute('data-fill') || '0';
      requestAnimationFrame(()=> fill.style.width = val + '%');
      barObserver.unobserve(fill);
    }
  });
},{threshold:0.4});
fills.forEach(f=>barObserver.observe(f));

// Hero image tilt
const img = document.getElementById('profileImg');
if (img) {
  img.addEventListener('mousemove', (e) => {
    const r = img.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `rotateX(${ -y * 6 }deg) rotateY(${ x * 6 }deg) scale(1.03)`;
  });
  img.addEventListener('mouseleave', ()=> img.style.transform = 'rotateX(0) rotateY(0) scale(1)');
}

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:0.18});
reveals.forEach(el=>revealObserver.observe(el));

// Projects shine follow mouse
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    card.style.setProperty('--mx', mx + '%');
  });
});

// Stats count-up
const nums = document.querySelectorAll('.stat .num');
const numObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const start = 0; const duration = 1200;
      const t0 = performance.now();
      const step = (t)=>{
        const p = Math.min((t - t0) / duration, 1);
        el.textContent = Math.floor(start + p * (target - start));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      numObserver.unobserve(el);
    }
  });
},{threshold:.6});
nums.forEach(n=>numObserver.observe(n));

// Certification downloads
document.querySelectorAll(".cert-download").forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.getAttribute("data-file");
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// Back-to-top
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
