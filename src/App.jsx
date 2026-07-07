import { ArrowRight, ArrowUpRight, Building2, Compass, Layers3, Menu, PencilRuler, X } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "../assets/studio-ganga-hero.png";

const navItems = ["Work", "Studio", "Services", "Contact"];

const projects = [
  {
    name: "Courtyard House",
    type: "Private residence",
    place: "Bengaluru outskirts",
    year: "2026",
    summary: "A family home arranged around shade, breeze, verandahs, and a garden room that changes through the day.",
    crop: "project-one",
  },
  {
    name: "Stone Atelier",
    type: "Creative workspace",
    place: "Kochi",
    year: "2025",
    summary: "A studio for samples, client reviews, model making, and slow focused work under filtered light.",
    crop: "project-two",
  },
  {
    name: "River Room",
    type: "Hospitality interior",
    place: "Mysuru",
    year: "2025",
    summary: "A compact dining interior using deep reveals, warm plaster, timber rhythm, and intimate evening lighting.",
    crop: "project-three",
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled || menuOpen ? "is-solid" : ""}`}>
        <a className="brand" href="#top" aria-label="Studio Ganga home" onClick={() => setMenuOpen(false)}>
          <span className="brand-symbol">SG</span>
          <span className="brand-text">Studio Ganga</span>
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
            <p className="kicker">Architecture / Interiors / Renovation</p>
            <h1>Designing buildings that breathe with light, climate, and ritual.</h1>
            <div className="hero-lower">
              <p>
                Studio Ganga shapes homes, workspaces, and hospitality interiors with a calm material language and obsessive attention to how people actually live.
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
            We do not chase spectacle. We design the pauses: a cool threshold, a shaded stair, a wall that holds afternoon light.
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
                <div className={`project-media ${project.crop}`}>
                  <img src={heroImage} alt="" aria-hidden="true" />
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
            <img src={heroImage} alt="Warm modern architecture interior used as a studio mood image" />
          </div>
          <div className="studio-content">
            <p className="kicker">Studio</p>
            <h2>A small practice for clients who want architecture with depth, not decoration.</h2>
            <p>
              The studio works through measured drawings, physical samples, climate logic, local craft, and careful site conversations. The result is architecture that feels authored without feeling forced.
            </p>
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
              Replace this placeholder contact information with the client’s phone, address, Instagram, and preferred enquiry email before launch.
            </p>
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
    </>
  );
}

export default App;
