const { useState, useEffect, useRef, useCallback } = React;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SKILLS = [
  { label: "Languages", tags: ["JavaScript (ES6+)", "C++"] },
  { label: "Frontend", tags: ["React.js", "HTML5", "CSS3", "JavaScript"] },
  { label: "Backend", tags: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases", tags: ["MongoDB", "MySQL"] },
  { label: "AI & Libraries", tags: ["OpenAI API", "face-api.js", "ML Models"] },
  { label: "Auth & Payments", tags: ["JWT", "Google OAuth", "Razorpay", "Passport.js"] },
  { label: "Tools", tags: ["Git", "GitHub", "Postman", "Render", "Vercel"] },
  { label: "Concepts", tags: ["DSA", "OOP", "CRUD", "MVC", "MERN Stack"] },
];

const EXPERIENCE = [
  {
    num: "01",
    company: "Eduskills",
    role: "Full Stack Web Development Intern",
    date: "Jun 2025 – Jul 2025",
    type: "Remote",
    bullets: [
      "Built and tested RESTful APIs using Node.js and Express.js following REST architecture best practices.",
      "Implemented JWT-based authentication and handled database operations using MongoDB.",
      "Validated all API endpoints using Postman with comprehensive testing.",
    ],
  },
  {
    num: "02",
    company: "Cognifyz Technologies",
    role: "Frontend Developer Intern",
    date: "Feb 2025 – Mar 2025",
    type: "Remote",
    bullets: [
      "Developed responsive user interfaces using HTML5, CSS3, and JavaScript.",
      "Improved frontend usability and ensured cross-device compatibility across multiple browsers.",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "Moody Player",
    badge: "AI · FEATURED",
    desc: "Real-time facial emotion detection system using face-api.js that reads your mood via camera and dynamically recommends music. No third-party AI API — ML models run entirely client-side.",
    tech: ["Node.js", "Express.js", "MongoDB", "face-api.js", "REST APIs"],
    github: "https://github.com/akashsharmax",
    live: "https://github.com/akashsharmax",
    featured: true,
  },
  {
    num: "02",
    name: "AI Notes Generator",
    badge: "MERN · AI",
    desc: "Full-stack MERN app that generates structured notes using OpenAI API. Integrates Google OAuth 2.0, Razorpay payment gateway, PDF download, and a personal user dashboard.",
    tech: ["React.js", "Node.js", "MongoDB", "OpenAI API", "Razorpay", "Google OAuth"],
    github: "https://github.com/akashsharmax",
    live: null,
  },
  {
    num: "03",
    name: "Job Tracker",
    badge: "BACKEND",
    desc: "Secure backend CRUD system for tracking job applications end-to-end. All routes protected by JWT authentication with clean REST API architecture.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT Auth"],
    github: "https://github.com/akashsharmax",
    live: null,
  },
];

const CONTACTS = [
  { icon: "✉", label: "Email", value: "sharmakash568@gmail.com", href: "mailto:sharmakash568@gmail.com" },
  { icon: "📞", label: "Phone", value: "+91-8979500479", href: "tel:+918979500479" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/akash-sharma", href: "https://linkedin.com/in/akash-sharma" },
  { icon: "🐙", label: "GitHub", value: "github.com/akashsharmax", href: "https://github.com/akashsharmax" },
  { icon: "📸", label: "Instagram", value: "@akash.sharmaa01", href: "https://instagram.com/akash.sharmaa01" },
  { icon: "📍", label: "Location", value: "Meerut, Uttar Pradesh, India", href: null },
];

/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const mouse = { x: W / 2, y: H / 2 };
  document.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("resize", () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });

  const NUM = 90;
  const particles = Array.from({ length: NUM }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
    r: Math.random() * 1.5 + .3,
    alpha: Math.random() * .5 + .1,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(0,212,255,0.025)";
    ctx.lineWidth = 1;
    const gs = 80;
    for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // mouse glow
    const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
    mg.addColorStop(0, "rgba(0,212,255,0.04)");
    mg.addColorStop(1, "transparent");
    ctx.fillStyle = mg;
    ctx.fillRect(0, 0, W, H);

    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // mouse repel
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += (dx / dist) * 1.5;
        p.y += (dy / dist) * 1.5;
      }

      // draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();

      // connect nearby
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 140)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let rx = 0, ry = 0;
  document.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    rx += (e.clientX - rx) * 0.12;
    ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(() => {
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
    });
  });
  document.addEventListener("mousemove", function smooth(e) {
    function update() {
      rx += (e.clientX - rx) * 0.1;
      ry += (e.clientY - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(update);
    }
    document.removeEventListener("mousemove", smooth);
    update();
  });
}

