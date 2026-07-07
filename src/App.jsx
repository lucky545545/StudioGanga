import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Compass,
  Layers3,
  Menu,
  PencilRuler,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import heroImage from "../assets/studio-ganga-hero.png";
import courtyardHouse from "../assets/courtyard-house.png";
import riverRoom from "../assets/river-room.png";
import stoneAtelier from "../assets/stone-atelier.png";

const navItems = ["Work", "Studio", "Process", "Services", "Contact"];

const projects = [
  {
    name: "Courtyard House",
    type: "Private residence",
    place: "Bengaluru outskirts",
    year: "2026",
    summary: "A family home arranged around shade, breeze, verandahs, and a garden room that changes through the day.",
    image: courtyardHouse,
  },
  {
    name: "Stone Atelier",
    type: "Creative workspace",
    place: "Kochi",
    year: "2025",
    summary: "A studio for samples, client reviews, model making, and slow focused work under filtered light.",
    image: stoneAtelier,
  },
  {
    name: "River Room",
    type: "Hospitality interior",
    place: "Mysuru",
    year: "2025",
    summary: "A compact dining interior using deep reveals, warm plaster, timber rhythm, and intimate evening lighting.",
    image: riverRoom,
  },
];

const services = [
  {
    icon: Building2,
    title: "Architecture",
    text: "New homes, boutique commercial spaces, additions, and adaptive reuse projects.",
  },
  {
    icon: Layers3,
    title: "Interiors",
    text: "Planning, finishes, lighting, furniture, joinery, and construction-ready detailing.",
  },
  {
    icon: PencilRuler,
    title: "Renovation",
    text: "Existing-space diagnosis, phased upgrades, site coordination, and careful reuse.",
  },
  {
    icon: Compass,
    title: "Consultation",
    text: "Site review, feasibility, concept direction, material strategy, and design audits.",
  },
];

const processSteps = [
  {
    icon: Compass,
    title: "Read the place",
    text: "We study site, light, privacy, wind, routines, budget, and constraints before the first formal proposal.",
  },
  {
    icon: Ruler,
    title: "Shape the brief",
    text: "Plans, mood, material direction, and cost logic are developed together so the design has a practical spine.",
  },
  {
    icon: CalendarCheck,
    title: "Guide execution",
    text: "Drawings, vendor coordination, site visits, and refinements carry the idea through to handover.",
  },
];

