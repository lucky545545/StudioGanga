import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import courtyardHouse from "../assets/WhatsApp Image 2026-07-07 at 4.27.48 PM (2).jpeg";
import riverRoom from "../assets/WhatsApp Image 2026-07-07 at 4.27.48 PM (1).jpeg";
import stoneAtelier from "../assets/WhatsApp Image 2026-07-07 at 4.27.49 PM.jpeg";
import heroImage from "../assets/WhatsApp Image 2026-07-07 at 4.27.49 PM (3).jpeg";
import loaderOne from "../assets/WhatsApp Image 2026-07-07 at 4.27.48 PM.jpeg";
import loaderTwo from "../assets/WhatsApp Image 2026-07-07 at 4.27.49 PM (1).jpeg";
import loaderThree from "../assets/WhatsApp Image 2026-07-07 at 4.27.50 PM.jpeg";

const orbitImages = Object.values(
  import.meta.glob("../assets2/*.jpg", { eager: true, query: "?url", import: "default" })
);
const orbitSequence = [...orbitImages, ...orbitImages.slice(0, 6)];

const milestones = [
  ["15+", "Years of experience"],
  ["490+", "Completed projects"],
  ["45+", "Professionals on the team"],
  ["40K", "Total area covered"],
];

const navItems = ["About", "Services", "Insights", "Projects", "Blog"];

const work = [
  {
    number: "01",
    title: "Residential Architecture",
    text: "Homes planned around light, privacy, breeze, family routines, and a calmer everyday rhythm.",
    image: courtyardHouse,
  },
  {
    number: "02",
    title: "Interior Design",
    text: "Warm, precise interiors with careful material palettes, furniture direction, lighting, and site-ready detailing.",
    image: riverRoom,
  },
  {
    number: "03",
    title: "Renovation & Adaptive Reuse",
    text: "Existing spaces reworked with respect for structure, memory, budget, and the way people actually use rooms.",
    image: stoneAtelier,
  },
];