/* ═══════════════════════════════════════════════════════
   RESUME DOWNLOAD
═══════════════════════════════════════════════════════ */
function downloadResume() {
  // Generates a clean PDF-style resume as HTML and triggers download
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Akash Sharma - Resume</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', sans-serif; font-size: 13px; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
  .contact-row { color: #555; font-size: 12px; margin: 6px 0 16px; display: flex; flex-wrap: wrap; gap: 14px; }
  .contact-row a { color: #0066cc; text-decoration: none; }
  hr { border: none; border-top: 2px solid #0066cc; margin: 12px 0; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #0066cc; margin-bottom: 10px; }
  .exp-row { margin-bottom: 14px; }
  .exp-header { display: flex; justify-content: space-between; }
  .exp-company { font-weight: 700; font-size: 14px; }
  .exp-date { color: #666; font-size: 12px; }
  .exp-role { color: #0066cc; font-size: 12px; margin-bottom: 6px; }
  ul { padding-left: 18px; }
  li { margin-bottom: 3px; color: #333; line-height: 1.5; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .skill-row { font-size: 12px; }
  .skill-cat { font-weight: 700; color: #333; }
  .proj-name { font-weight: 700; font-size: 13px; }
  .proj-tech { color: #666; font-size: 11px; }
  .proj-row { margin-bottom: 12px; }
  .summary { color: #444; line-height: 1.65; margin-bottom: 4px; font-size: 13px; }
</style>
</head>
<body>
<h1>Akash Sharma</h1>
<div class="contact-row">
  <span>sharmakash568@gmail.com</span>
  <span>+91-8979500479</span>
  <a href="https://linkedin.com/in/akash-sharma">LinkedIn</a>
  <a href="https://github.com/akashsharmax">GitHub</a>
  <a href="https://instagram.com/akash.sharmaa01">Instagram</a>
  <span>Meerut, India</span>
</div>
<hr>

<div class="section">
  <div class="section-title">Summary</div>
  <p class="summary">Computer Science undergraduate with a strong foundation in Full Stack Development and Data Structures. Experienced in building scalable MERN applications, REST APIs, and AI-powered systems using JavaScript, Node.js, Express.js, React.js, and MongoDB. Passionate about backend development, problem-solving, and building AI-integrated products.</p>
</div>

<div class="section">
  <div class="section-title">Technical Skills</div>
  <div class="skills-grid">
    <div class="skill-row"><span class="skill-cat">Languages:</span> JavaScript (ES6+), C++</div>
    <div class="skill-row"><span class="skill-cat">Frontend:</span> React.js, HTML5, CSS3</div>
    <div class="skill-row"><span class="skill-cat">Backend:</span> Node.js, Express.js, REST APIs</div>
    <div class="skill-row"><span class="skill-cat">Databases:</span> MongoDB, MySQL</div>
    <div class="skill-row"><span class="skill-cat">AI & Libraries:</span> OpenAI API, face-api.js</div>
    <div class="skill-row"><span class="skill-cat">Tools:</span> Git, GitHub, Postman, Render, Vercel</div>
    <div class="skill-row"><span class="skill-cat">Auth & Pay:</span> JWT, Google OAuth, Razorpay</div>
    <div class="skill-row"><span class="skill-cat">Concepts:</span> DSA, OOP, CRUD, MVC, MERN</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="exp-row">
    <div class="exp-header">
      <span class="exp-company">Meerut Institute of Engineering and Technology (MIET)</span>
      <span class="exp-date">2022 – 2026</span>
    </div>
    <div class="exp-role">Bachelor of Technology in Computer Science and Engineering · Meerut, India</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Experience</div>
  <div class="exp-row">
    <div class="exp-header">
      <span class="exp-company">Eduskills</span>
      <span class="exp-date">Jun 2025 – Jul 2025 · Remote</span>
    </div>
    <div class="exp-role">Full Stack Web Development Intern</div>
    <ul>
      <li>Built and tested RESTful APIs using Node.js and Express.js.</li>
      <li>Implemented JWT-based authentication and handled database operations using MongoDB.</li>
      <li>Validated APIs using Postman and followed REST architecture best practices.</li>
    </ul>
  </div>
  <div class="exp-row">
    <div class="exp-header">
      <span class="exp-company">Cognifyz Technologies</span>
      <span class="exp-date">Feb 2025 – Mar 2025 · Remote</span>
    </div>
    <div class="exp-role">Frontend Developer Intern</div>
    <ul>
      <li>Developed responsive user interfaces using HTML5, CSS3, and JavaScript.</li>
      <li>Improved frontend usability and ensured cross-device compatibility across multiple browsers.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Projects</div>
  <div class="proj-row">
    <div class="proj-name">Moody Player <span class="proj-tech">| Node.js, Express.js, MongoDB, face-api.js</span></div>
    <ul>
      <li>Built an AI-powered music recommendation system detecting real-time facial emotions via camera using face-api.js.</li>
      <li>Developed backend REST APIs to serve dynamic mood-based song recommendations.</li>
      <li>Integrated ML models client-side for emotion classification without a third-party AI API.</li>
    </ul>
  </div>
  <div class="proj-row">
    <div class="proj-name">AI Notes Generator <span class="proj-tech">| MERN Stack, OpenAI API, Google OAuth, Razorpay</span></div>
    <ul>
      <li>Developed a full-stack AI-powered application to generate structured notes using OpenAI API.</li>
      <li>Implemented Google OAuth for secure authentication and Razorpay for payment integration.</li>
      <li>Designed REST APIs with Node.js/Express.js and built a responsive React.js frontend.</li>
    </ul>
  </div>
  <div class="proj-row">
    <div class="proj-name">Job Tracker Application <span class="proj-tech">| Node.js, Express.js, MongoDB, JWT</span></div>
    <ul>
      <li>Developed a backend system to track and manage job applications with full CRUD functionality.</li>
      <li>Secured all routes using JWT-based authentication to ensure authorized access.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Extracurricular</div>
  <div class="exp-row">
    <div class="exp-header">
      <span class="exp-company">Google Developer Groups (GDG) MIET</span>
      <span class="exp-date">2023 – 2024</span>
    </div>
    <div class="exp-role">Core Team Member</div>
    <ul><li>Contributed to organizing technical events, workshops, and coding sessions for the campus developer community.</li></ul>
  </div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Akash_Sharma_Resume.html";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const els = el.querySelectorAll ? el.querySelectorAll(".reveal") : [];
    if (el.classList.contains("reveal")) els_ = [el];
    const targets = el.classList.contains("reveal") ? [el] : [...els];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

function useTyping(words) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t;
    if (!deleting && display.length < word.length) {
      t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 75);
    } else if (!deleting && display.length === word.length) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display.length > 0) {
      t = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [display, deleting, idx, words]);

  return display;
}

/* ═══════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════ */

function Nav() {
  const scrolled = useScrollNav();
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">
        <span>AKASH</span>.DEV
      </a>
      <ul className="nav-links">
        {["about","skills","experience","projects","education","contact"].map(l => (
          <li key={l}><a href={`#${l}`}>{l}</a></li>
        ))}
      </ul>
      <button className="nav-resume-btn" onClick={downloadResume} style={{cursor:"none"}}>
        ⬇ Resume
      </button>
    </nav>
  );
}

function Hero() {
  const typed = useTyping([
    "Full Stack Developer",
    "MERN Stack Engineer",
    "AI Integration Dev",
    "Backend Architect",
    "Problem Solver",
  ]);

  return (
    <section id="hero">
      <div className="hero-pre">
        &lt;hello world /&gt; &nbsp;·&nbsp; <span>Open to Fresher Roles</span> &nbsp;·&nbsp; Meerut, India
      </div>

      <h1 className="hero-name">
        AKASH<br />
        <span className="glitch" data-text="SHARMA">SHARMA</span>
      </h1>

      <div className="hero-typing-wrap">
        &gt;_ {typed}<span className="typing-cursor">|</span>
      </div>

      <p className="hero-desc">
        Building scalable MERN applications, REST APIs, and AI-powered systems.
        I turn complex problems into clean, deployable code.
      </p>

      <div className="hero-stats">
        <div className="h-stat">
          <div className="h-stat-num">2+</div>
          <div className="h-stat-label">Internships</div>
        </div>
        <div className="h-stat-divider" />
        <div className="h-stat">
          <div className="h-stat-num">3+</div>
          <div className="h-stat-label">Projects</div>
        </div>
        <div className="h-stat-divider" />
        <div className="h-stat">
          <div className="h-stat-num">8+</div>
          <div className="h-stat-label">Technologies</div>
        </div>
        <div className="h-stat-divider" />
        <div className="h-stat">
          <div className="h-stat-num">2026</div>
          <div className="h-stat-label">Graduating</div>
        </div>
      </div>

      <div className="hero-btns">
        <a href="#projects" className="btn-glow primary">
          View Projects →
        </a>
        <a href="https://github.com/akashsharmax" target="_blank" rel="noreferrer" className="btn-glow secondary">
          GitHub ↗
        </a>
        <button className="btn-glow download" onClick={downloadResume} style={{border:"none",cursor:"none"}}>
          ⬇ Download Resume
        </button>
      </div>

      <div className="hero-scroll-ind">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref}>
      <div className="section-label"><span className="num">01</span> — About Me</div>
      <h2 className="section-title">Crafting Code,<br /><span>Building Ideas</span></h2>
      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            I'm <strong>Akash Sharma</strong>, a final-year B.Tech Computer Science student at
            <em> MIET Meerut (2022–2026)</em>, specializing in full-stack development with the MERN stack.
          </p>
          <p>
            I've completed two remote internships — at <strong>Eduskills</strong> (full-stack) and{" "}
            <strong>Cognifyz Technologies</strong> (frontend) — and served as <strong>Core Team Member</strong> at
            Google Developer Groups on campus.
          </p>
          <p>
            My projects go beyond CRUD — from <strong>real-time facial emotion detection</strong> mapped to music
            recommendations, to <strong>OpenAI-powered note generation</strong> with payment workflows and Google OAuth.
            I love building things that feel like real products.
          </p>
          <div className="gdg-badge reveal">
            <div className="gdg-badge-icon">🌐</div>
            <div>
              <div className="gdg-badge-title">Google Developer Groups — MIET</div>
              <div className="gdg-badge-sub">Core Team Member · 2023 – 2024 · Organized workshops, events & coding sessions</div>
            </div>
          </div>
        </div>
        <div className="about-cards reveal">
          {[
            { num: "02", label: "Remote Internships" },
            { num: "03+", label: "Live Projects" },
            { num: "08+", label: "Tech Skills" },
            { num: "2026", label: "B.Tech Grad" },
          ].map(s => (
            <div key={s.label} className="a-card">
              <div className="a-card-num">{s.num}</div>
              <div className="a-card-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" ref={ref}>
      <div className="section-label"><span className="num">02</span> — Technical Skills</div>
      <h2 className="section-title">My <span>Arsenal</span></h2>
      <div className="skills-wrapper">
        {SKILLS.map((cat, i) => (
          <div key={cat.label} className="skill-cat reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
            <div className="skill-cat-name">{cat.label}</div>
            <div className="skill-pills">
              {cat.tags.map(tag => (
                <span key={tag} className="skill-pill">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  const ref = useReveal();
  return (
    <section id="experience" ref={ref}>
      <div className="section-label"><span className="num">03</span> — Experience</div>
      <h2 className="section-title">Where I've <span>Worked</span></h2>
      <div className="exp-timeline">
        {EXPERIENCE.map((exp, i) => (
          <div key={exp.company} className="exp-item reveal">
            <div className="exp-header" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="exp-left">
                <span className="exp-index">{exp.num}</span>
                <div className="exp-dot" />
                <div className="exp-info">
                  <div className="exp-company">{exp.company}</div>
                  <div className="exp-role">{exp.role} · {exp.type}</div>
                </div>
              </div>
              <div className="exp-right">
                <span className="exp-date">{exp.date}</span>
                <div className={`exp-chevron${open === i ? " open" : ""}`}>+</div>
              </div>
            </div>
            <div className={`exp-body${open === i ? " open" : ""}`}>
              <div className="exp-body-inner">
                <ul>{exp.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" ref={ref}>
      <div className="section-label"><span className="num">04</span> — Projects</div>
      <h2 className="section-title">What I've <span>Built</span></h2>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={p.name} className={`proj-card reveal${p.featured ? " featured" : ""}`}
               style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="proj-card-top">
              <div className="proj-num">{p.num}</div>
              <div className="proj-badge">{p.badge}</div>
              <div className="proj-name">{p.name}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tech">
                {p.tech.map(t => <span key={t} className="proj-tech-tag">{t}</span>)}
              </div>
            </div>
            <div className="proj-card-bottom">
              <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const ref = useReveal();
  return (
    <section id="education" ref={ref}>
      <div className="section-label"><span className="num">05</span> — Education</div>
      <h2 className="section-title">Academic <span>Background</span></h2>
      <div className="edu-card reveal">
        <div>
          <div className="edu-badge">B.Tech · Computer Science & Engineering</div>
          <div className="edu-school">MIET Meerut</div>
          <div className="edu-detail">Meerut Institute of Engineering and Technology · Meerut, India</div>
        </div>
        <div className="edu-year-big">2022<br/>2026</div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useReveal();
  return (
    <section id="contact" ref={ref}>
      <div className="section-label"><span className="num">06</span> — Contact</div>
      <div className="contact-wrapper">
        <div className="reveal">
          <h2 className="contact-heading">
            Let's Build<br />
            Something <span>Incredible.</span>
          </h2>
          <p className="contact-sub">
            Actively looking for fresher software development roles across India.
            Open to full-time positions, internships, and freelance. Let's connect!
          </p>
          <div style={{display:"flex", gap:"12px", flexWrap:"wrap"}}>
            <a href="mailto:sharmakash568@gmail.com" className="btn-glow primary">
              Send Email →
            </a>
            <button className="btn-glow download" onClick={downloadResume} style={{border:"none",cursor:"none"}}>
              ⬇ Download Resume
            </button>
          </div>
        </div>
        <div className="contact-cards reveal">
          {CONTACTS.map(c => (
            c.href ? (
              <a key={c.label} href={c.href}
                 target={c.href.startsWith("http") ? "_blank" : undefined}
                 rel="noreferrer" className="contact-card">
                <div className="contact-card-icon">{c.icon}</div>
                <div>
                  <span className="contact-card-label">{c.label}</span>
                  <span className="contact-card-value">{c.value}</span>
                </div>
              </a>
            ) : (
              <div key={c.label} className="contact-card" style={{cursor:"default"}}>
                <div className="contact-card-icon">{c.icon}</div>
                <div>
                  <span className="contact-card-label">{c.label}</span>
                  <span className="contact-card-value">{c.value}</span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        Designed & Built by <span>Akash Sharma</span> · 2025 · Meerut, India
      </div>
      <div className="footer-right">
        <a href="https://github.com/akashsharmax" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/akash-sharma" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://instagram.com/akash.sharmaa01" target="_blank" rel="noreferrer">Instagram</a>
        <a href="mailto:sharmakash568@gmail.com">Email</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
function App() {
  useEffect(() => {
    initParticles();
    initCursor();

    // reveal on scroll for all .reveal elements
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