const materialNotes = ["Lime plaster", "Local stone", "Teak and ash", "Concrete", "Metal detailing", "Filtered daylight"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const introRef = useRef(null);
  const wordmarkRef = useRef(null);
  const circleRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(introRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(appRef.current, { autoAlpha: 1 });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(appRef.current, { autoAlpha: 0 });
      gsap.set(".intro-letter", { yPercent: 115 });
      gsap.set(circleRef.current, { scale: 0, rotate: -90 });
      gsap.set(".intro-meta span", { y: 16, autoAlpha: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .to(".intro-letter", {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.035,
        })
        .to(
          circleRef.current,
          {
            scale: 1,
            rotate: 0,
            duration: 0.95,
          },
          "-=0.65"
        )
        .to(
          ".intro-meta span",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.08,
          },
          "-=0.45"
        )
        .to(wordmarkRef.current, {
          scale: 0.88,
          y: -24,
          duration: 0.9,
          ease: "power3.inOut",
        })
        .to(
          introRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.05,
            ease: "expo.inOut",
            pointerEvents: "none",
          },
          "-=0.22"
        )
        .to(
          appRef.current,
          {
            autoAlpha: 1,
            duration: 0.55,
          },
          "-=0.86"
        )
        .from(
          ".hero-copy > *",
          {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.48"
        );
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <section className="intro-loader" ref={introRef} aria-label="Studio Ganga opening animation">
        <div className="intro-wordmark" ref={wordmarkRef} aria-label="Studio Ganga">
          <span className="intro-word">
            {"STUDI".split("").map((letter, index) => (
              <span className="intro-mask" key={`studio-${letter}-${index}`}>
                <span className="intro-letter">{letter}</span>
              </span>
            ))}
            <span className="intro-circle-wrap">
              <span className="intro-circle" ref={circleRef} aria-label="O" />
            </span>
          </span>
          <span className="intro-word">
            {"GANGA".split("").map((letter, index) => (
              <span className="intro-mask" key={`ganga-${letter}-${index}`}>
                <span className="intro-letter">{letter}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="intro-meta" aria-hidden="true">
          <span>Architecture</span>
          <span>Interiors</span>
          <span>Place Making</span>
        </div>
      </section>

      <div className="app-shell" ref={appRef}>
        <header className={`site-header ${scrolled || menuOpen ? "is-solid" : ""}`}>
        <a className="brand" href="#top" aria-label="Studio Ganga home" onClick={() => setMenuOpen(false)}>
          <span className="brand-text">
            Studi<span className="brand-o" aria-hidden="true" /> Ganga
          </span>
        </a>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Enquire <ArrowUpRight size={16} strokeWidth={1.8} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </header>

        <main id="top">
        <section className="hero">
          <img className="hero-img" src={heroImage} alt="Contemporary architecture with stone, timber, plants, and shaded courtyard light" />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="kicker">Climate-aware architecture and interiors</p>
            <h1>Architecture that feels composed, lived-in, and deeply rooted.</h1>
            <div className="hero-lower">
              <p>
                Studio Ganga creates residences, studios, and hospitality spaces where proportion, material, light, and everyday ritual do the quiet work.
              </p>
              <a className="text-button" href="#work">
                View work <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero-index" aria-label="Studio highlights">
            <span>01 Context</span>
            <span>02 Craft</span>
            <span>03 Climate</span>
          </div>
        </section>

        <section className="statement">
          <p className="kicker">Point of view</p>
          <h2>
            We design the pauses: a cool threshold, a shaded stair, a wall that holds afternoon light, a room that makes ordinary life feel considered.
          </h2>
        </section>

        <section className="work" id="work">
          <div className="section-title">
            <p className="kicker">Selected work</p>
            <h2>Recent studies in living, hosting, and making.</h2>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.name}>
                <div className="project-media">
                  <img src={project.image} alt={`${project.name} architecture project`} />
                </div>
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-detail">
                  <span>{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-meta">
                  <span>{project.place}</span>
                  <span>{project.year}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="studio" id="studio">
          <div className="studio-image">
            <img src={stoneAtelier} alt="Material studio with stone samples, timber joinery, and daylight" />
          </div>
          <div className="studio-content">
            <p className="kicker">Studio</p>
            <h2>A small practice for clients who want architecture with depth, not decoration.</h2>
            <p>
              The studio works through measured drawings, physical samples, climate logic, local craft, and careful site conversations. The result is architecture that feels authored without feeling forced.
            </p>
            <div className="studio-badges" aria-label="Studio focus areas">
              {materialNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
            <div className="principles">
              <div>
                <strong>Material honesty</strong>
                <span>Stone, lime, timber, metal, concrete, and texture chosen for age, touch, and weather.</span>
              </div>
              <div>
                <strong>Site intelligence</strong>
                <span>Light, privacy, wind, access, budget, and construction realities enter early.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-title compact">
            <p className="kicker">Process</p>
            <h2>Clear enough for construction. Sensitive enough for place.</h2>
          </div>
          <div className="process-grid">
            {processSteps.map(({ icon: Icon, title, text }, index) => (
              <article className="process-card" key={title}>
                <div className="process-card-top">
                  <Icon size={24} strokeWidth={1.6} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-title compact">
            <p className="kicker">Services</p>
            <h2>Everything needed to move from idea to site.</h2>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article className="service" key={title}>
                <Icon size={28} strokeWidth={1.6} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <p className="kicker">Start a project</p>
            <h2>Bring the plot, the plan, the problem, or the dream.</h2>
            <p>
              Share a few lines about the site, scope, timeline, and what the space needs to make possible. The studio will respond with the next practical step.
            </p>
            <div className="contact-strip">
              <Sparkles size={18} strokeWidth={1.7} />
              <span>Ideal for homes, boutique hospitality, workspaces, and thoughtful renovations.</span>
            </div>
          </div>
          <form className="contact-form" action="mailto:hello@studioganga.in" method="post" encType="text/plain">
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Project</span>
              <select name="project" required defaultValue="">
                <option value="" disabled>
                  Select project type
                </option>
                <option>New residence</option>
                <option>Interior design</option>
                <option>Renovation</option>
                <option>Commercial space</option>
              </select>
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows="4" required />
            </label>
            <button className="submit-button" type="submit">
              Send enquiry <ArrowUpRight size={18} />
            </button>
          </form>
        </section>
        </main>

        <footer className="footer">
          <span>Studio Ganga</span>
          <span>Architecture and interiors</span>
          <a href="mailto:hello@studioganga.in">hello@studioganga.in</a>
        </footer>
      </div>
    </>
  );
}

export default App;