const strengths = [
  ["Site First Thinking", "Every proposal begins with sun, wind, access, noise, privacy, and the character of the plot."],
  ["Material Clarity", "Stone, timber, plaster, metal, and concrete are chosen for age, touch, maintenance, and climate."],
  ["Measured Detailing", "Drawings and decisions are kept clear enough for site teams to build with confidence."],
  ["Calm Collaboration", "Clients, craftspeople, and vendors stay aligned through a practical and transparent process."],
  ["Light & Proportion", "Rooms are shaped so daylight, scale, openings, and thresholds feel intentional."],
  ["End-to-End Guidance", "From early feasibility to handover, the studio keeps the idea and execution connected."],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const introTimeline = useRef(null);

  const beginDrag = (event) => {
    if (event.button !== 0) return;
    const card = event.currentTarget;
    const canvas = card.closest(".loader");
    const cardBox = card.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    const offsetX = event.clientX - cardBox.left;
    const offsetY = event.clientY - cardBox.top;
    card.setPointerCapture(event.pointerId);
    card.classList.add("is-dragging");

    const move = (moveEvent) => {
      const left = Math.max(0, Math.min(canvasBox.width - cardBox.width, moveEvent.clientX - canvasBox.left - offsetX));
      const top = Math.max(0, Math.min(canvasBox.height - cardBox.height, moveEvent.clientY - canvasBox.top - offsetY));
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.right = "auto";
    };

    const finish = () => {
      card.classList.remove("is-dragging");
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", finish);
      card.removeEventListener("pointercancel", finish);
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", finish);
    card.addEventListener("pointercancel", finish);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return undefined;

    const scrollState = { y: window.scrollY };
    const syncIntroToScroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      gsap.set(".loader", { yPercent: -100 * progress });
    };
    window.addEventListener("scroll", syncIntroToScroll, { passive: true });
    syncIntroToScroll();

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });
      introTimeline.current = intro;
      intro
        .from(".loader-card", {
          x: (index) => [180, -210, 150][index],
          y: (index) => [-130, 160, -180][index],
          scale: 0.48,
          rotation: (index) => [24, -28, 18][index],
          autoAlpha: 0,
          duration: 1.35,
          stagger: 0.22,
          ease: "power3.out",
        })
        .from(".loader-name, .moodboard-tools", { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.9)
        .addPause(2.55)
        .to(scrollState, {
          y: window.innerHeight,
          duration: 0.95,
          ease: "power4.inOut",
          onUpdate: () => window.scrollTo(0, scrollState.y),
        }, 2.55)
        .from(".header", { y: -14, autoAlpha: 0, duration: 0.45 }, 3.08)
        .from(".hero-meta", { autoAlpha: 0, duration: 0.45 }, 3.22)
        .from(".hero-image-wrap", { y: 46, autoAlpha: 0, duration: 0.75 }, 2.92)
        .from(".hero-word span", { yPercent: 112, autoAlpha: 0, duration: 0.86, stagger: 0.18, ease: "power4.out" }, 3.85)
        .from(".hero-project-copy", { x: 18, autoAlpha: 0, duration: 0.7 }, 4.65);

      const story = gsap.timeline({ paused: true });

      story
        .to(".orbit-ring", { rotation: 540, ease: "none", duration: 13.1 }, 0)
        .to(".orbit-ring", {
          left: "50%",
          "--orbit-radius": "60vmin",
          duration: 1.35,
          ease: "power2.inOut",
        }, 1.25)
        .to(".orbit-stage", { "--orbit-center-y": "78%", duration: 1.35, ease: "power2.inOut" }, 1.25)
        .to(".orbit-card:not(.orbit-card-extra) img", {
          scale: 0.9,
          duration: 1.35,
          ease: "power2.inOut",
        }, 1.25)
        .to(".orbit-card img", { rotation: 0, duration: 1.35, ease: "power2.inOut" }, 1.25)
        .to(".orbit-stage", { "--orbit-center-y": "22%", duration: 2.8, ease: "none" }, 3)
        .to(".orbit-ring", {
          left: "-7%",
          "--orbit-radius": "60vmin",
          duration: 1.3,
          ease: "power2.inOut",
        }, 6.15)
        .to(".orbit-stage", { "--orbit-center-y": "50%", duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-card", {
          autoAlpha: 1,
          "--orbit-angle": (index) => `${(360 / orbitSequence.length) * index}deg`,
          duration: 1.3,
          ease: "power2.inOut",
        }, 6.15)
        .to(".orbit-card img", { scale: 0.96, duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-intro", { y: -90, autoAlpha: 0, duration: 0.8 }, 1.15)
        .fromTo(".orbit-founded", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 }, 2.3)
        .to(".orbit-founded", { autoAlpha: 0, duration: 0.7 }, 5.85);

      gsap.utils.toArray(".orbit-stat").forEach((stat, index) => {
        const at = 6.35 + index * 1.35;
        story
          .fromTo(stat, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, at)
          .to(stat, { y: -80, autoAlpha: 0, duration: 0.6 }, at + 0.8);
      });

      story.fromTo(".orbit-finale", { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 11.9);

      const orbitSection = document.querySelector(".orbit-story");
      let displayedProgress = 0;
      let targetProgress = 0;
      let orbitFrame = 0;

      const renderOrbitProgress = () => {
        displayedProgress += (targetProgress - displayedProgress) * 0.16;
        if (Math.abs(targetProgress - displayedProgress) < 0.0005) displayedProgress = targetProgress;
        story.progress(displayedProgress);
        orbitFrame = displayedProgress !== targetProgress
          ? requestAnimationFrame(renderOrbitProgress)
          : 0;
      };

      const updateOrbitScroll = () => {
        const rect = orbitSection.getBoundingClientRect();
        const distance = Math.max(1, orbitSection.offsetHeight - window.innerHeight);
        targetProgress = Math.min(1, Math.max(0, -rect.top / distance));
        if (!orbitFrame) orbitFrame = requestAnimationFrame(renderOrbitProgress);
      };

      window.addEventListener("scroll", updateOrbitScroll, { passive: true });
      window.addEventListener("resize", updateOrbitScroll);
      updateOrbitScroll();

      const sections = gsap.utils.toArray(".section-reveal");
      gsap.set(sections, { y: 34, autoAlpha: 0 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            gsap.to(entry.target, {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.18 }
      );

      sections.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateOrbitScroll);
        window.removeEventListener("resize", updateOrbitScroll);
        if (orbitFrame) cancelAnimationFrame(orbitFrame);
      };
    });

    return () => {
      window.removeEventListener("scroll", syncIntroToScroll);
      introTimeline.current = null;
      context.revert();
    };
  }, []);

  return (
    <div className="site" id="home">
      <div className="intro-scene">
        <div className="intro-pin">
      <div className="loader">
        <div className="loader-stack">
          <img className="loader-card loader-card-one" src={loaderOne} alt="Studio Ganga project" draggable="false" onPointerDown={beginDrag} />
          <img className="loader-card loader-card-two" src={loaderTwo} alt="Studio Ganga project" draggable="false" onPointerDown={beginDrag} />
          <img className="loader-card loader-card-three" src={loaderThree} alt="Studio Ganga project" draggable="false" onPointerDown={beginDrag} />
        </div>
        <div className="moodboard-tools">
          <span>Drag the images anywhere</span>
          <button type="button" onClick={() => introTimeline.current?.play()}>Enter studio <ArrowUpRight size={17} /></button>
        </div>
        <span className="loader-name">Studio Ganga</span>
      </div>
      <header className="header">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          SG
        </a>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={item === "About" ? "#about" : item === "Projects" ? "#work" : "#contact"} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <a className="header-link" href="#contact" aria-label="Start a project">
          <ArrowUpRight size={28} strokeWidth={1.2} />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero" aria-label="Studio Ganga introduction">
          <div className="hero-type" aria-label="Sustainable living spaces">
            <h1 className="hero-word hero-word-one"><span>Sustainable</span></h1>
            <h1 className="hero-word hero-word-two"><span><em>Living</em><i aria-hidden="true" />Spaces</span></h1>
          </div>

          <div className="hero-project-copy">
            <a href="#contact">Talk your plan</a>
            <div className="hero-note">
              <img src={loaderOne} alt="" />
              <p>Creating timeless spaces with minimal environmental impact, transforming the way we live one green space at a time.</p>
            </div>
          </div>

          <div className="hero-meta" aria-label="Featured project details">
            <span>Studio Ganga Residence</span>
            <span>2026</span>
            <span>Residential · India</span>
          </div>

          <div className="hero-image-wrap">
            <img src={heroImage} alt="Contemporary residence by Studio Ganga" />
          </div>
        </section>

      </main>
        </div>
      </div>

      <main>
        <section className="orbit-story" aria-label="Studio Ganga story and milestones">
          <div className="orbit-stage">
            <div className="orbit-ring" aria-hidden="true">
              {orbitSequence.map((image, index) => (
                <div
                  className={`orbit-card ${index >= 15 ? "orbit-card-extra" : ""}`}
                  key={`${image}-${index}`}
                  style={{
                    "--orbit-angle": index < 15
                      ? `${(360 / 15) * index}deg`
                      : `${(360 / orbitSequence.length) * index}deg`,
                  }}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>

            <div className="orbit-copy orbit-intro">
              <p>A studio shaped by clarity, trust, and a collective pursuit of thoughtful design.</p>
            </div>

            <div className="orbit-copy orbit-founded">
              <strong>2011</strong>
              <span>Year of Foundation</span>
              <small>Built from a belief that enduring architecture begins with listening closely.</small>
            </div>

            {milestones.map(([number, label]) => (
              <div className="orbit-copy orbit-stat" key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}

            <div className="orbit-copy orbit-finale">
              <span>The spaces behind</span>
              <strong>ambitious lives.</strong>
            </div>

            <span className="orbit-scroll-hint">Scroll to explore</span>
          </div>
        </section>

        <section className="about section-reveal" id="about">
          <div className="section-label">
            <span>About</span>
          </div>
          <div className="about-copy">
            <h2>We design buildings and interiors that feel quiet, rooted, and carefully lived in.</h2>
            <div className="about-columns">
              <p>
                Studio Ganga is an architecture and interiors practice for homes, workspaces, boutique hospitality, and thoughtful renovations. The studio works closely with clients who care about how a place feels across the day, not just how it looks in a photograph.
              </p>
              <p>
                Each project begins by reading the site: light, wind, privacy, material context, budget, and the small rituals that make a space personal. From there, the work becomes simple, clear, and deeply considered.
              </p>
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-heading section-reveal">
            <span>Work</span>
            <h2>Selected directions</h2>
          </div>

          <div className="work-list">
            {work.map((item) => (
              <article className="work-item section-reveal" key={item.title}>
                <a href="#contact" aria-label={`Discuss ${item.title}`}>
                  <div className="work-image">
                    <img src={item.image} alt={`${item.title} by Studio Ganga`} />
                  </div>
                  <div className="work-content">
                    <span>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <strong>
                      Explore <ArrowUpRight size={18} strokeWidth={1.8} />
                    </strong>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="strength" id="strength">
          <div className="section-heading section-reveal">
            <span>Strength</span>
            <h2>What the studio brings to a project</h2>
          </div>

          <div className="strength-grid">
            {strengths.map(([title, text], index) => (
              <article className="strength-item section-reveal" key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-image section-reveal">
            <img src={courtyardHouse} alt="Courtyard residence with shaded verandah and planting" />
          </div>
          <div className="contact-copy section-reveal">
            <span>Contact</span>
            <h2>Let us discuss your site, space, or renovation.</h2>
            <p>
              Send a short note about the location, scope, timeline, and what you want the space to become. Studio Ganga will respond with the next practical step.
            </p>
            <div className="contact-links">
              <a href="mailto:hello@studioganga.com">
                <Mail size={18} strokeWidth={1.8} /> hello@studioganga.com
              </a>
              <a href="tel:+919999999999">
                <Phone size={18} strokeWidth={1.8} /> +91 99999 99999
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Studio Ganga</span>
        <span>Architecture, interiors, and renovation</span>
      </footer>
    </div>
  );
}

export default App;
