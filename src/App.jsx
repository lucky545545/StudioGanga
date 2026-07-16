import { ArrowUpRight, Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import courtyardHouse from "../assets/WhatsApp Image 2026-07-07 at 4.27.48 PM (2).jpeg";
import riverRoom from "../assets/WhatsApp Image 2026-07-07 at 4.27.48 PM (1).jpeg";
import stoneAtelier from "../assets/WhatsApp Image 2026-07-07 at 4.27.49 PM.jpeg";
import heroVideo from "../assets3/SkyAman1  Urban Hillside Sanctuary  Architecture Walkthrough Animation - MULTIPLY (1080p, h264).mp4";
import aboutImageOne from "../assets4/1.jpeg";
import aboutImageTwo from "../assets4/2.jpeg";
import aboutImageThree from "../assets4/3.jpeg";

const orbitImages = Object.values(
  import.meta.glob("../assets2/*.jpg", { eager: true, query: "?url", import: "default" })
);
const orbitSequence = [...orbitImages, ...orbitImages, ...orbitImages];

const milestones = [
  ["2+", "Years of experience"],
  ["10+", "Completed projects"],
];

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
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;

    let animationFrame;
    const startClip = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const keepInsideClip = () => {
      if (video.currentTime >= 16.9) startClip();
      animationFrame = requestAnimationFrame(keepInsideClip);
    };

    if (video.readyState >= 1) startClip();
    else video.addEventListener("loadedmetadata", startClip, { once: true });
    animationFrame = requestAnimationFrame(keepInsideClip);

    return () => {
      video.removeEventListener("loadedmetadata", startClip);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return undefined;

    const hero = document.querySelector(".video-hero");
    const heroMedia = document.querySelector(".video-hero-media");
    const heroTitle = document.querySelector(".video-hero-title");
    const heroNav = document.querySelector(".video-hero-nav");
    let heroFrame = 0;

    const updateHeroTransition = () => {
      if (heroFrame) return;

      heroFrame = requestAnimationFrame(() => {
        const heroHeight = Math.max(1, hero.offsetHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 0.9)));

        gsap.set(heroMedia, {
          scale: 1 + progress * 0.065,
          opacity: 1 - progress * 0.42,
        });
        gsap.set(heroTitle, {
          y: progress * -54,
          opacity: Math.max(0, 1 - progress * 1.35),
        });
        gsap.set(heroNav, {
          y: progress * -22,
          opacity: Math.max(0, 1 - progress * 1.6),
        });

        heroFrame = 0;
      });
    };

    window.addEventListener("scroll", updateHeroTransition, { passive: true });
    window.addEventListener("resize", updateHeroTransition);
    updateHeroTransition();

    const context = gsap.context(() => {
      const story = gsap.timeline({ paused: true });

      story
        .to(".orbit-ring", { rotation: 540, ease: "none", duration: 13.1 }, 0)
        .to(".orbit-ring", {
          left: "50%",
          "--orbit-radius": "68vmin",
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-stage", { "--orbit-center-y": "86%", duration: 1.3, ease: "power3.inOut" }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra)", {
          "--orbit-card-scale": 1,
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra)", {
          "--orbit-angle": (_, card) => card.style.getPropertyValue("--orbit-next-angle"),
          duration: 1.3,
          ease: "power3.inOut",
        }, 1.5)
        .to(".orbit-card-extra", { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" }, 1.5)
        .to(".orbit-card:not(.orbit-card-extra) img", {
          scale: 1.02,
          duration: 1.3,
          ease: "power2.inOut",
        }, 1.5)
        .to(".orbit-card img", { rotation: 0, duration: 1.3, ease: "power2.inOut" }, 1.5)
        .to(".orbit-stage", { "--orbit-center-y": "14%", duration: 2.8, ease: "none" }, 2.85)
        .to(".orbit-ring", {
          left: "-7%",
          "--orbit-radius": "70vmin",
          duration: 1.3,
          ease: "power2.inOut",
        }, 6.15)
        .to(".orbit-stage", { "--orbit-center-y": "85%", duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-card:not(.orbit-card-extra) img", { scale: 1.1, duration: 1.3, ease: "power2.inOut" }, 6.15)
        .to(".orbit-stage", { "--orbit-center-y": "15%", duration: 2.48, ease: "none" }, 7.45)
        .to(".orbit-intro", { y: -90, autoAlpha: 0, duration: 0.8 }, 1.2)
        .fromTo(".orbit-founded", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 }, 2.75)
        .to(".orbit-founded", { autoAlpha: 0, duration: 0.7 }, 5.85)
        .set(".orbit-rail-item", { opacity: 0.14 }, 0)
        .set(".orbit-stats-rail", { autoAlpha: 0, y: 0 }, 0)
        .to(".orbit-stats-rail", { autoAlpha: 1, duration: 0.45 }, 7.15)
        .to(".orbit-stats-rail", { y: "-124vh", duration: 2.3, ease: "none" }, 7.35);

      const railItems = gsap.utils.toArray(".orbit-rail-item");
      railItems.forEach((stat, index) => {
        const at = 7.35 + index * 1.15;
        story.to(stat, { opacity: 1, duration: 0.28, ease: "power2.out" }, at);

        if (index < railItems.length - 1) {
          story.to(stat, { opacity: 0.14, duration: 0.34, ease: "power2.in" }, at + 0.82);
        }
      });

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
      window.removeEventListener("scroll", updateHeroTransition);
      window.removeEventListener("resize", updateHeroTransition);
      if (heroFrame) cancelAnimationFrame(heroFrame);
      context.revert();
    };
  }, []);

  return (
    <div className="site" id="home">
      <section className="video-hero" aria-label="Studio Ganga architecture film">
        <video
          ref={heroVideoRef}
          className="video-hero-media"
          src={heroVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="video-hero-shade" aria-hidden="true" />

        <nav className="video-hero-nav" aria-label="Primary navigation">
          <a href="#about">About us</a>
          <a href="#work">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>

        <h1 className="video-hero-title">Studio Ganga</h1>
      </section>

      <main>
        <section className="orbit-story" aria-label="Studio Ganga story and milestones">
          <div className="orbit-stage">
            <div className="orbit-ring" aria-hidden="true">
              {orbitSequence.map((image, index) => (
                <div
                  className={`orbit-card ${index >= 15 ? "orbit-card-extra" : ""}`}
                  key={`${image}-${index}`}
                  style={{
                    "--orbit-angle": `${(360 / orbitSequence.length) * index}deg`,
                    "--orbit-next-angle": index < 15
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
              <strong>2024</strong>
              <span>Year of Foundation</span>
              <small>Built from a belief that enduring architecture begins with listening closely.</small>
            </div>

            <div className="orbit-stats-rail">
              {milestones.map(([number, label]) => (
                <div className="orbit-rail-item orbit-stat" key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}

              <div className="orbit-rail-item orbit-finale">
                <span>The spaces behind</span>
                <strong>ambitious lives.</strong>
              </div>
            </div>

            <span className="orbit-scroll-hint">Scroll to explore</span>
          </div>
        </section>

        <section className="about section-reveal" id="about">
          <div className="about-inner">
            <h2 className="about-title" aria-label="About us">
              <span>AB</span>
              <span className="about-title-o">O<i>✦</i></span>
              <span>UT US</span>
            </h2>

            <div className="about-grid">
              <figure className="about-image about-image-one">
                <img src={aboutImageOne} alt="Jalaj Garg overlooking the mountain landscape" />
              </figure>

              <div className="about-text-box about-text-one">
                <p>Studio Ganga is a multidisciplinary architecture and interior design practice founded by Jalaj Garg, based in Uttar Pradesh. We work across residential, interior, retail, and institutional projects — approaching each with the same core belief: good design is honest about what it's made of.</p>
                <p>We work with raw and natural materials — stone, wood, exposed textures, unpolished finishes — because they don't stay static. They weather, patina, and settle into their surroundings, growing more expressive with time rather than fading. A building shouldn't look its best only on the day it's completed.</p>
              </div>

              <div className="about-text-box about-text-two">
                <p>Alongside this, we treat green pockets — courtyards, planted breaks, framed views of the outdoors — as essential to how a space feels to inhabit, not as decoration added at the end. Bringing nature into daily proximity changes how a space is used and experienced, often more than any single material choice.</p>
                <p>This shapes how we design: spaces that are contextually responsive, materially honest, and built to be lived in — not just photographed.</p>
              </div>

              <figure className="about-image about-image-two">
                <img src={aboutImageTwo} alt="Portrait of Studio Ganga founder Jalaj Garg" />
              </figure>

              <figure className="about-image about-image-three">
                <img src={aboutImageThree} alt="Jalaj Garg beside a mountain lake" />
              </figure>
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
